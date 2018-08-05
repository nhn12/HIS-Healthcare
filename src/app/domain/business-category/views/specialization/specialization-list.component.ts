import { Optional } from '../../../../shared-component/common-data-table/model/optional'
import { TableMappingDto, DataTableModel } from '../../../../shared-component/common-data-table/model/data-table-model'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../../core';
@Component({
  templateUrl: 'specialization-list.component.html',
  selector: "doctor-list",
  styleUrls: ['specialization-list.component.scss']
})
export class SpecializationListComponent implements OnInit {

  mapTable: TableMappingDto[] = [];
  data: DataTableModel = new DataTableModel();
  option: Optional = new Optional();
  constructor(private route: Router, public http: HttpService) {
  }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Mã', 'id'));
    this.mapTable.push(new TableMappingDto('Tên', 'name'));
    this.data.tableMapping = this.mapTable;
    this.data.url = "specialization";
    this.option.isAdd = true;
  }
}
