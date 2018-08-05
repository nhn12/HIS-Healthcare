import { MessageConst } from '../../variable-defination/message/message';
import { HttpClient } from '@angular/common/http';
import { MessageOptional } from './message-optional';
import { CoreConstants } from "../constant/constant";
import { Injectable } from "@angular/core";
import { EnterprisePromise } from "../async/enterprise-promise";
import { TechnicalExceptionObject } from "../exception/technical-exception-object";
import { MessageType } from "./message-type";

/**
 * Message utils. Load message from file asset/message.json
 * @requires: Injectable of Angular.
 * @author: NamNguyen
 */

 @Injectable()
export class MessageUtils {
    private defaultMessage: string = CoreConstants.ERR_001;

    private messageData: object = {};

    constructor(private http: HttpClient) {
        this.loadMessage();
    }

    public showMessage(messageCode,messageType: MessageType, optional?: MessageOptional) {
        // Implement later
    }

    public getMessage(messageCode: string): string {
        return this.messageData[messageCode];
    }

    private loadMessage(): EnterprisePromise<boolean> {
        return new EnterprisePromise<any>((resolve, reject)=> {
            this.messageData = MessageConst;
        })
    }
}