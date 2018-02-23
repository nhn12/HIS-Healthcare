import { CommonModule } from '@angular/common';
import { PagingIndexComponent } from 'app/share-component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [PagingIndexComponent],
  exports: [PagingIndexComponent],
  providers: []
})
export class ShareComponentModule {


  constructor() {
    
  }
}
