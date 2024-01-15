"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodable = exports.DataNames = void 0;
const throw_error_1 = require("./throw-error");
const helpers_1 = require("./helpers");
var DataNames;
(function (DataNames) {
    DataNames["data"] = "Data";
    DataNames["struct"] = "Struct";
})(DataNames || (exports.DataNames = DataNames = {}));
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
const decodable = ({ data, struct, enableConvert = false, silentMode = false }) => {
    (0, helpers_1.dataValidate)(data, DataNames.data);
    (0, helpers_1.dataValidate)(struct, DataNames.struct);
    if (Array.isArray(data) && !Array.isArray(struct)) {
        throw new Error(`${DataNames.struct} is not Array but ${DataNames.data} is Array`);
    }
    else if (!Array.isArray(data) && Array.isArray(struct)) {
        throw new Error(`${DataNames.data} is not Array but ${DataNames.struct} is Array`);
    }
    else if (Array.isArray(data) && Array.isArray(struct)) {
        return data.map((el) => (0, exports.decodable)({ data: el, struct: struct[0], enableConvert, silentMode }));
    }
    const arr = Object.keys(struct);
    return arr.reduce((acc, el) => {
        if (!(el in data) && !(0, helpers_1.isOptional)(struct[el]) && !silentMode) {
            //@ts-ignore
            throw new Error(`Key "${el}" not found`);
        }
        if (data[el] && (0, helpers_1.isType)(data[el], 'object')) {
            if (!Array.isArray(data[el])) {
                const ob = (0, exports.decodable)({ data: data[el], struct: struct[el], enableConvert, silentMode });
                if (ob && (0, helpers_1.isType)(ob, 'object') && Object.keys(ob).length === 0) {
                    return acc;
                }
                acc[el] = ob;
            }
            else {
                const arr = data[el].map((element) => {
                    if (element &&
                        (0, helpers_1.isType)(element, 'object') &&
                        !Array.isArray(element)) {
                        return (0, exports.decodable)({ data: element, struct: struct[el][0], enableConvert, silentMode });
                    }
                    else if ((0, helpers_1.isEqualTypes)(element, struct[el][0])) {
                        return element;
                    }
                    else if (enableConvert &&
                        (0, helpers_1.isType)(element, 'string') &&
                        (0, helpers_1.isType)(struct[el][0], 'number')) {
                        if (Number.isNaN(+element)) {
                            return acc;
                        }
                        return +element;
                    }
                    else if (enableConvert &&
                        (0, helpers_1.isType)(element, 'number') &&
                        (0, helpers_1.isType)(struct[el][0], 'string')) {
                        return element.toString();
                    }
                    else {
                        if (!silentMode) {
                            const currentType = (0, helpers_1.createArrayTypeString)(element);
                            const expectedType = (0, helpers_1.createArrayTypeString)(struct[el][0]);
                            (0, throw_error_1.throwError)(el.toString(), `[${data[el]}]`, currentType, expectedType);
                        }
                    }
                });
                acc[el] = arr.every((e) => !!e) ? arr : [];
                return acc;
            }
        }
        // IF OPTIONAL
        if ((0, helpers_1.isOptional)(struct[el])) {
            if (!(el in data)) {
                return acc;
            }
            else if (el in data && (0, helpers_1.isEqualTypes)(data[el], struct[el][0])) {
                acc[el] = data[el];
            }
            else {
                (0, throw_error_1.throwError)(el.toString(), data[el], (0, helpers_1.createTypeString)(data[el]), `${(0, helpers_1.createTypeString)(struct[el][0])} of ${(0, helpers_1.createTypeString)(struct[el][1])}`);
            }
        }
        else if ((0, helpers_1.isEqualTypes)(data[el], struct[el])) {
            acc[el] = data[el];
        }
        else if (enableConvert &&
            (0, helpers_1.isType)(data[el], 'string')
            &&
                (0, helpers_1.isType)(struct[el], 'number')) {
            if (Number.isNaN(+data[el])) {
                return acc;
            }
            //@ts-ignore
            acc[el] = +data[el];
        }
        else if (enableConvert &&
            (0, helpers_1.isType)(data[el], 'number') &&
            (0, helpers_1.isType)(struct[el], 'string')) {
            acc[el] = data[el].toString();
        }
        else {
            if (!silentMode && el in struct && el in data) {
                (0, throw_error_1.throwError)(el.toString(), data[el], (0, helpers_1.createTypeString)(data[el]), (0, helpers_1.createTypeString)(struct[el]));
            }
        }
        return acc;
    }, {});
};
exports.decodable = decodable;
