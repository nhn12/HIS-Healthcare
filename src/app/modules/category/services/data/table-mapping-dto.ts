export class TableMappingDto {
    public title: string;
    public col: string;

    constructor(title: string, col: string) {
        this.title = title;
        this.col = col;
    }
}