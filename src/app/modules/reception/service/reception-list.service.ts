import { CommonService } from "app/core/common-services/common-service";

export class ReceptionListService extends CommonService {
    protected getUrlForList(): string {
        throw "category/search"
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
    protected getBodyRequestForList(filter) {
        return {}
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
}