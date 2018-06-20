import { Component, OnInit } from '@angular/core';
import { TableMappingDto } from '../../../category/services/data/table-mapping-dto';
import { Option } from '../../../../share-component/common-list-component/common-list.component';

@Component({
  selector: 'app-tien-can-category-list',
  templateUrl: './tien-can-category-list.component.html',
  styleUrls: ['./tien-can-category-list.component.scss']
})
export class TienCanCategoryListComponent implements OnInit {

  mapTable: TableMappingDto[] = [];
  option: Option
  constructor() { }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Mã', 'code'));
    this.mapTable.push(new TableMappingDto('Tên', 'name'));

    this.option = new Option();
    this.option.isDelete = true;
    this.option.isEdit = true;
    this.option.urlCreate = "/tien-can-category/create";
    this.option.urlEdit = "/tien-can-category/create";
  }
}
