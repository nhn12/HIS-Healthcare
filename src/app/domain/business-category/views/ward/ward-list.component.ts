import { Optional } from '../../../../shared-component/common-data-table/model/optional'
import { TableMappingDto, DataTableModel } from '../../../../shared-component/common-data-table/model/data-table-model'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../../core';
@Component({
  templateUrl: 'ward-list.component.html',
  selector: 'doctor-list',
  styleUrls: ['ward-list.component.scss']
})
export class WardListComponent implements OnInit {

  mapTable: TableMappingDto[] = [];
  data: DataTableModel = new DataTableModel();
  option: Optional = new Optional();
  constructor(private route: Router, public http: HttpService) {
  }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('ID', 'id'));
    this.mapTable.push(new TableMappingDto('Tên', 'name'));
    this.data.tableMapping = this.mapTable;
    this.data.url = 'ward';
    this.option.isAdd = true;
  }
}
