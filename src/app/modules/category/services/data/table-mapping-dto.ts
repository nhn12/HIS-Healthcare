export class TableMappingDto {
    public title: string;
    public col: string;
    public type: string;

    constructor(title: string, col: string, type?: string) {
        this.title = title;
        this.col = col;
        this.type = type;
    }
}