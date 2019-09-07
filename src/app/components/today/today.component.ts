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

  constructor(private jokeService: JokeService)
  {
    /* Set a default joke in case service hasn't loaded data before page is displayed */
    this.currentJoke = {
      category: '...loading...',
      joke:     '...loading...',
      author:   '...',
      date:     '...'
    }
  }

  ngOnInit() {

    this.jokeService.getJokes().subscribe(
        (jokes) => { this.currentJoke = jokes[0] }
      );

  }

}
