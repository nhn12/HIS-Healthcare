import { Sort } from "./sort";

/**
 * @description: Implement Common sort for all query request.
 * @author: NamNguyen
 */



export class CommonSort extends Sort{
    public printPretty(): object {
        let obj: any = {};
        this.sort.forEach(element=>{
            Object.assign(obj, (element.printPretty()));
        });
        return obj;
    }
}