import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Joke } from '../../models/joke.model';
import { JokeService } from '../../services/joke.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  pageId: number = 0;
  jokes: Array<Joke> = new Array<Joke>();
  filterInput: string = '';
  private subscription: Subscription;

  constructor(
    private jokeService: JokeService,
    private userService: UserService,
    ) { }

  ngOnInit() {
    this.subscription = this.jokeService
      .currentPageSubject.subscribe(
        (page) => {
          this.jokes = page.jokes;
          this.pageId = page.id;
        }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  canShowActions(): boolean {
    return this.userService.isLogged();
  }

  edit( joke: Joke) {
    // TODO
  }

  delete( joke: Joke ) {
    // TODO
  }

  toggleVisibility( joke: Joke ) {
    joke.visible = !joke.visible;
  }

  setPage(id: number) {
    this.jokeService.setPage(id);
  }
}
