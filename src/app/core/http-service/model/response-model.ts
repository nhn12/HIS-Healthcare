import { ResponseMessage } from "./response-message";

export class ResponseModel<T> {
    message: ResponseMessage;
    data: T;
    status: string
}
