import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../category/services/category.service';
import { Observable } from 'rxjs';
import { CommonFilter } from '../../../../core/condition/filter';
import { DefaultCondition, ConditionOperator } from '../../../../core/condition/condition';

@Component({
  selector: 'app-reason-public-form',
  templateUrl: './reason-public-form.component.html',
  styleUrls: ['./reason-public-form.component.scss']
})
export class ReasonPublicFormComponent implements OnInit {

  reasons: Observable<any>;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.setResource("reasoncategory_tbl");
    this.reasons = this.categoryService.getList<any>(new CommonFilter(new DefaultCondition(ConditionOperator.EQ, 'deleted_flag', false)), null, null).map(result=>{
      return result.results;
    });
  }

}
