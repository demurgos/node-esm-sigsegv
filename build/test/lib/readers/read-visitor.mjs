/**
 * @module kryo/readers/read-visitor
 */
function fromBoolean(_) {
    throw new Error("Unable to read from boolean");
}
function fromBytes(_) {
    throw new Error("Unable to read from bytes");
}
function fromDate(_) {
    throw new Error("Unable to read from date");
}
function fromFloat64(_) {
    throw new Error("Unable to read from float64");
}
function fromList(_) {
    throw new Error("Unable to read from list");
}
function fromMap(_) {
    throw new Error("Unable to read from map");
}
function fromNull() {
    throw new Error("Unable to read from null");
}
function fromString(_) {
    throw new Error("Unable to read from string");
}
export function readVisitor(partial) {
    return Object.assign({ fromBytes,
        fromBoolean,
        fromDate,
        fromFloat64,
        fromMap,
        fromNull,
        fromList,
        fromString }, partial);
}
