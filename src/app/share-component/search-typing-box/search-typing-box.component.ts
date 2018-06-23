import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search-typing-box',
  templateUrl: './search-typing-box.component.html',
  styleUrls: ['./search-typing-box.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchTypingBoxComponent),
      multi: true
    }
  ]
})
export class SearchTypingBoxComponent implements OnInit, ControlValueAccessor {

  @Input() resource: string;
  private code: string;

  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
    
  }

  writeValue(obj: any): void {
    
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    
  }
  setDisabledState?(isDisabled: boolean): void {
   
  }

}
