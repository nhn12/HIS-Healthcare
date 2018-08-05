import { MessageManagementService } from './message-management';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { CommonMessagePopupComponent } from './common-message-popup/common-message-popup.component';
/**
 * @author NamNguyen
 * @email nhn12.hoangnam@gmail.com
 * @create date 2018-07-20 01:23:23
 * @modify date 2018-07-20 01:23:23
 * @desc [description]
*/
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  imports: [CommonModule, ModalModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  declarations: [CommonMessagePopupComponent],
    entryComponents: [CommonMessagePopupComponent],
    exports: [CommonMessagePopupComponent],
    providers: [MessageManagementService]
    
})
export class CommonMessagePopupCModule {
}