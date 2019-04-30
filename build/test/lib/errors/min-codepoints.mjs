export const name = "MinCodepoints";
export function format({ count, min }) {
    return `Expected codepoints count (${count}) to be greater than or equal to ${min}`;
}
export function createMinCodepointsError(string, count, min) {
    return new Error(name);
}
