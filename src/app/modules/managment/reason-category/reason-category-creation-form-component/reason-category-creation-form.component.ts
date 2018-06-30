import { Component, OnInit } from '@angular/core';
import { CommonForm } from '../../../../core/common-form/common-form';
import { Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from '../../../category/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reason-category-creation-form',
  templateUrl: './reason-category-creation-form.component.html',
  styleUrls: ['./reason-category-creation-form.component.scss'],
  providers: [CategoryService]
})
export class ReasonCategoryCreationFormComponent extends CommonForm implements OnInit {
  
  constructor(public location: Location, 
    public router: Router, 
    public routeP: ActivatedRoute, 
    public fb: FormBuilder, 
    public categoryService: CategoryService){
    super(location, router, routeP, fb);
  }
  
  ngOnInit() {
  }

  public initFormBuilder() {
    this.complexForm = this.fb.group({
      'id': [null],
      'name': [null, Validators.compose([Validators.required])],
      'allow_description': [null]
    })
  }
  public setService() {
    this.categoryService.setResource('ReasonCategory_tbl');
    return this.categoryService;
  }
  public setMappingData() {
    return {};
  }
  public getSubForms() {
    
  }

}