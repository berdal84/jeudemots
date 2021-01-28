import { Joke } from "../models/joke.model";
import { JokeService } from "../services/joke.service";
import { JokesArrayMock } from "./joke-array.mock";

/**
 * A JokeService mock that always return a valid set of jokes
 */
export class JokeServiceMock implements Pick<JokeService, 'sendJokeByMail' | 'getJokes'> {

    sendJokeByMail(from: string, joke: Joke): void {}

    getJokes(): Promise<Joke[]> {
        return Promise.resolve(JokesArrayMock);
    }
}