import { HospitalCreateComponent } from '../views/hospital-create/hospital-create.component';
import { HospitalListComponent } from '../views/hospital-list/hospital-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'hospital',
    data: {
      title: 'Login'
    },
    children: [
      {
        path: 'list',
        component: HospitalListComponent,
        data: {
          title: 'Hospital'
        }
      },
      {
        path: 'create',
        component: HospitalCreateComponent,
        data: {
          title: 'Hospital'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalRoutingModule {}
