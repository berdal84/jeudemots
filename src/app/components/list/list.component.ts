import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Joke } from '../../models/joke.model';
import { JokeService } from '../../services/joke.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  jokes: Array<Joke> = new Array<Joke>();
  filterInput: string = '';
  private subscription: Subscription;

  constructor( private jokeService: JokeService ) { }

  ngOnInit() {
    this.subscription = this.jokeService.jokes.subscribe(
      (jokes) => {
        this.jokes = jokes;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
