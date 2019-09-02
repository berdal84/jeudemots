import { Component, OnInit } from '@angular/core';

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

  private pages: Array<PageModel> =
	[
    {
      pageId:"presentation",
      label:"PRESENTATION"
    },
		{
      pageId:"today",
      label:"AUJOURD'HUI"
    },
		{
      pageId:"list",
      label:"RECHERCHER"
    },
		{
      pageId:"advises",
      label:"CONSEILS"
    },
		{
      pageId:"more",
      label:"?"
    }					
  ];
  
  private currentPageId: string = 'today';

  constructor() { }

  ngOnInit() {

  }

  setCurrentPageId(pageId: string): void {		
		this.currentPageId = pageId;
		// Todo: update router
	};

	getItemClassNameWithId(itemPageId): string {		
		if ( this.currentPageId == itemPageId)
			return "itemEnable";
		return "itemDisable";
	};    
}
