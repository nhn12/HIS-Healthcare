import { Injector } from '@angular/core';
/**
 * @author NamNguyen
 * @email nhn12.hoangnam@gmail.com
 * @create date 2018-07-22 01:36:31
 * @modify date 2018-07-22 01:36:31
 * @desc Common data list component
*/

import { ListModel } from '../http-service/model/list-model';
import { CommonSort } from '../http-query/sort/common-sort';
import { CommonFiler } from '../http-query/filter/common-filter';
import { EnterprisePromise } from '../async/enterprise-promise';
import { IDataListComponent } from './data-list-component';
import { Filter } from '../http-query/filter/filter';
import { Sort } from '../http-query/sort/sort';
import { Paging } from '../http-query/paging/paging';
import { CommonPaging } from '../http-query/paging/common-paging';
import { BaseComponent } from './base-component';

export abstract class BaseDataListComponent<T>  extends BaseComponent implements IDataListComponent<T> {
    protected dataList: T[] = [];
    protected paging: CommonPaging;
    protected filter: CommonFiler;
    protected sort: CommonSort;

    public async refreshData(): EnterprisePromise<boolean> {
        if(this.paging) {
            this.paging.resetPaging();
        }

        this.isLoading = true;
        let[error, response] = await this.getListData(this.filter, this.sort, this.paging).await();
        this.isLoading = false;

        if(error || !response) {
            // TODO
            return;
        }

        this.dataList = response;
    }

    /**
     * 
     * @param filter Get data with condition
     * @param sort 
     * @param paging 
     */
    public abstract async getListData(filter: Filter, sort: Sort, paging: Paging): EnterprisePromise<T[]>;
    
    /**
     * Init paging component - GUI
     * @param totalRecord 
     */
    public abstract initPagingComponent(totalRecord: number);

    /**
     * Prepare condition, sort, paging, ... to begin get data
     */
    public abstract prepareGetData();

    /**
     * Import data
     */
    public abstract async importData();

    
    public get loadingState(): boolean {
        return this.isLoading;
    }

    public set loadingState(value: boolean) {
        this.isLoading = value;
    }

    protected get errorState(): boolean {
        return this.hasError;
    }

    protected set errorState(value: boolean) {
        this.hasError = value;
    }

    constructor(protected injector: Injector) {
        super();
    }
}