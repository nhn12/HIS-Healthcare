import { Optional } from '../../../../shared-component/common-data-table/model/optional'
import { Component, OnInit } from '@angular/core';
import { DataTableModel, TableMappingDto } from '../../../../shared-component/common-data-table/model/data-table-model';

@Component({
	selector: 'role-management',
	templateUrl: 'role-management.component.html',
	styleUrls: ['role-management.component.scss']
})

export class RoleManagementComponent implements OnInit {

	optionTable: Optional = new Optional();
	dataTable: DataTableModel = new DataTableModel();
	constructor() { }

	ngOnInit() {
		this.dataTable.tableMapping = [
			new TableMappingDto('ID', 'id'),
			new TableMappingDto('Tên', 'name'),
			new TableMappingDto('Quyền truy cập', 'operationObjView', null, (data) => {
				if (data && data.operationObj && data.operationObj.length > 0) {
					return data.operationObj.map(value => {
						return value.name;
					}).join(', ');
				} else {
					return data;
				}
			})
		]

		this.dataTable.url = 'role';
		this.optionTable.quantityPerPage = 5;
	}
}