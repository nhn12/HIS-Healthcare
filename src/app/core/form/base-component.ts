import { ExceptionObject } from './../exception/exception-object';
import { ViewChild, ViewContainerRef } from '@angular/core';
/**
 * @author NamNguyen
 * @email nhn12.hoangnam@gmail.com
 * @create date 2018-09-02 04:22:22
 * @modify date 2018-09-02 04:22:22
 * @desc Base form  - common handle
*/
export abstract class BaseComponent {
    /*Support for error handler*/
    @ViewChild("container", { read: ViewContainerRef }) container: ViewContainerRef;

    private _hasError;
    
    private _isLoading;


    /**
     * 
     * @param exception 
     */
    public buildErrorContainer(exception: ExceptionObject) {

    }


    public get hasError() {
        return this._hasError;
    }

    public set hasError(value) {
        this._hasError = value;
    }

    public get isLoading() {
        return this._isLoading;
    }

    public set isLoading(value) {
        if(value) {

        } else {

        }
        this._isLoading = value;
    }

}
