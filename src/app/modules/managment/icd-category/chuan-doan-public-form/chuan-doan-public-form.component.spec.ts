import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuanDoanPublicFormComponent } from './chuan-doan-public-form.component';

describe('ChuanDoanPublicFormComponent', () => {
  let component: ChuanDoanPublicFormComponent;
  let fixture: ComponentFixture<ChuanDoanPublicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChuanDoanPublicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuanDoanPublicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
