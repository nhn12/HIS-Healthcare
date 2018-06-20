import { Component, OnInit } from '@angular/core';
import { TableMappingDto } from '../../../category/services/data/table-mapping-dto';
import { Option } from '../../../../share-component/common-list-component/common-list.component';

@Component({
  selector: 'app-trieu-chung-category-list',
  templateUrl: './trieu-chung-category-list.component.html',
  styleUrls: ['./trieu-chung-category-list.component.scss']
})
export class TrieuChungCategoryListComponent implements OnInit {

  mapTable: TableMappingDto[] = [];
  option: Option
  constructor() { }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Mã', 'code'));
    this.mapTable.push(new TableMappingDto('Tên', 'name'));

    this.option = new Option();
    this.option.isDelete = true;
    this.option.isEdit = true;
    this.option.urlCreate = "/trieu-chung-category/create";
    this.option.urlEdit = "/trieu-chung-category/create";
  }
}
