import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTypingBoxComponent } from './search-typing-box.component';

describe('SearchTypingBoxComponent', () => {
  let component: SearchTypingBoxComponent;
  let fixture: ComponentFixture<SearchTypingBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTypingBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTypingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
