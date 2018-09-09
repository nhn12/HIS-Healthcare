import { CommonFiler } from './../../core/http-query/filter/common-filter';
import { DefaultCondition } from './../../core/http-query/condition/default-condition';
import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FieldType, FormlyField } from '../../../../node_modules/@ngx-formly/core';
import { HttpService } from '../../core';
import { ConditionOperator } from '../../core/http-query/condition/condition-operator';
import { Condition } from '../../core/http-query/condition/condition';
import { AndCondition } from '../../core/http-query/condition/and-condition';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'form-selected',
	templateUrl: 'form-selected.component.html',
	styleUrls: ['form-selected.component.scss']
})

export class FormSelectedComponent extends FieldType {

	dataList: any[] = [];

	// Optional
	isMultiple: boolean = false;
	constructor(public http: HttpService) {
		super();
	 }

	 ngOnChanges(change: SimpleChanges) {
		 console.log(change);
	 }

	async ngOnInit() {
		if(this.field.templateOptions.attributes) {
			this.isMultiple = (this.field.templateOptions.attributes.multiple == 'true')?true:false;
		}

		this.form.statusChanges.subscribe(result=>{
			console.log(result);
		})
		
		let condition: Condition[] = [];
		if(this.field.templateOptions.attributes.condition) {
			let conditionEX = JSON.parse(<string>this.field.templateOptions.attributes.condition)
			for(var item in conditionEX) {
				condition.push(new DefaultCondition(ConditionOperator.EQ, item, conditionEX[item]));
			}
		}
		condition.push(new DefaultCondition(ConditionOperator.EQ, 'deleted_flag', false));
		let [error, response] = await this.http.search<any>(<string>this.field.templateOptions.attributes.url, new CommonFiler(new AndCondition(condition)), null, null, null).await();
		if(response && response.results) {
			response.results = response.results.map(value=>{
				if(value['code'] == undefined || value['code'] == null) {
					value['code'] = value['id'];
				}

				console.log(this.field.expressionProperties);
				if(this.field.templateOptions && this.field.templateOptions.attributes && this.field.templateOptions.attributes.id) {
					value['code'] = value[this.field.templateOptions.attributes.id];
				}
				return value;
			})
			if(response.results.length == 1) {
				// Auto select
				this.formControl.setValue(response.results[0].code);
			}
			this.dataList = response.results;
		}
	}
}