/**
 * @description: Support for and & or condition
 */

import { Condition } from "./condition";
 export abstract class LogicalCondition extends Condition {
    
    constructor(protected conditions: Condition[]) {
        super();
    }

    public printPretty() {
        let result: any = {};
        result[this.getOperator()] = [];
        this.conditions.forEach(element => {
            result[this.getOperator()].push(element.printPretty());
        });
        return result;
    }

    /**
     * Replace value for condition nearest
     * @param key 
     * @param value 
     */
    public replaceValueByKey(key: string, value: string): boolean {
        let flag: boolean = false;
        this.conditions.forEach(element=>{
            if(element.replaceValueByKey(key, value)) {
                flag = true;
            }
        });

        return flag;
    }

    protected abstract getOperator(): string;
 } 