"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decodable = exports.DataNames = void 0;
const throw_error_1 = require("./throw-error");
const helpers_1 = require("./helpers");
var DataNames;
(function (DataNames) {
    DataNames["data"] = "Data";
    DataNames["struct"] = "Struct";
})(DataNames = exports.DataNames || (exports.DataNames = {}));
const Decodable = (data, struct, name = '', enableConvert = false, enableThrowError = true) => {
    helpers_1.dataValidate(data, DataNames.data);
    helpers_1.dataValidate(struct, DataNames.struct);
    if (Array.isArray(data) && !Array.isArray(struct)) {
        throw new Error(`${DataNames.struct} is not Array but ${DataNames.data} is Array`);
    }
    else if (!Array.isArray(data) && Array.isArray(struct)) {
        throw new Error(`${DataNames.data} is not Array but ${DataNames.struct} is Array`);
    }
    else if (Array.isArray(data) && Array.isArray(struct)) {
        return data.map((el) => exports.Decodable(el, struct[0], name, enableConvert, enableThrowError));
    }
    const arr = Object.keys(struct);
    return arr.reduce((acc, el) => {
        if (!(el in data) && !helpers_1.isOptional(struct[el]) && enableThrowError) {
            throw new Error(`Key "${el}" not found`);
        }
        if (data[el] && helpers_1.isType(data[el], 'object')) {
            if (!Array.isArray(data[el])) {
                const ob = exports.Decodable(data[el], struct[el], name, enableConvert, enableThrowError);
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
                        return exports.Decodable(element, struct[el][0], name, enableConvert, enableThrowError);
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
                            const currentType = helpers_1.createArrayTypeString(element);
                            const expectedType = helpers_1.createArrayTypeString(struct[el][0]);
                            throw_error_1.throwError(el.toString(), `[${data[el]}]`, currentType, expectedType);
                        }
                    }
                });
                acc[el] = arr.every((e) => !!e) ? arr : [];
                return acc;
            }
        }
        // IF OPTIONAL
        if (helpers_1.isOptional(struct[el])) {
            if (!(el in data)) {
                return acc;
            }
            else if (el in data && helpers_1.isEqualTypes(data[el], struct[el][0])) {
                acc[el] = data[el];
            }
            else {
                throw_error_1.throwError(el.toString(), data[el], helpers_1.createTypeString(data[el]), `${helpers_1.createTypeString(struct[el][0])} of ${helpers_1.createTypeString(struct[el][1])}`);
            }
        }
        else if (helpers_1.isEqualTypes(data[el], struct[el])) {
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
                throw_error_1.throwError(el.toString(), data[el], helpers_1.createTypeString(data[el]), helpers_1.createTypeString(struct[el]));
            }
        }
        return acc;
    }, {});
};
exports.Decodable = Decodable;
