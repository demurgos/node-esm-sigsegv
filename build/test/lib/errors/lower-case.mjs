export const name = "LowerCase";
export function format({ string }) {
    return `Expected the following string to be lowercase: ${JSON.stringify(string)}`;
}
export function createLowerCaseError(string) {
    return Error(name);
}
