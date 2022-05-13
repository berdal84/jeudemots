import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/frontend/app/services/user.service';
import { Joke } from '../../models/joke.model';
import { BackendService, Status } from '../../services/backend.service';

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

  edit( joke: Joke) {
    // TODO
  }

  async delete( joke: Joke ) {
    const response = await this.backend.delete(joke.id);
    if( response.status === Status.SUCCESS )
    {
      await this.backend.reloadPage();
    }
    else
    {
      alert('Oups, delete failed!');
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
