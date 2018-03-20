import { ReceptionCreateComponent } from './../reception-create/reception-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceptionListComponent } from './reception-list.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tiếp nhận'
    }
    ,children: [
      {
        path: 'reception-list',
        component: ReceptionListComponent,
        data: {
          title: 'Tiếp nhận'
        }
      },
      {
        path: 'reception-create',
        component: ReceptionCreateComponent,
        data: {
          title: 'Tiếp nhận'
        }
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionListRoutingModule {}
