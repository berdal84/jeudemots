import { Injectable } from '@angular/core';
import { Joke } from '../models/joke.model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ReplaySubject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MailSubmission } from '../models/mail-submission.model';

const JOKE_JSON_FILE_URL = 'https://raw.githubusercontent.com/berdal84/jeudemots-ng/master/jokes.json';
const API_MAIL           = 'api/mail.php';
const API_CREATE         = 'api/create.php';
const API_READ           = 'api/read.php';
const API_RESTORE        = 'api/restore.php';
const API_BACKUP         = 'api/backup.php';

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  readonly jokes: ReplaySubject<Array<Joke>>;

  constructor( private httpClient: HttpClient )
  {
    this.jokes = new ReplaySubject<Array<Joke>>();
    this.getJokesFromServer();
  }

  /**
   * Create an array of Jokes from a JSON.
   * @param formData must contain a file field pointing a json file.
   * that json must contain a Joke array.
   * @returns 
   */
  restore(formData: FormData): Promise<any>
  {
    return this.httpClient
      .post(API_RESTORE, formData)
      .pipe(
        retry(3),
        catchError( this.handleError )
      ).toPromise();
  }

  backup(): Promise<any>
  {
    return this.httpClient
    .get(API_BACKUP)
    .pipe(
      retry(3),
      catchError( this.handleError )
    ).toPromise();
  }

  /**
   * Send a new joke submission by email.
   */
  create(joke: Joke): Promise<Joke>
  {
    return this.httpClient
      .post<Joke>(API_CREATE, joke)
      .pipe(
        retry(3),
        catchError( this.handleError )
      ).toPromise();
  }

  /**
   * Send a new joke submission by email.
   */
  sendJokeByMail(submission: MailSubmission): void {

    this.httpClient
    .post<MailSubmission>(API_MAIL, submission)
    .pipe(
      retry(3),
      catchError( this.handleError )
    )
    .subscribe( result => { console.log('Mail sent. Result:', result); });

  }

  private getJokesFromServer(): void {
    this.httpClient
    .get<Array<Joke>>(JOKE_JSON_FILE_URL)
    .pipe(
      retry(3),
      catchError( this.handleError )
    ).subscribe( (requestResult: Array<Joke>) => {
      this.jokes.next(requestResult);
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
