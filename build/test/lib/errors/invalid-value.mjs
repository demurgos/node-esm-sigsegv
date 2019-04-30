export const name = "InvalidValue";
export function createInvalidValueError(type, value) {
    return new Error(name);
}
