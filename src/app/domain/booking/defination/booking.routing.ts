import { BookingListComponent } from './../views/booking-list/booking-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: 'booking',
        data: {
            title: 'Tổ chức'
        },
        children: [
            {
                path: "list",
                component: BookingListComponent,
                data: {
                    title: "Đăng ký"
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BookingRoutingModule { }
