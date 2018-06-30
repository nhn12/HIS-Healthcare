import { Component, OnInit, Input, forwardRef, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CategoryService } from '../../modules/category/services/category.service';
import { CommonFilter } from '../../core/condition/filter';
import { CommonSort, CommonOrder, ORDER_TYPE } from '../../core/condition/sort';
import { CommonPaging } from '../../core/condition/paging';
import { DefaultCondition, ConditionOperator, AndCondition, OrCondition } from '../../core/condition/condition';
import { to } from '../../utils/promise-utils';
import { Http } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IcdListComponent } from '../../modules/managment/icd-category/icd-list-component/icd-list.component';
import { ValueTransformer } from '@angular/compiler/src/util';

export const EPANDED_TEXTAREA_VALUE_ACCESSOR : any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchTypingBoxComponent),
  multi: true
};
@Component({
  selector: 'app-search-typing-box',
  templateUrl: './search-typing-box.component.html',
  styleUrls: ['./search-typing-box.component.scss'],
  providers: [EPANDED_TEXTAREA_VALUE_ACCESSOR],

})
export class SearchTypingBoxComponent implements OnInit, ControlValueAccessor, OnChanges {

  @Input() resource: string;
  private code: string;

  // internl varialble
  public codeTyping: String;
  public nameShow: any = {};

  public filter: CommonFilter;
  public sort: CommonSort;
  public paging: CommonPaging;
  private defaultConfition: DefaultCondition;
  public listSelected: any[] = [];

  registerChange: any;

  propagateChange: any;

  constructor(private categoryService: CategoryService, private http: Http, private modalService: NgbModal) { }

  ngOnInit() {
    this.defaultConfition = new DefaultCondition(ConditionOperator.EQ, "deleted_flag", false);
    this.filter = new CommonFilter(new DefaultCondition(ConditionOperator.EQ, "deleted_flag", false));
    this.sort = new CommonSort([new CommonOrder("name", ORDER_TYPE.DESC)]);
    this.paging = new CommonPaging(0, 1);
  }


  initData() {
    this.categoryService.setResource(this.resource);
  }

  private async getData(filter, sort, paging, getDBMode?: boolean) {
    let [error, response] = await to<any>(this.categoryService.getList(filter,sort,paging).toPromise());
    if(error) {
      return [];
    }

    if(getDBMode) {
      return response.results;
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
      this.propagateChange(this.listSelected.map(vale=>{
        return vale.code;
      }));
    }
    if(!this.codeTyping || this.codeTyping == "" || this.codeTyping.trim() == "") {
      this.nameShow = null;
      return;
    }

    let defaultConfition: any;
    if(this.listSelected.length > 0) {
      defaultConfition = new DefaultCondition(ConditionOperator.NIN, "code", this.listSelected.map(value=>{
        return value.code;
      }));
      defaultConfition = new AndCondition([defaultConfition, this.defaultConfition]);
    } else {
      defaultConfition = this.defaultConfition;
    }
    this.filter = new CommonFilter(new AndCondition([defaultConfition, 
      new OrCondition([new DefaultCondition(ConditionOperator.LIKE, "name", this.codeTyping),
      new DefaultCondition(ConditionOperator.LIKE, "code", this.codeTyping)])]));
    this.getData(this.filter, this.sort, this.paging);
  }

  removeItem(code) {
    let index = this.listSelected.map(x=>{return x.code}).indexOf(code);
    this.listSelected.splice(index, 1); 
    
    this.propagateChange(this.listSelected.map(vale=>{
      return vale.code;
    }));
  }

  async writeValue(obj: any) {
    if(!obj || obj.length <= 0) {
      return;
    }

    let filter = new CommonFilter(new AndCondition([
      new DefaultCondition(ConditionOperator.IN, 'code', obj),
      new DefaultCondition(ConditionOperator.IN, 'deleted_flag', false)
    ]));
    this.listSelected = await this.getData(filter, null, null, true);
  }

  ngOnChanges(value: SimpleChanges) {
    this.resource = value.resource.currentValue;
    this.initData();
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  openICDList() {
   ///  const modalRef = this.modalService.open(IcdListComponent);
  }

  registerOnTouched(fn: any): void {
    
  }

  setDisabledState?(isDisabled: boolean): void {
   
  }

}
