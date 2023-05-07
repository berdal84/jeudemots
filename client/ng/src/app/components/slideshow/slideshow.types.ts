import {Joke, Page} from "jeudemots-shared";

export type ViewModel = {
    playing: boolean;
    hasPrevious: boolean;
    hasNext: boolean;
    page: Page;
    joke: Joke;
};
