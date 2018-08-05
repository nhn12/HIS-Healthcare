export class LocalConfigModel {
    private _key: string;
    private _value: string;

    public get key(): string {
        return this._key;
    }
    public set key(value: string) {
        this._key = value;
    }

    public get value(): string {
        return this._value;
    }
    public set value(value: string) {
        this._value = value;
    }

    constructor(_key, _value) {
        this.key = _key;
        this.value = _value;
    }
}