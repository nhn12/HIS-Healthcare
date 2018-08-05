export class ResponseMessage {
    private _status: string;
    private _cause: string;
    private _message: string;
    private _messageCode: string;

    public get messageCode(): string {
        return this._messageCode;
    }

    public set messageCode(value: string) {
        this._messageCode = value;
    }

    public get message(): string {
        return this._message;
    }

    public set message(value: string) {
        this._message = value;
    }

    public get cause(): string {
        return this._cause;
    }

    public set cause(value: string) {
        this._cause = value;
    }

    public get status(): string {
        return this._status;
    }
    
    public set status(value: string) {
        this._status = value;
    }

}