import { Option } from './../../../../share-component/common-list-component/common-list.component';
import { Router } from '@angular/router';
import { TableMappingDto } from './../../services/data/table-mapping-dto';
import { CommonFilter } from './../../../../core/condition/filter';
import { CommonPaging } from './../../../../core/condition/paging';
import { ReceptionListService } from 'app/modules/reception/service/reception-list.service';
import { Component, OnInit } from '@angular/core';
import { CommonSort, CommonOrder, ORDER_TYPE } from 'app/core/condition/sort';
import { PagingDto } from 'app/share-component/paging-index';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from 'app/utils/app-constants';
import { CategoryService } from 'app/modules/category/services/category.service';

@Component({
  templateUrl: 'specialization-list.component.html',
  selector: "specialization-list",
  styleUrls: ['specialization-list.component.scss'],
  providers: [CategoryService]
})
export class SpecializationListComponent implements OnInit {

  mapTable: TableMappingDto[] = [];
  option: Option;
  constructor(private route: Router) {
  }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Tên', 'name'));
    this.option = new Option();
    this.option.urlCreate = "/category/chuyen-khoa-create";
  }
}
