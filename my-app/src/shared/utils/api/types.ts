export enum ApiStatus {
    SUCCESS = 'S',
    ERROR = 'E',
    PARTIAL = 'W'
}

export interface GenericApiResponse<T> {
    Result : T;
    Status : ApiStatus;
    Message : string;
    Code : string;
    InternalErrorCode : string;
}