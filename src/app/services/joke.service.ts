import { Injectable } from '@angular/core';
import { Joke } from '../models/joke.model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ReplaySubject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Page, Pages } from '../models/page.model';

enum BACKEND_URL 
{
  JOKE_MAIL      = 'backend/public/joke/mail.php',
  JOKE_CREATE    = 'backend/public/joke/create.php',
  JOKE_READ      = 'backend/public/joke/read.php',
  JOKE_RESTORE   = 'backend/public/joke/restore.php',
  JOKE_BACKUP    = 'backend/public/joke/backup.php',
  PAGE_READ      = 'backend/public/page/read.php',
  PAGES_READ     = 'backend/public/pages/read.php',
  JOKE_READ_ALL  =  JOKE_BACKUP,
}

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  readonly currPage: ReplaySubject<Page>;
  readonly pages:    ReplaySubject<Pages>;

  constructor( private httpClient: HttpClient )
  {
    this.currPage = new ReplaySubject<Page>();
    this.pages    = new ReplaySubject<Pages>();

    this.pages.subscribe( (pages) => {
        // When new pages are received, we have to get the first one
        this.readPage(0, pages.size );
    });

    this.setPageSize(10);
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
      .post(BACKEND_URL.JOKE_RESTORE, formData)
      .pipe(
        retry(3),
        catchError( this.handleError )
      ).toPromise();
  }

  /**
   * Backup database
   * @returns an array of jokes with all information to restore it.
   */
  backup(): Promise<Joke[]>
  {
    return this.httpClient
    .get<Joke[]>(BACKEND_URL.JOKE_BACKUP)
    .pipe(
      retry(3),
      catchError( this.handleError )
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
      .post<Joke>(BACKEND_URL.JOKE_CREATE, joke)
      .pipe(
        retry(3),
        catchError( this.handleError )
      ).toPromise();
  }

  /**
   * Read the pages for a give page size.
   * @param size the item count per page
   */
  private readPages(size: number): void {

    const params = new HttpParams().append('size', size);

    this.httpClient
    .get<Pages>(BACKEND_URL.PAGES_READ, { params } )
    .pipe(
      retry(3),
      catchError( this.handleError )
    ).subscribe( (requestResult: Pages) => {
      this.pages.next(requestResult);
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
    .get<Page>(BACKEND_URL.PAGE_READ, { params })
    .pipe(
      retry(3),
      catchError( this.handleError )
    ).subscribe( (requestResult: Page) => {
      this.currPage.next(requestResult);
    });
  } 

  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.text}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
