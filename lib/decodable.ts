import {throwError} from './throw-error'
import {createArrayTypeString, createTypeString, dataValidate, isEqualTypes, isOptional, isType} from './helpers';

export type K<T> = (Record<keyof T, any>) | Array<Record<keyof T, any>>

export enum DataNames {
    data = 'Data',
    struct = 'Struct'
}

export const Decodable = <T extends K<T>,M extends T>(
    data: M,
    struct: T,
    name: string = '',
    enableConvert: boolean = false,
    enableThrowError: boolean = true,
): T => {
    dataValidate(data, DataNames.data)
    dataValidate(struct, DataNames.struct)


    if (Array.isArray(data) && !Array.isArray(struct)) {
        throw new Error(`${DataNames.struct} is not Array but ${DataNames.data} is Array`)
    } else if (!Array.isArray(data) && Array.isArray(struct)) {
        throw new Error(`${DataNames.data} is not Array but ${DataNames.struct} is Array`)
    } else if (Array.isArray(data) && Array.isArray(struct)) {
        return data.map((el) => Decodable(el, struct[0],name, enableConvert, enableThrowError)) as T
    }


    const arr = Object.keys(struct) as [keyof typeof struct]

    return arr.reduce((acc, el) => {

        if (!(el in data) && !isOptional(struct[el]) && enableThrowError) {
            throw new Error(`Key "${el}" not found`)
        }


        if (data[el] && isType(data[el], 'object')) {
            if (!Array.isArray(data[el])) {
                const ob = Decodable(data[el], struct[el],name, enableConvert, enableThrowError);
                if (ob && isType(ob, 'object') && Object.keys(ob).length === 0) {
                    return acc;
                }
                acc[el] = ob;
            } else {
                const arr = data[el].map((element: any) => {
                    if (
                        element &&
                        isType(element, 'object') &&
                        !Array.isArray(element)
                    ) {
                        return Decodable(element, struct[el][0],name, enableConvert, enableThrowError);
                    } else if (isEqualTypes(element, struct[el][0])) {
                        return element;
                    } else if (
                        enableConvert &&
                        isType(element, 'string') &&
                        isType(struct[el][0], 'number')
                    ) {
                        if (Number.isNaN(+element)) {
                            return acc;
                        }
                        return +element;
                    } else if (
                        enableConvert &&
                        isType(element, 'number') &&
                        isType(struct[el][0], 'string')
                    ) {
                        return element.toString();
                    } else {
                        if (enableThrowError) {
                            const currentType = createArrayTypeString(element)
                            const expectedType = createArrayTypeString(struct[el][0])
                            throwError(el.toString(), `[${data[el]}]`, currentType, expectedType)
                        }
                    }
                });
                acc[el] = arr.every((e: any) => !!e) ? arr : [];
                return acc;
            }
        }


        // IF OPTIONAL

        if(isOptional(struct[el])) {
            if(!(el in data)) {
                return acc
            }
            else if(el in data && isEqualTypes(data[el],struct[el][0])) {
                acc[el] = data[el]
            }
            else {
                throwError(el.toString(), data[el], createTypeString(data[el]), `${createTypeString(struct[el][0])} of ${createTypeString(struct[el][1])}`);
            }
        }

        else if (isEqualTypes(data[el], struct[el])) {
            acc[el] = data[el];
        } else if (
            enableConvert &&
            isType(data[el], 'string')
            &&
            isType(struct[el], 'number')
        ) {
            if (Number.isNaN(+data[el])) {
                return acc;
            }
            //@ts-ignore
            acc[el] = +data[el];
        } else if (
            enableConvert &&
            isType(data[el], 'number') &&
            isType(struct[el], 'string')
        ) {
            acc[el] = data[el].toString();
        } else {
            if (enableThrowError && el in struct && el in data) {
                throwError(el.toString(), data[el], createTypeString(data[el]), createTypeString(struct[el]));
            }
        }
        return acc;
    }, {} as T);
};


