"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = void 0;
const throwError = (key, value, type) => {
    throw new Error(`${key}:${value} is not type ${type}`);
};
exports.throwError = throwError;
