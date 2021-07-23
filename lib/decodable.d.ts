export declare type K<T> = (Record<keyof T, any>) | Array<Record<keyof T, any>>;
export declare enum DataNames {
    data = "Data",
    struct = "Struct"
}
export declare const Decodable: <T extends K<T>, M extends T>(data: M, struct: T, name?: string, enableConvert?: boolean, enableThrowError?: boolean) => T;
