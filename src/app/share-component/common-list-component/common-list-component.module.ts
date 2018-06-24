import { ShareComponentModule } from 'app/share-component/share-component.module';
import { CommonModule } from '@angular/common';
import { PagingIndexComponent } from 'app/share-component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonListComponent } from 'app/share-component/common-list-component/common-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [FormsModule, CommonModule, ShareComponentModule],
  declarations: [CommonListComponent],
  exports: [CommonListComponent],
  providers: []
})
export class CommonListModule {


  constructor() {
    
  }
}
