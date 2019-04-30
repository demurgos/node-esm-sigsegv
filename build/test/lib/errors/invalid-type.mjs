export const name = "InvalidType";
export function format({ typeName, value, variableName }) {
    if (typeof variableName === "string") {
        return `Variable \`${variableName}\` should have type \`${typeName}\``;
    }
    else {
        return `Expected type \`${typeName}\``;
    }
}
export function createInvalidTypeError(typeName, value, variableName) {
    return new Error(name);
}
