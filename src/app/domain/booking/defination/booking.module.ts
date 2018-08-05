import { BookingRoutingModule } from './booking.routing';
import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { LaddaModule } from 'angular2-ladda';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonDataTableModule } from '../../../shared-component/common-data-table/common-data-table.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';
import { BookingListComponent } from '../views/booking-list/booking-list.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TextMaskModule,
        ReactiveFormsModule,
        BookingRoutingModule,
        NgSelectModule,
        CommonDataTableModule,
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot(),
        LaddaModule.forRoot({
            style: "expand-left"
        })
    ],
    declarations: [
        BookingListComponent
    ],
    providers: []
})
export class BookingModule { }
