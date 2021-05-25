"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOptional = exports.createArrayTypeString = exports.createTypeString = exports.dataValidate = exports.isEqualTypes = exports.getType = exports.isType = void 0;
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
const createTypeString = (type) => {
    return `${type === null ? null : typeof type}`;
};
exports.createTypeString = createTypeString;
const createArrayTypeString = (type) => {
    return `Array<${exports.createTypeString(type)}>`;
};
exports.createArrayTypeString = createArrayTypeString;
const isOptional = (struct) => {
    return Array.isArray(struct) && struct.length === 2 && struct[1] === undefined;
};
exports.isOptional = isOptional;
