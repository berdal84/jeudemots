import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';
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

  private isLogged = toSignal(this.auth.userStatus$.pipe(map(status => status.is_logged)));

  links = computed( () =>
     // discard private links if not logged
     LINKS
      .filter( link => !link.private || this.isLogged() )
      .map( link => {
        // disable current link
        link.disabled = this.router.url === link.url;
        // debug
        // console.debug(`${link.label} disable = ${link.disabled}`);
        return link;
    })
  );
}
