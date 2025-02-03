export interface IResponseList<T> {
    status: boolean,
    message: string,
    timestamp: number,
    data: T[]
}
export interface IResponse<T> {
    status: boolean,
    message: string,
    timestamp: number,
    data: T
}