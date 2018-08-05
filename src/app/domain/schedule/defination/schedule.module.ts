import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { LaddaModule } from 'angular2-ladda';
import { BlueprintScheduleListComponent } from './../views/blueprint-schedule-list/blueprint-schedule-list.component';
import { ScheduleListComponent } from './../views/schedule-list/schedule-list.component';
import { BlueprintScheduleCreateComponent } from './../views/blueprint-schedule-create/blueprint-schedule-create.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonDataTableModule } from '../../../shared-component/common-data-table/common-data-table.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TextMaskModule,
        ReactiveFormsModule,
        ScheduleRoutingModule,
        NgSelectModule,
        CommonDataTableModule,
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot(),
        LaddaModule.forRoot({
            style: "expand-left"
        })
    ],
    declarations: [
        BlueprintScheduleCreateComponent,
        BlueprintScheduleListComponent,
        ScheduleListComponent
    ],
    providers: []
})
export class ScheduleModule { }
