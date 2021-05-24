import {getType} from './helpers';


export const throwError = (key: string, value: string, type: string) => {
    throw new Error(`${key}:${value} is not type ${getType(type)}`);
};
