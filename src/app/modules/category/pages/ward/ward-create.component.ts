import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
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


declare var jQuery:any;

@Component({
  templateUrl: 'ward-create.component.html',
  selector: "ward-create",
  styleUrls: ['ward-create.component.scss'],
  providers: [CategoryService]
})

export class WardCreateComponent implements OnInit {
  complexForm: FormGroup;
  @ViewChild(ModalDirective) myModal: ModalDirective;
  mapTable: TableMappingDto[] = [];

  data: WardDto = new WardDto();
  constructor(public router: Router, fb: FormBuilder, public categoryService: CategoryService){
    this.complexForm = fb.group({
      'name' : [null, Validators.required],
      'specialization_name': [null, Validators.compose([Validators.required])],
      'specialization_id': [],
    })
  }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Tên', 'name'));
    this.categoryService.setResource("ward_tbl");
  }

  async submitForm(value: any){
    let [err, success] = await to(this.categoryService.insertOne(value).toPromise());
    console.log(err, success);
    if(success) {
      this.router.navigate(['/category/phong-kham-list'], { replaceUrl: true });
    }
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
