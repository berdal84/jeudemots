import { ReplaySubject } from "rxjs";
import { Joke } from "../models/joke.model";
import { MailSubmission } from "../models/mail-submission.model";
import { JokeService } from "../services/joke.service";
import { JOKE_ARRAY_MOCK } from "./joke-array.mock";

/**
 * A JokeService mock that always return a valid set of jokes
 */
export class JokeServiceMock implements Pick<JokeService, 'sendJokeByMail' | 'jokes' > {

    jokes = new ReplaySubject<Joke[]>();
    
    constructor() {
        this.jokes.next(JOKE_ARRAY_MOCK);
    }

    sendJokeByMail(submission: MailSubmission): void {}    
}