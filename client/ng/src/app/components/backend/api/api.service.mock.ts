import { ReplaySubject } from 'rxjs';
import { Credentials, Joke, Page, Response } from 'jeudemots-shared';
import { PAGE_MOCK } from '../../../mocks/page.mock';
import { APIService } from '@components/backend/api/api.service';

/**
 * A JokeService mock that always return a valid set of jokes
 */
export class APIServiceMock implements Pick<APIService, 'readPage' | 'create' | 'page$'>  {

    page$ = new ReplaySubject<Page>();

    constructor() {
        this.page$.next(PAGE_MOCK);
    }
    setPage(id: number): Promise<Response<Page>> {
        throw new Error('Method not implemented.');
    }
    login(credentials: Credentials): Promise<Response> {
        throw new Error('Method not implemented.');
    }
    logout(): Promise<Response> {
        throw new Error('Method not implemented.');
    }
    install(): Promise<Response<string>> {
        throw new Error('Method not implemented.');
    }
    uninstall(): Promise<Response<string>> {
        throw new Error('Method not implemented.');
    }
    restore(formData: FormData): Promise<Response> {
        throw new Error('Method not implemented.');
    }
    backup(): Promise<Response<Joke[]>> {
        throw new Error('Method not implemented.');
    }
    readPage(params: { id: number; size: number; filter?: string | undefined; }): Promise<Response<Page>> {
        return Promise.resolve({
            data: PAGE_MOCK,
            ok: true,
            error: null
        });
    }
    update(joke: Joke): Promise<Response> {
        throw new Error('Method not implemented.');
    }
    delete(id: number): Promise<Response> {
        throw new Error('Method not implemented.');
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
