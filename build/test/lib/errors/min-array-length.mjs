export const name = "MinArrayLength";
export function format({ array, min }) {
    return `Expected array length (${array.length}) to be greater than or equal to ${min}`;
}
export function createMinArrayLengthError(array, min) {
    return Error(name);
}
