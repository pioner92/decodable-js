type TTypes = string | never | boolean | object | null | undefined;

const isType = (value: any, type: TTypes) => {
    return typeof value === type;
};

const getType = (value:any) => {
    return typeof value
}
