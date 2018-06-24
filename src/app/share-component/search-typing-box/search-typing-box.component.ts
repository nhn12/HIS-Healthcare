import { Component, OnInit, Input, forwardRef, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CategoryService } from '../../modules/category/services/category.service';
import { CommonFilter } from '../../core/condition/filter';
import { CommonSort, CommonOrder, ORDER_TYPE } from '../../core/condition/sort';
import { CommonPaging } from '../../core/condition/paging';
import { DefaultCondition, ConditionOperator, AndCondition, OrCondition } from '../../core/condition/condition';
import { to } from '../../utils/promise-utils';
import { Http } from '@angular/http';

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
export class SearchTypingBoxComponent implements OnInit, ControlValueAccessor, OnChanges {

  @Input() resource: string;
  private code: string;

  // internl varialble
  public codeTyping: String;
  public nameShow: any;

  public filter: CommonFilter;
  public sort: CommonSort;
  public paging: CommonPaging;
  private defaultConfition: DefaultCondition;
  public listSelected: any[] = [];

  propagateChange = (_: any) => {};

  constructor(private categoryService: CategoryService, private http: Http) { }

  ngOnInit() {
    this.defaultConfition = new DefaultCondition(ConditionOperator.EQ, "deleted_flag", false);
    this.filter = new CommonFilter(new DefaultCondition(ConditionOperator.EQ, "deleted_flag", false));
    this.sort = new CommonSort([new CommonOrder("name", ORDER_TYPE.DESC)]);
    this.paging = new CommonPaging(0, 1);
  }


  initData() {
    this.categoryService.setResource(this.resource);
  }

  private async getData() {
    let [error, response] = await to<any>(this.categoryService.getList(this.filter,this.sort,this.paging).toPromise());
    if(error) {
      return;
    }

    this.nameShow = null;

    if(response && response.results && response.results.length > 0) {
      this.code = response.results[0].code;
      this.nameShow= response.results[0];
    }
  }

  changeCode(event) {
    if(event.keyCode == 13 && this.nameShow && this.nameShow != "") {
      this.listSelected.push(this.nameShow);
    }
    if(!this.codeTyping || this.codeTyping == "" || this.codeTyping.trim() == "") {
      this.nameShow = null;
      return;
    }
    this.filter = new CommonFilter(new AndCondition([this.defaultConfition, 
      new OrCondition([new DefaultCondition(ConditionOperator.LIKE, "name", this.codeTyping),
      new DefaultCondition(ConditionOperator.LIKE, "code", this.codeTyping)])]));
    this.getData();
  }

  removeItem(code) {
    let index = this.listSelected.map(x=>{return x.code}).indexOf(code);
    this.listSelected.splice(index, 1);  
  }

  writeValue(obj: any): void {
    
  }

  ngOnChanges(value: SimpleChanges) {
    this.resource = value.resource.currentValue;
    this.initData();
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    
  }
  setDisabledState?(isDisabled: boolean): void {
   
  }

}
