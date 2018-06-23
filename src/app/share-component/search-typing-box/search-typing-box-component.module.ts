import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SearchTypingBoxComponent } from "./search-typing-box.component";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [SearchTypingBoxComponent],
  exports: [SearchTypingBoxComponent],
  providers: []
})
export class SearchTypingBoxModule {
  constructor() {
    
  }
}
