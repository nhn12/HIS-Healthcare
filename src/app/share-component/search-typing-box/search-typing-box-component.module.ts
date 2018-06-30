import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SearchTypingBoxComponent } from "./search-typing-box.component";
import { BrowserModule } from "@angular/platform-browser";
import { CategoryService } from "../../modules/category/services/category.service";
import { HttpModule } from "@angular/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [FormsModule, CommonModule, HttpModule, NgbModule.forRoot()],
  declarations: [SearchTypingBoxComponent],
  exports: [SearchTypingBoxComponent],
  providers: [
      CategoryService
  ]
})
export class SearchTypingBoxModule {
  constructor() {
    
  }
}