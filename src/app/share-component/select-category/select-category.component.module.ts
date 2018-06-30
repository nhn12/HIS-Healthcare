import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CategoryService } from "../../modules/category/services/category.service";
import { HttpModule } from "@angular/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SelectCategoryComponent } from "./select-category.component";
import { NgxSelectModule } from "ngx-select-ex";

@NgModule({
  imports: [FormsModule, CommonModule, HttpModule,NgxSelectModule, NgbModule.forRoot()],
  declarations: [SelectCategoryComponent],
  exports: [SelectCategoryComponent],
  providers: [
      CategoryService
  ]
})
export class SelectCategoryModule {
  constructor() {
    
  }
}
