import { SpecializationCreateComponent } from '../views/specialization/specialization-create.component'
import { SpecializationListComponent } from '../views/specialization/specialization-list.component'
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorCreateComponent } from '../views/doctor/doctor-create.component';
import { DoctorListComponent } from '../views/doctor/doctor-list.component';
import { WardListComponent } from '../views/ward/ward-list.component';
import { WardCreateComponent } from '../views/ward/ward-create.component';

const routes: Routes = [
    {
        path: 'category',
        data: {
            title: 'Danh mục'
        },
        children: [
            {
                path: 'doctor',
                data: { title: "Bác sĩ" },
                children: [{
                    path: 'list',
                    component: DoctorListComponent,
                    data: {
                        title: "Danh sách bác sĩ"
                    }
                },
                {
                    path: 'create',
                    component: DoctorCreateComponent,
                    data: {
                        title: 'Bác sĩ mới'
                    }

                }]
            },
            {
                path: 'specialization',
                data: { title: "Chuyên khoa" },
                children: [{
                    path: 'list',
                    component: SpecializationListComponent,
                    data: {
                        title: "Danh sách chuyên khoa"
                    }
                }, {
                    path: 'create',
                    component: SpecializationCreateComponent,
                    data: {
                        title: 'Chuyên khoa mới'
                    }
                }]
            }, {
                path: 'ward',
                data: { title: "Phòng khám" },
                children: [{
                    path: 'list',
                    component: WardListComponent,
                    data: {
                        title: "Danh sách phòng khám"
                    }
                }, {
                    path: 'create',
                    component: WardCreateComponent,
                    data: {
                        title: 'Phòng khám mới'
                    }
                }]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }
