import { ConditionOperator } from './../../../../core/http-query/condition/condition-operator';
import { DefaultCondition } from './../../../../core/http-query/condition/default-condition';
import { CommonFiler } from './../../../../core/http-query/filter/common-filter';
import { EnterprisePromise } from './../../../../core/async/enterprise-promise';
import { BlueprintScheduleModel } from './../../model/blueprint-schedule-model';
import { LocalConfigService } from './../../../../core/local-config/local-config-service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ScheduleOptionModel } from './../../model/schedule-option-model';
import { HttpService } from './../../../../core/http/http.service';
import { Optional } from './../../../../shared-component/common-data-table/model/optional';
import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { DataTableModel, TableMappingDto } from '../../../../shared-component/common-data-table/model/data-table-model';
import { Router } from '@angular/router';
import { BaseDataListComponent } from '../../../../core/form/base-data-list-component';
import { Filter } from '../../../../core/http-query/filter/filter';
import { Sort } from '../../../../core/http-query/sort/sort';
import { Paging } from '../../../../core/http-query/paging/paging';
import { CommonPaging } from '../../../../core/http-query/paging/common-paging';
import { AppConstants } from '../../../../variable-defination/app-constanst';
import { ResponseModel } from '../../../../core/http-service/model/response-model';

@Component({
	selector: 'blueprint-schedule-list',
	templateUrl: 'blueprint-schedule-list.component.html',
	styleUrls: ['blueprint-schedule-list.component.scss']
})

export class BlueprintScheduleListComponent implements OnInit {


	mapTable: TableMappingDto[] = [];
	data: DataTableModel = new DataTableModel();
	option: Optional = new Optional();
	constructor(public injector: Injector, public httpService: HttpService) {
	}

	async ngOnInit() {
		this.mapTable.push(new TableMappingDto('Bác sĩ', 'doctor_name'));
		this.mapTable.push(new TableMappingDto('Chuyên khoa', 'specialization_name'));
		this.mapTable.push(new TableMappingDto('Ngày khám', 'date', 'date'));
		this.mapTable.push(new TableMappingDto('Thời gian', 'time', 'html', (data) => {
			if (data) {
				data['time_custom'] = '';
				if (data.time && data.time.length > 0) {
					data.time.forEach((element, index) => {
						data['time_custom'] += '<span>Phòng khám: </span><strong>' + element.ward_obj[0].name + '</strong>. Từ: <strong>' + element.start_time + "</strong> đến <strong>" + element.end_time + "</strong>";
						if(index != (data.time.length -1)) {
							data['time_custom'] += '<br>'
						}
					});
				}
			}
			return data;
		}));

		this.data.tableMapping = this.mapTable;
		this.option = new Optional();
		this.option.isAdd = true;
		this.option['isEdit'] = false;
		this.option['isDelete'] = true;
		this.data.url = "blueprint-schedule";
	}
}