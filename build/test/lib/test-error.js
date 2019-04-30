"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invalid_value_1 = require("./errors/invalid-value");
/**
 * Calls the `.testError` method of `type` or falls back to an implementation derived from `.test`.
 *
 * @param type The type used for the test.
 * @param value The value to match.
 * @return Undefined if the value matches, otherwise an `Error` instance.
 */
function testError(type, value) {
    if (type.testError !== undefined) {
        return type.testError(value);
    }
    else {
        return type.test(value) ? undefined : invalid_value_1.createInvalidValueError(type, value);
    }
}
exports.testError = testError;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdGVzdC1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDBEQUFpRTtBQUVqRTs7Ozs7O0dBTUc7QUFDSCxTQUFnQixTQUFTLENBQUksSUFBYSxFQUFFLEtBQVE7SUFDbEQsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtRQUNoQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDOUI7U0FBTTtRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyx1Q0FBdUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDNUU7QUFDSCxDQUFDO0FBTkQsOEJBTUMiLCJmaWxlIjoibGliL3Rlc3QtZXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4vY29yZVwiO1xuaW1wb3J0IHsgY3JlYXRlSW52YWxpZFZhbHVlRXJyb3IgfSBmcm9tIFwiLi9lcnJvcnMvaW52YWxpZC12YWx1ZVwiO1xuXG4vKipcbiAqIENhbGxzIHRoZSBgLnRlc3RFcnJvcmAgbWV0aG9kIG9mIGB0eXBlYCBvciBmYWxscyBiYWNrIHRvIGFuIGltcGxlbWVudGF0aW9uIGRlcml2ZWQgZnJvbSBgLnRlc3RgLlxuICpcbiAqIEBwYXJhbSB0eXBlIFRoZSB0eXBlIHVzZWQgZm9yIHRoZSB0ZXN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBtYXRjaC5cbiAqIEByZXR1cm4gVW5kZWZpbmVkIGlmIHRoZSB2YWx1ZSBtYXRjaGVzLCBvdGhlcndpc2UgYW4gYEVycm9yYCBpbnN0YW5jZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRlc3RFcnJvcjxUPih0eXBlOiBUeXBlPFQ+LCB2YWx1ZTogVCk6IEVycm9yIHwgdW5kZWZpbmVkIHtcbiAgaWYgKHR5cGUudGVzdEVycm9yICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdHlwZS50ZXN0RXJyb3IodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0eXBlLnRlc3QodmFsdWUpID8gdW5kZWZpbmVkIDogY3JlYXRlSW52YWxpZFZhbHVlRXJyb3IodHlwZSwgdmFsdWUpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii4uIn0=
