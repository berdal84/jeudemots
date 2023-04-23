import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as AuthService } from '@servicesauth.service';

interface Link {
  label: string;
  url: string;
  private?: true;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  readonly links: Array<Link> = [
    {
      label: `AUJOURD'HUI`,
      url: '/today'
    },
    {
      label: `LISTE`,
      url: '/list'
    },
    {
      label: 'CONSEILS',
      url: '/advises'
    },
    {
      label: 'CONTRIBUER',
      url: '/contribute'
    },
    {
      label: 'ADMIN',
      url: '/admin',
      private: true
    },
    {
      label: '?',
      url: '/more'
    }
  ];
  showPrivateLinks = false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    // hide/show private links if user is unloggeg/logged
    this.auth.userStatus$.subscribe( user => this.showPrivateLinks = user.is_logged);
  }

  /* Return a class name for url depending on current route.url */
  getClassFor(link: Link): string {

    return this.router.url === link.url ? 'itemEnable' : 'itemDisable';

  }
}
