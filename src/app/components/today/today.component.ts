import { Component, OnInit } from '@angular/core';
import { Joke } from '../../models/joke.model';
import { JokeService } from '../../services/joke.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

  currentJoke: Joke;
  private currentJokeId = 0;
  private jokes: Joke[] = [];

  constructor(private jokeService: JokeService) {
    /* Set a default joke in case service hasn't loaded data before page is displayed */
    this.currentJoke = {
      category: '...',
      joke:     '...',
      author:   '...',
      date:     '...'
    };
  }

  ngOnInit() {

    this.jokeService.getJokes().then(
        (jokes) => {
          this.jokes = jokes;
          this.setCurrentJokeWithId(0);
        }
      );

  }

  private setCurrentJokeWithId(id: number): void {
    this.currentJokeId  = id;
    this.currentJoke    = this.jokes[this.currentJokeId];
  }

  hasNext(): boolean {
    return this.currentJokeId < this.jokes.length - 1;
  }

  hasPrevious(): boolean {
    return this.currentJokeId > 1;
  }

  onPreviousButtonClicked(): void {
    if ( this.hasPrevious() ) {
      this.setCurrentJokeWithId(this.currentJokeId - 1 );
    }
  }

  onNextButtonClicked(): void {
    if ( this.hasNext() ) {
      this.setCurrentJokeWithId(this.currentJokeId + 1 );
    }
  }

}
