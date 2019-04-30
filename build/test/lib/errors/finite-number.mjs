import { Incident } from "incident";
export const name = "FiniteNumber";
export function format({ value }) {
    return `Expected a finite number, received ${value}`;
}
export function createFiniteNumberError(value) {
    return Incident(name, { value }, format);
}
