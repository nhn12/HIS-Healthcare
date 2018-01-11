export abstract class Condition {
    public abstract printPretty();
    

}

export enum ConditionOperator {
    LIKE,EQ, LT, LTE, GT, GTE, IN, OR, AND, BETWEEN
}

export class DefaultCondition extends Condition {
    constructor(private operator: ConditionOperator, private key: string, private value: any) {
        super();
    }

    public printPretty() {
        let result: any = {};
        let operator;
        switch (this.operator) {
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
                operator = "between"
                break;
            case ConditionOperator.IN:
                operator = "$in"
                break;
        }

        result[this.key] = {};
        result[this.key][operator] = this.value
        return result;
    }
}

export abstract class LogicalCondition extends Condition{
    constructor(private conditions: Condition[]) {
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

    public abstract getOperator(): string;

}

export class OrCondition extends LogicalCondition {
    getOperator() {
        return "$or"
    }
}

export class AndCondition extends LogicalCondition {
    getOperator() {
        return "$and"
    }
}