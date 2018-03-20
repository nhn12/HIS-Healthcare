import { ReceptionListService } from 'app/modules/reception/service/reception-list.service';
import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonSort, CommonOrder, ORDER_TYPE, Order } from 'app/core/condition/sort';
import { PagingDto } from 'app/share-component/paging-index';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from 'app/utils/app-constants';
import { CategoryService } from 'app/modules/category/services/category.service';
import { CommonFilter } from 'app/core/condition/filter';
import { CommonPaging } from 'app/core/condition/paging';
import { TableMappingDto } from 'app/modules/category/services/data/table-mapping-dto';
import to from 'app/utils/promise-utils';
import { Router } from '@angular/router';

export class Option {
  public urlCreate: string;
  public urlEdit: string;
  public isEdit: boolean;
  public isDelete: boolean;
  public isAdd: boolean = true;
  public callbackData: any;
}

@Component({
  templateUrl: 'common-list.component.html',
  selector: "common-list",
  styleUrls: ['common-list.component.scss'],
  providers: [CategoryService]
})
export class CommonListComponent implements OnInit {
  @Input("resource") resource: string;
  @Input("type") type: string;
  @Input("mapTable") mapTable: TableMappingDto[] = [];
  @Input("option") option: Option;
  @Input("selected") selectedValue: any;
  //@Input("option") option: 

  @Output() removeItem = new EventEmitter();
  @Output() selectItem = new EventEmitter();

  filter: CommonFilter;
  paging: CommonPaging;
  sort: CommonSort; // true asc, false desc

  pagingOption: PagingDto = { totalRecords: 10, indexActive: 1, limit: AppConstants.DEFAULT_NUMBER_RECORD_PER_PAGE };

  receptionList;

  receptionListMaster: any[] = [];

  maxDate: Date = (new Date());
  bsValue: Date = (new Date());

  dateFormat: string = AppConstants.DEFAULT_DATE_FORMAT;

  errFlag: boolean = false;
  isLoading: boolean = false;

  messageEmpty: string = AppConstants.EMPTY_MESSAGE;

  sortSelect: any = {};
  constructor(private receptionService: CategoryService, private route: Router) {

  }

  ngOnInit() {

  }

  add($event) {
    if(!this.option && !this.option.urlCreate) {
      return;
    }

    this.route.navigate([this.option.urlCreate], {replaceUrl: true });
  }

  changeSort(item) {
    if(this.sortSelect[item] != undefined && this.sortSelect[item] != null) {
      this.sortSelect[item] = !this.sortSelect[item];
    } else {
      this.sortSelect = {};
      this.sortSelect[item] = true;
    }
    
    this.sort = new CommonSort([new CommonOrder(item, (this.sortSelect[item]==true?ORDER_TYPE.ASC:ORDER_TYPE.DESC))]);
    this.getReceptions(this.filter, this.sort, this.paging, false);
  }

  changeIndex(index) {
    this.paging.setPage(index.index);
    this.pagingOption.indexActive = index.index;
    this.getReceptions(this.filter, this.sort, this.paging, false);
  }

  clickItem(item) {
    this.selectItem.emit(item);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];

      if(propName == 'resource') {
        this.receptionService.setResource(this.resource);
        this.paging = new CommonPaging(0, AppConstants.DEFAULT_NUMBER_RECORD_PER_PAGE);
        this.sort = new CommonSort([new CommonOrder("id", ORDER_TYPE.ASC)]);
        this.getReceptions(this.filter, this.sort, this.paging, true);
      }

      if(propName == 'selected') {

      }
    }
  }

  selectColumn(item) {
    this.receptionList.forEach(element => {
      element.selected = false;
    });
    item.selected=!item.selected;
  }

  editItem(item) {
    if(!this.option && !this.option.urlCreate) {
      return;
    }

    this.route.navigate([this.option.urlCreate], {queryParams: {data: JSON.stringify(item)}, replaceUrl: true });
  }

  deleteItem(data) {
    this.removeItem.emit(data);
    this.receptionService.deleteOne(data).subscribe(obj=>{
      this.getReceptions(this.filter, this.sort, this.paging, false);
    }, err=>{
      this.getReceptions(this.filter, this.sort, this.paging, false);
    });
  }

  changeValue() {
  }

  async getReceptions(filter, sort, paging, isResetPaging: boolean, isLazyLoad?: boolean) {
    this.isLoading = true;
    let temp = this.receptionListMaster.filter(x => x.index == this.pagingOption.indexActive);

    if (temp.length > 0 && !isLazyLoad) {
      console.log("use lazy loading");
      this.receptionList = temp[0].data;
      return;
    }

    let tempObs = this.receptionService.getList<any>(filter, sort, paging).map(value => {
      if (value) {
        if (isResetPaging) {
          this.pagingOption = { totalRecords: value.totalRecords, indexActive: 0, limit: AppConstants.DEFAULT_NUMBER_RECORD_PER_PAGE }
        }
        if(value.results.length <= 0) {
          this.pagingOption = { totalRecords: value.totalRecords, indexActive: this.pagingOption.indexActive - 1, limit: AppConstants.DEFAULT_NUMBER_RECORD_PER_PAGE }
          if(this.paging.getPage() > 0) {
            this.paging.downCount();
            this.getReceptions(this.filter, this.sort, this.paging, false);
            return null;
          }
        } else {
          if(this.option.callbackData) {
            value.results.forEach(element => {
              element = this.option.callbackData(element)
            });
          }
        }
        
        return value.results;
      }
      return [];
    });

    if (!isLazyLoad) {
      let [err, response] = await to(tempObs.toPromise());
      if(err || !response) {
        this.isLoading = false;
        return Promise.reject(err);
      }

      this.receptionList = response;
      this.isLoading = false;
    } else {
      tempObs.subscribe();
      this.receptionListMaster.push({ index: paging.getPage(), data: tempObs });
    }
  }
  
}
