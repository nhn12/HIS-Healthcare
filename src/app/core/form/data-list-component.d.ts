import { ListModel } from '../http-service/model/list-model';
import { EnterprisePromise } from '../async/enterprise-promise';
import { Paging } from '../http-query/paging/paging';
import { Sort } from '../http-query/sort/sort';
import { Filter } from '../http-query/filter/filter';
/**
 * @author NamNguyen
 * @email nhn12.hoangnam@gmail.com
 * @create date 2018-07-22 01:37:25
 * @modify date 2018-07-22 01:37:25
 * @desc Data list defination
*/

export interface IDataListComponent<T> {
    refreshData(): EnterprisePromise<boolean>;
    getListData(filter: Filter, sort: Sort, paging: Paging): EnterprisePromise<T[]>;
    importData(): EnterprisePromise<T>;
    initPagingComponent(totalRecords: number): void;
}
