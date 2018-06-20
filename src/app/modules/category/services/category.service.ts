import { Injectable } from "@angular/core";
import { CommonService } from "../../../core/common-services/common-service";
import { Filter } from "../../../core/condition/filter";
import { Sort } from "../../../core/condition/sort";
import { Paging } from "../../../core/condition/paging";

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
        return this.resource.replace('_tbl', '') + "/update";
    }
    protected getUrlForDelete(): string {
        return this.resource.replace('_tbl', '') + "/delete";
    }
    protected getBodyRequestForList(filter: Filter, sort: Sort, paging: Paging, resource?: string): any {
        let obj:any = {};
        obj.resource = (resource?resource: this.resource);
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
        return data;
    }
    protected getBodyRequestForDelete(data) {
        return {id: data.id};
    }

    public setResource(value: string) {
        this.resource = value;
    }
}