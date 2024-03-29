type TTypes = string | never | boolean | object | null | undefined;
export declare const isType: (value: any, type: TTypes) => boolean;
export declare const getType: (value: any) => "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
export declare const isEqualTypes: (a: any, b: any) => boolean;
export declare const dataValidate: (data: {}, name: string) => void;
export declare const createTypeString: (type: any) => string;
export declare const createArrayTypeString: (type: any) => string;
export declare const isOptional: (struct: Array<any>) => boolean;
export {};
