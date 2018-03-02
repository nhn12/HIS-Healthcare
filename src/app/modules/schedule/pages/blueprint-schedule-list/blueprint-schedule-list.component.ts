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
  templateUrl: 'blueprint-schedule-list.component.html',
  selector: "blueprint-schedule-list",
  styleUrls: ['blueprint-schedule-list.component.scss'],
  providers: [ScheduleService]
})
export class BlueprintScheduleListComponent implements OnInit {
  mapTable: TableMappingDto[] = [];

  index: number = 0;

  trueValue: boolean = true;

  scheduleOption: ScheduleOptionDto[] = [];

  currentDate: Date = new Date();
  tomorrowDate: Date = new Date(new Date().getTime() + 24*60*60*1000);
  rangeDate: any;
  @ViewChild(ModalDirective) wardModal: ModalDirective;

  constructor(private route: Router, public scheduleService: ScheduleService) {

  }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Phòng khám', 'ward_name'));
    this.mapTable.push(new TableMappingDto('Chuyên khoa', 'specialization_name'));
    this.mapTable.push(new TableMappingDto('Bắt đầu', 'start_time'));
    this.mapTable.push(new TableMappingDto('Kết thúc', 'end_time'));
    this.mapTable.push(new TableMappingDto('TGTB khám', 'period'));
    this.initScheduleForm();

    //this.scheduleOption.option = 'date';
  }

  initScheduleForm() {
    this.scheduleOption.push(new ScheduleOptionDto("date", null, null, "Ngày", true, true, null, false, [
      new ScheduleOptionDto("totday", new Date(), new Date(), "Hôm nay", false, true,  'date', false, null),
      new ScheduleOptionDto("tomorrow", this.tomorrowDate, this.tomorrowDate, "Ngày mai", false, false,  'date', false, null),
      new ScheduleOptionDto("option_date", null, null, "Tuỳ chọn", false, false,  'date', true, null),
      new ScheduleOptionDto("range_date", null, null, "Từ ngày - đến ngày", false, false,  'date_range', true, null)
    ]))

    console.log(this.scheduleOption);

    this.scheduleOption.push(new ScheduleOptionDto("month", null, null, "Tháng", true, false,  null, false, [
      // new ScheduleOptionDto("totday", new Date(), new Date(), "Hôm nay", false, null),
      // new ScheduleOptionDto("tomorrow", this.tomorrowDate, this.tomorrowDate, "Ngày mai", false, null),
      // new ScheduleOptionDto("option_date", null, null, "Tuỳ chọn", false, null),
      // new ScheduleOptionDto("range_date", null, null, "Từ ngày - đến ngày", false, null)
    ]))

    this.scheduleOption.push(new ScheduleOptionDto("quarter", null, null, "Qúy", true, false,  null, false, [
      // new ScheduleOptionDto("totday", new Date(), new Date(), "Hôm nay", false, null),
      // new ScheduleOptionDto("tomorrow", this.tomorrowDate, this.tomorrowDate, "Ngày mai", false, null),
      // new ScheduleOptionDto("option_date", null, null, "Tuỳ chọn", false, null),
      // new ScheduleOptionDto("range_date", null, null, "Từ ngày - đến ngày", false, null)
    ]))

    this.scheduleOption.push(new ScheduleOptionDto("year", null, null, "Năm", true, false,  null, false, [
      // new ScheduleOptionDto("totday", new Date(), new Date(), "Hôm nay", false, null),
      // new ScheduleOptionDto("tomorrow", this.tomorrowDate, this.tomorrowDate, "Ngày mai", false, null),
      // new ScheduleOptionDto("option_date", null, null, "Tuỳ chọn", false, null),
      // new ScheduleOptionDto("range_date", null, null, "Từ ngày - đến ngày", false, null)
    ]))
  }

  selectOptionSchedule(index, list: ScheduleOptionDto[]) {
    //this.scheduleOption.option = index;
    list.map(x => {
      if (x.option == index) {
        x.selected = true;
      } else {
        x.selected = false;
      }
    })
  }

  removeItem(item) {
    console.log(item);
  }

  add(data) {
    this.route.navigate(['/schedule/blueprint-schedule-create'], { replaceUrl: true });
  }

  public async quyhoach() {
    let item = this.checkValidate();
    if(item.type == 'date_range'){
       item.end_time = item.start_time[1];
       item.start_time = item.start_time[0];
    }
    if(item) {
      let [err, response] = await to(this.scheduleService.insertOne(item).toPromise());
      this.wardModal.hide();
    }
    
  }

  checkValidate() {
    let result: ScheduleOptionDto = null;
    this.scheduleOption.forEach(element=>{
      if(element.selected == true) {
        element.subSchedule.forEach(item=>{
          if(item.selected == true) {
            result = item;
          }
        })
      }
    })
    return result;
  }
}

