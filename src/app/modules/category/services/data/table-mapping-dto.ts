export class TableMappingDto {
    public title: string;
    public col: string;
    public type: string;
    public callbackData: any

    constructor(title: string, col: string, type?: string, callbackData?: any) {
        this.title = title;
        this.col = col;
        this.type = type;
        this.callbackData = callbackData;
    }
}