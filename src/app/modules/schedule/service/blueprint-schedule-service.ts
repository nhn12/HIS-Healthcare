import { Paging } from 'app/core/condition/paging';
import { Sort } from 'app/core/condition/sort';
import { Filter } from 'app/core/condition/filter';
import { Injectable } from "@angular/core";
import { CommonService } from "app/core/common-services/common-service";

@Injectable()
export class BlueprintScheduleService extends CommonService{
    protected getUrlForList(): string {
        throw new Error("Method not implemented.");
    }
    protected getUrlForOne(): string {
        throw new Error("Method not implemented.");
    }
    protected getUrlForAdd(): string {
        return "blueprint_schedule/insert"
    }
    protected getUrlForUpdate(): string {
        throw new Error("Method not implemented.");
    }
    protected getUrlForDelete(): string {
        throw new Error("Method not implemented.");
    }
    protected getBodyRequestForList(filter: Filter, sort: Sort, paging: Paging) {
        throw new Error("Method not implemented.");
    }
    protected getBodyRequestForInsert(data: any) {
        return data;
    }
    protected getBodyRequestForUpdate() {
        throw new Error("Method not implemented.");
    }
    protected getBodyRequestForDelete() {
        throw new Error("Method not implemented.");
    }
    

}