import { Location } from '@angular/common';
import { TableMappingDto } from 'app/modules/category/services/data/table-mapping-dto';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { ReceptionListService } from 'app/modules/reception/service/reception-list.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CommonSort, CommonOrder, ORDER_TYPE } from 'app/core/condition/sort';
import { PagingDto } from 'app/share-component/paging-index';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from 'app/utils/app-constants';
import { CategoryService } from 'app/modules/category/services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WardDto } from 'app/modules/category/pages/ward/data/ward-dto';
import { CommonForm } from '../../../core/common-form/common-form';
import { CommonService } from '../../../core/common-services/common-service';
import { DefaultCondition, ConditionOperator } from '../../../core/condition/condition';
import to from '../../../utils/promise-utils';
import { CommonFilter } from '../../../core/condition/filter';


declare var jQuery:any;

@Component({
  templateUrl: 'reception-create.component.html',
  selector: "reception-create",
  styleUrls: ['reception-create.component.scss'],
  providers: [CategoryService]
})

export class ReceptionCreateComponent extends CommonForm implements OnInit {
  
  @ViewChild(ModalDirective) myModal: ModalDirective;

  mapTable: TableMappingDto[] = [];

  listGender: any[] = [];
  listProvince: any[] = [];
  listDistrict: any[] = [];
  listCommune: any[] = [];
  constructor(public location: Location, 
    public router: Router, 
    public routeP: ActivatedRoute, 
    public fb: FormBuilder, 
    public categoryService: CategoryService){
    super(location, router, routeP, fb);
  }

  ngOnInit() {
    this.getGenderList();
    this.getProvinceList();
  }

  public initFormBuilder() {
    this.complexForm = this.fb.group({
      'id': [null],
      'firstname': [null, Validators.compose([Validators.required])],
      'lastname': [null, Validators.compose([Validators.required])],
      'hoten': [null, Validators.compose([Validators.required])],
      'namsinh': [null, Validators.compose([Validators.required])],
      'gioitinh': [null, Validators.compose([Validators.required])],
      'diachi': [null, Validators.compose([Validators.required])],
      'maqh': [null, Validators.compose([Validators.required])],
      'matt': [null, Validators.compose([Validators.required])],
      'mapx': [null, Validators.compose([Validators.required])],
      'mabhyt': [null, Validators.compose([])],
      'nbdbhyt': [null, Validators.compose([])],
      'hanbhyt': [null, Validators.compose([])],
      'mack': [null, Validators.compose([Validators.required])],
      'mapk': [null, Validators.compose([Validators.required])]
    })
  }


  public setService(): CommonService {
    this.categoryService.setResource('registration_tbl');
    return this.categoryService;
  }
  public getSubForms() {
    return undefined;
  }

  public setMappingData() {
    return {birthday: 'date'};
  }

  async getGenderList() {
    let [err, response] = await to<any>(this.categoryService.getList(new CommonFilter(
      new DefaultCondition(ConditionOperator.EQ, 'class', 'GENDER')), null, null, {resource: "type_tbl"}).toPromise());
    if(response && response.results && response.results.length > 0) {
      this.listGender = response.results.map(value=>{
        value.id = value.code;
        value.text = value.name;
        return value;
      })
    }
  }

  changeTT() {
    this.listDistrict = [];
    this.listCommune = [];
    setTimeout(()=>{
      this.getDistrictList();
    }, 500)
  }

  changeQH() {
    this.listCommune = [];
    setTimeout(()=>{
      this.getCommuneList();
    }, 500)
  }

  changePX() {

  }

  async getProvinceList() {
    let [err, response] = await to<any>(this.categoryService.getList(null, null, null, {resource: "province_tbl"}).toPromise());
    if(response && response.results && response.results.length > 0) {
      this.listProvince = response.results.map(value=>{
        value.id = value.code;
        value.text = value.name;
        return value;
      })
    }
  }

  async getDistrictList() {
    let filter;
    if(this.complexForm.controls['matt'].value) {
      filter = new CommonFilter(new DefaultCondition(ConditionOperator.EQ, 'province_code', this.complexForm.controls['matt'].value));
    }
    let [err, response] = await to<any>(this.categoryService.getList(filter, null, null, {resource: "district_tbl"}).toPromise());
    if(response && response.results && response.results.length > 0) {
      this.listDistrict = response.results.map(value=>{
        value.id = value.code;
        value.text = value.name;
        return value;
      })
    }
  }

  async getCommuneList() {
    let filter;
    if(this.complexForm.controls['maqh'].value) {
      filter = new CommonFilter(new DefaultCondition(ConditionOperator.EQ, 'district_code', this.complexForm.controls['maqh'].value));
    }
    let [err, response] = await to<any>(this.categoryService.getList(filter , null, null, {resource: "commune_tbl"}).toPromise());
    if(response && response.results && response.results.length > 0) {
      this.listCommune = response.results.map(value=>{
        value.id = value.code;
        value.text = value.name;
        return value;
      })
    }
  }

//   async getSpecializationType() {
//     let [err, response] = await to<any>(this.categoryService.getList(new CommonFilter(
//       new DefaultCondition(ConditionOperator.EQ, 'class', 'GENDER')), null, null, {resource: "type_tbl"}).toPromise());
//     if(response && response.results && response.results.length > 0) {
//       this.listGender = response.results.map(value=>{
//         value.id = value.code;
//         value.text = value.name;
//         return value;
//       })
//     }
//   }

  clear() {
    this.complexForm.reset();
  }
  
}
