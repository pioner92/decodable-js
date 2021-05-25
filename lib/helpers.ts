import {DataNames} from './decodable';

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

export const createTypeString = (type:any) => {
    return `${type === null ? null : typeof type}`
}

export const createArrayTypeString = (type:any) => {
    return `Array<${createTypeString(type)}>`
}

export const isOptional = (struct:Array<any>) => {
    return Array.isArray(struct) && struct.length === 2 && struct[1] === undefined
}
