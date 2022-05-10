import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Joke } from '../../models/joke.model';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  pageCount:   number = 0;
  currentPage: number = 0;
  jokes: Array<Joke>  = new Array<Joke>();
  filterInput: string = '';

  private subscriptions: Subscription;

  constructor(
    private jokeService: BackendService,
    private userService: UserService,
    private changeRef: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.subscriptions = this.jokeService
      .currentPageSubject.subscribe(
        (page) => {
          this.jokes = page.jokes;
          this.currentPage = page.id;
        }
    );

    this.subscriptions.add(
      this.jokeService.pagesSubject.subscribe( (pages) => {
        this.pageCount = pages.count;
        this.changeRef.detectChanges();
    }));

    this.jokeService.refresh();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  canShowActions(): boolean {
    return this.userService.isLogged();
  }

  edit( joke: Joke) {
    // TODO
  }

  delete( joke: Joke ) {
    this.jokeService.delete(joke.id);
  }

  toggleVisibility( joke: Joke ) {
    joke.visible = !joke.visible;
    this.jokeService.update(joke);
  }

  setPage(id: number) {
    this.jokeService.setPage(id);
  }
}
