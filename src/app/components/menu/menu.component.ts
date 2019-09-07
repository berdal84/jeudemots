import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface PageModel {
  pageId: string; // now displayed
  label: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  /* Return a class name for url depending on current route.url */
  getClassForItem(url: string): string {

    return this.router.url === url ? 'itemEnable' : 'itemDisable';
    
  }
}
