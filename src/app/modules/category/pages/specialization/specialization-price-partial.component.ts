import { Router } from '@angular/router';
import { TableMappingDto } from './../../services/data/table-mapping-dto';
import { CommonFilter } from './../../../../core/condition/filter';
import { CommonPaging } from './../../../../core/condition/paging';
import { ReceptionListService } from 'app/modules/reception/service/reception-list.service';
import { Component, OnInit } from '@angular/core';
import { CommonSort, CommonOrder, ORDER_TYPE } from 'app/core/condition/sort';
import { PagingDto } from 'app/share-component/paging-index';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from 'app/utils/app-constants';
import { CategoryService } from 'app/modules/category/services/category.service';


@Component({
  templateUrl: 'specialization-price-partial.component.html',
  selector: "specialization-price-partial",
  styleUrls: ['specialization-price-partial.component.scss']
})

export class SpecializationPricePartialComponent implements OnInit {
  listData: string[] = [];
  private _disabledV:string = '0';
  public disabled:boolean = false;
  private value:any = {};
  constructor(private route: Router) {
  }

  ngOnInit() {
    this.listData.push("Thường");
    this.listData.push("Bảo hiểm");
  }


 
  private get disabledV():string {
    return this._disabledV;
  }
 
  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }
 
  public selected(value:any):void {
    console.log('Selected value is: ', value);
  }
 
  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }
 
  public typed(value:any):void {
    console.log('New search input: ', value);
  }
 
  public refreshValue(value:any):void {
    this.value = value;
  }
}
