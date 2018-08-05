import { CommonFiler } from '../../../../core/http-query/filter/common-filter'
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../../core/http/http.service'
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { CommonForm } from '../../../../core/form/common-form';
import { DefaultCondition } from '../../../../core/http-query/condition/default-condition';
import { ConditionOperator } from '../../../../core/http-query/condition/condition-operator';
import { LocalConfigService } from '../../../../core/local-config/local-config-service';


@Component({
  templateUrl: 'specialization-create.component.html',
  selector: "specialization-create",
  styleUrls: ['specialization-create.component.scss']
})

export class SpecializationCreateComponent extends CommonForm implements OnInit {

  listData: any[] = [];
  private _disabledV = '0';
  public disabled = false;
  private value: any = {};

  constructor(public router: Router,
    public location: Location,
    public routeP: ActivatedRoute,
    public fb: FormBuilder,
    public localConfig: LocalConfigService,
    public categoryService: HttpService) {
    super(location, router, routeP, fb, categoryService);
  }

  public async initFormBuilder() {
    this.complexForm = this.fb.group({
      'id': [null],
      'name': [null, Validators.required],
      'hospital_id': [null, Validators.required]
    });

    const user = await this.localConfig.getConfig('user');
    this.complexForm.controls['hospital_id'].setValue(user.hospital_id);

  }

  public getUrlAction(): string {
    return 'specialization';
  }

  public setMappingData() {
    return { 'type': "string", 'to_date': 'date' };
  }

  public getSubForms() {
    return null;
    // return this.fb.group({
    //   "id": [null],
    //   "type": [null, Validators.required],
    //   "to_date": [null],
    //   "price": [null, Validators.required]
    // });
  }

  ngOnInit() {
    super.ngOnInit();
    this.getSpecializationType();
  }

  async getSpecializationType() {
    let [err, response] = await this.categoryService.search<any>("type", new CommonFiler(
      new DefaultCondition(ConditionOperator.EQ, 'class', 'SPECIALIZATION_TYPE')), null, null, null).await();
    if (response && response.results && response.results.length > 0) {
      this.listData = response.results.map(value => {
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
