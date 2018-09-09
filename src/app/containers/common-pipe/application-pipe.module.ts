import { NotificationTimePipe } from './time-pipe';
import { NgModule } from '@angular/core';
import { MessagePipe } from "./message-pipe";
import { DatePipe } from '@angular/common';

// other imports

@NgModule({
    imports: [
        // dep modules
    ],
    declarations: [
        MessagePipe,
        NotificationTimePipe
    ],
    exports: [
        MessagePipe,
        NotificationTimePipe
    ],
    providers:[DatePipe]
})
export class ApplicationPipesModule {
}

