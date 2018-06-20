import { Component, OnInit } from '@angular/core';
import { TableMappingDto } from '../../../category/services/data/table-mapping-dto';
import { Option } from '../../../../share-component/common-list-component/common-list.component';

@Component({
  selector: 'app-tong-quat-category-list',
  templateUrl: './tong-quat-category-list.component.html',
  styleUrls: ['./tong-quat-category-list.component.scss']
})
export class TongQuatCategoryListComponent implements OnInit {

  mapTable: TableMappingDto[] = [];
  option: Option;

  constructor() { }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Mã', 'code'));
    this.mapTable.push(new TableMappingDto('Tên', 'name'));
    this.mapTable.push(new TableMappingDto('Đơn vị', 'unit'));
    this.mapTable.push(new TableMappingDto('Loại', 'type'));
    this.mapTable.push(new TableMappingDto('Alias', 'alias'));
    this.mapTable.push(new TableMappingDto('Vị trí', 'order'));
    this.mapTable.push(new TableMappingDto('Bắt buộc', 'required_view'));

    this.option = new Option();
    this.option.isDelete = true;
    this.option.isEdit = true;
    this.option.urlCreate = "/can-lam-sang-category/create";
    this.option.urlEdit = "/can-lam-sang-category/create";
    this.option.callbackData = (data) => { return this.callbackSource(data) };
  }

  callbackSource(data) {
    if (data && data.required != undefined && data.required != null) {
      data['required_view'] = (data.required == true ? 'Có' : 'Không');
    }

    // if(data && data.has_multifield != undefined && data.has_multifield != null) {
    //   data['has_multifield'] = (data.has_multifield == true?'Có':'Không');
    // }

    return data;
  }
}
