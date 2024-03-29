import { Joke } from './joke';

export interface Page {
    id: number;
    /** item count max on this page */
    size: number;
    /** total item count */
    count: number;
    /** the actual page content */
    jokes: Array<Joke>;
}