"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.T = void 0;
class T {
    static optional(type) {
        //@ts-ignore
        return [type, undefined];
    }
}
exports.T = T;
T.number = 1;
T.string = 'string';
T.boolean = true;
T.object = {};
T.null = null;
T.undefined = undefined;
T.number_$ = T.optional(T.number);
T.string_$ = T.optional(T.string);
T.boolean_$ = T.optional(T.boolean);
T.null_$ = T.optional(T.null);
T.object_$ = T.optional(T.object);
