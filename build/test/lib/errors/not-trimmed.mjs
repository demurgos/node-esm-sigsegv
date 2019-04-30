export const name = "NotTrimmed";
export function format({ string }) {
    return `Expected the following string to be trimmed: ${JSON.stringify(string)}`;
}
export function createNotTrimmedError(string) {
    return new Error(name);
}
