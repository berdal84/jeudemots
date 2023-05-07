import { Component, EventEmitter, Input, Output, signal, computed, OnChanges, SimpleChanges } from "@angular/core";
import { PageBtn } from "./pagination.models";
import { NgFor } from "@angular/common";

@Component({
  standalone: true,
  imports: [
    NgFor,
  ],
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
        *ngFor="let item of items()"
        [disabled]="item.id == pageIndex"
        (click)="handlePageClick(item.id)" [title]="item.tooltip"
      >
        {{ item.label }}
      </button>
    </div>`,
})
export class PaginationComponent implements OnChanges  {
  @Input()
  count: number = 0;

  @Input()
  pageIndex: number = 0;

  @Output()
  pageChange = new EventEmitter<number>();

  items = signal([] as PageBtn[]);

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.count ) {
      const pages = new Array<PageBtn>(this.count);
      for (let index = 0; index < this.count; index++) {
        pages[index] = {
          id: index,
          label: `${index + 1}`,
          tooltip: `Se rendre sur la page ${index}`
        };
      }
      this.items.set(pages);
    }
  }

  handlePageClick(id: number) {
    this.pageChange.emit(id);
  }
}
