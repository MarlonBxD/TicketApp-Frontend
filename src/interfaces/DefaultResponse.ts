export interface DefaultResponse<T= undefined> {
    error:      boolean;
    message:    string;
    httpStatus: string;
    httpCode:   number;
    body?:       T;
}

