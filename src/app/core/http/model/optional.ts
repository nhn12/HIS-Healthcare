/**
 * Optional for http-service
 * @author: NamNguyen
 */

export class HttpOptional {
    // Show toast when insert, delete, update success. Default: false
    private _disableToast: boolean;

    // Disable authentication. Default: false
    private _ignoreAuthentication: boolean;

    // Custom contentType
    private _contentType: string;

    public get disableToast(): boolean {
        return this._disableToast;
    }

    public set disableToast(value: boolean) {
        this._disableToast = value;
    }

    public get ignoreAuthentication(): boolean {
        return this._ignoreAuthentication;
    }

    public set ignoreAuthentication(value: boolean) {
        this._ignoreAuthentication = value;
    }

    public get contentType(): string {
        return this._contentType;
    }
    public set contentType(value: string) {
        this._contentType = value;
    }
}