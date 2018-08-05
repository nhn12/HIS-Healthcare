import { environment } from './../../../../../environments/environment';
import { DataTableModel, TableMappingDto } from './../../../../shared-component/common-data-table/model/data-table-model';
import { Optional } from './../../../../shared-component/common-data-table/model/optional';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs';

@Component({
	selector: 'booking-list',
	templateUrl: 'booking-list.component.html',
	styleUrls: ['booking-list.component.scss']
})

export class BookingListComponent implements OnInit {

	mapTable: TableMappingDto[] = [];
	data: DataTableModel = new DataTableModel();
	option: Optional = new Optional();

	private socket: SocketIOClient.Socket;
	private eventsSubject: Subject<void> = new Subject<void>();

	constructor(private route: Router) {

	}

	ngOnInit() {
		this.mapTable.push(new TableMappingDto('ID', 'id'));
		this.mapTable.push(new TableMappingDto('Ngày ĐKKB', 'ngaydkkb', 'date'));
		this.mapTable.push(new TableMappingDto('Họ tên', 'hoten'));
		this.mapTable.push(new TableMappingDto('Giới tính', 'gender_name'));
		this.mapTable.push(new TableMappingDto('Năm sinh', 'namsinh'));
		this.mapTable.push(new TableMappingDto('Địa chỉ', 'diachi'));
		this.mapTable.push(new TableMappingDto('Triệu chứng', 'trieuchung'));
		this.mapTable.push(new TableMappingDto('Chuyên khoa', 'tenck'));
		this.mapTable.push(new TableMappingDto('Phòng khám', 'tenpk'));
		this.mapTable.push(new TableMappingDto('Tình trạng', 'is_accept', "icon", (data) => {
			if (data) {
				if (data.is_accept) {
					data.is_accept_custom = '<span class="badge badge-success">Đã xác nhận</span>';
				} else {
					data.is_accept_custom = '<span class="badge badge-secondary">Đã hủy</span>';
				}
			}
			return data;
		}));

		this.data.tableMapping = this.mapTable;
		this.option = new Optional();
		this.option.isAdd = false;
		this.option['isEdit'] = false;
		this.option['isDelete'] = false;
		this.data.url = "registration";

		this.socket = io(environment.serverUrl.replace("/api/", ""));
		this.socket.on('registration', (data) => {
			this.eventsSubject.next();
		});
	}

	ngOnDestroy() {
		this.socket.disconnect();
	}
}