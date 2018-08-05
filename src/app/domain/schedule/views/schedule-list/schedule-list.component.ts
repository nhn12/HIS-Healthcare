import { Optional } from './../../../../shared-component/common-data-table/model/optional';
import { TableMappingDto, DataTableModel } from './../../../../shared-component/common-data-table/model/data-table-model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObjectUnsubscribedError } from 'rxjs';

@Component({
	selector: 'schedule-list',
	templateUrl: 'schedule-list.component.html',
	styleUrls: ['schedule-list.component.scss']
})

export class ScheduleListComponent implements OnInit {

	mapTable: TableMappingDto[] = [];
	data: DataTableModel = new DataTableModel();
	option: Optional = new Optional();
	constructor(private route: Router) {

	}

	ngOnInit() {
		this.mapTable.push(new TableMappingDto('Phòng khám', 'ward_name'));
		this.mapTable.push(new TableMappingDto('Chuyên khoa', 'specialization_name'));
		this.mapTable.push(new TableMappingDto('Ngày khám', 'start_time', 'date'));
		this.mapTable.push(new TableMappingDto('Giờ khám', 'start_time', 'time', null));
		this.mapTable.push(new TableMappingDto('Thời gian', 'period'));
		this.mapTable.push(new TableMappingDto('Trạng thái', 'reserve', 'icon', (data) => {
			if (data) {
				if (data.reserve == true) {
					data['reserve_custom'] = '<span class="badge badge-secondary">Đã đặt</span>';
				} else {
					data['reserve_custom'] = '<span class="badge badge-primary">Còn trống</span>';
				}
			}
			return data;
		}));

		this.data.tableMapping = this.mapTable;
		this.option = new Optional();
		this.option.isAdd = false;
		this.option['isEdit'] = false;
		this.option['isDelete'] = false;
		this.data.url = "schedule";
		//this.scheduleOption.option = 'date';
	}

}