import { Incident } from "incident";
export const name = "MaxUcs2StringLength";
export function format({ string, max }) {
    return `Expected length of UCS2 string (${string.length}) to be less than or equal to ${max}`;
}
export function createMaxUcs2StringLengthError(string, max) {
    return Incident(name, { string, max }, format);
}
