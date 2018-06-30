// import { SocketService } from './../service/socket-service';
import { AppConstants } from './../../../utils/app-constants';
import { ReceptionListService } from 'app/modules/reception/service/reception-list.service';
import { CommonPaging } from './../../../core/condition/paging';
import { CommonFilter } from './../../../core/condition/filter';
import { Component, OnInit } from '@angular/core';
import { CommonSort, CommonOrder, ORDER_TYPE } from 'app/core/condition/sort';
import { PagingDto } from 'app/share-component/paging-index';
import { Observable } from 'rxjs/Observable';
import { TableMappingDto } from '../../category/services/data/table-mapping-dto';
import { Option } from '../../../share-component/common-list-component/common-list.component';
import { Router } from '@angular/router';


@Component({
  templateUrl: 'reception-list.component.html',
  selector: "reception-list",
  styleUrls: ['reception-list.component.scss'],
  providers: [ReceptionListService]
})
export class ReceptionListComponent implements OnInit {

  mapTable: TableMappingDto[] = [];
  option: Option
  constructor(private route: Router) {
  }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Ngày giờ', 'created_date', 'date'));
    this.mapTable.push(new TableMappingDto('Mã BA', 'benhan_number'));
    this.mapTable.push(new TableMappingDto('Tên', 'name'));
    this.mapTable.push(new TableMappingDto('G/T', 'genderName'));
    this.mapTable.push(new TableMappingDto('N/S', 'birthday_year'));
    this.mapTable.push(new TableMappingDto('ICD', 'specialization_name'));
    this.mapTable.push(new TableMappingDto('Chuẩn đoán', 'chandoan_des'));

    this.option = new Option();
    this.option.isDelete = true;
    this.option.isEdit = true;
    this.option.urlCreate = "/reception/reception-create";
    this.option.urlEdit = "/reception/reception-create";
    this.option.callbackData = (data)=>{return this.callbackSource(data)}

    this.option.overrideEdit = (item)=>{
      this.route.navigate([this.option.urlCreate], {queryParams: {code: item.benhan_number}, replaceUrl: true });
    }
  }

  callbackSource(data) {
    if(data && data.channel) {
      data['channel_custom'] = (data.channel == 'M'?'<i class="icon-screen-smartphone"></i>':'<i class="icon-home"></i>');
    }

    console.log(data.chandoan);
    if(data && data.chandoan) {
      data['chandoan_des'] = data.chandoan.description;
    }

    return data;
  }

  handleNewRegistration(data: any) {
    console.log(data);
    if(data && data.data) {
     
    }
  }
}
