import { DefaultCondition } from '../../../../core/http-query/condition/default-condition';
import { HospitalListModel } from '../../model/hospital-list-model';
import { ListModel } from '../../../../core/http-service/model/list-model';
import { EnterprisePromise } from '../../../../core/async/enterprise-promise';
import { Component, OnInit, Injector } from '@angular/core';
import { BaseDataListComponent } from '../../../../core/form/base-data-list-component';
import { Filter } from '../../../../core/http-query/filter/filter';
import { Sort, HttpOrder, OrderType } from '../../../../core/http-query/sort/sort';
import { Paging } from '../../../../core/http-query/paging/paging';
import { CommonFiler } from '../../../../core/http-query/filter/common-filter';
import { AndCondition } from '../../../../core/http-query/condition/and-condition';
import { ConditionOperator } from '../../../../core/http-query/condition/condition-operator';
import { Condition } from '../../../../core/http-query/condition/condition';
import { CommonPaging } from '../../../../core/http-query/paging/common-paging';
import { AppConstants } from '../../../../variable-defination/app-constanst';
import { CommonSort } from '../../../../core/http-query/sort/common-sort';
import { HospitalService } from '../../provider/hospital-service';
import { Router } from '@angular/router';


@Component({
    selector: 'hospital-list',
    templateUrl: 'hospital-list.component.html',
    styleUrls: ['hospital-list.component.scss']
})

export class HospitalListComponent extends BaseDataListComponent<HospitalListModel> implements OnInit {
    

    // hospitalList: HospitalListModel[] = [];
    DATE_FORMAT: string = AppConstants.DATE_FORMAT;
    constructor(protected injector: Injector, private hospitalService: HospitalService, private router: Router) { 
        super(injector);
    }

    async ngOnInit() {
        this.prepareGetData();
        this.isLoading = true;
        this.dataList = await this.getListData(this.filter, this.sort, this.paging);
        this.isLoading = false;
     }

    public initPagingComponent(totalRecord: number) {
        
    }

    public prepareGetData() {
        // tslint:disable-next-line:prefer-const
        let condition: Condition = new AndCondition([new DefaultCondition(ConditionOperator.EQ, 'deleted_flag', false)]);
        this.filter = new CommonFiler(condition);
        this.paging = new CommonPaging(0, AppConstants.QUANTITY_PER_PAGE);
        this.sort = new CommonSort([new HttpOrder('updated_date', OrderType.DESC)]);
    }

    public async getListData(filter: Filter, sort: Sort, paging: Paging): EnterprisePromise<HospitalListModel[]> {
        this.loadingState = true;
        const [error, response] = await this.hospitalService.getList(filter, sort, paging).await();
        this.loadingState = false;
        if(error) {
            return [];
        }

        this.initPagingComponent(response.maxResults);
        return response.results;
    }

    public importData() {
        throw new Error('Method not implemented.');
    }

    add(e) {
        this.router.navigate(['hospital/create'], { replaceUrl: true });
    }

    async changeStatus(id: number, status: boolean) {
        let [error, response] = await this.hospitalService.getHttpClient().update('hospital/update', { id: id, status: status }, null).await();
        if(response) {
            this.dataList.filter(x=>x.id == id)[0].status = status;
        }
    }

    async delete(id:string) {
        await this.hospitalService.delete(id);
        this.refreshData();
    }
}