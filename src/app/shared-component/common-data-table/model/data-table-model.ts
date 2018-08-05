/**
 * @author NamNguyen
 * @email nhn12.hoangnam@gmail.com
 * @create date 2018-07-22 02:34:22
 * @modify date 2018-07-22 02:34:22
 * @desc [description]
*/

export class DataTableModel {
    private _data: any[] = [];
    private _tableMapping: TableMappingDto[] = [];
    private _url: string;
    private _paging: {
        maxResults: number;
        index: number;
    };

    public get data(): any[] {
        return this._data;
    }

    public set data(value: any[]) {
        this._data = value;
    }

    public get paging(): {
        maxResults: number;
        index: number;
    } {
        return this._paging;
    }
    public set paging(value: {
        maxResults: number;
        index: number;
    }) {
        this._paging = value;
    }

    public get tableMapping(): TableMappingDto[] {
        return this._tableMapping;
    }
    public set tableMapping(value: TableMappingDto[]) {
        this._tableMapping = value;
    }

    public get url(): string {
        return this._url;
    }
    public set url(value: string) {
        this._url = value;
    }
}

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