"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decodable = void 0;
const throw_error_1 = require("./throw-error");
const helpers_1 = require("./helpers");
const Decodable = (data, struct, enableConvert = false, enableThrowError = true) => {
    helpers_1.dataValidate(data, 'Data');
    helpers_1.dataValidate(struct, 'Structure');
    if (helpers_1.isType(data, 'object') && Array.isArray(data)) {
        if (helpers_1.isType(struct, 'object') && Array.isArray(struct)) {
            return data.map((el) => exports.Decodable(el, struct[0], enableConvert, enableThrowError));
        }
        else {
            throw new Error(`Data is Array but Struct not is Array`);
        }
    }
    else if (helpers_1.isType(struct, 'object') && Array.isArray(struct) && !Array.isArray(data)) {
        throw new Error(`Data is not Array but Struct is Array`);
    }
    const arr = Object.keys(struct);
    return arr.reduce((acc, el) => {
        if (!(el in data)) {
            throw new Error(`Key "${el}" not found`);
        }
        if (data[el] && helpers_1.isType(data[el], 'object')) {
            if (!Array.isArray(data[el])) {
                const ob = exports.Decodable(data[el], struct[el], enableConvert, enableThrowError);
                if (ob && helpers_1.isType(ob, 'object') && Object.keys(ob).length === 0) {
                    return acc;
                }
                acc[el] = ob;
            }
            else {
                const arr = data[el].map((element) => {
                    if (element &&
                        helpers_1.isType(element, 'object') &&
                        !Array.isArray(element)) {
                        return exports.Decodable(element, struct[el][0], enableConvert, enableThrowError);
                    }
                    else if (helpers_1.isEqualTypes(element, struct[el][0])) {
                        return element;
                    }
                    else if (enableConvert &&
                        helpers_1.isType(element, 'string') &&
                        helpers_1.isType(struct[el][0], 'number')) {
                        if (Number.isNaN(+element)) {
                            return acc;
                        }
                        return +element;
                    }
                    else if (enableConvert &&
                        helpers_1.isType(element, 'number') &&
                        helpers_1.isType(struct[el][0], 'string')) {
                        return element.toString();
                    }
                    else {
                        if (enableThrowError) {
                            throw_error_1.throwError(el.toString(), `[${data[el]}]`, `Array<${struct[el]}>`);
                        }
                    }
                });
                acc[el] = arr.every((e) => !!e) ? arr : [];
                return acc;
            }
        }
        if (helpers_1.isEqualTypes(data[el], struct[el])) {
            acc[el] = data[el];
        }
        else if (enableConvert &&
            helpers_1.isType(data[el], 'string')
            &&
                helpers_1.isType(struct[el], 'number')) {
            if (Number.isNaN(+data[el])) {
                return acc;
            }
            //@ts-ignore
            acc[el] = +data[el];
        }
        else if (enableConvert &&
            helpers_1.isType(data[el], 'number') &&
            helpers_1.isType(struct[el], 'string')) {
            acc[el] = data[el].toString();
        }
        else {
            if (enableThrowError && el in struct && el in data) {
                throw_error_1.throwError(el.toString(), data[el], struct[el]);
            }
        }
        return acc;
    }, {});
};
exports.Decodable = Decodable;
