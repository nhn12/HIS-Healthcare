import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
export class PagingDto {
  public totalRecords: number;
  public indexActive: number;
  public limit: number
}

@Component({
  selector: 'app-paging-index',
  templateUrl: './paging-index.component.html',
  styleUrls: ['./paging-index.component.scss']
})
export class PagingIndexComponent implements OnInit {
  @Input() optionPaging: PagingDto;
  indexList: any[] = [];
  indexLimit: any[] = [];

  totalItems: number = 0;
  currentPage: number = 1;
  previousPage: number = 1;

  private LIMIT_PAGE_INDEX: number = 4;

  @Output() indexUpdate = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.convertToIndexList();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.convertToIndexList();
  }

  convertToIndexList() {
    if (!this.optionPaging) {
      this.indexList = [];
    }
    this.totalItems = this.optionPaging.totalRecords;
    this.currentPage = this.optionPaging.indexActive + 1;
  }

  changeItem() {
    // if(this.currentPage == this.previousPage) {
    //   return;
    // }

    this.previousPage = this.currentPage;
    this.indexUpdate.emit({ index: this.currentPage - 1 });
  }

  changeIndex(index) {
    this.indexList.forEach(element => {
      if (element.index == index) {
        if (element.active == true) {
          // 
        } else {
          element.active = true;
          this.indexUpdate.emit({ index: index });
        }
      } else {
        element.active = false;
      }
    })
  }

  detectLimitView() {
    if(this.indexList.length < this.LIMIT_PAGE_INDEX) {
      return;
    }
  }

  next() {
    let flag = false;
    this.indexList.forEach(element => {
      if (flag == true) {
        return;
      }
      if (element.active == true && element.index != (this.indexList.length - 1)) {
        this.changeIndex(element.index + 1);
        flag = true;
      }
    })
  }

  prev() {
    let flag = false;
    this.indexList.forEach(element => {
      if (flag == true) {
        return;
      }
      if (element.active == true && element.index != 0) {
        this.changeIndex(element.index - 1);
        flag = true;
      }

    })
  }

}
