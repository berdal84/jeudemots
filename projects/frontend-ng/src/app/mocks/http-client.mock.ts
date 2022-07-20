import { Observable, of } from "rxjs";
import { PAGE_MOCK } from "./page.mock";
import { Page } from "frontend-common/src/lib/models/page.model";

 export class HttpClientMock {
    get<T extends Page>(): Observable<Page> {
      return of(PAGE_MOCK);
    }
}