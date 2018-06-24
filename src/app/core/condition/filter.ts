import { Condition } from "./condition";

export abstract class Filter {
    constructor(protected conditions: Condition) {
        
    }

    public abstract printPretty(obj:any);
}

export class CommonFilter extends Filter {
    public printPretty(obj: any) {

        if (!obj) {
            obj = {};
        }

        obj.filter = this.conditions.printPretty();
        return obj;

    }
}