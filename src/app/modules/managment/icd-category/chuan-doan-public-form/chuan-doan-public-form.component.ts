import { Component, OnInit, OnChanges } from '@angular/core';
import { CommonPublicForm } from '../../../../core/common-form/common-pubic-form';

@Component({
  selector: 'app-chuan-doan-public-form',
  templateUrl: './chuan-doan-public-form.component.html',
  styleUrls: ['./chuan-doan-public-form.component.scss']
})
export class ChuanDoanPublicFormComponent extends CommonPublicForm implements OnInit, OnChanges {
  constructor() {
    super();
   }

  ngOnInit() {
    this.initComponent();
  }

  protected registerResource() {
    return "icdcategory_tbl";
  }
  protected registerOptional() {
    return null;
  }


}
