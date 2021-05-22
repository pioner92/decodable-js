"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decodable = void 0;
const throw_error_1 = require("./throw-error");
const Decodable = (data, struct, enableConvert = false, enableThrowError = false) => {
    if (!data &&
        typeof data !== 'object' &&
        !Object.keys(data).length &&
        !struct &&
        typeof struct !== 'object' &&
        Object.keys(struct).length) {
        return;
    }
    return Object.keys(data).reduce((acc, el) => {
        if (data[el] && typeof data[el] === 'object') {
            if (!Array.isArray(data[el])) {
                const ob = exports.Decodable(data[el], struct[el], enableConvert, enableThrowError);
                if (ob && typeof ob === 'object' && Object.keys(ob).length === 0) {
                    return acc;
                }
                acc[el] = ob;
            }
            else {
                const arr = data[el].map((element) => {
                    if (element &&
                        typeof element === 'object' &&
                        !Array.isArray(element)) {
                        return exports.Decodable(element, struct[el][0], enableConvert, enableThrowError);
                    }
                    else if (typeof element === struct[el][0]) {
                        return element;
                    }
                    else if (enableConvert &&
                        typeof element === 'string' &&
                        struct[el][0] === 'number') {
                        if (Number.isNaN(+element)) {
                            return acc;
                        }
                        return +element;
                    }
                    else if (enableConvert &&
                        typeof element === 'number' &&
                        struct[el][0] === 'string') {
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
            typeof data[el] === 'string' &&
            struct[el] === 'number') {
            if (Number.isNaN(+data[el])) {
                return acc;
            }
            acc[el] = +data[el];
        }
        else if (enableConvert &&
            typeof data[el] === 'number' &&
            struct[el] === 'string') {
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
