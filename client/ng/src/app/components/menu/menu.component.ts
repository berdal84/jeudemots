import { Component, computed, inject } from '@angular/core';
import { EventType, Router, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { LINKS } from './menu.data';
import { AuthService } from '@components/backend/auth/auth.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  private router = inject(Router);
  private auth = inject(AuthService);
  private routerUrl = toSignal(this.router.events.pipe(
    filter((event) => event.type === EventType.NavigationEnd ),
    map(() =>  this.router.url))
  );
  private isLogged = toSignal(this.auth.isConnected$);

  links = computed( () =>
     // discard private links if not logged
     LINKS
      .filter( link => !link.private || this.isLogged() )
      .map( link => {
        // disable current link
        link.disabled = this.routerUrl() === link.url;
        // debug
        // console.debug(`${link.label} disable = ${link.disabled}`);
        return link;
    })
  );
}
