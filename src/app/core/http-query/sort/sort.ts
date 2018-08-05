/**
 * @description: Defined sort for query request. 
 * @author: NamNguyen
 */
export abstract class Sort {
    constructor(protected sort: HttpOrder[]) {

    }

    public abstract printPretty(): object;
}

/**
 * @description: Implement for unit sort.
 * @author: NamNguyen.
 */
export class HttpOrder {
    constructor(protected key: string, protected sortType: OrderType) {

    }

    public printPretty() {
        let obj: object = new Object();
        obj[this.key] = (this.sortType == OrderType.DESC) ? -1 : 1
        return obj;
    }
}

/**
 * @description: Defined sort type.
 * @author: NamNguyen.
 */
export enum OrderType {
    DESC,
    ASC
}