import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Joke } from 'jeudemots-shared';
import { BackendService } from '@services/backend.service';
import { Status } from 'jeudemots-shared';

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
  editedJokes = new Set<number>();
  private subscriptions: Subscription;

  constructor(
    private backend: BackendService,
    private user: UserService,
    private changeRef: ChangeDetectorRef
    )
  {
  }

  onFilterChange(evt)
  {
    this.backend.setFilter(evt.target.value);
    this.backend.reloadAll();
  }

  ngOnInit() {
    this.filterInput = this.backend.getFilter();
    
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

    this.backend.reloadAll();
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
    const result = await this.backend.reloadPage();
    if( result.status === Status.SUCCESS) {
      this.editedJokes.delete(joke.id);
    }
    else {
      alert('Oups, cancel failed!');
    }
  }

  async save(joke: Joke) {
    const result = await this.backend.update(joke);
    if( result.status === Status.SUCCESS) {
      this.editedJokes.delete(joke.id);
    }
    else
    {
      alert('Oups, save failed!');
    }
  }

  async delete( joke: Joke ) {
    const response = await this.backend.delete(joke.id);
    if( response.status === Status.SUCCESS )
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
    if( response.status === Status.SUCCESS )
    {
      await this.backend.reloadPage();
    }
    else
    {
      alert('Oups, update failed!');
    }
  }

  setPage(id: number) {
    this.backend.setPage(id);
  }
}
