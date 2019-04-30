import { Incident } from "incident";
export const name = "NullProperty";
export function format({ key }) {
    return `The property ${key} is not allowed to be null`;
}
export function createNullPropertyError(key) {
    return Incident(name, { key }, format);
}
