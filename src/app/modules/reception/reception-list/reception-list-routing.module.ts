import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceptionListComponent } from './reception-list.component';


const routes: Routes = [
  {
    path: '',
    component: ReceptionListComponent,
    data: {
      title: 'Tiếp nhận'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionListRoutingModule {}
