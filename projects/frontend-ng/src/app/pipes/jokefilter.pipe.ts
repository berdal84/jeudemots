import { Pipe, PipeTransform } from '@angular/core';
import { Joke } from '../models/joke.model';

@Pipe({
  name: 'jokeFilter'
})
export class JokeFilterPipe implements PipeTransform {

  transform(jokes: Joke[], filter: string): Joke[] {

    if (jokes && filter !== '') {

      /* isolate each words */
      const filterWords: string[] = filter.toLowerCase().split( ' ' );

      return jokes.filter( eachJoke => {

        let matches = true;

        /* check if each filter words are all matching with each joke */
        for (const word of filterWords) {
          matches = matches &&
                    (
                      eachJoke.category.toLowerCase().indexOf( word ) !== -1 ||
                      eachJoke.text.toLowerCase().indexOf( word ) !== -1 ||
                      eachJoke.author.toLowerCase().indexOf( word ) !== -1 ||
                      eachJoke.date.toLowerCase().indexOf( word ) !== -1
                    );
        }

        return matches;

      });
    }

    return jokes;

  }

}
