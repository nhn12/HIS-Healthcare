export abstract class Join {
    constructor(protected localField: string, protected foreignField: string, protected as: string, protected mergeField: any[]) {}

    public abstract printPretty()
}


export class DefaultJoin extends Join{
    public printPretty() {
        return { localField: this.localField, foreignField: this.foreignField, as: this.as, mergeField: this.mergeField };
    }
}

export abstract class JoinTable {
    constructor(protected joins: Join[]) {}
    public abstract printPretty(obj: any);
}

export class CommonJoinTable extends JoinTable{
    public printPretty(obj: any) {

        // prevent form  case obj is null/ undefined
        if (!obj) {
            obj = {};
        }

        obj.joinTable = this.joins.map(value=>{
            return value.printPretty();
        })

        return obj;

    }
}