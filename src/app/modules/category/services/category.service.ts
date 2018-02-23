import { CommonService } from "app/core/common-services/common-service";
import { Filter } from "app/core/condition/filter";
import { Sort } from "app/core/condition/sort";
import { Paging } from "app/core/condition/paging";
import { Injectable } from "@angular/core";

@Injectable()
export class CategoryService extends CommonService {
    public resource: string;
    protected getUrlForList(): string {
        return "category/search"
    }
    protected getUrlForOne(): string {
        throw new Error("Method not implemented.");
    }
    protected getUrlForAdd(): string {
        return this.resource.replace('_tbl', '') + "/insert";
    }
    protected getUrlForUpdate(): string {
        throw new Error("Method not implemented.");
    }
    protected getUrlForDelete(): string {
        return this.resource.replace('_tbl', '') + "/delete";
    }
    protected getBodyRequestForList(filter: Filter, sort: Sort, paging: Paging): any {
        let obj:any = {};
        obj.resource = this.resource;
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
    protected getBodyRequestForInsert(obj: any) {
        return obj;
    }
    protected getBodyRequestForUpdate(data) {
        throw new Error("Method not implemented.");
    }
    protected getBodyRequestForDelete(data) {
        return {id: data.id};
    }

    public setResource(value: string) {
        this.resource = value;
    }
}