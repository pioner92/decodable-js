"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decodable = void 0;
const throw_error_1 = require("./throw-error");
const helpers_1 = require("./helpers");
const Decodable = (data, struct, enableConvert = false, enableThrowError = false) => {
    if (!data &&
        !helpers_1.isType(data, 'object') &&
        !Object.keys(data).length &&
        !struct &&
        !helpers_1.isType(struct, 'object') &&
        Object.keys(struct).length) {
        throw new Error('Data or Structure is empty');
    }
    return Object.keys(struct).reduce((acc, el) => {
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
                    else if (typeof element === struct[el][0]) {
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
                            throw_error_1.throwError(el, `[${data[el]}]`, `Array<${struct[el]}>`);
                        }
                    }
                });
                //@ts-ignore
                acc[el] = arr.every((e) => !!e) ? arr : [];
                return acc;
            }
        }
        if (typeof data[el] === struct[el]) {
            //@ts-ignore
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
            //@ts-ignore
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
