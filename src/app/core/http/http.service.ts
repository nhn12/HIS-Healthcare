import { ListModel } from '../http-service/model/list-model';
import { HttpOptional } from './model/optional';
import { BusinessExceptionObject } from '../exception/business-exception-object';
import { ResponseModel } from '../http-service/model/response-model';
import { MessageOption } from '../../containers/common-message/message-optional';
import { MessageConst } from '../../variable-defination/message/message';
import { ExceptionObject } from '../exception/exception-object';
import { MessageType, MessageLevel } from '../../containers/common-message/message-type';
import { TechnicalExceptionObject } from '../exception/technical-exception-object';
/**
 * @description: Power from ngx
 */

import { Inject, Injectable, InjectionToken, Injector, Optional } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { CacheInterceptor } from './cache.interceptor';
import { ApiPrefixInterceptor } from './api-prefix.interceptor';
import { RequestMethod } from '@angular/http';
import { EnterprisePromise } from '../async/enterprise-promise';
import { Filter } from '../http-query/filter/filter';
import { Sort } from '../http-query/sort/sort';
import { Paging } from '../http-query/paging/paging';
import { AuthenticationService } from '../authentication/authentication.service';
import { MessageManagementService } from '../../containers/common-message/message-management';
import { HospitalListModel } from '../../domain/hospital/model/hospital-list-model';

// HttpClient is declared in a re-exported module, so we have to extend the original module to make it work properly
// (see https://github.com/Microsoft/TypeScript/issues/13897)
declare module '@angular/common/http/src/client' {

    // Augment HttpClient with the added configuration methods from HttpService, to allow in-place replacement of
    // HttpClient with HttpService using dependency injection
    export interface HttpClient {

        /**
         * Enables caching for this request.
         * @param {boolean} forceUpdate Forces request to be made and updates cache entry.
         * @return {HttpClient} The new instance.
         */
        cache(forceUpdate?: boolean): HttpClient;

        /**
         * Skips default error handler for this request.
         * @return {HttpClient} The new instance.
         */
        skipErrorHandler(): HttpClient;

        /**
         * Do not use API prefix for this request.
         * @return {HttpClient} The new instance.
         */
        disableApiPrefix(): HttpClient;

    }

}

// From @angular/common/http/src/interceptor: allows to chain interceptors
class HttpInterceptorHandler implements HttpHandler {

    constructor(private next: HttpHandler, private interceptor: HttpInterceptor) { }

    handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
        return this.interceptor.intercept(request, this.next);
    }

}

/**
 * Allows to override default dynamic interceptors that can be disabled with the HttpService extension.
 * Except for very specific needs, you should better configure these interceptors directly in the constructor below
 * for better readability.
 *
 * For static interceptors that should always be enabled (like ApiPrefixInterceptor), use the standard
 * HTTP_INTERCEPTORS token.
 */
export const HTTP_DYNAMIC_INTERCEPTORS = new InjectionToken<HttpInterceptor>('HTTP_DYNAMIC_INTERCEPTORS');

/**
 * Extends HttpClient with per request configuration using dynamic interceptors.
 */
@Injectable()
export class HttpService extends HttpClient {

    private authentication: AuthenticationService;
    private messageService: MessageManagementService;
    constructor(private httpHandler: HttpHandler,
        private injector: Injector,
        @Optional() @Inject(HTTP_DYNAMIC_INTERCEPTORS) private interceptors: HttpInterceptor[] = []) {
        super(httpHandler);

        if (!this.interceptors) {
            // Configure default interceptors that can be disabled here
            this.interceptors = [
                this.injector.get(ApiPrefixInterceptor),
                this.injector.get(ErrorHandlerInterceptor)
            ];
            this.authentication = this.injector.get(AuthenticationService);
            this.messageService = this.injector.get(MessageManagementService);
        }
    }

    /**
     * Search function
    */
    public search<T>(url: string, filter: Filter, sort: Sort, paging: Paging, optional: HttpOptional): EnterprisePromise<ListModel<T>> {
        let requestBody: any = {};

        // Generate filter request
        if (filter) {
            requestBody['filter'] = filter.printPretty();
        }

        // Generate sort request
        if (sort) {
            requestBody['order'] = sort.printPretty();
        }

        // Generate paging request
        if (paging) {
            Object.assign(requestBody, paging.printPretty());
        }

        return new EnterprisePromise<ListModel<T>>((resolve, reject) => {
            this.post(url, requestBody, { headers: this.buildAuthentication(optional) }).subscribe(result => {
                let response: ResponseModel<ListModel<T>> = <ResponseModel<ListModel<T>>>result;

                if (!response) {
                    return EnterprisePromise.reject(new TechnicalExceptionObject("ERR_001", MessageConst.ERR_001, null));
                }

                if (response.status != "200") {
                    reject(this.handleErrorReponse(this.convertErrorHttp(response), RequestMethod.Get, optional));
                    return;
                }

                resolve(response.data);
            }, (err: HttpErrorResponse) => {
                reject(this.handleErrorReponse(err, RequestMethod.Get, optional));
            });
        });
    }

    /**
     * Insert data
     * @param url 
     * @param data 
     * @param optional 
     */
    public insert<T>(url: string, data: T, optional: HttpOptional) {
        return new EnterprisePromise<ResponseModel<T>>((resolve, reject) => {
            this.post(url, data, { headers: this.buildAuthentication(optional) }).subscribe(result => {
                let response: any = result;

                if (!response) {
                    return EnterprisePromise.reject(new TechnicalExceptionObject("ERR_001", MessageConst.ERR_001, null));
                }

                console.log(response);

                if (response.status != "200") {
                    reject(this.handleErrorReponse(this.convertErrorHttp(response), RequestMethod.Post, optional));
                    return;
                }

                this.showToastNoification(null, RequestMethod.Post, optional);
                resolve(response);
            }, (err: HttpErrorResponse) => {
                reject(this.handleErrorReponse(err, RequestMethod.Post, optional));
            });
        })
    }

    /**
     * Update data
     * @param url 
     * @param data 
     * @param optional 
     */
    public update<T>(url: string, data: T, optional: HttpOptional) {
        return new EnterprisePromise<ResponseModel<T>>((resolve, reject) => {
            this.put(url, data, { headers: this.buildAuthentication(optional) }).subscribe(result => {
                let response: any = result;

                if (!response) {
                    return EnterprisePromise.reject(new TechnicalExceptionObject("ERR_001", MessageConst.ERR_001, null));
                }

                if (response.status != "200") {
                    reject(this.handleErrorReponse(this.convertErrorHttp(response), RequestMethod.Put, optional));
                    return;
                }
                this.showToastNoification(null, RequestMethod.Put, optional);
                resolve(response);
            }, (err: HttpErrorResponse) => {
                reject(this.handleErrorReponse(err, RequestMethod.Put, optional));
            });
        })
    }

    /**
     * Update data
     * @param url 
     * @param data 
     * @param optional 
     */
    public deleteOne<T>(url: string, id: string, optional: HttpOptional) {
        return new EnterprisePromise<ResponseModel<T>>((resolve, reject) => {
            this.delete(url, { headers: this.buildAuthentication(optional),params: {id: id}}).subscribe(result => {
                let response: any = result;

                if (!response) {
                    return EnterprisePromise.reject(new TechnicalExceptionObject("ERR_001", MessageConst.ERR_001, null));
                }

                if (response.status != "200") {
                    reject(this.handleErrorReponse(this.convertErrorHttp(response), RequestMethod.Delete, optional));
                    return;
                }
                this.showToastNoification(null, RequestMethod.Delete, optional);
                resolve(response);
            }, (err: HttpErrorResponse) => {
                reject(this.handleErrorReponse(err, RequestMethod.Put, optional));
            });
        })
    }

    /**
     * Handle show toast notification
     */
    protected showToastNoification(response: HttpErrorResponse, method: RequestMethod, optional: HttpOptional) {
        if (optional && optional.disableToast) {
            return;
        }

        let actionString: string;
        let actionStatus: string;
        let messageContent: string = "";
        let messageLevel: MessageLevel;
        switch (method) {
            case RequestMethod.Post:
                actionString = "Thêm mới";
                break;
            case RequestMethod.Put:
                actionString = "Cập nhật";
                break;
            case RequestMethod.Delete:
                actionString = "Xóa";
                break;
            default: return;
        }

        messageLevel = MessageLevel.SUCCESS;
        actionStatus = " thành công";
        if (response && response.error && response.error.status != '200') {
            if (response.error && response.error.message && response.error.message.messageCode) {
                messageContent = null;
                if(MessageConst[response.error.message.messageCode]) {
                    messageContent = MessageConst[response.error.message.messageCode];
                } else if(response.error.message.message) {
                    messageContent = response.error.message.message;
                }

                
            }
            actionStatus = " thất bại";
            messageLevel = MessageLevel.ERROR;
        }

        this.messageService.showMessage(MessageType.TOAST, messageLevel, new MessageOption(actionString + actionStatus, messageContent));

    }

    /**
     * Build header authentication
     * @param optional 
     */
    protected buildAuthentication(optional: HttpOptional): HttpHeaders {
        let headers = new HttpHeaders();

        let params: any = {};

        if (!optional || !optional.contentType) {
            params['Content-Type'] = 'application/json';
        }

        if ((!optional || !optional.ignoreAuthentication) && this.authentication.credentials) {
            params['Authorization'] = this.authentication.credentials.token;
        }

        headers = new HttpHeaders(params);

        return headers;
    }

    /**
     * 
     */
    protected handleErrorReponse(err: HttpErrorResponse, mesthodType: RequestMethod, optional: HttpOptional): ExceptionObject {
        let errorBody = err.error;
        if ((err.status + "") == "401") {
            // Authentication error
            this.messageService.showMessage(MessageType.POPUP, MessageLevel.AUTHENTICATION_ERROR, null);
            return new TechnicalExceptionObject(err.status + "", "Unauthentication", null);
        }

        if ((err.status + "") == "404") {
            // Data not found
            return new BusinessExceptionObject(err.status + "", JSON.stringify(errorBody), null);
        }

        if ((err.status + "") == "500") {
            // Some thing wrong
            this.showToastNoification(err, mesthodType, optional);
            if (!errorBody) {
                return new TechnicalExceptionObject(err.status + "", JSON.stringify(err.error), null);
            } else {
                if (errorBody && errorBody.messageCode == "ERR_001") {
                    return new TechnicalExceptionObject(errorBody.messageCode, errorBody.message, null);
                } else {
                    return new BusinessExceptionObject(errorBody.messageCode, errorBody.message, null)
                }
            }
        }
    }

    /**
     * Convert wrapper httperror to http error
     */
    private convertErrorHttp(response: ResponseModel<any>): HttpErrorResponse {
        let error = new HttpErrorResponse({ error: response, headers: null, status: parseInt(response.status), statusText: response.status, url: null });
        return error;
    }

    cache(forceUpdate?: boolean): HttpClient {
        const cacheInterceptor = this.injector.get(CacheInterceptor).configure({ update: forceUpdate });
        return this.addInterceptor(cacheInterceptor);
    }

    skipErrorHandler(): HttpClient {
        return this.removeInterceptor(ErrorHandlerInterceptor);
    }

    disableApiPrefix(): HttpClient {
        return this.removeInterceptor(ApiPrefixInterceptor);
    }

    // Override the original method to wire interceptors when triggering the request.
    request(method?: any, url?: any, options?: any): any {
        const handler = this.interceptors.reduceRight(
            (next, interceptor) => new HttpInterceptorHandler(next, interceptor),
            this.httpHandler
        );
        return new HttpClient(handler).request(method, url, options);
    }

    private removeInterceptor(interceptorType: Function): HttpService {
        return new HttpService(
            this.httpHandler,
            this.injector,
            this.interceptors.filter(i => !(i instanceof interceptorType))
        );
    }

    private addInterceptor(interceptor: HttpInterceptor): HttpService {
        return new HttpService(
            this.httpHandler,
            this.injector,
            this.interceptors.concat([interceptor])
        );
    }

}
