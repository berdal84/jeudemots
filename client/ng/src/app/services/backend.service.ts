import {Injectable} from '@angular/core';
import {Joke, Page, Pages} from 'jeudemots-shared';
import {HttpClient } from '@angular/common/http';
import {ReplaySubject, of} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Response, Credentials} from 'jeudemots-shared';

const backend = environment.backend_url;

const URL = {
  JOKE_MAIL: `${backend}/joke-mail.php`,
  JOKE_CREATE: `${backend}/joke-create.php`,
  JOKE_READ: `${backend}/joke-read.php`,
  JOKE_UPDATE: `${backend}/joke-update.php`,
  JOKE_DELETE: `${backend}/joke-delete.php`,
  JOKE_RESTORE: `${backend}/joke-restore.php`,
  JOKE_BACKUP: `${backend}/joke-backup.php`,
  PAGE_READ: `${backend}/page-read.php`,
  PAGES_READ: `${backend}/pages-read.php`,
  INSTALL: `${backend}/db-install.php`,
  UNINSTALL: `${backend}/db-uninstall.php`,
  LOGIN: `${backend}/user-login.php`,
  LOGOUT: `${backend}/user-logout.php`,
};

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  readonly pageSubject: ReplaySubject<Page>;
  readonly pagesSubject: ReplaySubject<Pages>;
  private pages: Pages;
  private page: Page;
  private filterStr: string;
  private cache: Map<string, Response>;
  constructor(private httpClient: HttpClient) {
    this.pageSubject = new ReplaySubject<Page>();
    this.pagesSubject = new ReplaySubject<Pages>();
    this.filterStr = '';
    this.pagesSubject.subscribe((pages) => {
      this.pages = pages;
    });
    this.pageSubject.subscribe((page) => {
      this.page = page;
    });
    this.cache = new Map<string, Response>();
  }

  /**
   * Generic request, guarantee not to throw.
   * Check response.status
   */
  private async _request<TResponse extends Response>(
    method: 'GET' | 'POST' | 'DELETE',
    url: string,
    headers?: {
      params?: Record<string, number | string>,
      body?: any
    }): Promise<TResponse> {

    // Try to get response from cache
    const cache_key = `${method}:${url}:${JSON.stringify(headers)}`;
    if (method === 'GET' && this.cache.has(cache_key)) {
      const cache_response = this.cache.get(cache_key) as TResponse;
      return structuredClone(cache_response);
    }

    // Fetch
    const response = await this.httpClient
      .request<TResponse>(method, url, headers)
      .pipe(retry(3), catchError(() => of({
        ok: false,
        data: null,
        error: `Unable to get request response from ${url} (three attempts)`
      } as TResponse)))
      .toPromise();

    // Update cache
    if ( response.ok ) {
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
   * Refresh completely the data (pages, current page, etc.)
   */
  async reloadAll(page_size = 10): Promise<Response<Pages>> {
    const response = await this.readPages(page_size);
    if (response.ok) {
      await this.readPage(0, this.pages.size);
    }
    return response;
  }

  /**
   * Set current page
   * @param id zero-based index of the page, must be < pages count
   */
  setPage(id: number): Promise<Response<Page>> {
    return this.readPage(id, this.pages.size);
  }

  async reloadPage(): Promise<Response<Page>> {
    const current_page_id = this.page.id;
    const response = await this.readPages(this.pages.size);
    if (!response.ok) {
      return {
        error: `Unable to reload page`,
        reason: response,
        ok: false,
        data: null
      };
    }
    const new_page_id = Math.min(this.pages.size - 1, current_page_id); // avoid overflow
    return await this.readPage(new_page_id, this.pages.size);
  }

  /**
   * Change the page size
   * @param size the element count per page
   */
  setPageSize(size: number): Promise<Response<Pages>> {
    return this.readPages(size);
  }

  login(credentials: Credentials): Promise<Response> {
    return this._request<Response>('POST', URL.LOGIN, {body: credentials});
  }

  logout(): Promise<Response> {
    return this._request<Response>('GET', URL.LOGOUT);
  }

  /**
   * Install the necessary tables
   */
  install(): Promise<Response<string>> {
    return this._request<Response<string>>('GET', URL.INSTALL);
  }

  /**
   * Do the exact opposite of install()
   */
  uninstall(): Promise<Response<string>> {
    return this._request<Response<string>>('GET', URL.UNINSTALL);
  }

  /**
   * Restore a backup file (@see backup())
   * @param formData must contain a file field pointing a json file.
   * that json must contain a Joke array.
   */
  restore(formData: FormData): Promise<Response> {
    return this._request<Response>('POST', URL.JOKE_RESTORE, { body: formData });
  }

  /**
   * Backup database
   * @returns an array of jokes with all information to restore it.
   */
  backup(): Promise<Response<Joke[]>> {
    return this._request<Response<Joke[]>>('GET', URL.JOKE_BACKUP);
  }

  /**
   * Create a joke
   * @param joke the joke to insert
   * @returns a joke with a unique id
   */
  create(joke: Joke): Promise<Response<Joke>> {
    return this._request<Response<Joke>>('POST', URL.JOKE_CREATE, {body: joke});
  }

  /**
   * Read the pages for a give page size.
   * @param size the item count per page
   */
  private async readPages(size: number): Promise<Response<Pages>> {

    const params = {
      size,
      filter: this.filterStr
    };

    const response = await this._request<Response<Pages>>('GET', URL.PAGES_READ, {params});

    if (response.ok) {
      this.pagesSubject.next(response.data);
    }
    return response;
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

    const response = await this._request<Response<Page>>('GET', URL.PAGE_READ, {params});

    if (response.ok) {
      this.pageSubject.next(response.data);
    }

    return response;
  }

  /**
   * Update an existing joke
   * @param joke the joke to update (must have a valid id)
   */
  update(joke: Joke): Promise<Response> {
    return this._request<Response>('POST', URL.JOKE_UPDATE, { body: joke});
  }

  /**
   * Delete an existing joke
   * @param id the joke id
   */
  delete(id: number): Promise<Response> {
    return this._request<Response>('DELETE', URL.JOKE_DELETE, {params: { id }});
  }
}

