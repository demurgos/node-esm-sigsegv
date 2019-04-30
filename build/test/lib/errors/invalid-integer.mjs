import { Incident } from "incident";
export const name = "InvalidInteger";
export function format({ value, source }) {
    return `Invalid integer: ${value}` + (source === undefined ? "" : `, from ${source}`);
}
export function createInvalidIntegerError(value, source) {
    return Incident(name, { value, source }, format);
}
