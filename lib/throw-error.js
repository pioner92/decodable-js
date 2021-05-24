"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = void 0;
const helpers_1 = require("./helpers");
const throwError = (key, value, type) => {
    throw new Error(`${key}:${value} is not type "${type === null ? 'null' : helpers_1.getType(type)}"  `);
};
exports.throwError = throwError;
