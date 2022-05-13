import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Page, Pages } from 'src/frontend/app/models/page.model';
import { Joke } from '../../models/joke.model';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit, OnDestroy {

  private static TimePerJokeIncrementInSeconds  = 1;
  private static TimePerJokeTextCharInSeconds   = 0.15;

  currentJoke: Joke;
  isDiaporamaPlaying = false;

  private timePerJokeInSeconds = 5;
  private pages: Pages;
  private page: Page;
  private diaporamaTimer: number;
  private timeElapsedOnCurrentJokeInSeconds = 0;
  private subscription: Subscription;

  constructor(private backend: BackendService) {
    /* Set a default joke in case service hasn't loaded data before page is displayed */
    this.currentJoke = {
      category: '...',
      text: '...',
      author: '...',
      date: '...'
    };

    this.pages = {
        size: 1,
        count: 0,
    };
    
    this.page = {
      id: 0,
      jokes: [this.currentJoke],
      size: 1
    }
  }

  async ngOnInit() {

    this.backend.resetFilter();
    
    this.subscription = await this.backend.pageSubject.subscribe(
      (page) => {
        this.page = page;
        if( page.jokes.length )
        {
          this.currentJoke = page.jokes[0]; // 1 joke per page, so we display the first
        }
      }
    );

    this.subscription.add( await this.backend.pagesSubject.subscribe(
      (page) => {
        this.pages = page;
      }
    ));

    const response = await this.backend.reloadAll(1); // 1 joke at once
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private async setPage(id: number) {
    await this.backend.setPage(id);
    this.resetDiaporamaTime();
  }

  hasNext(): boolean {
    return this.page.id + 1 < this.pages.count;
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
    this.timePerJokeInSeconds = jokeLength * TodayComponent.TimePerJokeTextCharInSeconds;
    this.timeElapsedOnCurrentJokeInSeconds = 0;
  }

  onPlayButtonClicked(): void {

    this.resetDiaporamaTime();

    // set an interval every seconds
    this.diaporamaTimer = window.setInterval( () => {

      // we increment elapsed time at each interval
      this.timeElapsedOnCurrentJokeInSeconds += TodayComponent.TimePerJokeIncrementInSeconds;

      const isTimeElapsed = this.timeElapsedOnCurrentJokeInSeconds >= this.timePerJokeInSeconds;
      if ( isTimeElapsed ) {

        this.onNextButtonClicked();

        // We pause the diaporama if there is no next
        if (!this.hasNext()) {
          this.onPauseButtonClicked();
        }

      }

    },
    TodayComponent.TimePerJokeIncrementInSeconds * 1000 // 1 sec. DO NOT touch !
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
