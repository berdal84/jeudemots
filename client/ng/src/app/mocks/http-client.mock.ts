import { Observable, of } from "rxjs";
import { PAGE_MOCK } from "./page.mock";
import { Page } from "shared/src/lib/models/page.model";

 export class HttpClientMock {
    get<T extends Page>(): Observable<Page> {
      return of(PAGE_MOCK);
    }
}