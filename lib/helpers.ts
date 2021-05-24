type TTypes = string | never | boolean | object | null | undefined;

export const isType = (value: any, type: TTypes) => {
    return typeof value === type;
};

export const getType = (value:any) => {
    return typeof value
}
