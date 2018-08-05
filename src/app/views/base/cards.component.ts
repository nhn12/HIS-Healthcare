import { MessageManagementService } from '../../containers/common-message/message-management';
import { CommonMessagePopupComponent } from '../../containers/common-message/common-message-popup/common-message-popup.component';
import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { MessageType } from '../../core/message/message-type';
import { MessageLevel } from '../../containers/common-message/message-type';
import { MessageOption } from '../../containers/common-message/message-optional';

@Component({
  templateUrl: 'cards.component.html'
})
export class CardsComponent {

  constructor(private modalService: BsModalService, message: MessageManagementService) {
//    let bsModalRef = this.modalService.show(CommonMessagePopupComponent, {});
   }

}
