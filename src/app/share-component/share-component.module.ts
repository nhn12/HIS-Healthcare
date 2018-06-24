import { CommonModule } from '@angular/common';
import { PagingIndexComponent } from 'app/share-component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [FormsModule, CommonModule,NgbModule.forRoot()],
  declarations: [PagingIndexComponent],
  exports: [PagingIndexComponent],
  providers: []
})
export class ShareComponentModule {


  constructor() {
    
  }
}
