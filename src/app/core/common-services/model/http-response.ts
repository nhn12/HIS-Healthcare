export class HttpResponseModel<T> {
    public status: string;
    public message: string;
    public data: T;
}