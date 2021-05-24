declare type TTypes = string | never | boolean | object | null | undefined;
export declare const isType: (value: any, type: TTypes) => boolean;
export declare const getType: (value: any) => "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
export {};
