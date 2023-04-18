import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {interval, Subscription} from 'rxjs';
import { UserService } from '@services/user.service';
import { Joke } from 'jeudemots-shared';
import { BackendService } from '@services/backend.service';
import {debounce, filter} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  pageCount:   number = 0;
  currentPage: number = 0;
  jokes: Array<Joke>  = new Array<Joke>();
  form = new FormGroup({
    filter: new FormControl('')
  });

  editedJokes = new Set<number>();
  private subscriptions: Subscription;

  constructor(
    private backend: BackendService,
    private user: UserService,
    private changeRef: ChangeDetectorRef
    )
  {
  }

  ngOnInit() {

    this.backend.setFilter('');

    this.subscriptions = this.backend
      .pageSubject.subscribe(
        (page) => {
          this.jokes = page.jokes;
          this.currentPage = page.id;
        }
    );

    this.subscriptions.add(
      this.backend.pagesSubject.subscribe( (pages) => {
        this.pageCount = pages.count;
        this.changeRef.detectChanges();
    }));

    this.subscriptions.add( this.form.valueChanges
      .pipe(
        filter( changes => changes.filter.length > 2 ),
        debounce(() => interval(200))
      )
      .subscribe( (changes ) => {
        this.backend.setFilter(changes.filter);
        return this.backend.reloadAll();
      })
    );

    return this.backend.reloadAll();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  canShowActions(): boolean {
    return this.user.isLogged();
  }

  isEditing(joke: Joke): boolean {
    return this.editedJokes.has(joke.id);
  }

  edit(joke: Joke) {
    this.editedJokes.add(joke.id);
  }

  async cancel(joke: Joke) {
    const response = await this.backend.reloadPage();
    if ( response.ok) {
      this.editedJokes.delete(joke.id);
    }
    else {
      alert('Oups, cancel failed!');
    }
  }

  async save(joke: Joke) {
    const response = await this.backend.update(joke);
    if ( response.ok ) {
      this.editedJokes.delete(joke.id);
    }
    else
    {
      alert('Oups, save failed!');
    }
  }

  async delete( joke: Joke ) {
    const response = await this.backend.delete(joke.id);
    if ( response.ok )
    {
      await this.backend.reloadPage();
    }
    else
    {
      alert('Nothing changed!');
    }
  }

  async toggleVisibility( joke: Joke ) {
    joke.visible = !joke.visible;
    const response = await this.backend.update(joke);
    if ( response.ok )
    {
      await this.backend.reloadPage();
    }
    else
    {
      alert('Oups, update failed!');
    }
  }

  setPage(id: number) {
    return this.backend.setPage(id);
  }
}
