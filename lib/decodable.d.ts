export declare const Decodable: <T extends {
    [key: string]: any;
}>(data: Record<string, any>, struct: T, enableConvert?: boolean, enableThrowError?: boolean) => T | T[];
