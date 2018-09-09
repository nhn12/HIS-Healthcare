
import { Component, SimpleChanges } from '@angular/core';
import { FieldType } from '../../../../node_modules/@ngx-formly/core';
import { HttpService } from '../../core';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

@Component({
	selector: 'input-marsk',
	templateUrl: 'form-input-marsk.html',
	styleUrls: ['form-input-marsk.scss']
})

export class FormInputMarsk extends FieldType {

	public mask = [];
	public pipe: any;
	public autoCorrectedDatePipe;
	constructor(public http: HttpService) {
		super();
		this.autoCorrectedDatePipe = createAutoCorrectedDatePipe('HH:MM');
		this.pipe = this.autoCorrectedDatePipe;
	 }

	 ngOnChanges(change: SimpleChanges) {
		
	 }

	async ngOnInit() {
		this.mask = this.field.expressionProperties.mask;
		if(this.field.expressionProperties.pipe) {
			this.pipe = this.autoCorrectedDatePipe(this.field.expressionProperties.pipe);
		}
	}
}