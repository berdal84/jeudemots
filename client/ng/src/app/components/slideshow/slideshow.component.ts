import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Page, Joke } from 'jeudemots-shared';
import { BackendService } from '@services/backend.service';
import { filter, tap } from 'rxjs/operators';
import {environment} from "src/environments/environment";
import { FormControl, FormGroup } from '@angular/forms';

const config = environment.slideshow;

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, OnDestroy {

  currentJoke: Joke;
  isPlaying = false;
  private page: Page;
  private timer: number = 0;
  private initialEggTimer = 0;
  private eggTimer = 0;
  private subscription: Subscription = new Subscription();

  constructor(private backend: BackendService) {
    /* Set a default joke in case service hasn't loaded data before page is displayed */
    this.currentJoke = {
      id: -1,
      category: '...',
      text: '...',
      author: '...',
      date: '...'
    };

    this.page = {
      id: 0,
      jokes: [this.currentJoke],
      size: 1,
      count: 0
    };
  }

  ngOnInit() {
    this.subscription.add(
      this.backend.page$
        .pipe(
          tap(page => this.page = page),
          filter(page => page.jokes.length > 0),
          tap((page) => this.currentJoke = page.jokes[0]) // 1 joke per page, so we display the first
        ).subscribe());

    return this.backend.readPage({id: 0, size: 1});
  }

  getEggTimerStyle() {
    const progress = 1 - this.eggTimer / this.initialEggTimer;
    return {
      width: `${progress * 100}%`,
      opacity: Math.sin((progress - 0.15) * Math.PI ) // wave with a max opacity when progress is around 85%
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private async setPage(id: number) {
    await this.backend.setPage(id);
    this.resetTimer();
  }

  hasNext(): boolean {
    return this.page.id + 1 < this.page.count;
  }

  hasPrevious(): boolean {
    return this.page.id > 0;
  }

  private resetTimer(): void {
    const jokeLength = this.currentJoke.text.length + this.currentJoke.category.length;
    this.initialEggTimer = config.minimumTimePerJoke * ( 1 + jokeLength * config.perCharCostFactor);
    this.eggTimer = this.initialEggTimer;
  }

  handlePlayButtonClick(): void {

    this.resetTimer();
    this.isPlaying = true;

    // set an interval to update the egg timer
    const timerPrecisionInMs = 100;
    this.timer = window.setInterval( async () => {
      this.eggTimer -= timerPrecisionInMs / 1000;
      if ( this.eggTimer < 0 ) {
        this.eggTimer = 0;
        if (this.hasNext()) {
          return this.handleNextButtonClick();
        }
        // loop back
        return this.setPage(0);
      }
    }, timerPrecisionInMs );
  }

  handlePauseButtonClick(): void {
    clearInterval(this.timer);
    this.isPlaying = false;
  }

  async handlePreviousButtonClick() {
    if (this.hasPrevious()) {
      return this.setPage(this.page.id - 1);
    }
  }

  async handleNextButtonClick() {
    if (this.hasNext()) {
      return this.setPage(this.page.id + 1);
    }
  }

  handleRewindButtonClick(){
    this.setPage(0);
  }

  handleForwardButtonClick() {
    this.setPage(this.page.count - 1);
  }
}
