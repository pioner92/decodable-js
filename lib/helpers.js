"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getType = exports.isType = void 0;
const isType = (value, type) => {
    return typeof value === type;
};
exports.isType = isType;
const getType = (value) => {
    return typeof value;
};
exports.getType = getType;
