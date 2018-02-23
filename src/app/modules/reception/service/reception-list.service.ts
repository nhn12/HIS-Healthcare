import { CommonService } from "app/core/common-services/common-service";
import { Filter } from "app/core/condition/filter";
import { Sort } from "app/core/condition/sort";
import { Paging } from "app/core/condition/paging";

export class ReceptionListService extends CommonService {
    protected getUrlForList(): string {
        return "category/search"
    }
    protected getUrlForOne(): string {
        throw new Error("Method not implemented.");
    }
    protected getUrlForAdd(): string {
        throw new Error("Method not implemented.");
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
    protected getBodyRequestForInsert() {
        throw new Error("Method not implemented.");
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
}