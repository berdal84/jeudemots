import { Component, OnInit, computed, effect, inject, signal } from "@angular/core";
import { interval } from "rxjs";
import { Joke } from "jeudemots-shared";
import { debounce, filter, map, tap } from "rxjs/operators";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NULL_PAGE } from "src/app/constants/null-page";
import { APIService } from "@components/backend/api/api.service";
import { AuthService } from "@components/backend/auth/auth.service";
import { PaginationComponent } from "@components/pagination/pagination.component";
import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";

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
export class ListComponent implements OnInit {
  private auth = inject(AuthService);
  private api = inject(APIService);

  status = signal('');
  searching = signal(false);
  page = toSignal( this.api.page$, {initialValue: NULL_PAGE} );
  pageCount = computed(() => {
    const {count, size} = this.page();
    return Math.ceil(count / size)
  });
  isLogged = toSignal(this.auth.userStatus$.pipe( map(status => status.is_logged )));

  readonly form = new FormGroup({
    filter: new FormControl<string>('', { nonNullable: true}),
  });
  readonly editedJokes = new Set<number>();

  constructor() {
    effect((onCleanUp) => {
      
      // Search when user is typing
      const searchSubscribtion = this.form.valueChanges.pipe(
        // clear status
        tap(() => this.status.set('')),
        map(changes => changes.filter ?? ''),
        // ensure text is larger than 2 chars or is empty
        filter(newFilter => newFilter.length > 2 || newFilter.length === 0),
        debounce(() => interval(200)),
        tap(newFilter => {
          this.searching.set(true);
          this.status.set('Recherche en cours ...');
          this.api
            .readPage({ id: 0, size: 10, filter: newFilter })
            .finally(() => {
              this.searching.set(false);
            });
        })
      ).subscribe();

      onCleanUp(searchSubscribtion.unsubscribe);
    });
  }

  ngOnInit() {
    return this.api.readPage({ id: 0, size: 10});
  }

  private refreshPage() {
    const { id, size } = this.page();
    return this.api.readPage({id, size, filter: this.form.value.filter});
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
}
