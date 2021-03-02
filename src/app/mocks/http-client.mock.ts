import { Observable, of } from "rxjs";
import { Joke } from "../models/joke.model";
import { JOKE_ARRAY_MOCK } from "./joke-array.mock";

 /** An HttpClient mock to always return predefined set of jokes */
 export class HttpClientMock {
    get<T extends Joke>(): Observable<T[]> {
      return of(JOKE_ARRAY_MOCK as T[]);
    }
}