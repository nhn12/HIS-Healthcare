import { environment } from './../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import * as io from "socket.io-client";

@Injectable()
export class SocketService {
    socket: any;
    constructor() {
        this.socket = io(environment.socketApi);
    }    

    public subscibeMessage(eventName, callbackFn: any) {
        if(callbackFn) {
            this.socket.on(eventName, (data)=>{
                callbackFn(data)
            });
        }
    }

}