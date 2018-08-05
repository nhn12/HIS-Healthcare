
/**
 * @description: Implement for and condition.
 * @author: NamNguyen
 */

import { LogicalCondition } from "./logical-condition";

export class AndCondition extends LogicalCondition {

    protected getOperator(): string {
        return "$and";
    }
}