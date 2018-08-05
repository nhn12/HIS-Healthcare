import { Optional } from '../../../../shared-component/common-data-table/model/optional'
import { TableMappingDto, DataTableModel } from '../../../../shared-component/common-data-table/model/data-table-model'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../../core';
@Component({
  templateUrl: 'doctor-list.component.html',
  selector: "doctor-list",
  styleUrls: ['doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {

  mapTable: TableMappingDto[] = [];
  data: DataTableModel = new DataTableModel();
  option: Optional = new Optional();
  constructor(private route: Router, public http: HttpService) {
  }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Mã', 'code'));
    this.mapTable.push(new TableMappingDto('Tên', 'name'));
    this.mapTable.push(new TableMappingDto('Giới tính', 'gender_name'));
    this.mapTable.push(new TableMappingDto('Năm sinh', 'birthday', 'date'));
    this.mapTable.push(new TableMappingDto('Chuyên khoa', 'specialization_name'));
    this.data.tableMapping = this.mapTable;
    this.data.url = "doctor";
    this.option.isAdd = true;
  }
}
