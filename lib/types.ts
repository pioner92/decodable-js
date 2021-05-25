// export const T = {
//     null: null,
//     undefined: undefined,
//     boolean: true,
//     number: 2,
//     string: '',
//     object: {},
// };

export class T {
    static number = 1
    static string = 'string'
    static boolean = true
    static object = {}
    static null = null
    static undefined = undefined
    static number_$ = T.optional(T.number)
    static string_$ = T.optional(T.string)
    static boolean_$ = T.optional(T.boolean)
    static null_$ = T.optional(T.null)
    static object_$ = T.optional(T.object)

    static optional<T>(type:T) :T | undefined {
        //@ts-ignore
        return [type,undefined]
    }
}


