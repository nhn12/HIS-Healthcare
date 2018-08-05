
/**
 * @description: Implement for or condition.
 * @author: NamNguyen
 */

import { LogicalCondition } from "./logical-condition";

export class OrCondition extends LogicalCondition {

    protected getOperator(): string {
        return "$or";
    }
}