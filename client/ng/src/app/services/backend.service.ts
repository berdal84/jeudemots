import {Injectable} from '@angular/core';
import {Joke, Page} from 'jeudemots-shared';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject, of} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Response, Credentials} from 'jeudemots-shared';
import {NULL_PAGE} from '../constants/null-page';
import * as sha256 from 'sha256';

const { backend_url } = environment;

const URL = {
  AUTH:         `${backend_url}/authentication.php`,
  MAIL:         `${backend_url}/mail.php`,
  JOKE:         `${backend_url}/joke.php`,
  MAINTENANCE:  `${backend_url}/maintenance.php`,
  PAGE:         `${backend_url}/page.php`,
};

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  readonly page$ = new ReplaySubject<Page>();
  private page: Page = NULL_PAGE;
  private filterStr: string = '';
  private cache = new Map<string, Response>();

  constructor(private httpClient: HttpClient) {
    this.page$.subscribe(page => this.page = page);
  }

  /**
   * Generic request, guarantee not to throw.
   * Check response.status
   */
  private async _request<TResponse extends Response>(
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH',
    url: string,
    headers?: {
      params?: Record<string, number | string>,
      body?: any
    }): Promise<TResponse> {

    return this.httpClient
      .request<TResponse>(method, url, headers)
      .pipe(retry(3), catchError(() => of({
        ok: false,
        data: null,
        error: `Unable to get request response from ${url} (three attempts)`
      } as TResponse)))
      .toPromise();
  }

  /**
   * Generic request using a local cache system.
   *
   */
  private async _requestWithCache<TResponse extends Response>(
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH',
    url: string,
    headers?: {
      params?: Record<string, number | string>,
      body?: any
    }): Promise<TResponse> {

    // Try to get response from cache
    const cache_key = `${method}:${url}:${JSON.stringify(headers)}`;
    if (this.cache.has(cache_key)) {
      const cache_response = this.cache.get(cache_key) as TResponse;
      return structuredClone(cache_response);
    }

    // Fetch
    const response = await this._request<TResponse>(method, url, headers);

    // Update cache
    if (response.ok) {
      this.cache.set(cache_key, structuredClone(response));
    }
    return response;
  }

  setFilter(filterStr: string) {
    this.filterStr = filterStr;
  }

  getFilter() {
    return this.filterStr;
  }

  resetFilter() {
    this.filterStr = '';
  }

  /**
   * Set current page
   * @param id zero-based index of the page, must be < pages count
   */
  setPage(id: number): Promise<Response<Page>> {
    return this.readPage(id, this.page.size);
  }

  async reloadPage(new_size?: number): Promise<Response<Page>> {
    const current_page_id = this.page.id;
    const new_page_id = Math.min(this.page.size - 1, current_page_id); // avoid overflow
    return await this.readPage(new_page_id, new_size ?? this.page.size);
  }

  /**
   * Change the page size
   * @param size the element count per page
   */
  setPageSize(size: number): Promise<Response<Page>> {
    return this.reloadPage(size);
  }

  login(credentials: Credentials): Promise<Response> {
    const safeCredentials: Credentials = {
      username: credentials.username,
      password: sha256(credentials.password)
    };
    return this._request<Response>('POST', URL.AUTH, {body: safeCredentials});
  }

  logout(): Promise<Response> {
    return this._request<Response>('GET', URL.AUTH);
  }

  /**
   * Install the necessary tables
   */
  install(): Promise<Response<string>> {
    return this._request<Response<string>>('GET', `${URL.MAINTENANCE}?action=install`);
  }

  /**
   * Do the exact opposite of install()
   */
  uninstall(): Promise<Response<string>> {
    return this._request<Response<string>>('GET', `${URL.MAINTENANCE}?action=uninstall` );
  }

  /**
   * Restore a backup file (@see backup())
   * @param formData must contain a file field pointing a json file.
   * that json must contain a Joke array.
   */
  restore(formData: FormData): Promise<Response> {
    return this._request<Response>('POST', `${URL.MAINTENANCE}?action=restore`, {body: formData});
  }

  /**
   * Backup database
   * @returns an array of jokes with all information to restore it.
   */
  backup(): Promise<Response<Joke[]>> {
    return this._request<Response<Joke[]>>('GET', `${URL.MAINTENANCE}?action=backup`);
  }

  /**
   * Create a joke
   * @param joke the joke to insert
   * @returns a joke with a unique id
   */
  create(joke: Joke): Promise<Response<Joke>> {
    return this._request<Response<Joke>>('POST', URL.JOKE, {body: joke});
  }

  /**
   * Read a page from server
   * @param id a page index
   * @param size a page size (item count per page)
   */
  private async readPage(id: number, size: number): Promise<Response<Page>> {

    const params = {
      size,
      id,
      filter: this.filterStr
    };

    const response = await this._requestWithCache<Response<Page>>('GET', URL.PAGE, {params});

    if (response.ok) {
      this.page$.next(response.data);
    }

    return response;
  }

  /**
   * Update an existing joke
   * @param joke the joke to update (must have a valid id)
   */
  async update(joke: Joke): Promise<Response> {
    const response = await this._request<Response>('PATCH', URL.JOKE, {body: joke});
    if (response.ok) this.cache.clear();
    return response;
  }

  /**
   * Delete an existing joke * @param id the joke id
   */
  async delete(id: number): Promise<Response> {
    const response = await this._request<Response>('DELETE', URL.JOKE, {params: {id}});
    if (response.ok) this.cache.clear();
    return response;
  }
}
