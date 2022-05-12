import { ReplaySubject } from "rxjs";
import { Joke } from "../models/joke.model";
import { Page } from "../models/page.model";
import { BackendService } from "../services/backend.service";
import { PAGE_MOCK } from "./page.mock";

/**
 * A JokeService mock that always return a valid set of jokes
 */
export class BackendServiceMock implements Pick<BackendService, 'create' | 'currentPageSubject' > {

    pageSubject = new ReplaySubject<Page>();
    
    constructor() {
        this.pageSubject.next(PAGE_MOCK);
    }

    async create(joke: Joke): Promise<Joke>
    {
        return Promise.resolve({...joke, id: 1});
    }    
}