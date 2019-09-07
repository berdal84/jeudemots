import { Component, OnInit } from '@angular/core';
import { Joke } from '../../models/joke.model';
import { JokeService } from '../../services/joke.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  jokes: Array<Joke> = new Array<Joke>();

  constructor( private jokeService: JokeService ) { }

  ngOnInit() {

    this.jokeService.getJokes().subscribe(
      (jokes) => { this.jokes = jokes }
    )

  }

}
