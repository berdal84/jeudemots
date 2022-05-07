import { Injectable } from '@angular/core';
import { Joke } from '../models/joke.model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ReplaySubject, throwError, Observable, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Page, Pages } from '../models/page.model';

enum URL 
{
  JOKE_MAIL      = 'backend/public/joke/mail.php',
  JOKE_CREATE    = 'backend/public/joke/create.php',
  JOKE_READ      = 'backend/public/joke/read.php',
  JOKE_UPDATE    = 'backend/public/joke/update.php',
  JOKE_DELETE    = 'backend/public/joke/delete.php',
  JOKE_RESTORE   = 'backend/public/joke/restore.php',
  JOKE_BACKUP    = 'backend/public/joke/backup.php',
  PAGE_READ      = 'backend/public/page/read.php',
  PAGES_READ     = 'backend/public/pages/read.php',
  INSTALL        = 'backend/private/install.php',
  UNINSTALL      = 'backend/private/uninstall.php',
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

  async install(): Promise<any> {
    return this.httpClient
    .get(URL.INSTALL)
    .pipe(
      catchError( () => of(null) ),
      retry(3),
    ).toPromise();
  }

  async uninstall(): Promise<any> {
    return this.httpClient
    .get(URL.UNINSTALL)
    .pipe(
      catchError( () => of(null) ),
      retry(3),
    ).toPromise();
  }

  /**
   * Refresh completely the data (pages, current page, etc.)
   */
  refresh() {
    this.readPages(10);
  }

  /**
   * Set current page
   * @param id zero-based index of the page, must be < pages count
   */
  setPage(id: number) {
    this.readPage(id, this.pages.size );
  }

  setPageSize(size: number) {
    this.readPages(size);
  }

  /**
   * Restore a backup file (@see backup())
   * @param formData must contain a file field pointing a json file.
   * that json must contain a Joke array.
   * @returns 
   */
  restore(formData: FormData): Promise<any>
  {
    return this.httpClient
      .post(URL.JOKE_RESTORE, formData)
      .pipe(
        retry(3),
        catchError( () => of(null) )
      ).toPromise();
  }

  /**
   * Backup database
   * @returns an array of jokes with all information to restore it.
   */
  backup(): Promise<Joke[]>
  {
    return this.httpClient
    .get<Joke[]>(URL.JOKE_BACKUP)
    .pipe(
      catchError( () => of(null) ),
      retry(3),
    ).toPromise();
  }

  /**
   * Create a joke on server side
   * @param joke the joke to insert
   * @returns a joke with a unique id
   */
  create(joke: Joke): Promise<Joke>
  {
    return this.httpClient
      .post<Joke>(URL.JOKE_CREATE, joke)
      .pipe(
        catchError( () => of(null) ),
        retry(3),
      ).toPromise();
  }

  /**
   * Read the pages for a give page size.
   * @param size the item count per page
   */
  private readPages(size: number): void {

    const params = new HttpParams().append('size', size);

    this.httpClient
    .get<Pages>(URL.PAGES_READ, { params } )
    .pipe(
      catchError( () => of(null) ),
      retry(3),
    ).subscribe( (requestResult: Pages) => {
      this.pagesSubject.next(requestResult);
    });
  } 

  /**
   * Read a page from backend
   * @param id a page index
   * @param size a page size (item count per page)
   */
  private readPage(id: number, size: number): void {
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('size', size);

    this.httpClient
      .get<Page>(URL.PAGE_READ, { params })
      .pipe(
        catchError( () => of(null) ),
        retry(3),
      ).subscribe( (requestResult: Page) => {
        this.currentPageSubject.next(requestResult);
      });
  } 

  update(joke: Joke) {
    this.httpClient
    .put(URL.JOKE_UPDATE, joke )
    .pipe(
      catchError( () => of(null) ),
      retry(3),
    ).toPromise();
  }

  delete(joke: Joke) {
    let params = new HttpParams();
    params = params.append('id', joke.id);

    this.httpClient
    .delete(URL.JOKE_DELETE, { params })
    .pipe(
      catchError( () => of(null) ),
      retry(3),      
    ).toPromise();
  }
}
