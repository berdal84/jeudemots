import { Observable, of } from "rxjs";
import { Joke } from "../models/joke.model";
import { JokesArrayMock } from "./joke-array.mock";

 /** An HttpClient mock to always return predefined set of jokes */
 export class HttpClientMock {
    get<T extends Joke>(): Observable<T[]> {
      return of(JokesArrayMock as T[]);
    }
}