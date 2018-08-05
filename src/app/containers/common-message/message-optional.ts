/**
 * @author NamNguyen
 * @email nhn12.hoangnam@gmail.com
 * @create date 2018-07-20 10:10:07
 * @modify date 2018-07-20 10:10:07
 * @desc [description]
*/
export class MessageOption {
    private _title?: string;
    private _content?: string;
    
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }

    public get content(): string {
        return this._content;
    }
    public set content(value: string) {
        this._content = value;
    }

    constructor(title: string, content: string) {
        this._title = title;
        this._content = content;
    }

}