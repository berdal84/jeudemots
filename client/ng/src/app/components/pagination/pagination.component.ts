import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";

interface PageItem {
  id: number;
  label: string;
}

@Component({
  selector: "app-pagination",
  styles: [
    `
      div.pagination {
        display: flex;
        justify-content: center;
      }

      .pagination ul {
        display: block;
      }

      .pagination li {
        display: inline;
        margin: 2px;
      }

      .pagination li:not(.current) > a {
        opacity: 0.75;
        text-decoration: underline;
        cursor: pointer;
      }
    `,
  ],
  template: `
    <div class="pagination">
      <ul>
        <li
          *ngFor="let page of range"
          [class]="{ current: page.id == pageIndex }"
        >
          <a (click)="handlePageClick(page.id)">{{ page.label }}</a>
        </li>
      </ul>
    </div>`,
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input()
  count: number = 0;

  @Input()
  pageIndex: number = 0;

  @Output()
  pageChange = new EventEmitter<number>();

  range: Array<PageItem> = [];

  ngOnInit(): void {
    this.refresh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refresh();
  }

  private refresh() {
    this.range = new Array<PageItem>(this.count);
    for(let index = 0; index < this.count; index++){
      this.range[index] = {
        id: index,
        label: `${index + 1}`
      };
    }
  }

  handlePageClick(id: number) {
    this.pageChange.emit(id);
  }
}
