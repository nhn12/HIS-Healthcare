import { LocalConfigService } from './../../../../core/local-config/local-config-service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ScheduleOptionModel } from './../../model/schedule-option-model';
import { HttpService } from './../../../../core/http/http.service';
import { Optional } from './../../../../shared-component/common-data-table/model/optional';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableModel, TableMappingDto } from '../../../../shared-component/common-data-table/model/data-table-model';
import { Router } from '@angular/router';

@Component({
	selector: 'blueprint-schedule-list',
	templateUrl: 'blueprint-schedule-list.component.html',
	styleUrls: ['blueprint-schedule-list.component.scss']
})

export class BlueprintScheduleListComponent implements OnInit {

	mapTable: TableMappingDto[] = [];
	data: DataTableModel = new DataTableModel();
	option: Optional = new Optional();

	trueValue: boolean = true;

	scheduleOption: ScheduleOptionModel[] = [];

	currentDate: Date = new Date();
	tomorrowDate: Date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	rangeDate: any;

	isLoading: boolean = false;

	@ViewChild(ModalDirective) wardModal: ModalDirective;
	constructor(private route: Router, public http: HttpService, public localConfig: LocalConfigService) {
	}

	ngOnInit() {
		this.mapTable.push(new TableMappingDto('Phòng khám', 'ward_name'));
		this.mapTable.push(new TableMappingDto('Chuyên khoa', 'specialization_name'));
		this.mapTable.push(new TableMappingDto('Bắt đầu', 'start_time'));
		this.mapTable.push(new TableMappingDto('Kết thúc', 'end_time'));
		this.mapTable.push(new TableMappingDto('TGTB khám', 'period'));
		this.data.tableMapping = this.mapTable;
		this.data.url = 'blueprint-schedule';
		this.option.isAdd = true;
		this.option.overrideAddClick = () => { this.openScheduleConfig() };
		this.initScheduleForm();
		this.localConfig.getConfig("user");

	}

	openScheduleConfig() {
		this.wardModal.show();
	}

	initScheduleForm() {
		this.scheduleOption.push(new ScheduleOptionModel("date", null, null, "Ngày", true, true, null, false, [
			new ScheduleOptionModel("totday", new Date(), new Date(), "Hôm nay", false, true, 'date', false, null),
			new ScheduleOptionModel("tomorrow", this.tomorrowDate, this.tomorrowDate, "Ngày mai", false, false, 'date', false, null),
			new ScheduleOptionModel("option_date", null, null, "Tuỳ chọn", false, false, 'date', true, null),
			new ScheduleOptionModel("range_date", null, null, "Từ ngày - đến ngày", false, false, 'date_range', true, null)
		]))

		console.log(this.scheduleOption);

		this.scheduleOption.push(new ScheduleOptionModel("month", null, null, "Tháng", true, false, null, false, [
		]))

		this.scheduleOption.push(new ScheduleOptionModel("quarter", null, null, "Qúy", true, false, null, false, [
		]))

		this.scheduleOption.push(new ScheduleOptionModel("year", null, null, "Năm", true, false, null, false, [
		]))
	}

	selectOptionSchedule(index, list: ScheduleOptionModel[]) {
		//this.scheduleOption.option = index;
		list.map(x => {
			if (x.option == index) {
				x.selected = true;
			} else {
				x.selected = false;
			}
		})
	}

	public async quyhoach() {
		let item = this.checkValidate();
		if (item.type == 'date_range') {
			item.end_time = item.start_time[1];
			item.start_time = item.start_time[0];
		}

		if (item.option == 'option_date') {
			item.end_time = item.start_time;
		}

		item.hospital_id = <Number>(await this.localConfig.getConfig("user")).hospital_id;

		if (item) {
			this.isLoading = true;
			const [err, response] = await this.http.insert("schedule/insert", item, null).await();
			this.isLoading = false;
			if(err) {
				return;
			}
			this.wardModal.hide();
		}
	}

	checkValidate() {
		let result: ScheduleOptionModel = null;
		this.scheduleOption.forEach(element => {
			if (element.selected == true) {
				element.subSchedule.forEach(item => {
					if (item.selected == true) {
						result = item;
					}
				})
			}
		})
		return result;
	}

}