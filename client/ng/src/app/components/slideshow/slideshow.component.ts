import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  startWith,
} from 'rxjs';
import { Page, Joke } from 'jeudemots-shared';
import { BackendService } from '@services/backend.service';
import {filter, map, tap} from 'rxjs/operators';
import {environment} from "src/environments/environment";
import {CommonModule, NgIf} from "@angular/common";
import {NavBarComponent} from "./navbar.component";
import * as NavBar from "./navbar.types";
import {NULL_PAGE, NULL_JOKE} from "@constants";
import {EggTimer} from "./egg-timer";
import {ViewModel} from "./slideshow.types";

const config = environment.slideshow;

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    NgIf,
  ],
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, OnDestroy {

  private eggTimer = new EggTimer();
  private currentJoke: Joke = NULL_PAGE.jokes[0];
  private page: Page = NULL_PAGE;

  private browseNextJoke = this.eggTimer.complete$.subscribe( async () => {
    const nextId = (this.page.id + 1) % this.page.count; // loop
    await this.backend.setPage(nextId);
    this.eggTimer.start(this.computeTimeForCurrentJoke());
  });

  viewModel: Observable<ViewModel> = combineLatest([
    this.eggTimer.isPlaying$,
    this.backend.page$.pipe(filter( page => page !== null)),
  ]).pipe(
    map( ([playing, page]) => ({
      hasNext: page.id < page.count - 1,
      hasPrevious: page.id > 0,
      playing,
      page,
      joke: page.jokes[0],
    })),
    startWith<ViewModel>({
      hasPrevious: false,
      hasNext: false,
      playing: false,
      page: NULL_PAGE,
      joke: NULL_JOKE,
    }),
    tap( newState => {
      this.currentJoke = newState.joke;
      this.page = newState.page;
    })
  );

  constructor(private backend: BackendService) {}

  ngOnInit() {
    return this.backend.readPage({id: 0, size: 1});
  }

  ngOnDestroy() {
    this.browseNextJoke.unsubscribe();
  }

  getEggTimerStyle() {
    const progress = this.eggTimer.progress;
    return {
      width: `${progress * 100}%`,
      opacity: Math.sin((progress - 0.15) * Math.PI ) // wave with a max opacity when progress is around 85%
    };
  }

  private computeTimeForCurrentJoke(): number {
    const jokeLength = this.currentJoke.text.length + this.currentJoke.category.length;
    return config.minimumTimePerJoke * ( 1 + jokeLength * config.perCharCostFactor);
  }

  async handleNavBarClick(type: NavBar.ButtonType) {
    switch (type) {
      case "play":
        return this.eggTimer.start(this.computeTimeForCurrentJoke());
      case "pause":
        return this.eggTimer.pause();
      case "previous":
        return this.backend.setPage(this.page.id - 1);
      case "next":
        return this.backend.setPage(this.page.id + 1);
      case "first":
        return this.backend.setPage(0);
      case "last":
        return this.backend.setPage(this.page.count - 1);
    }
  }
}
