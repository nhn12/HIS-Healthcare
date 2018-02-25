import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from 'app/utils/app-constants';
import { CategoryService } from 'app/modules/category/services/category.service';
import { TableMappingDto } from 'app/modules/category/services/data/table-mapping-dto';
import { ScheduleOptionDto } from 'app/modules/schedule/pages/blueprint-schedule-list/data/schedule-option-dto';

@Component({
  templateUrl: 'blueprint-schedule-list.component.html',
  selector: "blueprint-schedule-list",
  styleUrls: ['blueprint-schedule-list.component.scss'],
  providers: [CategoryService]
})
export class BlueprintScheduleListComponent implements OnInit {
  mapTable: TableMappingDto[] = [];

  index: number = 0;

  scheduleOption: ScheduleOptionDto = new ScheduleOptionDto();

  currentDate: Date = new Date();
  tomorrowDate: Date = new Date(new Date().getTime() + 24*60*60*1000);
  constructor(private route: Router) {

  }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Phòng khám', 'ward_name'));
    this.mapTable.push(new TableMappingDto('Chuyên khoa', 'specialization_name'));
    this.mapTable.push(new TableMappingDto('Bắt đầu', 'start_time'));
    this.mapTable.push(new TableMappingDto('Kết thúc', 'end_time'));
    this.mapTable.push(new TableMappingDto('TGTB khám', 'period'));

    this.scheduleOption.option = 'date';
  }

  selectOptionSchedule(index) {
    this.scheduleOption.option = index;
  }

  removeItem(item) {
    console.log(item);
  }

  add(data) {
    this.route.navigate(['/schedule/blueprint-schedule-create'], { replaceUrl: true });
  }
}
