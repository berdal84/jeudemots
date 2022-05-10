import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

interface PageModel {
  pageId: string; // now displayed
  label: string;
}

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

  static all_links: Array<Link> = [
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

  links: Array<Link> = [];

  constructor(private router: Router, private user: UserService) {

  }

  ngOnInit() {
    this.user.currentUserSubject.subscribe( (u) => {
      // update links
      this.links = MenuComponent.all_links.filter( link => !link.private || u.is_logged);

    });
  }

  /* Return a class name for url depending on current route.url */
  getClassFor(link: Link): string {

    return this.router.url === link.url ? 'itemEnable' : 'itemDisable';

  }
}
