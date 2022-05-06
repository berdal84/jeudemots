import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Data {
  id: number;
  label: string;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input()
  count: number = 0;

  @Input()
  current: number = 0;
  
  @Output()
  pageChange = new EventEmitter<number>();

  range: Array<Data>;

  constructor() { }

  ngOnInit(): void {
    this.range = new Array(this.count);
    this.range.fill(null);
    this.range.forEach( (value, index, array) => {
      array[index] = {
        id: index,
        label: String(index+1)
      };
    })
  }

  pageClicked( id: number) {
    this.pageChange.emit(id);
  }

}
