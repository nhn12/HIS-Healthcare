import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../category/services/category.service';
import { Observable } from 'rxjs';
import { CommonFilter } from '../../../../core/condition/filter';
import { DefaultCondition, ConditionOperator } from '../../../../core/condition/condition';

@Component({
  selector: 'app-tien-can-public-form',
  templateUrl: './tien-can-public-form.component.html',
  styleUrls: ['./tien-can-public-form.component.scss']
})
export class TienCanPublicFormComponent implements OnInit {

  tiencans: Observable<any>
  constructor(public categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.setResource("tiencancategory_tbl");
    this.tiencans = this.categoryService.getList<any>(new CommonFilter(new DefaultCondition(ConditionOperator.EQ, 'deleted_flag', false)), null, null).map(result=>{
      return result.results;
    });
  }

}
