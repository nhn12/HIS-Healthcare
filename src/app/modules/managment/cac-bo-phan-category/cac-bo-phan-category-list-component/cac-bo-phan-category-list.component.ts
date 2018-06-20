import { Component, OnInit } from '@angular/core';
import { TableMappingDto } from '../../../category/services/data/table-mapping-dto';
import { Option } from '../../../../share-component/common-list-component/common-list.component';

@Component({
  selector: 'app-cac-bo-phan-category-list',
  templateUrl: './cac-bo-phan-category-list.component.html',
  styleUrls: ['./cac-bo-phan-category-list.component.scss']
})
export class CacBoPhanCategoryListComponent implements OnInit {

  mapTable: TableMappingDto[] = [];
  option: Option
  constructor() { }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Mã', 'code'));
    this.mapTable.push(new TableMappingDto('Tên', 'name'));

    this.option = new Option();
    this.option.isDelete = true;
    this.option.isEdit = true;
    this.option.urlCreate = "/cac-bo-phan-category/create";
    this.option.urlEdit = "/cac-bo-phan-category/create";
  }
}
