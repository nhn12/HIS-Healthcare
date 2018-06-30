import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { CategoryService } from "../../modules/category/services/category.service";
import { HttpModule } from "@angular/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CheckBoxComponent } from "./check-box-component.component";

@NgModule({
  imports: [FormsModule, CommonModule, HttpModule, NgbModule.forRoot()],
  declarations: [CheckBoxComponent],
  exports: [CheckBoxComponent],
  providers: [
      CategoryService
  ]
})
export class CheckBoxComponentModule {
  constructor() {
    
  }
}
