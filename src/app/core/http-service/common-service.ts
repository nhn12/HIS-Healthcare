// import { Filter } from "../http-query/filter/filter";
// import { Sort } from "../http-query/sort/sort";
// import { Http, RequestOptions } from '@angular/http'
// import { Injectable } from "@angular/core";
// import { AuthenticationService } from "../authentication/authentication.service";
// import "rxjs/Rx";
// import { EnterprisePromise } from "../async/enterprise-promise";
// import { ResponseModel } from "./model/response-model";
// import { ListModel } from "./model/list-model";
// import { Paging } from "../http-query/paging/paging";
// import { resolve } from "url";
// import { Optional } from "../http/model/optional";
// import { TechnicalExceptionObject } from "../exception/technical-exception-object";

// @Injectable()
// export abstract class CommonService {
//     constructor(protected http: Http, protected authentication: AuthenticationService) {

//     }

//     public getList<T>(filter: Filter, sort: Sort, paging: Paging, optional?: Optional): EnterprisePromise<ListModel<T>> {
//         return new EnterprisePromise((resolve, reject) => {
//             this.http.post(this.getUrlForGetList(), this.getDataForGetListRequest(filter, sort, paging), this.buildHeaders()).subscribe(response => {
//                 let responseObj: ResponseModel<ListModel<T>> = response.json();
//                 resolve(responseObj.data);
//             }, error => {
//                 reject(error);
//                 // TODO.
//                 // Catching handle
//                 // Detect technical/business for handle.
//             })
//         })
//     }

//     public getOne<T>(id: string, option?: Optional): EnterprisePromise<T> {
//         return new EnterprisePromise<T>((resolve, reject) => {
//             this.http.get(this.getUrlForGetOne(id)).subscribe(result => {
//                 resolve(result.json());
//             }, error => {
//                 reject(error);
//             })
//         });
//     }

//     public insertOne<T>(data: T, option?: Optional): EnterprisePromise<T> {
//         return new EnterprisePromise<T>((resolve, reject) => {
//             this.http.post(this.getUrlForInsertOne(), this.getDataForInsertOneRequest(data)).subscribe(result => {
//                 resolve(result.json());
//             }, error => {
//                 reject(error);
//             })
//         });
//     }

//     public updateOne<T>(data: T, option?: Optional): EnterprisePromise<T> {
//         return new EnterprisePromise<T>((resolve, reject) => {
//             this.http.put(this.getUrlForUpdateOne(), this.getDataForUpdateOnRequest(data)).subscribe(result => {
//                 resolve(result.json());
//             }, error => {
//                 reject(error);
//             })
//         });
//     }

//     public deleteOne<T>(id: string, option?: Optional): EnterprisePromise<T> {
//         return new EnterprisePromise<T>((resolve, reject) => {
//             this.http.delete(this.getUrlForDeleteOne(id)).subscribe(result => {
//                 resolve(result.json());
//             }, error => {
//                 reject(error);
//             })
//         });
//     }

//     protected abstract getDataForGetListRequest(filter: Filter, sort: Sort, paging: Paging): object;
//     protected abstract getDataForGetOneRequest(): string;
//     protected abstract getDataForInsertOneRequest(data: any): any;
//     protected abstract getDataForUpdateOnRequest(data: any): object;

//     protected abstract getUrlForGetList(): string;
//     protected abstract getUrlForGetOne(id: string): string;
//     protected abstract getUrlForInsertOne(): string;
//     protected abstract getUrlForUpdateOne(): string;
//     protected abstract getUrlForDeleteOne(id: string): string;

//     protected buildHeaders(options?: any, ignoreBasicAuthentication?: boolean): RequestOptions {
//         let tempHeaders: any = {}

//         // Implement later

//         let optionsHeader = new RequestOptions({ headers: tempHeaders });
//         return optionsHeader;
//     }

//     protected parseRecordData(data: any) {
//         // Implement later
//         return data;
//     }
// }