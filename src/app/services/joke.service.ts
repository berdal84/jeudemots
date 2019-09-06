import { Injectable } from '@angular/core';
import { Joke } from '../models/joke.model';

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  private jokes = new Array<Joke>();

  constructor() {

    /* adding a single Joke for testing purposes */

    const myJoke1: Joke = {
      category: 'Catégorie test',
      joke:     'Jeu de mots test',
      author:   'Auteur test',
      date:     'Date test'
    }
    this.jokes.push( myJoke1 );

    const myJoke2: Joke = {
      category: 'Catégorie test 2',
      joke:     'Jeu de mots test 2',
      author:   'Auteur test 2',
      date:     'Date test'
    }

    this.jokes.push( myJoke2);
  }

  getLastestJoke(): Joke {
    return this.jokes[0];
  }

  getJokes(): Array<Joke> {
    return this.jokes;
  }
}
