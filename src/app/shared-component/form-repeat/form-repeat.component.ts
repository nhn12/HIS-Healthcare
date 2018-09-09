import { Component } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `<div class="formly-repeat-section">
    <div *ngFor="let field of field.fieldGroup; let i = index;">
      <formly-group
        [field]="field"
        [options]="options"
        [form]="formControl">
        <div class="col-sm-2 d-flex align-items-center">
          <label></label>
          <button type="button btn-danger" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </formly-group>
    </div>
    <div style="margin:30px 0;text-align:right">
      <button class="btn btn-primary" type="button" (click)="add()">
      <i class="fa fa-plus-circle fa-lg"></i>
      {{ field.fieldArray.templateOptions.btnText }}
      </button>
    </div></div>
  `,
  styleUrls: ['form-repeat.component.scss']
})
export class RepeatTypeComponent extends FieldArrayType {
  constructor(builder: FormlyFormBuilder) {
    super(builder);
  }
}