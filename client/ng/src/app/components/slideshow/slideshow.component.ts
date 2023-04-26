import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Page, Joke } from 'jeudemots-shared';
import { BackendService } from '@services/backend.service';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, OnDestroy {

  private static TimePerJokeIncrementInSeconds  = 1;
  private static TimePerJokeTextCharInSeconds   = 0.15;

  currentJoke: Joke;
  isDiaporamaPlaying = false;

  private timePerJokeInSeconds = 5;
  private page: Page;
  private diaporamaTimer: number = 0;
  private timeElapsedOnCurrentJokeInSeconds = 0;
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
    }
  }

  ngOnInit() {

    this.backend.resetFilter();

    this.subscription.add(
      this.backend.page$
        .pipe(
          tap(page => this.page = page),
          filter(page => page.jokes.length > 0),
          tap((page) => this.currentJoke = page.jokes[0]) // 1 joke per page, so we display the first
        ).subscribe());

    this.backend.reloadPage(1); // 1 joke at once
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private async setPage(id: number) {
    await this.backend.setPage(id);
    this.resetDiaporamaTime();
  }

  hasNext(): boolean {
    return this.page.id + 1 < this.page.count;
  }

  hasPrevious(): boolean {
    return this.page.id > 0;
  }

  getDiaporamaTimerText(): string {
    const timeLeftInSeconds = this.timePerJokeInSeconds - this.timeElapsedOnCurrentJokeInSeconds;
    return `Prochain jeu de mots dans ${timeLeftInSeconds.toFixed(0)} sec.`;
  }

  private resetDiaporamaTime(): void {
    const jokeLength = this.currentJoke.text.length + this.currentJoke.category.length;
    this.timePerJokeInSeconds = jokeLength * SlideshowComponent.TimePerJokeTextCharInSeconds;
    this.timeElapsedOnCurrentJokeInSeconds = 0;
  }

  onPlayButtonClicked(): void {

    this.resetDiaporamaTime();

    // set an interval every seconds
    this.diaporamaTimer = window.setInterval( () => {

      // we increment elapsed time at each interval
      this.timeElapsedOnCurrentJokeInSeconds += SlideshowComponent.TimePerJokeIncrementInSeconds;

      const isTimeElapsed = this.timeElapsedOnCurrentJokeInSeconds >= this.timePerJokeInSeconds;
      if ( isTimeElapsed ) {

        this.onNextButtonClicked();

        // We pause the slideshow if there is no next
        if (!this.hasNext()) {
          this.onPauseButtonClicked();
        }

      }

    },
    SlideshowComponent.TimePerJokeIncrementInSeconds * 1000 // 1 sec. DO NOT touch !
    );

    this.isDiaporamaPlaying = true;
  }

  onPauseButtonClicked(): void {
    clearInterval(this.diaporamaTimer);
    this.isDiaporamaPlaying = false;
  }

  onPreviousButtonClicked(): void {
    if (this.hasPrevious()) {
      this.setPage(this.page.id - 1);
    }
  }

  onNextButtonClicked(): void {
    if (this.hasNext()) {
      this.setPage(this.page.id + 1);
    }
  }

}
