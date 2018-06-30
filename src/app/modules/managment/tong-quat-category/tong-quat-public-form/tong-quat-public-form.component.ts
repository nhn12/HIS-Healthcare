import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CategoryService } from '../../../category/services/category.service';
import { CommonFilter } from '../../../../core/condition/filter';
import { DefaultCondition, ConditionOperator } from '../../../../core/condition/condition';
import { to } from '../../../../utils/promise-utils';
import { TongquatCategoryDto } from '../data/TongQuatCategoryDto';
import { CommonSort, CommonOrder, ORDER_TYPE } from '../../../../core/condition/sort';
import { CommonPublicForm } from '../../../../core/common-form/common-pubic-form';

@Component({
  selector: 'tong-quat-public-form',
  templateUrl: './tong-quat-public-form.component.html',
  styleUrls: ['./tong-quat-public-form.component.scss']
})
export class TongQuatPublicFormComponent extends CommonPublicForm implements OnInit, OnChanges {

  dataListMaster: TongquatCategoryDto[] = [];
  registerChange: any;
  dataModel: any = {};
  mask = [new RegExp('^[0-1]?[0-3]$'), new RegExp('^[0-1]?[0-9]$'), '/', new RegExp('^[0-1]?[0-1]$'), new RegExp('^[0-1]?[0-9]$'), '/', new RegExp('^[0-1]?[0-2]$'), new RegExp('^[0-1]?[0-9]$'), new RegExp('^[0-1]?[0-9]$'), new RegExp('^[0-1]?[0-9]$')];
  constructor(public catgoryService: CategoryService) {
    super();
   }

  ngOnInit() {
    this.initComponent();
    this.getTongQuatCategory();
  }

  protected getData() {
    let dataModel = {};
    this.dataListMaster.forEach((element)=>{
      element['number_field_array'].forEach((item, index) => {
        this.dataModel[element.alias+ index] = element['data'+ index];
      });
    })
    return {data: dataModel};
  }

  protected mapData() {
    if(!this.data) {
      return;
    }
    if(!this.dataListMaster || this.dataListMaster.length <= 0) {
      this.registerChange = ()=>{
        this.mapData();
      }
      return;
    }
    this.dataListMaster.forEach(element=>{
      element['number_field_array'].forEach((item, index) => {
        element['data' + index] = this.data[element.alias + index];
      });
    });
  }

  private async getTongQuatCategory() {
    this.catgoryService.setResource("TongQuatCategory_tbl");
    let filter = new CommonFilter(new DefaultCondition(ConditionOperator.EQ, 'deleted_flag', false));
    let sort = new CommonSort([new CommonOrder("order", ORDER_TYPE.ASC)]);
    let [err, response] =  await to<any, any>(this.catgoryService.getList<any>(filter,sort, null).toPromise());
    if(!err && response) {
      this.dataListMaster = response.results;
      this.dataListMaster = this.dataListMaster.map(value=>{
        value['number_field_array'] = new Array(value.number_field);
        console.log(value['number_field_array']);
        return value;
      });
      if(this.registerChange) {
        this.registerChange();
      }
    }
  }

  protected registerResource() {
    return null;
  }
  protected registerOptional() {
    return null;
  }

}
