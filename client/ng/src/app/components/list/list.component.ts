import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Subscription } from "rxjs";
import { AuthService } from "@servicesauth.service";
import { Joke, Page } from "jeudemots-shared";
import { BackendService } from "@services/backend.service";
import { debounce, filter, map, tap } from "rxjs/operators";
import { FormControl, FormGroup } from "@angular/forms";
import { NULL_PAGE } from "src/app/constants/null-page";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
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

  constructor(private backend: BackendService, private user: AuthService) {}

  ngOnInit() {

    // Update page and status when a new page comes
    this.subscriptions.add(
      this.backend.page$.subscribe( page => {
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
          this.backend.setFilter(newFilter);
          this.backend
            .reloadPage()
            .finally( () => {
              this.searching = false;
            });
        })
      )
      .subscribe()
    );

    // Reload current page
    this.backend.setFilter("");
    return this.backend.reloadPage(10); // 10 items per page
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
    if (response.ok) {
      this.editedJokes.delete(joke.id);
    } else {
      alert("Oups, cancel failed!");
    }
  }

  async save(joke: Joke) {
    const response = await this.backend.update(joke);
    if (response.ok) {
      this.editedJokes.delete(joke.id);
    } else {
      alert("Oups, save failed!");
    }
  }

  async delete(joke: Joke) {
    const response = await this.backend.delete(joke.id);
    if (response.ok) {
      await this.backend.reloadPage();
    } else {
      alert("Nothing changed!");
    }
  }

  async toggleVisibility(joke: Joke) {
    joke.visible = !joke.visible;
    const response = await this.backend.update(joke);
    if (response.ok) {
      await this.backend.reloadPage();
    } else {
      alert("Oups, update failed!");
    }
  }

  handlePageChange(id: number) {
    return this.backend.setPage(id);
  }

  pageCount(): number {
    return Math.ceil(this.page.count / this.page.size);
  }
}
