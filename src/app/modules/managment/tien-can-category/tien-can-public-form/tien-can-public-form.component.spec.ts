import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TienCanPublicFormComponent } from './tien-can-public-form.component';

describe('TienCanPublicFormComponent', () => {
  let component: TienCanPublicFormComponent;
  let fixture: ComponentFixture<TienCanPublicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TienCanPublicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TienCanPublicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
