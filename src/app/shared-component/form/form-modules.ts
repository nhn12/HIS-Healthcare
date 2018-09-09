import { LaddaModule } from 'angular2-ladda';
import { FormInputMarsk } from './../form-input-marsk/form-input-marsk';
import { TextMaskModule } from 'angular2-text-mask';
import { RepeatTypeComponent } from './../form-repeat/form-repeat.component';
import { FormDatePickerComponent } from './../form-date-picker/form-date-picker.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { FormSelectedComponent } from './../form-selected/form-selected.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { FormlyHorizontalWrapper } from './horizontal-wrapper';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    NgSelectModule,
    FormsModule,
    TextMaskModule,
    BsDatepickerModule.forRoot(),
    FormlyModule.forRoot({
      types: [
        { name: 'input-mask', component: FormInputMarsk },
        { name: 'select', component: FormSelectedComponent },
        { name: 'datetime', component: FormDatePickerComponent },
        { name: 'repeat', component: RepeatTypeComponent },
      ],
      wrappers: [{ name: 'form-field-horizontal', component: FormlyHorizontalWrapper }],
      validationMessages: [
        { name: 'required', message: 'Thông tin này bắt buộc' },
      ],
    }),
    LaddaModule.forRoot({
      style: "expand-left"
    })
  ],
  declarations: [
    FormInputMarsk,
    RepeatTypeComponent,
    FormDatePickerComponent,
    FormSelectedComponent,
    FormlyHorizontalWrapper,
  ],
  exports: [FormlyBootstrapModule, FormlyModule, FormlyHorizontalWrapper,LaddaModule]
})
export class FormSchemaModule { }