import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TongQuatPublicFormComponent } from './tong-quat-public-form.component';

describe('TongQuatPublicFormComponent', () => {
  let component: TongQuatPublicFormComponent;
  let fixture: ComponentFixture<TongQuatPublicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TongQuatPublicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TongQuatPublicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
