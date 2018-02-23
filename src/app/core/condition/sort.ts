export enum ORDER_TYPE {
    ASC, DESC
}

export abstract class Order {
    constructor(protected key, protected type: ORDER_TYPE) {
    }

    public abstract printPretty();
}
export class CommonOrder extends Order{
    public printPretty() {
        let result:any = {};
        result[this.key] = this.type == ORDER_TYPE.ASC ? 1 : -1;
        return result;
    }

}
export abstract class Sort {
    constructor(protected orders: Order[]) {
    }
    
    public abstract printPretty(obj: any);
}

export class CommonSort extends Sort{
    public printPretty(obj: any) {
        if(!obj) {
            obj = {};
        }
        if(!this.orders || this.orders.length <= 0) {
            return obj;
        }

        obj.sort = {};
        this.orders.forEach(element=>{
            Object.assign(obj.sort, element.printPretty());
        })
        return obj;
    }
}