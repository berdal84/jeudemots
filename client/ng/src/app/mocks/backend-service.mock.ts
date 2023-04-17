import { ReplaySubject } from 'rxjs';
import { Joke, Page } from 'jeudemots-shared';
import { BackendService, Response, Status } from '@services/backend.service';
import { PAGE_MOCK } from './page.mock';

/**
 * A JokeService mock that always return a valid set of jokes
 */
export class BackendServiceMock implements Pick<BackendService, 'create' | 'pageSubject' > {

    pageSubject = new ReplaySubject<Page>();

    constructor() {
        this.pageSubject.next(PAGE_MOCK);
    }

    async create(joke: Joke): Promise<Response<Joke>>
    {
        return Promise.resolve({
            status: Status.SUCCESS,
            data: {
                ...joke,
                id: 1
            }
        });
    }
};
