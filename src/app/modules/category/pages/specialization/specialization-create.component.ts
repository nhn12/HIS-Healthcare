import { Router } from '@angular/router';
import { TableMappingDto } from './../../services/data/table-mapping-dto';
import { CommonFilter } from './../../../../core/condition/filter';
import { CommonPaging } from './../../../../core/condition/paging';
import { ReceptionListService } from 'app/modules/reception/service/reception-list.service';
import { Component, OnInit } from '@angular/core';
import { CommonSort, CommonOrder, ORDER_TYPE } from 'app/core/condition/sort';
import { PagingDto } from 'app/share-component/paging-index';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from 'app/utils/app-constants';
import { CategoryService } from 'app/modules/category/services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import to from '../../../../utils/promise-utils'

@Component({
  templateUrl: 'specialization-create.component.html',
  selector: "specialization-create",
  styleUrls: ['specialization-create.component.scss'],
  providers: [CategoryService]
})

export class SpecializationCreateComponent implements OnInit {
  complexForm: FormGroup;
  constructor(public router: Router, fb: FormBuilder, public categoryService: CategoryService){
    this.complexForm = fb.group({
      'name' : [null, Validators.required],
      // 'specialization_id': [null, Validators.compose([Validators.required])],
    })
  }

  ngOnInit() {
    this.categoryService.setResource("specialization_tbl");
  }

  async submitForm(value: any){
    let [err, success] = await to(this.categoryService.insertOne(value).toPromise());
    console.log(err, success);
    if(success) {
      this.router.navigate(['/category/chuyen-khoa-list'], { replaceUrl: true });
    }
  }

  clear() {
    this.complexForm.reset();
  }
  
}
