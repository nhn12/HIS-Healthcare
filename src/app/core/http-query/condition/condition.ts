/**
 * @description: Defined function support for search query request
 * @author: NamNguyen
 */

import {ConditionOperator} from "./condition-operator"

export abstract class Condition {
    /**
     * Convert condition to request.
     */
    public abstract printPretty(): object;

    /**
     * Replace value for this condition
     */
    public abstract replaceValueByKey(key: string, value: any): boolean;
}