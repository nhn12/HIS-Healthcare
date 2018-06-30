import { Component, OnInit, OnChanges } from '@angular/core';
import { CategoryService } from '../../../category/services/category.service';
import { Observable } from 'rxjs';
import { CommonFilter } from '../../../../core/condition/filter';
import { DefaultCondition, ConditionOperator } from '../../../../core/condition/condition';
import { CommonPublicForm } from '../../../../core/common-form/common-pubic-form';

@Component({
  selector: 'app-tien-can-public-form',
  templateUrl: './tien-can-public-form.component.html',
  styleUrls: ['./tien-can-public-form.component.scss']
})
export class TienCanPublicFormComponent extends CommonPublicForm implements OnInit, OnChanges {
  tiencans: Observable<any>
  constructor(public categoryService: CategoryService) { 
    super();
   }

  ngOnInit() {
    this.initComponent();
  }

  protected registerResource() {
    return "tiencancategory_tbl";
  }
  protected registerOptional() {
    return null;
  }

}
