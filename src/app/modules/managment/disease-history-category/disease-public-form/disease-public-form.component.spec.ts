import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseasePublicFormComponent } from './disease-public-form.component';

describe('DiseasePublicFormComponent', () => {
  let component: DiseasePublicFormComponent;
  let fixture: ComponentFixture<DiseasePublicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseasePublicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseasePublicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
