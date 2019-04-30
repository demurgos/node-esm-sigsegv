export const name = "MaxArrayLength";
export function format({ array, max }) {
    return `Expected array length (${array.length}) to be less than or equal to ${max}`;
}
export function createMaxArrayLengthError(array, max) {
    return new Error(name);
}
