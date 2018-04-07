import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { TableMappingDto } from './../../services/data/table-mapping-dto';
import { CommonFilter } from './../../../../core/condition/filter';
import { CommonPaging } from './../../../../core/condition/paging';
import { ReceptionListService } from 'app/modules/reception/service/reception-list.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CommonSort, CommonOrder, ORDER_TYPE } from 'app/core/condition/sort';
import { PagingDto } from 'app/share-component/paging-index';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from 'app/utils/app-constants';
import { CategoryService } from 'app/modules/category/services/category.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import to from '../../../../utils/promise-utils'
import { WardDto } from 'app/modules/category/pages/ward/data/ward-dto';
import { mapValueToField } from '../../../../utils/form-mapping';
import { CommonForm } from '../../../../core/common-form/common-form';
import { CommonService } from '../../../../core/common-services/common-service';
import { Location } from '@angular/common';
import { DefaultCondition, ConditionOperator } from '../../../../core/condition/condition';


declare var jQuery:any;

@Component({
  templateUrl: 'doctor-create.component.html',
  selector: "doctor-create",
  styleUrls: ['doctor-create.component.scss'],
  providers: [CategoryService]
})

export class DoctorCreateComponent extends CommonForm implements OnInit {
  
  @ViewChild(ModalDirective) myModal: ModalDirective;

  mapTable: TableMappingDto[] = [];

  listGender: any[] = [];

  public marskDate = [new RegExp('^[0-1]?[0-3]$'), new RegExp('^[0-1]?[0-9]$'), '/', new RegExp('^[0-1]?[0-1]$'), new RegExp('^[0-1]?[0-9]$'), '/', new RegExp('^[0-1]?[0-2]$'), new RegExp('^[0-1]?[0-9]$'), new RegExp('^[0-1]?[0-9]$'), new RegExp('^[0-1]?[0-9]$')];
  constructor(public location: Location, 
    public router: Router, 
    public routeP: ActivatedRoute, 
    public fb: FormBuilder, 
    public categoryService: CategoryService){
    super(location, router, routeP, fb);
  }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Tên', 'name'));
    this.categoryService.setResource("doctor_tbl");
    this.getSpecializationType();
  }

  public initFormBuilder() {
    this.complexForm = this.fb.group({
      'id' : [null],
      'firstname' : [null, Validators.required],
      'lastname' : [null, Validators.required],
      'birthday': [null, Validators.compose([Validators.required, this.validateDate.bind]), ],
      'specialization_id': [],
      'specialization_name': [null, Validators.required],
      'gender': [null, Validators.required]
    })
  }

  validateDate(control: AbstractControl): { [key: string]: any } {
    console.log(control);
    return {};
  }


  public setService(): CommonService {
    this.categoryService.setResource('doctor_tbl');
    return this.categoryService;
  }
  public getSubForms() {
    return undefined;
  }

  public setMappingData() {
    return {birthday: 'date'};
  }

  selectSpec($event) {
    this.myModal.hide();
    this.complexForm.controls['specialization_name'].setValue($event['name']);
    this.complexForm.controls['specialization_id'].setValue($event['id']);
    this.data.specialization_name = $event['name'];
    this.data.specialization_id = $event['id'];
  }

  async getSpecializationType() {
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

  clear() {
    this.complexForm.reset();
  }
  
}
