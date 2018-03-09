import { Location } from '@angular/common';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { TableMappingDto } from './../../services/data/table-mapping-dto';
import { CommonFilter } from './../../../../core/condition/filter';
import { CommonPaging } from './../../../../core/condition/paging';
import { ReceptionListService } from 'app/modules/reception/service/reception-list.service';
import { Component, OnInit } from '@angular/core';
import { CommonSort, CommonOrder, ORDER_TYPE } from 'app/core/condition/sort';
import { PagingDto } from 'app/share-component/paging-index';
import { AppConstants } from 'app/utils/app-constants';
import { CategoryService } from 'app/modules/category/services/category.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import to from '../../../../utils/promise-utils'
import { CommonForm } from '../../../../core/common-form/common-form';
import { CommonService } from '../../../../core/common-services/common-service';
import { DefaultCondition, ConditionOperator } from '../../../../core/condition/condition';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/toPromise';


@Component({
  templateUrl: 'specialization-create.component.html',
  selector: "specialization-create",
  styleUrls: ['specialization-create.component.scss'],
  providers: [CategoryService]
})

export class SpecializationCreateComponent extends CommonForm implements OnInit {

  listData: any[] = [];
  private _disabledV: string = '0';
  public disabled: boolean = false;
  private value: any = {};

  constructor(public router: Router, public location: Location,  public routeP: ActivatedRoute,  public fb: FormBuilder, public categoryService: CategoryService) {
    super(location, router, routeP, fb);
  }

  public initFormBuilder() {
    this.complexForm = this.fb.group({
      'id': [null],
      'name': [null, Validators.required],
      "prices": this.fb.array([
      ])
    });
  }

  public setService(): CommonService {
    this.categoryService.setResource("specialization_tbl");
    return this.categoryService;
  }

  public setMappingData() {
    return {'type': "string", 'to_date': 'date'};
  }

  public getSubForms() {
    return this.fb.group({
      "id": [null],
      "type": [null, Validators.required],
      "to_date": [null],
      "price": [null, Validators.required]
    });
  }

  ngOnInit() {
    this.categoryService.setResource("specialization_tbl");
    this.getSpecializationType();
  }

  async getSpecializationType() {
    let [err, response] = await to<any>(this.categoryService.getList(new CommonFilter(
      new DefaultCondition(ConditionOperator.EQ, 'class', 'SPECIALIZATION_TYPE')), null, null, {resource: "type_tbl"}).toPromise());
    if(response && response.results && response.results.length > 0) {
      this.listData = response.results.map(value=>{
        value.id = value.code;
        value.text = value.name;
        return value;
      })
    }
  }

  clear() {
    this.complexForm.reset();
  }


  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    
  }

  public removed(value: any): void {
    
  }

  public typed(value: any): void {
    
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

}
