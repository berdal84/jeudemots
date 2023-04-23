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
    // seems complicated just to have a list of numbers,
    // but paginator will evolve (ex:   1, 2, 3, ... , 5, 6, 7)
    this.range = new Array(this.count);
    this.range.fill({ id: 0, label: "" });
    this.range.forEach((value, index) => {
      value.id = index;
      value.label = `${index + 1}`;
    });
  }

  handlePageClick(id: number) {
    this.pageChange.emit(id);
  }
}
