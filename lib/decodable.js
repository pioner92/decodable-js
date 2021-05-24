"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decodable = void 0;
const throw_error_1 = require("./throw-error");
const isType = (value, type) => {
    return typeof value === type;
};
const Decodable = (data, struct, enableConvert = false, enableThrowError = false) => {
    if (!data &&
        !isType(data, 'object') &&
        !Object.keys(data).length &&
        !struct &&
        !isType(struct, 'object') &&
        Object.keys(struct).length) {
        throw new Error('Data or Structure is empty');
    }
    return Object.keys(struct).reduce((acc, el) => {
        if (!(el in data)) {
            throw new Error(`Key "${el}" not found`);
        }
        if (data[el] && isType(data[el], 'object')) {
            if (!Array.isArray(data[el])) {
                const ob = exports.Decodable(data[el], struct[el], enableConvert, enableThrowError);
                if (ob && isType(ob, 'object') && Object.keys(ob).length === 0) {
                    return acc;
                }
                acc[el] = ob;
            }
            else {
                const arr = data[el].map((element) => {
                    if (element &&
                        isType(element, 'object') &&
                        !Array.isArray(element)) {
                        return exports.Decodable(element, struct[el][0], enableConvert, enableThrowError);
                    }
                    else if (typeof element === struct[el][0]) {
                        return element;
                    }
                    else if (enableConvert &&
                        isType(element, 'string') &&
                        isType(struct[el][0], 'number')) {
                        if (Number.isNaN(+element)) {
                            return acc;
                        }
                        return +element;
                    }
                    else if (enableConvert &&
                        isType(element, 'number') &&
                        isType(struct[el][0], 'string')) {
                        return element.toString();
                    }
                    else {
                        if (enableThrowError) {
                            throw_error_1.throwError(el, `[${data[el]}]`, `Array<${struct[el]}>`);
                        }
                    }
                });
                acc[el] = arr.every((e) => !!e) ? arr : [];
                return acc;
            }
        }
        if (typeof data[el] === struct[el]) {
            acc[el] = data[el];
        }
        else if (enableConvert &&
            isType(data[el], 'string')
            &&
                isType(struct[el], 'number')) {
            if (Number.isNaN(+data[el])) {
                return acc;
            }
            acc[el] = +data[el];
        }
        else if (enableConvert &&
            isType(data[el], 'number') &&
            isType(struct[el], 'string')) {
            acc[el] = data[el].toString();
        }
        else {
            if (enableThrowError && el in struct && el in data) {
                throw_error_1.throwError(el, data[el], struct[el]);
            }
        }
        return acc;
    }, {});
};
exports.Decodable = Decodable;
