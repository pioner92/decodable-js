"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = exports.dataValidate = exports.isEqualTypes = exports.getType = exports.isType = void 0;
const isType = (value, type) => {
    return typeof value === type;
};
exports.isType = isType;
const getType = (value) => {
    return typeof value;
};
exports.getType = getType;
const isEqualTypes = (a, b) => {
    return typeof a === typeof b;
};
exports.isEqualTypes = isEqualTypes;
const dataValidate = (data, name) => {
    if (!data || !exports.isType(data, 'object')) {
        throw new Error(`${name} is not object it is type "${data === null ? 'null' : exports.getType(data)}"`);
    }
    else if (Object.keys(data).length === 0) {
        throw new Error(`${name} is empty`);
    }
};
exports.dataValidate = dataValidate;
const isArray = (data) => {
    if (exports.isType(data, 'object') && Array.isArray(data)) {
        return true;
    }
};
exports.isArray = isArray;
