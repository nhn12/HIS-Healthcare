/**
 * Message option.
 * @author: NamNguyen
 */
export class MessageOptional {
    // Only support for toast
    private _duration: number = 2000;

    public get duration() {
        return this._duration;
    }

    public set duration(_value: number) {
        this._duration = _value;
    }
}