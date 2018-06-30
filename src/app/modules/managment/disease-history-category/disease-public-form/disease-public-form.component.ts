import { Component, OnInit, OnChanges } from '@angular/core';
import { CommonPublicForm } from '../../../../core/common-form/common-pubic-form';

@Component({
  selector: 'app-disease-public-form',
  templateUrl: './disease-public-form.component.html',
  styleUrls: ['./disease-public-form.component.scss']
})
export class DiseasePublicFormComponent extends CommonPublicForm implements OnInit, OnChanges {

  constructor() { 
    super();
  }

  ngOnInit() {
    this.initComponent();
  }

  protected registerResource() {
    return null;
  }
  protected registerOptional() {
    return null;
  }

}
