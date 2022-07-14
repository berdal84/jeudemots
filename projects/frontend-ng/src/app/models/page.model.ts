import { Joke } from './joke.model';

interface Page {
    id: number;
    size: number;
    jokes: Array<Joke>;
}

interface Pages {
    size: number;
    count: number;
}

export { Page, Pages}