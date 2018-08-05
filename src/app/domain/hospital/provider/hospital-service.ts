import { HospitalDetailModel } from '../model/hospital-detail-model';
import { ListModel } from '../../../core/http-service/model/list-model';
import { HttpService } from '../../../core/http/http.service';
import { Filter } from '../../../core/http-query/filter/filter';
import { Sort } from '../../../core/http-query/sort/sort';
import { Paging } from '../../../core/http-query/paging/paging';
import { HospitalListModel } from '../model/hospital-list-model';
import { EnterprisePromise } from '../../../core/async/enterprise-promise';
import { Injectable } from '@angular/core';
/**
 * @author NamNguyen
 * @email nhn12.hoangnam@gmail.com
 * @create date 2018-07-27 02:19:48
 * @modify date 2018-07-27 02:19:48
 * @desc [description]
*/
@Injectable()
export class HospitalService {
    constructor(private httpService: HttpService) {

    }

    public async getList(filter: Filter, sort: Sort, paging: Paging): EnterprisePromise<ListModel<HospitalListModel>> {
        let [error, response] = await this.httpService.search<HospitalListModel>("hospital/query", filter, sort, paging, null).await();

        if (error) {
            return EnterprisePromise.reject(error);
        }

        return response;
    }

    public async insert(data: HospitalDetailModel): EnterprisePromise<any> {
        let [error, response] = await this.httpService.insert("hospital/insert", data, null).await();
        if(error) {
            return EnterprisePromise.reject(error);
        }

        return response;
    }


}