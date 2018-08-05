import { CommonMessagePopupComponent } from './common-message-popup/common-message-popup.component';
import { MessageLevel, MessageType } from './message-type';
import { BsModalService } from 'ngx-bootstrap';
import { MessageOption } from './message-optional';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
/**
 * @author NamNguyen
 * @email nhn12.hoangnam@gmail.com
 * @create date 2018-07-21 10:59:49
 * @modify date 2018-07-21 10:59:49
 * @desc [description]
*/

@Injectable()
export class MessageManagementService {
    constructor(private modalService: BsModalService, private toastr: ToastrService) {

    }

    public showMessage(messageType: MessageType, messageLevel: MessageLevel, option: MessageOption) {
        switch(messageType) {
            case MessageType.POPUP: 
                this.showPopupMessage(messageLevel, option);
                break;
            case MessageType.TOAST:
                this.showToastMessage(messageLevel, option);
                break;
            case MessageType.LOADING:
                break;
        }
    }

    private showPopupMessage(messageLevel: MessageLevel, option: MessageOption) {
        let bsModalRef = this.modalService.show(CommonMessagePopupComponent, {});
        bsModalRef.content.option = option;
        bsModalRef.content.messageType = messageLevel;
        bsModalRef.content.goAction();
    }

    private showToastMessage(messageLevel: MessageLevel, option: MessageOption) {
        switch (messageLevel) {
            case MessageLevel.ERROR:
                this.toastr.error(option.content, option.title);
                break;
            case MessageLevel.SUCCESS:
                this.toastr.success(option.content, option.title);
                break;
            case MessageLevel.WARNING:
                this.toastr.warning(option.content, option.title);
                break;
        }
    }
}