/**
 * @description: Defined abstract paging.
 * @author: NamNguyen;
 */

export abstract class Paging {
    constructor(protected page: number, protected limit: number) {

    }

    public abstract printPretty(): object;
}