import { HttpClient } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';
import { CommonForm } from '../../../../core/form/common-form';
import { HttpService } from '../../../../core';
import { CommonFiler } from '../../../../core/http-query/filter/common-filter';
import { ConditionOperator } from '../../../../core/http-query/condition/condition-operator';
import { DefaultCondition } from '../../../../core/http-query/condition/default-condition';
import { LocalConfigService } from '../../../../core/local-config/local-config-service';


declare var jQuery: any;

@Component({
  templateUrl: 'doctor-create.component.html',
  selector: 'doctor-create',
  styleUrls: ['doctor-create.component.scss']
})

export class DoctorCreateComponent extends CommonForm implements OnInit {


  @ViewChild(ModalDirective) myModal: ModalDirective;


  listGender: any[] = [];
  listSpecialization: any[] = [];

  public marskDate = [new RegExp('^[0-1]?[0-3]$'),
  new RegExp('^[0-1]?[0-9]$'), '/',
  new RegExp('^[0-1]?[0-1]$'),
  new RegExp('^[0-1]?[0-9]$'), '/',
  new RegExp('^[0-1]?[0-2]$'),
  new RegExp('^[0-1]?[0-9]$'),
  new RegExp('^[0-1]?[0-9]$'),
  new RegExp('^[0-1]?[0-9]$')];
  constructor(public location: Location,
    public router: Router,
    public routeP: ActivatedRoute,
    public fb: FormBuilder,
    public localConfig: LocalConfigService,
    public categoryService: HttpService,
    public configService: LocalConfigService) {
    super(location, router, routeP, fb, categoryService);
  }

  async ngOnInit() {
    super.ngOnInit();
    const user = await this.localConfig.getConfig('user');
    this.complexForm.controls['hospital_id'].setValue(user.hospital_id);
    this.getSpecializationType();
    this.getGenderType();
  }

  public async initFormBuilder() {
    this.complexForm = this.fb.group({
      'id': [null],
      'firstname': [null, Validators.required],
      'lastname': [null, Validators.required],
      'birthday': [null, Validators.required],
      'specialization_id': [null],
      'gender': [null, Validators.required],
      'hospital_id': [null]
    });
  }

  validateDate(control: AbstractControl): { [key: string]: any } {
    return {};
  }

  public getSubForms() {
    return undefined;
  }

  public setMappingData() {
    return { birthday: 'date' };
  }

  public getUrlAction(): string {
    return 'doctor';
  }

  async getGenderType() {
    const [err, response] = await this.categoryService.search<any>('type/query',
      new CommonFiler(new DefaultCondition(ConditionOperator.EQ, 'class', 'GENDER_TYPE')), null, null, null).await();
    if (response && response.results && response.results.length > 0) {
      this.listGender = response.results.map(value => {
        value.id = value.code;
        value.text = value.name;
        return value;
      });
    }
  }

  async getSpecializationType() {
    const [err, response] = await this.categoryService.search<any>('specialization/query',
      new CommonFiler(new DefaultCondition(ConditionOperator.EQ, 'hospital_id', 
      this.complexForm.controls['hospital_id'].value)), null, null, null).await();
    if (response && response.results && response.results.length > 0) {
      this.listSpecialization = response.results.map(value => {
        value.id = value.id;
        value.text = value.name;
        return value;
      });
      console.log(this.listSpecialization);
    }
  }

  clear() {
    this.complexForm.reset();
  }

}
