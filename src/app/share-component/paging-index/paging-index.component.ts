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
  indexList: any[] = []

  private LIMIT_PAGE_INDEX: number = 4;

  @Output() indexUpdate = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.convertToIndexList();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Change it");
    this.convertToIndexList();
  }

  convertToIndexList() {
    if (!this.optionPaging) {
      this.indexList = [];
    }

    this.indexList = [];

    let countIndex = 0;
    let startIndex = 0;
    if (this.optionPaging.indexActive > 1) {
      startIndex = this.optionPaging.indexActive;
    }

    for (var i = startIndex; i < this.optionPaging.totalRecords / this.optionPaging.limit; i++) {
      // if (++countIndex > this.LIMIT_PAGE_INDEX) {
      //   return;
      // }
      this.indexList.push({ index: i, active: this.optionPaging.indexActive == i ? true : false });
    }
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
