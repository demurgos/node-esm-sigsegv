import { createInvalidValueError } from "./errors/invalid-value";
/**
 * Calls the `.testError` method of `type` or falls back to an implementation derived from `.test`.
 *
 * @param type The type used for the test.
 * @param value The value to match.
 * @return Undefined if the value matches, otherwise an `Error` instance.
 */
export function testError(type, value) {
    if (type.testError !== undefined) {
        return type.testError(value);
    }
    else {
        return type.test(value) ? undefined : createInvalidValueError(type, value);
    }
}
