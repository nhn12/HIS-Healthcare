import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ExceptionObject } from '../../core/exception/exception-object'
import { EnterprisePromise } from '../../core/async/enterprise-promise'
import { CommonPaging } from '../../core/http-query/paging/common-paging'
import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DataTableModel, TableMappingDto } from './model/data-table-model';
import { Optional } from './model/optional';
import { CommonSort } from '../../core/http-query/sort/common-sort';
import { HttpService } from '../../core';
import { HttpOrder, OrderType } from '../../core/http-query/sort/sort';
import { CommonFiler } from '../../core/http-query/filter/common-filter';
import { AndCondition } from '../../core/http-query/condition/and-condition';
import { DefaultCondition } from '../../core/http-query/condition/default-condition';
import { ConditionOperator } from '../../core/http-query/condition/condition-operator';
import { AppConstants } from '../../variable-defination/app-constanst';

@Component({
  selector: 'common-data-table',
  templateUrl: 'common-data-table.component.html',
  styleUrls: ['common-data-table.component.scss']
})
export class CommonDataTableComponent implements OnInit {

  @Input() data: DataTableModel;
  @Input() option: Optional;

  @Output() sort: EventEmitter<any> = new EventEmitter();
  @Output() quickSearch: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  isLoading: boolean = false;

  pagingQuery: CommonPaging = null;
  sortQuery: CommonSort = null;
  filterQuery: CommonFiler = null;
  mapTable: TableMappingDto[] = [];
  sortSelect: any = {};

  dateFormat: string = AppConstants.DATE_FORMAT;
  timeFormat: string = "hh:mm";

  // Paging component
  maxResult: number = 0;
  currentIndex: number = 0;
  mesageEmpty: string = 'INF_001';

  dataList: any[] = [];

  private eventsSubscription: any

  @Input() events: Observable<void>;

  constructor(public http: HttpService, private router: Router, private activeRoute: ActivatedRoute) {
    this.pagingQuery = new CommonPaging(0, AppConstants.QUANTITY_PER_PAGE);
  }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe(async () => {
      this.dataList = await this.getData(this.filterQuery, this.sortQuery, this.pagingQuery, true, true);
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];

      if (propName == 'data') {
        this.mapTable = this.data.tableMapping;
        // Change data source
        this.initGetData();
      }

      if (propName == 'option') {
      }
    }
  }

  /**
   * Handle get data
   */
  async initGetData() {
    if (!this.filterQuery) {
      this.filterQuery = new CommonFiler(new AndCondition([new DefaultCondition(ConditionOperator.EQ, 'deleted_flag', false)]));
    }
    this.dataList = await this.getData(this.filterQuery, this.sortQuery, this.pagingQuery, true, true);
    console.log(this.dataList);
  }

  /**
   * Handle event page change index.
   */
  async onChangePageIndex() {
    this.pagingQuery.setPageIndex(this.currentIndex - 1);
    this.dataList = await this.getData(this.filterQuery, this.sortQuery, this.pagingQuery, true, false); 
  }

  /**
   * Init paging component
   */
  initPagingComponent(maxResult: number, index?: number) {
    this.maxResult = maxResult;
    this.currentIndex = ((index == undefined || index == null) ? 0 : index);
  }

  selectColumn(item) {
    this.dataList.forEach(element => {
      element.selected = false;
    });
    item.selected = !item.selected;
  }

  mappingCustomerField(dataList: any[]) {
    dataList.forEach(element => {
      for (let item in element) {
        let temp = this.data.tableMapping.filter(x =>x.callbackData);
        if (temp.length > 0) {
          element = temp[0].callbackData(element);
        }
      }
    });
    return dataList;
  }

  updateIndexPaging(index: number) {
    this.currentIndex = index + 1;
  }

  /**
   * Handle event delete item
   */
  async deleteItem(id: string) {
    const [error, response] = await this.http.deleteOne(this.data.url + this.getUrlDeleteData(), id, null).await();

    if (error) {
      //TODO
      return;
    }

    this.dataList = await this.getData(this.filterQuery, this.sortQuery, this.pagingQuery, true, false);
  }

  add() {
    if(this.option && this.option.overrideAddClick) {
      this.option.overrideAddClick();
      return;
    }
    this.router.navigateByUrl(this.router.url.replace('/list', '/create'));
  }

  /**
   * Handle event edit data
   */
  async editItem(id: string) {

  }

  changeSort(item) {
    if (this.sortSelect[item] != undefined && this.sortSelect[item] != null) {
      this.sortSelect[item] = !this.sortSelect[item];
    } else {
      this.sortSelect = {};
      this.sortSelect[item] = true;
    }

    this.sortQuery = new CommonSort([new HttpOrder(item, (this.sortSelect[item] == true ? OrderType.ASC : OrderType.DESC))]);
    this.initGetData();
  }


  public async getData(filter, sort, paging, isClear: boolean, resetPaging?: boolean): EnterprisePromise<any[]> {
    let [error, response] = await this.http.search<any>(this.data.url + this.getUrlGetData(), filter, sort, paging, null).await();
    if (error) {
      this.handelError(error)
      return [];
    }

    if(resetPaging) {
      this.initPagingComponent(response.maxResults);
    }
    
    response.results = this.mappingCustomerField(response.results);
    return response.results;
  }

  public getUrlGetData() {
    return "/query";
  }

  public getUrlDeleteData() {
    return "/delete";
  }

  public getUrlEditData() {
    return "/edit"
  }

  private handelError(ExceptionObject) {
    //TODO
  }



}
