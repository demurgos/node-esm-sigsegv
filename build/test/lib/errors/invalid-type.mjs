import { Incident } from "incident";
import objectInspect from "object-inspect";
export const name = "InvalidType";
export function format({ typeName, value, variableName }) {
    if (typeof variableName === "string") {
        return `Variable \`${variableName}\` should have type \`${typeName}\`: ${objectInspect(value)}`;
    }
    else {
        return `Expected type \`${typeName}\`: ${objectInspect(value)}`;
    }
}
export function createInvalidTypeError(typeName, value, variableName) {
    return Incident(name, { typeName, value, variableName }, format);
}
