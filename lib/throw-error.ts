export const throwError = (key: string, value: string, type: string) => {
    throw new Error(`${key}:${value} is not type ${type}`);
};