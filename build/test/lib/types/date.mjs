import { createInvalidTimestampError } from "../errors/invalid-timestamp";
import { createInvalidTypeError } from "../errors/invalid-type";
import { readVisitor } from "../readers/read-visitor";
export const name = "date";
export class DateType {
    constructor() {
        this.name = name;
    }
    // TODO: Dynamically add with prototype?
    read(reader, raw) {
        return reader.readDate(raw, readVisitor({
            fromDate: (input) => {
                const error = this.testError(input);
                if (error !== undefined) {
                    throw error;
                }
                return input;
            },
        }));
    }
    // TODO: Dynamically add with prototype?
    write(writer, value) {
        return writer.writeDate(value);
    }
    testError(val) {
        if (!(val instanceof Date)) {
            return createInvalidTypeError("Date", val);
        }
        const time = val.getTime();
        if (isNaN(time) || time > Number.MAX_SAFE_INTEGER || time < Number.MIN_SAFE_INTEGER) {
            return createInvalidTimestampError(val);
        }
        return undefined;
    }
    test(val) {
        return this.testError(val) === undefined;
    }
    equals(left, right) {
        return left.getTime() === right.getTime();
    }
    lte(left, right) {
        return left.getTime() <= right.getTime();
    }
    clone(val) {
        return new Date(val.getTime());
    }
    diff(oldVal, newVal) {
        // tslint:disable-next-line:strict-boolean-expressions
        return newVal.getTime() - oldVal.getTime() || undefined;
    }
    patch(oldVal, diff) {
        // tslint:disable-next-line:strict-boolean-expressions
        return new Date(oldVal.getTime() + (diff || 0));
    }
    reverseDiff(diff) {
        // tslint:disable-next-line:strict-boolean-expressions
        return diff && -diff;
    }
    squash(diff1, diff2) {
        if (diff1 === undefined) {
            return diff2;
        }
        else if (diff2 === undefined) {
            return diff1;
        }
        return diff2 === -diff1 ? undefined : diff1 + diff2;
    }
}
