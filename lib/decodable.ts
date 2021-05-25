import {throwError} from './throw-error'
import {dataValidate, isEqualTypes, isType} from './helpers';


export const Decodable = <T extends (Record<keyof T, any>) | Array<Record<keyof T, any>>>(
    data: T,
    struct: T,
    enableConvert: boolean = false,
    enableThrowError: boolean = true,
): T => {
    dataValidate(data, 'Data')
    dataValidate(struct, 'Structure')

    if (isType(data, 'object') && Array.isArray(data)) {
        if (isType(struct, 'object') && Array.isArray(struct)) {
            return data.map((el) => Decodable(el, struct[0], enableConvert, enableThrowError)) as T
        } else {
            throw new Error(`Data is Array but Struct not is Array`)
        }
    }
    else if(isType(struct,'object') && Array.isArray(struct) && !Array.isArray(data)) {
        throw new Error(`Data is not Array but Struct is Array`)
    }

    const arr = Object.keys(struct) as [keyof typeof struct]

    return arr.reduce((acc, el ) => {

        if (!(el in data)) {
            throw new Error(`Key "${el}" not found`)
        }


        if (data[el] && isType(data[el], 'object')) {
            if (!Array.isArray(data[el])) {
                const ob = Decodable(data[el], struct[el], enableConvert, enableThrowError);
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
                        return Decodable(element, struct[el][0], enableConvert, enableThrowError);
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
                            throwError(el.toString(), `[${data[el]}]`, `Array<${struct[el]}>`)
                        }
                    }
                });
                acc[el] = arr.every((e: any) => !!e) ? arr : [];
                return acc;
            }
        }

        if (isEqualTypes(data[el], struct[el])) {
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
                throwError(el.toString(), data[el], struct[el]);
            }
        }
        return acc;
    }, {} as T);
};
