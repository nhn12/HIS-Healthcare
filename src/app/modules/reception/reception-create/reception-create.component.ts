import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonForm } from '../../../core/common-form/common-form';
import { CommonService } from '../../../core/common-services/common-service';
import { DefaultCondition, ConditionOperator } from '../../../core/condition/condition';
import to from '../../../utils/promise-utils';
import { CommonFilter, Filter } from '../../../core/condition/filter';
import { CategoryService } from '../../category/services/category.service';
import { TableMappingDto } from '../../category/services/data/table-mapping-dto';
import { ReasonPublicFormComponent } from '../../managment/reason-category/reason-public-form/reason-public-form.component';
import { DiseasePublicFormComponent } from '../../managment/disease-history-category/disease-public-form/disease-public-form.component';
import { TienCanPublicFormComponent } from '../../managment/tien-can-category/tien-can-public-form/tien-can-public-form.component';
import { ChuanDoanPublicFormComponent } from '../../managment/icd-category/chuan-doan-public-form/chuan-doan-public-form.component';
import { CacBoPhanPublicFormComponent } from '../../managment/cac-bo-phan-category/cac-bo-phan-public-form/cac-bo-phan-public-form.component';
import { TongQuatPublicFormComponent } from '../../managment/tong-quat-category/tong-quat-public-form/tong-quat-public-form.component';
import { ReceptionListService } from '../service/reception-list.service';
import { Http } from '@angular/http';


declare var jQuery: any;

@Component({
  templateUrl: 'reception-create.component.html',
  selector: "reception-create",
  styleUrls: ['reception-create.component.scss'],
  providers: [CategoryService, ReceptionListService]
})

export class ReceptionCreateComponent extends CommonForm implements OnInit {

  @ViewChild(ModalDirective) myModal: ModalDirective;

  @ViewChild(ReasonPublicFormComponent) reason: ReasonPublicFormComponent;
  @ViewChild(DiseasePublicFormComponent) disease: DiseasePublicFormComponent;
  @ViewChild(TienCanPublicFormComponent) tiencan: TienCanPublicFormComponent;
  @ViewChild(TongQuatPublicFormComponent) tongquat: TongQuatPublicFormComponent;
  @ViewChild(CacBoPhanPublicFormComponent) cacbophan: CacBoPhanPublicFormComponent;
  @ViewChild(ChuanDoanPublicFormComponent) chuandoan: ChuanDoanPublicFormComponent;

  mapTable: TableMappingDto[] = [];

  listGender: any[] = [];
  listProvince: any[] = [];
  listDistrict: any[] = [];
  listCommune: any[] = [];
  reasonList: any[] = [];
  tiencanList: any[] = [];

  benhan: any = {};

  public maskTime = [/\d/, /\d/, ":", /\d/, /\d/, " ", /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];


  constructor(public location: Location,
    public router: Router,
    public routeP: ActivatedRoute,
    public fb: FormBuilder,
    public http: Http,
    public receptionService: ReceptionListService,
    public categoryService: CategoryService) {
    super(location, router, routeP, fb);
  }

  async ngOnInit() {
    this.getGenderList();
    this.getProvinceList();
    this.getReasonList();
    this.getTienCanList();

    let check = await this.getParams();

    this.mode = (check ? 'update' : 'add');
    if (this.mode == 'add') {
      this.initDefaultValue();
    } else {
      this.getBaByCode(check);
    }

  }

  private async getBaByCode(code) {
    this.categoryService.setResource("registration_tbl");
    let [err,response] = await to<any>(this.categoryService.getList(new CommonFilter(new DefaultCondition(ConditionOperator.EQ, 'benhan_number', code)), null, null).toPromise());
    if(err) {
      return Promise.reject();
    }

    this.benhan = response.results[0];


  }

  private async getParams() {
    return new Promise((resolve) => {
      this.routeP.queryParams.subscribe(value => {
        if (value && value.code) {
          resolve(value.code);
        } else {
          resolve(null);
        }
      });
    })
  }



  async save() {
    this.benhan.lidokhambenh = this.reason.callbackSubmit();
    this.benhan.tiencan = this.tiencan.callbackSubmit();
    this.benhan.tongquat = this.tongquat.callbackSubmit();
    this.benhan.cacbophan = this.cacbophan.callbackSubmit();
    this.benhan.chandoan = this.chuandoan.callbackSubmit();
    this.benhan.disease = this.disease.callbackSubmit();

    await this.receptionService.insertOne(this.benhan).toPromise();

    console.log(window.history);

    console.log(this.benhan);
  }

  async initDefaultValue() {
    this.benhan.benhan_number = await this.receptionService.getBaNumber();
    this.benhan.chuyenvien_number = await this.receptionService.getCvNumber();
    this.benhan.nationality = '14';
    this.benhan.dantoc = '1';
  }

  async importData() {
    let data: any = await this.http.get("http://localhost:4200/assets/data.json").toPromise();
    data = data.json();
    this.categoryService.setResource("icdcategory_tbl")
    let count = 0;
    let temp = [];
    data.forEach((element, index) => {
      temp.push(element);
      count++;

      if (count == 30 || index == (data.length)) {
        this.categoryService.insertOne(temp).toPromise();
        temp = [];
        count = 0;
      }
    });
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
    return { birthday: 'date' };
  }

  async getGenderList() {
    let [err, response] = await to<any>(this.categoryService.getList(new CommonFilter(
      new DefaultCondition(ConditionOperator.EQ, 'class', 'GENDER')), null, null, { resource: "type_tbl" }).toPromise());
    if (response && response.results && response.results.length > 0) {
      this.listGender = response.results.map(value => {
        value.id = value.code;
        value.text = value.name;
        return value;
      })
    }
  }

  changeTT() {
    this.listDistrict = [];
    this.listCommune = [];
    setTimeout(() => {
      this.getDistrictList();
    }, 500)
  }

  changeQH() {
    this.listCommune = [];
    setTimeout(() => {
      this.getCommuneList();
    }, 500)
  }

  changePX() {

  }

  async getProvinceList() {
    let [err, response] = await to<any>(this.categoryService.getList(null, null, null, { resource: "province_tbl" }).toPromise());
    if (response && response.results && response.results.length > 0) {
      this.listProvince = response.results.map(value => {
        value.id = value.code;
        value.text = value.name;
        return value;
      })
    }
  }

  async getDistrictList() {
    let filter;
    if (this.complexForm.controls['matt'].value) {
      filter = new CommonFilter(new DefaultCondition(ConditionOperator.EQ, 'province_code', this.complexForm.controls['matt'].value));
    }
    let [err, response] = await to<any>(this.categoryService.getList(filter, null, null, { resource: "district_tbl" }).toPromise());
    if (response && response.results && response.results.length > 0) {
      this.listDistrict = response.results.map(value => {
        value.id = value.code;
        value.text = value.name;
        return value;
      })
    }
  }

  async getReasonList() {
    let [err, response] = await to<any>(this.categoryService.getList(new CommonFilter(new DefaultCondition(ConditionOperator.EQ, "deleted_flag", false)), null, null, { resource: "reasoncategory_tbl" }).toPromise());
    if (response && response.results && response.results.length > 0) {
      this.reasonList = response.results.map(value => {
        value.id = value.code;
        value.text = value.name;
        return value;
      })
    }
  }

  async getTienCanList() {
    let [err, response] = await to<any>(this.categoryService.getList(new CommonFilter(new DefaultCondition(ConditionOperator.EQ, "deleted_flag", false)), null, null, { resource: "tiencancategory_tbl" }).toPromise());
    if (response && response.results && response.results.length > 0) {
      this.tiencanList = response.results.map(value => {
        value.id = value.code;
        value.text = value.name;
        return value;
      })
    }
  }

  async getCommuneList() {
    let filter;
    if (this.complexForm.controls['maqh'].value) {
      filter = new CommonFilter(new DefaultCondition(ConditionOperator.EQ, 'district_code', this.complexForm.controls['maqh'].value));
    }
    let [err, response] = await to<any>(this.categoryService.getList(filter, null, null, { resource: "commune_tbl" }).toPromise());
    if (response && response.results && response.results.length > 0) {
      this.listCommune = response.results.map(value => {
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
