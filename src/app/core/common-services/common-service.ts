import { AppConstants } from 'app/utils/app-constants';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpResponseModel } from 'app/core/common-services/model/http-response';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/authentication/authentication.services';
import { Filter } from 'app/core/condition/filter';
import { Sort } from 'app/core/condition/sort';
import { Paging } from 'app/core/condition/paging';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export abstract class CommonService {
    constructor(public http: Http, private router: Router, public auth: AuthenticationService, private toastr: ToastrService) {

    }

    public getList<T>(filter: Filter, sort: Sort, paging: Paging): Observable<T> {
        return this.http.post(this.getUrlForList(), this.getBodyRequestForList(filter, sort, paging), new RequestOptions({ headers: this.buildAuthentication() })).map(value => {
            let tempValue = value.json();
            return this.handleResponse(tempValue, 'getlist');
        }).catch(err => {
            return err;
        });
    }

    public getOne<T>(data: T): Observable<T> {
        return this.http.get(this.getUrlForOne(), new RequestOptions({ headers: this.buildAuthentication() })).map(value => {
            let tempValue = value.json();
            return this.handleResponse(tempValue, 'getone');
        }).catch(err => {
            return err;
        });
    }

    public insertOne<T>(data: T): Observable<T> {
        return this.http.post(this.getUrlForAdd(),JSON.stringify(this.getBodyRequestForInsert(data)), new RequestOptions({ headers: this.buildAuthentication() })).map(value => {
            let tempValue = value.json();
            return this.handleResponse(tempValue, 'insert');
        }).catch(err => {
            return err;
        });
    }

    public updateOne<T>(data: T): Observable<T> {
        return this.http.post(this.getUrlForUpdate(), this.getBodyRequestForUpdate(data), new RequestOptions({ headers: this.buildAuthentication() })).map(value => {
            let tempValue = value.json();
            return this.handleResponse(tempValue, 'update');
        }).catch(err => {
            return err;
        });
    }

    public deleteOne<T>(data: T): Observable<T> {
        return this.http.post(this.getUrlForDelete(), this.getBodyRequestForDelete(data), new RequestOptions({ headers: this.buildAuthentication() })).map(value => {
            let tempValue = value.json();
            return this.handleResponse(tempValue, 'delete');
        }).catch(err => {
            return err;
        });
    }

    private handleResponse(response: HttpResponseModel<any>, action): any {
        if (!response) {
            return null;
        }

        switch (response.status) {
            case "200":
                this.handleMessage(response.status, action);
                return response.data;
            case "500":
                this.handleMessage(response.status, action);
                return Observable.throw(response.message);
            case "401":
                this.router.navigate(['/pages/login'], { replaceUrl: true });
                return Observable.throw(response.message);
        }
    }

    private handleMessage(status: string, action) {
        let message: string = "";
        console.log(status, action);
        switch(status) {
            case '200': 
                if(action == 'insert' || action == 'update') {
                    message = AppConstants.COMMON_MESSAGE_SAVE_SUCCESS;
                    this.toastr.success(message);
                }
                if(action == 'delete') {
                    message = AppConstants.COMMON_MESSAGE_DELETE_SUCCESS;
                    this.toastr.success(message, undefined,  {timeOut: 5000000, });
                }
                break;
            case '500': 
                if(action == 'insert' || action == 'update') {
                    message = AppConstants.COMMON_MESSAGE_SAVE_FAILED;
                    this.toastr.error(message);
                }
                if(action == 'delete') {
                    message = AppConstants.COMMON_MESSAGE_DELETE_FAILED;
                    this.toastr.error(message);
                }
                break;
        }
    }

    protected buildAuthentication(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.auth.credentials.token);
        return headers;
    }

    protected abstract getUrlForList(): string;
    protected abstract getUrlForOne(): string;
    protected abstract getUrlForAdd(): string;
    protected abstract getUrlForUpdate(): string;
    protected abstract getUrlForDelete(): string;

    protected abstract getBodyRequestForList(filter: Filter, sort: Sort, paging: Paging): any;
    protected abstract getBodyRequestForInsert(data): any;
    protected abstract getBodyRequestForUpdate(data): any;
    protected abstract getBodyRequestForDelete(data): any;
}