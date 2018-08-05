import { EBMLogicalCondition } from "./ebm-logical-condition";

/**
 * @description: Implement for and condition. Support for EBM System
 * @author: NamNguyen
 */


export class EBMAndCondition extends EBMLogicalCondition {

    protected getOperator(): string {
        return "and";
    }
}