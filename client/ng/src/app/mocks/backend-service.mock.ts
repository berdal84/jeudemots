import { ReplaySubject } from 'rxjs';
import { Joke, Page, Response } from 'jeudemots-shared';
import { BackendService } from '@services/backend.service';
import { PAGE_MOCK } from './page.mock';

/**
 * A JokeService mock that always return a valid set of jokes
 */
export class BackendServiceMock implements Pick<BackendService, 'create' | 'page$' > {

    page$ = new ReplaySubject<Page>();

    constructor() {
        this.page$.next(PAGE_MOCK);
    }

    async create(joke: Joke): Promise<Response<Joke>>
    {
        return Promise.resolve({
            ok: true,
            data: {
                ...joke,
                id: 1
            },
            error: null
        });
    }
};
