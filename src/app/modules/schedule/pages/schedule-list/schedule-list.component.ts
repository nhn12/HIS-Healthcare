import { ScheduleService } from 'app/modules/schedule/service/schedule-service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from 'app/utils/app-constants';
import { CategoryService } from 'app/modules/category/services/category.service';
import { TableMappingDto } from 'app/modules/category/services/data/table-mapping-dto';
import { ScheduleOptionDto } from 'app/modules/schedule/pages/blueprint-schedule-list/data/schedule-option-dto';
import to from '../../../../utils/promise-utils';

@Component({
  templateUrl: 'schedule-list.component.html',
  selector: "schedule-list",
  styleUrls: ['schedule-list.component.scss'],
  providers: [ScheduleService]
})
export class ScheduleListComponent implements OnInit {
  mapTable: TableMappingDto[] = [];

  index: number = 0;

  trueValue: boolean = true;

  scheduleOption: ScheduleOptionDto[] = [];

  currentDate: Date = new Date();
  tomorrowDate: Date = new Date(new Date().getTime() + 24*60*60*1000);
  rangeDate: any;

  isLoading: boolean = false;
  @ViewChild(ModalDirective) wardModal: ModalDirective;

  constructor(private route: Router) {

  }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Phòng khám', 'ward_name'));
    this.mapTable.push(new TableMappingDto('Chuyên khoa', 'specialization_name'));
    this.mapTable.push(new TableMappingDto('Ngày khám', 'start_time', 'date'));
    this.mapTable.push(new TableMappingDto('Giờ khám', 'start_time_string'));
    this.mapTable.push(new TableMappingDto('Thời gian', 'period'));
    //this.scheduleOption.option = 'date';
  }

 
}

