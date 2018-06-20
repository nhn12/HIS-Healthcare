import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../category/services/category.service';
import { CommonFilter } from '../../../../core/condition/filter';
import { DefaultCondition, ConditionOperator } from '../../../../core/condition/condition';
import { to } from '../../../../utils/promise-utils';
import { TongquatCategoryDto } from '../data/TongQuatCategoryDto';
import { CommonSort, CommonOrder, ORDER_TYPE } from '../../../../core/condition/sort';

@Component({
  selector: 'tong-quat-public-form',
  templateUrl: './tong-quat-public-form.component.html',
  styleUrls: ['./tong-quat-public-form.component.scss']
})
export class TongQuatPublicFormComponent implements OnInit {

  dataList: TongquatCategoryDto[] = [];
  mask = [new RegExp('^[0-1]?[0-3]$'), new RegExp('^[0-1]?[0-9]$'), '/', new RegExp('^[0-1]?[0-1]$'), new RegExp('^[0-1]?[0-9]$'), '/', new RegExp('^[0-1]?[0-2]$'), new RegExp('^[0-1]?[0-9]$'), new RegExp('^[0-1]?[0-9]$'), new RegExp('^[0-1]?[0-9]$')];
  constructor(public catgoryService: CategoryService) { }

  ngOnInit() {
    this.getTongQuatCategory();
  }

  private async getTongQuatCategory() {
    this.catgoryService.setResource("TongQuatCategory_tbl");
    let filter = new CommonFilter(new DefaultCondition(ConditionOperator.EQ, 'deleted_flag', false));
    let sort = new CommonSort([new CommonOrder("order", ORDER_TYPE.ASC)]);
    let [err, response] =  await to<any, any>(this.catgoryService.getList<any>(filter,sort, null).toPromise());
    if(!err && response) {
      this.dataList = response.results;
      this.dataList = this.dataList.map(value=>{
        value['number_field_array'] = new Array(value.number_field);
        console.log(value['number_field_array']);
        return value;
      })
    }
  }

}
