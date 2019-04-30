import { Incident } from "incident";
export const name = "MinUcs2StringLength";
export function format({ string, min }) {
    return `Expected length of UCS2 string (${string.length}) to be greater than or equal to ${min}`;
}
export function createMinUcs2StringLengthError(string, min) {
    return Incident(name, { string, min }, format);
}
