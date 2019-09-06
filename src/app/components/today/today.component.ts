import { Component, OnInit } from '@angular/core';
import { Joke } from '../models/joke.model';
import { JokeService } from '../services/joke.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

  private currentJoke: Joke;

  constructor(private jokeService: JokeService) { }

  ngOnInit() {
    this.currentJoke = this.jokeService.getLastestJoke();
  }

}
