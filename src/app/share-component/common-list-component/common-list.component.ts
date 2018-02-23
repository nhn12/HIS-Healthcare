import { ReceptionListService } from 'app/modules/reception/service/reception-list.service';
import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonSort, CommonOrder, ORDER_TYPE } from 'app/core/condition/sort';
import { PagingDto } from 'app/share-component/paging-index';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from 'app/utils/app-constants';
import { CategoryService } from 'app/modules/category/services/category.service';
import { CommonFilter } from 'app/core/condition/filter';
import { CommonPaging } from 'app/core/condition/paging';
import { TableMappingDto } from 'app/modules/category/services/data/table-mapping-dto';

@Component({
  templateUrl: 'common-list.component.html',
  selector: "common-list",
  styleUrls: ['common-list.component.scss'],
  providers: [CategoryService]
})
export class CommonListComponent implements OnInit {
  @Input("resource") resource: string;
  @Input("type") type: string;
  @Output() selectItem = new EventEmitter();
  @Input("mapTable") mapTable: TableMappingDto[] = [];
  @Input("selected") selectedValue: any;

  @Output() removeItem = new EventEmitter();
  filter: CommonFilter;
  paging: CommonPaging;
  sort: CommonSort;

  pagingOption: PagingDto = { totalRecords: 10, indexActive: 1, limit: AppConstants.DEFAULT_NUMBER_RECORD_PER_PAGE };

  receptionList;

  receptionListMaster: any[] = [];

  maxDate: Date = (new Date());
  bsValue: Date = (new Date());
  constructor(private receptionService: CategoryService) {

  }

  ngOnInit() {

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
        this.sort = new CommonSort([new CommonOrder("name", ORDER_TYPE.ASC)]);
        this.getReceptions(this.filter, this.sort, this.paging, true);
      }

      if(propName == 'selected') {

      }
    }
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

  getReceptions(filter, sort, paging, isResetPaging: boolean, isLazyLoad?: boolean) {
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
          }
        }
        return value.results;
      }
      return [];
    });

    if (!isLazyLoad) {
      this.receptionList = tempObs;
    } else {
      tempObs.subscribe();
      this.receptionListMaster.push({ index: paging.getPage(), data: tempObs });
    }
  }
  
}
