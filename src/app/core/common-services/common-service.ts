import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpResponseModel } from 'app/core/common-services/model/http-response';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/authentication/authentication.services';

@Injectable()
export abstract class CommonService {
    constructor(public http: Http, private router: Router, public auth: AuthenticationService) {

    }

    public getList<T>(filter): Observable<T> {
        return this.http.post(this.getUrlForList(), this.getBodyRequestForList(filter), new RequestOptions({ headers: this.buildAuthentication() })).map(value => {
            let tempValue = value.json();
            return this.handleResponse(tempValue);
        }).catch(err => {
            return err;
        });
    }

    public getOne<T>(data: T): Observable<T> {
        return this.http.get(this.getUrlForOne(), new RequestOptions({ headers: this.buildAuthentication() })).map(value => {
            let tempValue = value.json();
            return this.handleResponse(tempValue);
        }).catch(err => {
            return err;
        });
    }

    public insertOne<T>(data: T): Observable<T> {
        return this.http.post(this.getUrlForAdd(), this.getBodyRequestForInsert(), new RequestOptions({ headers: this.buildAuthentication() })).map(value => {
            let tempValue = value.json();
            return this.handleResponse(tempValue);
        }).catch(err => {
            return err;
        });
    }

    public updateOne<T>(data: T): Observable<T> {
        return this.http.post(this.getUrlForUpdate(), this.getBodyRequestForUpdate(), new RequestOptions({ headers: this.buildAuthentication() })).map(value => {
            let tempValue = value.json();
            return this.handleResponse(tempValue);
        }).catch(err => {
            return err;
        });
    }

    private handleResponse(response: HttpResponseModel<any>): any {
        if (!response) {
            return null;
        }

        switch (response.status) {
            case "200":
                return response.data;
            case "500":
                return Observable.throw(response.message);
            case "401":
                this.router.navigate(['/pages/login'], { replaceUrl: true });
                return Observable.throw(response.message);
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

    protected abstract getBodyRequestForList(filter): any;
    protected abstract getBodyRequestForInsert(): any;
    protected abstract getBodyRequestForUpdate(): any;
    protected abstract getBodyRequestForDelete(): any;
}