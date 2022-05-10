import { Injectable } from '@angular/core';
import { Joke } from '../models/joke.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReplaySubject, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Page, Pages } from '../models/page.model';

enum URL
{
  JOKE_MAIL      = 'backend/joke-mail.php',
  JOKE_CREATE    = 'backend/joke-create.php',
  JOKE_READ      = 'backend/joke-read.php',
  JOKE_UPDATE    = 'backend/joke-update.php',
  JOKE_DELETE    = 'backend/joke-delete.php',
  JOKE_RESTORE   = 'backend/joke-restore.php',
  JOKE_BACKUP    = 'backend/joke-backup.php',
  PAGE_READ      = 'backend/page-read.php',
  PAGES_READ     = 'backend/pages-read.php',
  INSTALL        = 'backend/db-install.php',
  UNINSTALL      = 'backend/db-uninstall.php',
  LOGIN          = 'backend/user-login.php',
  LOGOUT         = 'backend/user-logout.php',

}

export enum Status
{
  FAILURE = 'failure',
  SUCCESS = 'success',
}

export interface Response<T = any> {
  status: Status;
  data?: T;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  readonly currentPageSubject: ReplaySubject<Page>;
  readonly pagesSubject: ReplaySubject<Pages>;
  private  pages: Pages;

  constructor( private httpClient: HttpClient )
  {
    this.currentPageSubject = new ReplaySubject<Page>();
    this.pagesSubject       = new ReplaySubject<Pages>();

    this.pagesSubject.subscribe( (pages) => {
        // When new pages are received, we have to get the first one
        this.pages = pages;
        this.readPage(0, pages.size);
    });
  }

  /**
   * Refresh completely the data (pages, current page, etc.)
   */
  refresh(): Promise<Response<Pages>> {
    return this.readPages(10);
  }

  /**
   * Set current page
   * @param id zero-based index of the page, must be < pages count
   */
  setPage(id: number): Promise<Response<Page>> {
    return this.readPage(id, this.pages.size );
  }

  /**
   * Change the page size
   * @param size the element count per page
   * @returns
   */
  setPageSize(size: number): Promise<Response<Pages>> {
    return this.readPages(size);
  }

  login( user: string, password: string): Promise<Response> {
    return this.httpClient
    .post<Response>(URL.LOGIN, { user, password})
    .pipe(
      retry(3),
      catchError( () => of({status: Status.FAILURE }) ),
    ).toPromise();
  }

  logout(): Promise<Response> {
    return this.httpClient
    .get<Response>(URL.LOGOUT)
    .pipe(
      retry(3),
      catchError( () => of({status: Status.FAILURE }) ),
    ).toPromise();
  }

  /**
   * Install the necessary tables
   * @returns
   */
  install(): Promise<Response<string>> {
    return this.httpClient
    .get<Response<string>>(URL.INSTALL)
    .pipe(
      retry(3),
      catchError( () => of({status: Status.FAILURE }) ),
    ).toPromise();
  }

  /**
   * Do the exact opposite of install()
   * @returns
   */
  uninstall(): Promise<Response<string>> {
    return this.httpClient
    .get<Response<string>>(URL.UNINSTALL)
    .pipe(
      retry(3),
      catchError( () => of({status: Status.FAILURE }) ),
    ).toPromise();
  }

  /**
   * Restore a backup file (@see backup())
   * @param formData must contain a file field pointing a json file.
   * that json must contain a Joke array.
   * @returns
   */
  restore(formData: FormData): Promise<Response>
  {
    return this.httpClient
      .post<Response>(URL.JOKE_RESTORE, formData)
      .pipe(
        retry(3),
        catchError( () => of({status: Status.FAILURE}) )
      ).toPromise();
  }

  /**
   * Backup database
   * @returns an array of jokes with all information to restore it.
   */
  backup(): Promise<Response<Joke[]>>
  {
    return this.httpClient
      .get<Response<Joke[]>>(URL.JOKE_BACKUP)
      .pipe(
        retry(3),
        catchError( () => of({status: Status.FAILURE}) )
      ).toPromise();
  }

  /**
   * Create a joke
   * @param joke the joke to insert
   * @returns a joke with a unique id
   */
  create(joke: Joke): Promise<Response<Joke>>
  {
    return this.httpClient
      .post<Response<Joke>>(URL.JOKE_CREATE, joke)
      .pipe(
        retry(3),
        catchError( () => of({ status: Status.FAILURE}) ),
      ).toPromise();
  }

  /**
   * Read the pages for a give page size.
   * @param size the item count per page
   */
  private async readPages(size: number): Promise<Response<Pages>> {

    const params = new HttpParams().append('size', size);

    const response = await this.httpClient
      .get<Response<Pages>>(URL.PAGES_READ, { params } )
      .pipe(
        retry(3),
        catchError( () => of( { status: Status.FAILURE, data: null}) )
      ).toPromise();

    if( response.status === Status.SUCCESS)
    {
      this.pagesSubject.next(response.data);
    }
    return response;
  }

  /**
   * Read a page from backend
   * @param id a page index
   * @param size a page size (item count per page)
   */
  private async readPage(id: number, size: number): Promise<Response<Page>> {
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('size', size);

    const response = await this.httpClient
      .get<Response<Page>>(URL.PAGE_READ, { params })
      .pipe(
        retry(3),
        catchError( () => of({ status: Status.FAILURE, data: null}) )
      ).toPromise();


    if( response.status === Status.SUCCESS)
    {
      this.currentPageSubject.next(response.data);
    }

    return response;
  }

  /**
   * Update an existing joke
   * @param joke the joke to update (must have a valid id)
   * @returns
   */
  update(joke: Joke): Promise<Response> {
    return this.httpClient
    .put<Response>(URL.JOKE_UPDATE, joke )
    .pipe(
      retry(3),
      catchError( () => of({ status: Status.FAILURE}) ),
    ).toPromise();
  }

  /**
   * Delete an existing joke
   * @param id the joke id
   * @returns
   */
  delete(id: number): Promise<Response> {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.httpClient
    .delete<Response>(URL.JOKE_DELETE, { params })
    .pipe(
      retry(3),
      catchError( () => of({ status: Status.FAILURE }) ),
    ).toPromise();
  }
}

