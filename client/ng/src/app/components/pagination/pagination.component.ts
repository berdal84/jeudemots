import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,} from "@angular/core";
import {PageBtn} from "./pagination.models";

@Component({
  selector: "app-pagination",
  styles: [
    `
      :host {
        margin: 5px;
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
      }

      button {
        display: inline;
        margin: 2px;
        padding: 6px 8px;
      }

      button:not(:disabled) {
        opacity: 0.75;
        text-decoration: underline;
        cursor: pointer;
      }
    `,
  ],
  template: `
    <div>
      <button
        *ngFor="let page of pages"
        [disabled]="page.id == pageIndex"
        (click)="handlePageClick(page.id)" [title]="page.tooltip"
      >
        {{ page.label }}
      </button>
    </div>`,
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input()
  count: number = 0;

  @Input()
  pageIndex: number = 0;

  @Output()
  pageChange = new EventEmitter<number>();

  pages: Array<PageBtn> = [];

  ngOnInit(): void {
    this.refreshPages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshPages();
  }

  private refreshPages() {
    this.pages = new Array<PageBtn>(this.count);
    for (let index = 0; index < this.count; index++) {
      this.pages[index] = {
        id: index,
        label: `${index + 1}`,
        tooltip: `Se rendre sur la page ${index}`
      };
    }
  }

  handlePageClick(id: number) {
    this.pageChange.emit(id);
  }
}
