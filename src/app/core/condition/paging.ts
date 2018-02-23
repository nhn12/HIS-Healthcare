export abstract class Paging {
    constructor(protected page: number, protected limit: number) {

    }

    public abstract printPretty(optional?:any);
    public reset(limit?:number) {
        this.page = 0;
        if(limit!= null && limit != undefined) {
            this.limit = limit;
        }
    }

    public upCount() {
        this.page++;
    }

    public downCount() {
        this.page--;
    }

    public setPage(page: number) {
        this.page = page;
    }

    public getPage() {
        return this.page;
    }

}

export class CommonPaging extends Paging {
    public printPretty(obj: any) {
        if(!obj) {
            obj = {};
        }

        obj.offset = this.page*this.limit;
        obj.limit  = this.limit;

        return obj;
    }
}