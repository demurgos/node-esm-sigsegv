export const name = "PatternNotMatched";
export function format({ pattern, string }) {
    return `The regular expression ${pattern} does not match the string ${JSON.stringify(string)}`;
}
export function createPatternNotMatchedError(pattern, string) {
    return new Error(name);
}
