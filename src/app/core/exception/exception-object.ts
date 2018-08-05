/**
 * @description: Defined exception for technical type.
 * @author: NamNguyen.
 */

export class ExceptionObject {
    constructor(public errorCode: String, public errorMessage: String, public cause: any) {

    }
}