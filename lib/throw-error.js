"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = void 0;
const throwError = (key, value, currentType, expectedType) => {
    throw new Error(`${key}:${value} is type "${currentType}" but expected type "${expectedType}"`);
};
exports.throwError = throwError;
