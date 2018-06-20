import { Component, OnInit } from '@angular/core';
import { TableMappingDto } from '../../../category/services/data/table-mapping-dto';
import { Option } from '../../../../share-component/common-list-component/common-list.component';

@Component({
  selector: 'app-xu-tri-list',
  templateUrl: './xu-tri-category-list.component.html',
  styleUrls: ['./xu-tri-category-list.component.scss']
})
export class XuTriCategoryListComponent implements OnInit {

  mapTable: TableMappingDto[] = [];
  option: Option
  constructor() { }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Mã', 'code'));
    this.mapTable.push(new TableMappingDto('Tên', 'name'));

    this.option = new Option();
    this.option.isDelete = true;
    this.option.isEdit = true;
    this.option.urlCreate = "/xu-tri-category/create";
    this.option.urlEdit = "/xu-tri-category/create";
  }
}
