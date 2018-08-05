
/**
 * @description: Implement common paging gor all rquest.
 * @author: NamNguyen
 */
import { Paging } from "./paging";

export class CommonPaging extends Paging {
    public printPretty() {
        let obj: any = {};
        if(!obj) {
            obj = {};
        }

        obj.offset = this.page*this.limit;
        obj.limit  = this.limit;

        return obj;
    }

    public setPageIndex(index: number) {
        this.page = index;
    }

    public resetPaging(): void {
        this.page = 0;
    }
}