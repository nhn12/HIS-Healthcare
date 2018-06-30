import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CategoryService } from '../../../category/services/category.service';
import { Observable } from 'rxjs';
import { CommonFilter } from '../../../../core/condition/filter';
import { DefaultCondition, ConditionOperator } from '../../../../core/condition/condition';
import { CommonPublicForm } from '../../../../core/common-form/common-pubic-form';
import { CheckBoxComponent, CheckboxOptions } from '../../../../share-component/check-box-component/check-box-component.component';

@Component({
  selector: 'app-cac-bo-phan-public-form',
  templateUrl: './cac-bo-phan-public-form.component.html',
  styleUrls: ['./cac-bo-phan-public-form.component.scss']
})
export class CacBoPhanPublicFormComponent extends CommonPublicForm implements OnInit, OnChanges {
  constructor(public categoryService: CategoryService) { 
    super();
  }

  ngOnInit() {
    this.initComponent();
  }



  protected registerResource() {
    return 'cacbophancategory_tbl';
  }

  protected registerOptional() {
    let temp = new CheckboxOptions();
    temp.enableDescription = true;
    return temp;
  }

}
