import { LocalConfigService } from '../../../../core/local-config/local-config-service'
import { TableMappingDto } from '../../../../shared-component/common-data-table/model/data-table-model'
import { HttpService } from '../../../../core/http/http.service'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CommonForm } from '../../../../core/form/common-form';


declare var jQuery:any;

@Component({
  templateUrl: 'ward-create.component.html',
  selector: "ward-create",
  styleUrls: ['ward-create.component.scss']
})

export class WardCreateComponent extends CommonForm implements OnInit {
  

  @ViewChild(ModalDirective) myModal: ModalDirective;

  constructor(public location: Location, 
    public router: Router, 
    public routeP: ActivatedRoute, 
    public fb: FormBuilder, 
    public localConfig: LocalConfigService,
    public categoryService: HttpService){
    super(location, router, routeP, fb, categoryService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public async initFormBuilder() {
    this.complexForm = this.fb.group({
      'id' : [null],
      'name' : [null, Validators.required],
      'hospital_id': [null]
    });

    const user = await this.localConfig.getConfig('user');
    this.complexForm.controls['hospital_id'].setValue(user.hospital_id);

  }
  public getUrlAction(): string {
    return "ward";
  }

  public setMappingData() {
    return null;
  }

  public getSubForms() {
    return undefined;
  }

  selectSpec($event) {
    this.myModal.hide();
    this.complexForm.controls['specialization_name'].setValue($event['name']);
    this.complexForm.controls['specialization_id'].setValue($event['id']);
    this.data.specialization_name = $event['name'];
    this.data.specialization_id = $event['id'];
  }

  clear() {
    this.complexForm.reset();
  }
  
}
