import { Filter } from "app/core/condition/filter";
import { Sort } from "app/core/condition/sort";
import { Paging } from "app/core/condition/paging";
import { CommonService } from "../../../core/common-services/common-service";
import { to } from "../../../utils/promise-utils";
import { RequestOptions } from "@angular/http";

export class ReceptionListService extends CommonService {
    protected getUrlForList(): string {
        return "category/search"
    }
    protected getUrlForOne(): string {
        throw new Error("Method not implemented.");
    }
    protected getUrlForAdd(): string {
        return "registration/insert"
    }
    protected getUrlForUpdate(): string {
        throw new Error("Method not implemented.");
    }
    protected getUrlForDelete(): string {
        throw new Error("Method not implemented.");
    }
    protected getBodyRequestForList(filter: Filter, sort: Sort, paging: Paging): any {
        let obj:any = {};
        obj.resource = this.getResource();
        if(filter) {
            obj = filter.printPretty(obj);
        }
        if(sort) {
            obj = sort.printPretty(obj);
        }
        if(paging) {
            obj = paging.printPretty(obj);
        }

        return obj;
    }
    protected getBodyRequestForInsert(data) {
        return data;
    }
    protected getBodyRequestForUpdate() {
        throw new Error("Method not implemented.");
    }
    protected getBodyRequestForDelete() {
        throw new Error("Method not implemented.");
    }

    private getResource() {
        return "registration_tbl";
    }

    public async  getBaNumber(): Promise<string> {
        let [err, response] = await to<any>(this.http.get("registration/getBANumber", new RequestOptions({ headers: this.buildAuthentication() })).toPromise());
        if(err || !response) {
            return "ERROR_UNKOWN";
        }

        response = response.json();
        return response.data;
    }

    public async  getCvNumber(): Promise<string> {
        let [err, response] = await to<any>(this.http.get("registration/getCVNumber", new RequestOptions({ headers: this.buildAuthentication() })).toPromise());
        if(err || !response) {
            return "ERROR_UNKOWN";
        }

        response = response.json();
        return response.data;
    }
}