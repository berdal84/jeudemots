import { Joke } from './joke';

/**
 * Interface to store a joke mail submission
 */
export interface MailSubmission {
    /** The email address of the author */
    from: string;
    /** The new joke to insert */
    joke: Joke;
}