import { NgModule } from '@angular/core';
import { MessagePipe } from "./message-pipe";

// other imports

@NgModule({
    imports: [
        // dep modules
    ],
    declarations: [
        MessagePipe
    ],
    exports: [
        MessagePipe
    ]
})
export class ApplicationPipesModule {
}

