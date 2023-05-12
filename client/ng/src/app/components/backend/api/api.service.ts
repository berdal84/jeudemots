import {Injectable, inject} from '@angular/core';
import {Joke, Page} from 'jeudemots-shared';
import {HttpClient} from '@angular/common/http';
import {of, firstValueFrom, BehaviorSubject} from 'rxjs';
import {catchError, first, retry} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Response, Credentials} from 'jeudemots-shared';
import {NULL_PAGE} from '@constants';
// @ts-ignore (any)
import * as sha256 from 'sha256';

const { api } = environment;

@Injectable({
  providedIn: 'root'
})
export class APIService {

  readonly page$ = new BehaviorSubject<Page>(NULL_PAGE);
  private cache = new Map<string, Response>();
  private httpClient = inject(HttpClient);

  /**
   * Generic request, guarantee not to throw.
   * Check response.status
   */
  private async _request<TResponse extends Response>(
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH',
    path: string,
    headers?: {
      params?: Record<string, number | string>,
      body?: any
    }): Promise<TResponse> {
    const full_url = `${api.baseUrl}${path}`;

    return firstValueFrom( this.httpClient
      .request<TResponse>(method, full_url, headers)
      .pipe(
        retry(3),
        catchError(() => of({
          ok: false,
          data: null,
          error: `${method} with ${full_url} failed 3 times`
        } as TResponse)),
        first()
      ));
  }

  /**
   * Generic request using a local cache system.
   *
   * @param method
   * @param path a path relative to the api base url
   * @param headers
   * @private
   */
  private async _requestWithCache<TResponse extends Response>(
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH',
    path: `/${string}`,
    headers?: {
      params?: Record<string, number | string>,
      body?: any
    }): Promise<TResponse> {

    // Try to get response from cache
    const cache_key = `${method}:${path}:${JSON.stringify(headers)}`;
    if (this.cache.has(cache_key)) {
      const cache_response = this.cache.get(cache_key) as TResponse;
      return structuredClone(cache_response);
    }

    // Fetch
    const response = await this._request<TResponse>(method, path, headers);

    // Update cache
    if (response.ok) {
      this.cache.set(cache_key, structuredClone(response));
    }
    return response;
  }

  /**
   * Set current page
   * @param id zero-based index of the page, must be < pages count
   */
  setPage(id: number): Promise<Response<Page>> {
    const { size } = this.page$.value;
    return this.readPage({id, size});
  }

  login(credentials: Credentials): Promise<Response> {
    const safeCredentials: Credentials = {
      username: credentials.username,
      password: sha256(credentials.password)
    };
    return this._request<Response>('POST', api.path.auth, {body: safeCredentials});
  }

  isLogged(): Promise<Response> {
    return this._request<Response>('GET', api.path.auth);
  }

  logout(): Promise<Response> {
    return this._request<Response>('DELETE', api.path.auth);
  }

  /**
   * Install the necessary tables
   */
  install(): Promise<Response<string>> {
    return this._request<Response<string>>('GET', `${api.path.maintenance}?action=install`);
  }

  /**
   * Do the exact opposite of install()
   */
  uninstall(): Promise<Response<string>> {
    return this._request<Response<string>>('GET', `${api.path.maintenance}?action=uninstall` );
  }

  /**
   * Restore a backup file (@see backup())
   * @param formData must contain a file field pointing a json file.
   * that json must contain a Joke array.
   */
  restore(formData: FormData): Promise<Response> {
    return this._request<Response>('POST', `${api.path.maintenance}?action=restore`, {body: formData});
  }

  /**
   * Backup database
   * @returns an array of jokes with all information to restore it.
   */
  backup(): Promise<Response<Joke[]>> {
    return this._request<Response<Joke[]>>('GET', `${api.path.maintenance}?action=backup`);
  }

  /**
   * Create a joke
   * @param joke the joke to insert
   * @returns a joke with a unique id
   */
  create(joke: Joke): Promise<Response<Joke>> {
    return this._request<Response<Joke>>('POST', api.path.joke, {body: joke});
  }

  /**
   * Read a page from server
   * @param id a page index
   * @param size a page size (item count per page)
   */
  async readPage(params: {id: number, size: number, filter?: string}): Promise<Response<Page>> {
    const response = await this._requestWithCache<Response<Page>>('GET', api.path.page, { params });

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
    const response = await this._request<Response>('PATCH', api.path.joke, {body: joke});
    if (response.ok) this.cache.clear();
    return response;
  }

  /**
   * Delete an existing joke * @param id the joke id
   */
  async delete(id: number): Promise<Response> {
    const response = await this._request<Response>('DELETE', api.path.joke, {params: {id}});
    if (response.ok) this.cache.clear();
    return response;
  }
}
