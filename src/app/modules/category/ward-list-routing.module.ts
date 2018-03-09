import { DoctorCreateComponent } from './pages/doctor/doctor-create.component';
import { DoctorListComponent } from './pages/doctor/doctor-list.component';
import { SpecializationCreateComponent } from './pages/specialization/specialization-create.component';
import { SpecializationListComponent } from './pages/specialization/specialization-list.component';
import { WardListComponent } from './pages/ward/ward-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WardCreateComponent } from 'app/modules/category/pages/ward/ward-create.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Danh mục'
    },
    children: [
      {
        path: "bac-si-list",
        component: DoctorListComponent,
        data: {
          title:"Bác sĩ"
        }
      },
      {
        path: 'bac-si-create',
        component: DoctorCreateComponent,
        data: {
          title: 'Tạo bác sĩ'
        }
      },
      {
        path: "phong-kham-list",
        component: WardListComponent,
        data: {
          title:"Phòng Khám"
        }
      },
      {
        path: 'phong-kham-create',
        component: WardCreateComponent,
        data: {
          title: 'Tạo phòng khám'
        }
      },
      {
        path: "chuyen-khoa-list",
        component: SpecializationListComponent,
        data: {
          title:"Chuyên Khoa"
        }
      },
      {
        path: 'chuyen-khoa-create',
        component: SpecializationCreateComponent,
        data: {
          title: 'Tạo phòng khám'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {}
