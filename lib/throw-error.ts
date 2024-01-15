
export const throwError = (key: string, value: string, currentType: string, expectedType: string) => {
    throw new Error(`${key}:${value} is type "${currentType}" but expected type "${expectedType}"`);
};
