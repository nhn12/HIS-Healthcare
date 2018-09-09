import { ComponentUtil } from './../component-util.module';
import { ApplicationPipesModule } from '../../containers/common-pipe/application-pipe.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonDataTableComponent } from './common-data-table.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';



@NgModule({
  imports: [
    CommonModule,
    ApplicationPipesModule,
    NgbModule.forRoot(),
    ComponentUtil
  ],
  declarations: [
    CommonDataTableComponent
  ],
  exports:[
    CommonDataTableComponent
  ],
  providers: []
})
export class CommonDataTableModule { }
