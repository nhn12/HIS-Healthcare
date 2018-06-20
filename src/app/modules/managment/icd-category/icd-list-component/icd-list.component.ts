import { Component, OnInit } from '@angular/core';
import { TableMappingDto } from '../../../category/services/data/table-mapping-dto';
import { Option } from '../../../../share-component/common-list-component/common-list.component';

@Component({
  selector: 'app-icd-list',
  templateUrl: './icd-list.component.html',
  styleUrls: ['./icd-list.component.scss']
})
export class IcdListComponent implements OnInit {

  mapTable: TableMappingDto[] = [];
  option: Option
  constructor() { }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Mã', 'code'));
    this.mapTable.push(new TableMappingDto('Tên', 'name'));

    this.option = new Option();
    this.option.isDelete = true;
    this.option.isEdit = true;
    this.option.urlCreate = "/icd-category/create";
    this.option.urlEdit = "/icd-category/create";
  }
}
