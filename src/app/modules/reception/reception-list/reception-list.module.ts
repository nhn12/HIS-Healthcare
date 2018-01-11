import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ReceptionListComponent } from './reception-list.component';
import { ReceptionListRoutingModule } from './reception-list-routing.module';

@NgModule({
  imports: [
    ReceptionListRoutingModule
  ],
  declarations: [ ReceptionListComponent ]
})
export class ReceptionListModule { }
