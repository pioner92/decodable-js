import {throwError} from './throw-error'
import {dataValidate, isEqualTypes, isType} from './helpers';


export const Decodable = <T extends { [key: string]: any }>(
    data: Record<string, any>,
    struct: T,
    enableConvert: boolean = false,
    enableThrowError: boolean = false,
): T => {
        dataValidate(data,'Data')
        dataValidate(struct,'Structure')

    return Object.keys(struct).reduce<T>((acc, el) => {

        if (!(el in data)) {
            throw new Error(`Key "${el}" not found`)
        }


        if (data[el] && isType(data[el], 'object')) {
            if (!Array.isArray(data[el])) {
                const ob = Decodable(data[el], struct[el], enableConvert, enableThrowError);
                if (ob && isType(ob, 'object') && Object.keys(ob).length === 0) {
                    return acc;
                }
                //@ts-ignore
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
                            throwError(el, `[${data[el]}]`, `Array<${struct[el]}>`)
                        }
                    }
                });
                //@ts-ignore
                acc[el] = arr.every((e: any) => !!e) ? arr : [];
                return acc;
            }
        }

        if (isEqualTypes(data[el], struct[el])) {
            //@ts-ignore
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
            //@ts-ignore
            acc[el] = data[el].toString();
        } else {
            if (enableThrowError && el in struct && el in data) {
                throwError(el, data[el], struct[el]);
            }
        }
        return acc;
    }, {} as T);
};

