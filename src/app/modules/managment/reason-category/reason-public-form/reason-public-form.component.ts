import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonPublicForm } from '../../../../core/common-form/common-pubic-form';

@Component({
  selector: 'app-reason-public-form',
  templateUrl: './reason-public-form.component.html',
  styleUrls: ['./reason-public-form.component.scss']
})
export class ReasonPublicFormComponent extends CommonPublicForm implements OnInit, OnChanges {
  reasons: Observable<any>;
  constructor() {
    super();
   }

  ngOnInit() {
    this.initComponent();
  }

  protected registerResource() {
    return "reasoncategory_tbl";
  }

  protected registerOptional() {
    return null;
  }

}
