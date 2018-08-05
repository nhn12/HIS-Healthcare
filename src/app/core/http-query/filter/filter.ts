
/**
 * @description: Defined abstract filter. It generate conditionto filter object.
 * @author: NamNguyen.
 */

import { Condition } from "../condition/condition";

export abstract class Filter {
    constructor(protected condition: Condition) {
        
    }

    public abstract printPretty(): any;

    /**
     * Replace value for exists condition.
     * @param key 
     * @param value 
     */
    public replaceValueByKey(key: string, value: string): boolean {
        return this.condition.replaceValueByKey(key, value);
    }
}