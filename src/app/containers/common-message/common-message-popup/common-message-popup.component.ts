import { MessageLevel } from '../message-type';
import { MessageUtils } from '../../../core/message/message-util';
/**
 * @author NamNguyen
 * @email nhn12.hoangnam@gmail.com
 * @create date 2018-07-20 10:15:37
 * @modify date 2018-07-20 10:15:37
 * @desc [description]
*/


import { MessageOption } from '../message-optional';
import { Component, OnInit, Input, Optional, SimpleChanges } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-common-message-popup',
  templateUrl: './common-message-popup.component.html',
  styleUrls: ['./common-message-popup.component.scss']
})
export class CommonMessagePopupComponent implements OnInit {

  @Input() messageType: MessageLevel;
  @Input() payload: any;
  @Input() option: MessageOption;

  private typeClass;
  private iconBackground;
  private titleDefault;
  private contentDefault;
  constructor(private bsModalRef: BsModalRef, private messageUtils: MessageUtils) {

  }

  ngOnInit() {
    
  }

  public goAction() {
    switch (this.messageType) {
      case MessageLevel.ERROR: 
          this.typeClass = "error"; 
          this.iconBackground = "fa-times-circle";
      case MessageLevel.AUTHENTICATION_ERROR:
          this.typeClass = "error"; 
          this.iconBackground = "fa-times-circle";
          this.titleDefault = "ERROR"
          this.contentDefault = this.messageUtils.getMessage('ERR_002');
          break;
      case MessageLevel.WARNING: 
          this.titleDefault = "WARNING"
          this.iconBackground = "exclamation-circle";
          this.typeClass = "warning"; 
          break;
      case MessageLevel.SUCCESS:
          this.titleDefault = "SUCCESS";
          this.typeClass = "success"; 
          this.iconBackground = "fa-check-circle";
          break;
      default: 
          this.titleDefault = "SUCCESS";
          this.iconBackground = "fa-check-circle";
          this.typeClass = "success";
    }

    if(this.option) {
      this.titleDefault = this.option.title;
      this.contentDefault = this.option.content;
    }
  }

  
  ngOnChanges(changes: SimpleChanges) {
    if(changes['messageType']) {
      this.goAction();
    }
  }


  onCloseClick() {
    // Callback payload if it exist
    if (this.payload) {
      this.payload();
    }
    this.bsModalRef.hide();
  }
}
