import { LogicalCondition } from "../logical-condition";

/**
 * EBM Logical condition. Support for EBM system.
 * @author: NamNguyen
 */
export abstract class EBMLogicalCondition extends LogicalCondition {
    public printPretty() {
        let result = {};

        result["operation_logical"] = this.getOperator();
        result["operation_logical"] = {};
        result["element"] = [];
        this.conditions.forEach(element=>{
            result["element"].push(element.printPretty());
        })

        return result;
    }
}