import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CommonModule, NgClass, NgIf} from '@angular/common';
import {ButtonType} from './navbar.types';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [
    NgClass,
    CommonModule,
    NgIf,
  ],
  template: `
    <div>
      <img
        src="src/assets/rewind.svg"
        [ngClass]="{
           'disable': !enablePrevious
        }"
        (click)="clickEvent.emit('first')"
        [title]="enablePrevious ? 'Se rendre au début' : 'Vous y êtes déjà'"
        alt="go to first"
      />
      <img
        src="src/assets/arrow-left.svg"
        [ngClass]="{
            'disable': !enablePrevious
        }"
        (click)="clickEvent.emit('previous')"
        [title]="enablePrevious ? 'précédent' : 'Vous y êtes déjà'"
        alt="previous"
      />
      <img
        *ngIf="!playing"
        src="src/assets/play.svg"
        (click)="clickEvent.emit('play')"
        title="Démarrer le diaporama"
        alt="play"
      />
      <img
        *ngIf="playing"
        src="src/assets/pause.svg"
        (click)="clickEvent.emit('pause')"
        title="Mettre le diaporama en pause"
        alt="pause"
      />
      <img
        src="src/assets/arrow-left.svg"
        class="mirror-x"
        [ngClass]="{
           'disable': !enableNext
        }"
        (click)="clickEvent.emit('next')"
        [title]="enableNext ? 'suivant' : 'Vous y êtes déjà'"
        alt="next"
      />

      <img
        src="src/assets/rewind.svg"
        class="mirror-x"
        [ngClass]="{
          'disable': !enableNext
        }"
        (click)="clickEvent.emit('last')"
        [title]="enableNext ? 'Se rendre à la fin' : 'Vous y êtes déjà'"
        alt="go to last"
      />
    </div>
  `
})
export class NavBarComponent {
  @Output('onClicked') clickEvent = new EventEmitter<ButtonType>();
  @Input() playing: boolean = false;
  @Input() enablePrevious: boolean = false;
  @Input() enableNext: boolean = false;
}
