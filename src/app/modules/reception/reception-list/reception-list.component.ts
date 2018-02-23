import { AppConstants } from './../../../utils/app-constants';
import { ReceptionListService } from 'app/modules/reception/service/reception-list.service';
import { CommonPaging } from './../../../core/condition/paging';
import { CommonFilter } from './../../../core/condition/filter';
import { Component, OnInit } from '@angular/core';
import { CommonSort, CommonOrder, ORDER_TYPE } from 'app/core/condition/sort';
import { PagingDto } from 'app/share-component/paging-index';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'reception-list.component.html',
  selector: "reception-list",
  styleUrls: ['reception-list.component.scss'],
  providers: [ReceptionListService]
})
export class ReceptionListComponent implements OnInit {
  filter: CommonFilter;
  paging: CommonPaging;
  sort: CommonSort;

  pagingOption: PagingDto = { totalRecords: 10, indexActive: 1 ,limit: AppConstants.DEFAULT_NUMBER_RECORD_PER_PAGE};

  receptionList;

  receptionListMaster: any[] = [];

  maxDate: Date = (new Date());
  bsValue: Date = (new Date());
  constructor(private receptionService: ReceptionListService) {
  }

  ngOnInit() {
    this.paging = new CommonPaging(0, AppConstants.DEFAULT_NUMBER_RECORD_PER_PAGE);
    this.sort = new CommonSort([new CommonOrder("namsinh", ORDER_TYPE.ASC)]);
    this.getReceptions(this.filter, this.sort, this.paging, true);
  }

  changeIndex(index) {
    this.paging.setPage(index.index);
    this.pagingOption.indexActive = index.index;
    this.getReceptions(this.filter, this.sort, this.paging, false);
  }

  changeDateReception() {
    console.log("sdfsdfsd");
  }


  getReceptions(filter, sort, paging, isResetPaging: boolean, isLazyLoad?:boolean) {
    let temp = this.receptionListMaster.filter(x=>x.index == this.pagingOption.indexActive);

    if(temp.length > 0 && !isLazyLoad) {
      console.log("use lazy loading");
      this.receptionList = temp[0].data;
      return;
    }

    let tempObs = this.receptionService.getList<any>(filter, sort, paging).map(value=>{
      if(value) {
        if(isResetPaging) {
          this.pagingOption = { totalRecords: value.totalRecords, indexActive: 0, limit: AppConstants.DEFAULT_NUMBER_RECORD_PER_PAGE }
        }
        return value.results;
      } 
      return [];
    });

    if(!isLazyLoad) {
      this.receptionList = tempObs;
    } else {
      tempObs.subscribe();
      this.receptionListMaster.push({index: paging.getPage(), data: tempObs});
    }

    
  }
}
