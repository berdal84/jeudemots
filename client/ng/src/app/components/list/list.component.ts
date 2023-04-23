import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Subscription } from "rxjs";
import { AuthService } from "@servicesauth.service";
import { Joke, Page } from "jeudemots-shared";
import { BackendService } from "@services/backend.service";
import { debounce, filter, map } from "rxjs/operators";
import { FormControl, FormGroup } from "@angular/forms";
import { NULL_PAGE } from "src/app/constants/null-page";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit, OnDestroy {
  page: Page = NULL_PAGE;
  readonly form = new FormGroup({
    filter: new FormControl<string>(''),
  });
  readonly editedJokes = new Set<number>();
  private subscriptions = new Subscription();

  constructor(private backend: BackendService, private user: AuthService) {}

  ngOnInit() {
    this.backend.setFilter("");

    this.subscriptions.add(
      this.backend.page$.subscribe( page => this.page = page)
    );

    this.subscriptions.add(
      this.form.valueChanges
        .pipe(
          map( changes  => changes.filter ?? ''),
          filter( filter => filter.length > 2),
          debounce(() => interval(200)),
        )
        .subscribe( filter => {
          this.backend.setFilter(filter);
          return this.backend.reloadPage();
        })
    );

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
