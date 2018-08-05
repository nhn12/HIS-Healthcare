// /**
//  * @author NamNguyen
//  * @email nhn12.hoangnam@gmail.com
//  * @create date 2018-07-22 01:18:10
//  * @modify date 2018-07-22 01:18:10
//  * @desc Wrapper http with custome request and custome request
// */
// import { MessageManagementService } from '../../containers/common-message/message-management';
// import { ResponseModel } from './model/response-model';
// import { AuthenticationService } from '../authentication/authentication.service';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Optional } from '../http/model/optional';
// import { BusinessExceptionObject } from '../exception/business-exception-object';
// import { HttpServiceOptional } from './model/http-service-optional';
// import { EnterprisePromise } from '../async/enterprise-promise';
// import { Injectable } from "@angular/core";
// import { Filter } from '../http-query/filter/filter';
// import { Sort } from '../http-query/sort/sort';
// import { Paging } from '../http-query/paging/paging';
// import { Response } from "@angular/http";
// import { TechnicalExceptionObject } from '../exception/technical-exception-object';
// import { ExceptionObject } from '../exception/exception-object';
// import { MessageType } from '../message/message-type';
// import { MessageLevel } from '../../containers/common-message/message-type';
// import { MessageOption } from '../../containers/common-message/message-optional';
// import { MessageConst } from '../../variable-defination/message/message';


// @Injectable()
// export class HttpService {
//     constructor(protected http: HttpClient, protected authentication: AuthenticationService, public messageService: MessageManagementService) {

//     }

//     /**
//      * Search function
//     */
//     public search<T>(url: string, filter: Filter, sort: Sort, paging: Paging, optional: Optional): EnterprisePromise<T> {
//         let requestBody: any = {};

//         // Generate filter request
//         if (filter) {
//             requestBody['filter'] = filter.printPretty();
//         }

//         // Generate sort request
//         if (sort) {
//             requestBody['order'] = sort.printPretty();
//         }

//         // Generate paging request
//         if (paging) {
//             requestBody['paging'] = paging.printPretty();
//         }

//         return new EnterprisePromise<T>((resolve, reject) => {
//             this.http.post(url, requestBody, { headers: this.buildAuthentication(optional)}).subscribe(result => {
//                 let response : any = result;
//                 resolve(response);
//             }, (err: HttpErrorResponse) => {
//                 reject(this.handleErrorReponse(err, MethodType.GET, optional));
//             });
//         });
//     }

//     /**
//      * Insert data
//      * @param url 
//      * @param data 
//      * @param optional 
//      */
//     public insert<T>(url: string, data: T, optional: Optional) {
//         return new EnterprisePromise<ResponseModel<T>>((resolve, reject) => {
//             this.http.post(url, data, { headers: this.buildAuthentication(optional)}).subscribe(result => {
//                 let response : any = result;
//                 this.showToastNoification(null, MethodType.POST, optional);
//                 resolve(response);
//             }, (err: HttpErrorResponse) => {
//                 reject(this.handleErrorReponse(err, MethodType.POST, optional));
//             });
//         })
//     }

//     /**
//      * Update data
//      * @param url 
//      * @param data 
//      * @param optional 
//      */
//     public update<T>(url: string, data: T, optional: Optional) {
//         return new EnterprisePromise<ResponseModel<T>>((resolve, reject) => {
//             this.http.put(url, data, { headers: this.buildAuthentication(optional)}).subscribe(result => {
//                 let response : any = result;
//                 this.showToastNoification(null, MethodType.PUT, optional);
//                 resolve(response);
//             }, (err: HttpErrorResponse) => {
//                 reject(this.handleErrorReponse(err, MethodType.PUT, optional));
//             });
//         })
//     }

//     /**
//      * Handle show toast notification
//      */
//     protected showToastNoification(response: HttpErrorResponse,  method: MethodType, optional: Optional) {
//         if(optional && optional.disableToast) {
//             return;
//         }

//         let actionString: string;
//         let actionStatus: string;
//         let messageContent: string = "";
//         let messageLevel: MessageLevel;
//         switch(method) {
//             case MethodType.POST:
//                 actionString = "Thêm mới";
//                 break;
//             case MethodType.PUT:
//                 actionString = "Cập nhật";
//                 break;
//             default: return;
//         }

//         messageLevel = MessageLevel.SUCCESS;
//         if(response) {
//             if(response.error && response.error.message && response.error.message.messageCode) {
//                 messageContent = MessageConst[response.error.message.messageCode];
//             }
//             messageLevel = MessageLevel.ERROR;
//         }

//         this.messageService.showMessage(MessageType.TOAST, messageLevel, new MessageOption(null, actionString + " thất bại"));

//     }

//     /**
//      * Build header authentication
//      * @param optional 
//      */
//     protected buildAuthentication(optional: Optional): HttpHeaders {
//         let headers = new HttpHeaders();

//         if(!optional || !optional.contentType ) {
//             headers.append('Content-Type', 'application/json');
//         }
        
//         if(!optional || !optional.ignoreAuthentication) {
//             headers.append('Authorization', this.authentication.credentials.token);
//         }
        
//         return headers;
//     }

//     /**
//      * 
//      */
//     protected handleErrorReponse(err: HttpErrorResponse, mesthodType: MethodType, optional: Optional): ExceptionObject {
//         let errorBody = err.error;
//         if (err.status == 401) {
//             // Authentication error
//             this.messageService.showMessage(MessageType.POPUP, MessageLevel.AUTHENTICATION_ERROR, null);
//             return new TechnicalExceptionObject(err.status + "", "Unauthentication", null);
//         }

//         if (err.status == 404) {
//             // Data not found
//             return new BusinessExceptionObject(err.status + "", JSON.stringify(errorBody), null);
//         }

//         if (err.status == 500) {
//             // Some thing wrong
//             this.showToastNoification(err, mesthodType, optional);
//             if (!errorBody) {
//                 return new TechnicalExceptionObject(err.status + "", JSON.stringify(err.error), null);
//             } else {
//                 if (errorBody && errorBody.messageCode == "ERR_001") {
//                     return new TechnicalExceptionObject(errorBody.messageCode, errorBody.message, null);
//                 } else {
//                     return new BusinessExceptionObject(errorBody.messageCode, errorBody.message, null)
//                 }
//             }

//         }
//     }
// }

//  enum MethodType {
//      PUT, POST, GET
//  }

