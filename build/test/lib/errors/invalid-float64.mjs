export const name = "InvalidFloat64";
export function format({ value, source }) {
    return `Invalid float64: ${value}` + (source === undefined ? "" : `, from ${source}`);
}
export function createInvalidFloat64Error(value, source) {
    return new Error(name);
}
