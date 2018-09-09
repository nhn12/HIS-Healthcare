import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

/**
 * Convert time (Number) to text view
 */
@Pipe({name: 'notificationTime'})
export class NotificationTimePipe implements PipeTransform {
  constructor(public datepipe: DatePipe) {}
  transform(value: Date, args: string[]): any {
    if (!value) return value;

    if(value instanceof String || !(value instanceof Date)) {
        value = new Date(value);
    }
    let currentDate = new Date();
    let distance = (currentDate.getTime() - value.getTime());
    // if(distance >= 7*24*60*60*1000) {
    //     return this.datepipe.transform(currentDate, AppConstants.DATE_TIME_FORMAT);
    // }

    if(distance >= 365*24*60*60*1000) {
        return Math.floor(distance / (365*24*60*60*1000)) + " năm trước";
    }

    if(distance >= 30*24*60*60*1000) {
        return Math.floor(distance/(30*24*60*60*1000)) + " tháng trước";
    }

    if(distance >= 7*24*60*60*1000) {
        return Math.floor(distance/(7*24*60*60*1000)) + " tuần trước";
    }

    if(distance >= 24*60*60*1000) {
        return Math.floor(distance/(24*60*60*1000)) + " ngày trước";
    }

    if(distance >= 60*60*1000) {
        return Math.floor(distance/(60*60*1000)) + " giờ";
    }

    if(distance >= 60*1000) {
        return Math.floor(distance/(60*1000)) + " phút trước";
    }

    if(distance >= 0) {
        return Math.floor(distance/(1000)) + " giây trước";
    }

    return value;
  }
}