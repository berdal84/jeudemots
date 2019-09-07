import { Injectable } from '@angular/core';
import { Joke } from '../models/joke.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const jokeJsonFileUrl: string = 'assets/jokes.json';

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  private jokes: Promise<Array<Joke>>;

  constructor( private httpClient: HttpClient ) {

    // get JSON once
    this.jokes = this.httpClient.get<Array<Joke>>(jokeJsonFileUrl).pipe( 
      retry(3),
      catchError( this.handleError )
    ).toPromise();

  }

  getJokes(): Promise<Array<Joke>> {

    return this.jokes;
   
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
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };
}
