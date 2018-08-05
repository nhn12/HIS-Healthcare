import { Injectable } from '@angular/core';
/**
 * @author NamNguyen
 * @email nhn12.hoangnam@gmail.com
 * @create date 2018-07-22 02:06:48
 * @modify date 2018-07-22 02:06:48
 * @desc Message pipe
*/
import { Pipe, PipeTransform } from "@angular/core";
import { MessageConst } from '../../variable-defination/message/message';

@Pipe({ name: 'message' })
export class MessagePipe implements PipeTransform {
    transform(messageCode: string): string {
        if (!messageCode) {
            return null;
        }
        return MessageConst[messageCode];
    }
}
