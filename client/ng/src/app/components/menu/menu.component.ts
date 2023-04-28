import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as AuthService } from '@servicesauth.service';
import {map} from 'rxjs/operators';
import {LINKS} from './menu.data';
import {combineLatest, Observable, of} from 'rxjs';
import {Link} from './menu.models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  /** A state of links depending on user state and current route */
  links$: Observable<Link[]> = combineLatest([
    // starts from a given link list
    of(LINKS),
    // depends on user status change
    this.auth.userStatus$.pipe(map(status => status.is_logged)),
    // depends on route change
    this.router.events.pipe(map( event => this.router.url )),
  ]).pipe( map(([links, is_logged, router_url]) => {
    return links
      // discard private links if not logged
      .filter( link => !link.private || is_logged)
      .map( link => {
        // disable current link
        link.disabled = router_url === link.url;
        // debug
        // console.debug(`${link.label} disable = ${link.disabled}`);
        return link;
    });
  }));

  constructor(private router: Router, private auth: AuthService) { }
}
