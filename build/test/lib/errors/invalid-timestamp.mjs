export const name = "InvalidTimestamp";
export function format({ date }) {
    return `Invalid timestamp for the date: ${JSON.stringify(date)}`;
}
export function createInvalidTimestampError(date) {
    return new Error(name);
}
