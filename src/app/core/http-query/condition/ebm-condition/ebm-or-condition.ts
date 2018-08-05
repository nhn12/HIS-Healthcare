import { EBMLogicalCondition } from "./ebm-logical-condition";

/**
 * @description: Implement for or condition. Support for EBM System
 * @author: NamNguyen
 */


export class EBMOrCondition extends EBMLogicalCondition {

    protected getOperator(): string {
        return "and";
    }
}