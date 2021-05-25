type TTypes = string | never | boolean | object | null | undefined;

export const isType = (value: any, type: TTypes) => {
    return typeof value === type;
};

export const getType = (value:any) => {
    return typeof value
}

export const isEqualTypes = (a:any,b:any) => {
    return typeof a === typeof b
}

export const dataValidate = (data:{},name:string) => {
    if(!data || !isType(data,'object')) {
        throw new Error(`${name} is not object it is type "${data === null ? 'null' : getType(data)}"`)
    }
    else if(Object.keys(data).length === 0) {
        throw new Error(`${name} is empty`)
    }
}

export const isArray = (data:Array<any>) => {
    if(isType(data,'object') && Array.isArray(data)) {
       return true
    }
}
