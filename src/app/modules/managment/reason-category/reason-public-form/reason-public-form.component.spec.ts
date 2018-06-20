import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonPublicFormComponent } from './reason-public-form.component';

describe('ReasonPublicFormComponent', () => {
  let component: ReasonPublicFormComponent;
  let fixture: ComponentFixture<ReasonPublicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonPublicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonPublicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
