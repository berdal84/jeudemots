import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface PageModel {
  pageId: string; // now displayed
  label: string;
}

interface Link {
  label: string;
  route: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  readonly links: Array<Link>;

  constructor(private router: Router) {
    this.links = [
      {
        label: `AUJOURD'HUI`,
        route: '/today'
      },
      {
        label: `LISTE`,
        route: '/list'
      },
      {
        label: 'CONSEILS',
        route: '/advises'
      },
      {
        label: 'CONTRIBUER',
        route: '/contribute'
      },
      {
        label: '?',
        route: '/more'
      }
    ];
  }

  ngOnInit() {}

  /* Return a class name for url depending on current route.url */
  getClassFor(route: string): string {

    return this.router.url === route ? 'itemEnable' : 'itemDisable';
    
  }
}
