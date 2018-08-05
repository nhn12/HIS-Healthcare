/**
 * Condition default. Support for EBM structure.
 * @author: NamNguyen
 */

import { DefaultCondition } from "../default-condition";

export class EBMDefaultCondition extends DefaultCondition {
    public generateConditionStructure(operator, value) {
        let result = {};
        result['operation_logical'] = 'leaf';
        result['element'] = [];
        result['data'] = {};
        result['data']['operation_default'] = operator;
        result['data']['value'] = value;
        result['data']['key'] = this.key;
        return result;
    }
}