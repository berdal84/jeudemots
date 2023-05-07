import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { interval, Subscription } from "rxjs";
import { Joke, Page } from "jeudemots-shared";
import { debounce, filter, map, tap } from "rxjs/operators";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NULL_PAGE } from "src/app/constants/null-page";
import { APIService } from "@components/backend/api/api.service";
import { AuthService } from "@components/backend/auth/auth.service";
import { PaginationComponent } from "@components/pagination/pagination.component";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
  imports: [
    CommonModule,
    FormsModule,
    PaginationComponent,
    ReactiveFormsModule,
  ]
})
export class ListComponent implements OnInit, OnDestroy {
  status = '';
  searching = false;
  page: Page = NULL_PAGE;
  readonly form = new FormGroup({
    filter: new FormControl<string>('', { nonNullable: true}),
  });
  readonly editedJokes = new Set<number>();
  private subscriptions = new Subscription();

  private api = inject(APIService);
  private auth = inject(AuthService);

  ngOnInit() {

    // Update page and status when a new page comes
    this.subscriptions.add(
      this.api.page$.subscribe( page => {
        this.page = page;
        this.status = `${page.count} résultat(s)`;
      })
    );

    // Search when user is typing
    this.subscriptions.add(
      this.form.valueChanges.pipe(
        // clear status
        tap( () => this.status = '' ),
        map( changes => changes.filter ?? ''),
        // ensure text is larger than 2 chars or is empty
        filter( newFilter => newFilter.length > 2 || newFilter.length === 0),
        debounce(() => interval(200)),
        tap( newFilter => {
          this.searching = true;
          this.status = 'Recherche en cours ...';
          this.api
            .readPage({id: 0, size: 10, filter: newFilter})
            .finally( () => {
              this.searching = false;
            });
        })
      )
      .subscribe()
    );
    return this.api.readPage({ id: 0, size: 10});
  }

  private refreshPage() {
    const { id, size } = this.page;
    return this.api.readPage({id, size, filter: this.form.value.filter});
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  canShowActions(): boolean {
    return this.auth.isLogged();
  }

  isEditing(joke: Joke): boolean {
    return this.editedJokes.has(joke.id);
  }

  edit(joke: Joke) {
    this.editedJokes.add(joke.id);
  }

  async cancel(joke: Joke) {
    const response = await this.refreshPage();
    if (response.ok) {
      this.editedJokes.delete(joke.id);
    } else {
      alert("Oups, cancel failed!");
    }
  }

  async save(joke: Joke) {
    const response = await this.api.update(joke);
    if (response.ok) {
      this.editedJokes.delete(joke.id);
    } else {
      alert("Oups, save failed!");
    }
  }

  async delete(joke: Joke) {
    const response = await this.api.delete(joke.id);
    if (response.ok) {
      await this.refreshPage();
    } else {
      alert("Nothing changed!");
    }
  }

  async toggleVisibility(joke: Joke) {
    joke.visible = !joke.visible;
    const response = await this.api.update(joke);
    if (response.ok) {
      await this.refreshPage();
    } else {
      alert("Oups, update failed!");
    }
  }

  handlePageChange(id: number) {
    return this.api.setPage(id);
  }

  pageCount(): number {
    return Math.ceil(this.page.count / this.page.size);
  }
}
