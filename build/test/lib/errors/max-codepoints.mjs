export const name = "MaxCodepoints";
export function format({ count, max }) {
    return `Expected codepoints count (${count}) to be less than or equal to ${max}`;
}
export function createMaxCodepointsError(string, count, max) {
    return new Error(name);
}
