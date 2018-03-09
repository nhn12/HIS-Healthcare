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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import to from '../../../../utils/promise-utils'
import { WardDto } from 'app/modules/category/pages/ward/data/ward-dto';
import { mapValueToField } from '../../../../utils/form-mapping';
import { CommonForm } from '../../../../core/common-form/common-form';
import { CommonService } from '../../../../core/common-services/common-service';
import { Location } from '@angular/common';


declare var jQuery:any;

@Component({
  templateUrl: 'ward-create.component.html',
  selector: "ward-create",
  styleUrls: ['ward-create.component.scss'],
  providers: [CategoryService]
})

export class WardCreateComponent extends CommonForm implements OnInit {
  

  @ViewChild(ModalDirective) myModal: ModalDirective;

  mapTable: TableMappingDto[] = [];
  constructor(public location: Location, 
    public router: Router, 
    public routeP: ActivatedRoute, 
    public fb: FormBuilder, 
    public categoryService: CategoryService){
    super(location, router, routeP, fb);
  }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Tên', 'name'));
    this.categoryService.setResource("ward_tbl");
  }

  public initFormBuilder() {
    this.complexForm = this.fb.group({
      'id' : [null],
      'name' : [null, Validators.required],
      'specialization_name': [null, Validators.compose([Validators.required])],
      'specialization_id': [],
    })
  }
  public setService(): CommonService {
    this.categoryService.setResource('ward_tbl');
    return this.categoryService;
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
