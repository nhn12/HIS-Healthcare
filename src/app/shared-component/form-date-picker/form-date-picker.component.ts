import { CommonFiler } from './../../core/http-query/filter/common-filter';
import { DefaultCondition } from './../../core/http-query/condition/default-condition';
import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FieldType, FormlyField } from '../../../../node_modules/@ngx-formly/core';
import { HttpService } from '../../core';
import { ConditionOperator } from '../../core/http-query/condition/condition-operator';
import { Condition } from '../../core/http-query/condition/condition';
import { AndCondition } from '../../core/http-query/condition/and-condition';

@Component({
	selector: 'form-date-picker.component',
	templateUrl: 'form-date-picker.component.html',
	styleUrls: ['form-date-picker.component.scss']
})

export class FormDatePickerComponent extends FieldType {

	dataList: any[] = [];
	constructor(public http: HttpService) {
		super();
	 }

	 ngOnChanges(change: SimpleChanges) {
		 console.log(change);
	 }

	async ngOnInit() {
		
	}
}