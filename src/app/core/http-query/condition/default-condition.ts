/**
 * @description: Implement default condition (common condition) with key/value
 * @author: NamNguyen
 */

import { Condition } from "./condition";
import { ConditionOperator } from "./condition-operator";

export class DefaultCondition extends Condition {

    constructor(protected operator: ConditionOperator, protected key: string, protected value: any) {
        super();
    }

    public printPretty(): object {
        let result: any = {};
        let operator;
        let self = this;
        switch (self.operator) {
            case ConditionOperator.EQ:
                operator = "$eq"
                break;
            case ConditionOperator.LIKE:
                operator = "$regex"
                break;
            case ConditionOperator.LT:
                operator = "$lt"
                break;
            case ConditionOperator.LTE:
                operator = "$lte"
                break;
            case ConditionOperator.GT:
                operator = "$gt"
                break;
            case ConditionOperator.GTE:
                operator = "$gte"
                break;
            case ConditionOperator.BETWEEN:
                operator = "$between"
                break;
            case ConditionOperator.IN:
                operator = "$in"
                break;
            case ConditionOperator.NIN: 
                operator = '$nin'
                break;
        }

        // Convert valuet type
        let tempValue: string;
        if (this.value && this.value instanceof Date) {
            tempValue = this.value.toISOString();
        } else {
            tempValue = this.value;
        }

        return this.generateConditionStructure(operator, tempValue);
    }

    /**
     * Generate struct condition
     */
    protected generateConditionStructure(operator: string, value: string) {
        let result: any = {};
        result[this.key] = new Object();
        result[this.key][operator] = value;
        return result;
    }

    /**
     * 
     * @param key Replace value if matched key.
     * @param value 
     */
    public replaceValueByKey(key: string, value: any): boolean {
        if(key == this.key) {
            this.value = value;
            return true;
        }
        return false;
    }


    /**
     * Getter value
     */
    public get getValue() {
        return this.value;
    }

    /**
     * Getter key
     */
    public get getKey() {
        return this.key;
    }
}