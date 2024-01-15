export type K<T> = (Record<keyof T, any>) | Array<Record<keyof T, any>>;
export declare enum DataNames {
    data = "Data",
    struct = "Struct"
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
export declare const decodable: <T extends K<T>, M extends T>({ data, struct, enableConvert, silentMode }: {
    data: M;
    struct: T;
    enableConvert: boolean;
    silentMode: boolean;
}) => T;
