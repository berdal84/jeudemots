import { Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { APIService } from '@components/backend/api/api.service';
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { CommonModule } from "@angular/common";
import { NavBarComponent } from "./navbar.component";
import * as NavBar from "./navbar.types";
import { NULL_PAGE } from "@constants";
import { EggTimer } from "./egg-timer";
import { toSignal } from '@angular/core/rxjs-interop';

const config = environment.slideshow;

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
  ],
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})
export class SlideshowComponent implements OnInit, OnDestroy {

  private api      = inject(APIService);
  private eggTimer = new EggTimer();
  private page     = toSignal( this.api.page$, { initialValue: NULL_PAGE } );
  joke        = computed(() => this.page().jokes[0] );
  isPlaying   = toSignal(this.eggTimer.isPlaying$, {initialValue: false });
  hasPrevious = computed(() => this.page().id > 0);
  hasNext     = computed(() => this.page().id < this.page().count - 1);
  eggTimerStyle = toSignal( this.eggTimer.tick$.pipe(
    map(({progress}) => {
      return {
        width: `${progress * 100}%`,
        opacity: Math.sin((progress - 0.15) * Math.PI ) // wave with a max opacity when progress is around 85%
      };
    })
  ));
  private timeForCurrentJoke = computed( () => {
    const { text, category} = this.joke();
    const jokeLength = text.length + category.length;
    return config.minimumTimePerJoke * ( 1 + jokeLength * config.perCharCostFactor);
  });

  nextPageSubscribtion = this.eggTimer.timeout$.subscribe( async () => {
    const nextId = (this.page().id + 1) % this.page().count; // loop
    await this.api.setPage(nextId);
    this.eggTimer.start(this.timeForCurrentJoke());
  });

  ngOnInit() {
    return this.api.readPage({id: 0, size: 1});
  }

  ngOnDestroy(): void {
    this.nextPageSubscribtion.unsubscribe();
  }

  async handleNavBarClick(type: NavBar.ButtonType) {
    switch (type) {
      case "play":
        return this.eggTimer.start(this.timeForCurrentJoke());
      case "pause":
        return this.eggTimer.pause();
      case "previous":
        return this.api.setPage(this.page().id - 1);
      case "next":
        return this.api.setPage(this.page().id + 1);
      case "first":
        return this.api.setPage(0);
      case "last":
        return this.api.setPage(this.page().count - 1);
    }
  }
}
