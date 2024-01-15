import { throwError } from './throw-error'
import { createArrayTypeString, createTypeString, dataValidate, isEqualTypes, isOptional, isType } from './helpers';

export type K<T> = (Record<keyof T, any>) | Array<Record<keyof T, any>>

export enum DataNames {
    data = 'Data',
    struct = 'Struct'
}


/**
 * Decodes the provided data into the specified structure.
 *
 * @param {Object|Array} data - The input data to decode, which can be either an object or an array.
 * @param {Object|Array} struct - The structure to which you want to decode the input data. 
 * @param {boolean} enableConvert - A flag that indicates whether to attempt type conversion between 
 *                                  numbers and strings. If `true` and the input data contains a value
 *                                  as a string but the expected type in 'struct' is a number, it will
 *                                  convert the string to a number, and vice versa. If the conversion
 *                                  cannot be performed, the value will be skipped.
 * @param {boolean} silentMode - A flag that determines whether to throw an error if the input 
 *                                     data does not match the structure. If `false`, the function will
 *                                     operate in 'silent' mode, attempting conversions where possible.
 * @returns {Object|Array} The decoded data structured according to 'struct'.
 */
export const decodable = <T extends K<T>, M extends T>(
    { data, struct, enableConvert = false, silentMode = false }: {
        data: M,
        struct: T,
        enableConvert: boolean,
        silentMode: boolean,
    }
): T => {
    dataValidate(data, DataNames.data)
    dataValidate(struct, DataNames.struct)


    if (Array.isArray(data) && !Array.isArray(struct)) {
        throw new Error(`${DataNames.struct} is not Array but ${DataNames.data} is Array`)
    } else if (!Array.isArray(data) && Array.isArray(struct)) {
        throw new Error(`${DataNames.data} is not Array but ${DataNames.struct} is Array`)
    } else if (Array.isArray(data) && Array.isArray(struct)) {
        return data.map((el) => decodable({ data: el, struct: struct[0], enableConvert, silentMode })) as T
    }


    const arr = Object.keys(struct) as [keyof typeof struct]

    return arr.reduce((acc, el) => {

        if (!(el in data) && !isOptional(struct[el]) && !silentMode) {
            throw new Error(`Key "${el}" not found`)
        }


        if (data[el] && isType(data[el], 'object')) {
            if (!Array.isArray(data[el])) {
                const ob = decodable({ data: data[el], struct: struct[el], enableConvert, silentMode });
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
                        return decodable({ data: element, struct: struct[el][0], enableConvert, silentMode });
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
                        if (!silentMode) {
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

        if (isOptional(struct[el])) {
            if (!(el in data)) {
                return acc
            }
            else if (el in data && isEqualTypes(data[el], struct[el][0])) {
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
            if (!silentMode && el in struct && el in data) {
                throwError(el.toString(), data[el], createTypeString(data[el]), createTypeString(struct[el]));
            }
        }
        return acc;
    }, {} as T);
};


