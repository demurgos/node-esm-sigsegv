import { createInvalidTypeError } from "../errors/invalid-type";
import { readVisitor } from "../readers/read-visitor";
export const name = "boolean";
export class BooleanType {
    constructor() {
        this.name = name;
    }
    // TODO: Dynamically add with prototype?
    read(reader, raw) {
        return reader.readBoolean(raw, readVisitor({
            fromBoolean(input) {
                return input;
            },
        }));
    }
    // TODO: Dynamically add with prototype?
    write(writer, value) {
        return writer.writeBoolean(value);
    }
    testError(val) {
        if (typeof val !== "boolean") {
            return createInvalidTypeError("boolean", val);
        }
        return undefined;
    }
    test(value) {
        return typeof value === "boolean";
    }
    equals(left, right) {
        return left === right;
    }
    lte(left, right) {
        return left <= right;
    }
    clone(val) {
        return val;
    }
    /**
     * @param oldVal
     * @param newVal
     * @returns `true` if there is a difference, `undefined` otherwise
     */
    diff(oldVal, newVal) {
        /* tslint:disable-next-line:strict-boolean-expressions */
        return (oldVal !== newVal) || undefined;
    }
    patch(oldVal, diff) {
        return oldVal === (diff === undefined);
    }
    reverseDiff(diff) {
        return diff;
    }
    squash(diff1, diff2) {
        /* tslint:disable-next-line:strict-boolean-expressions */
        return (diff1 !== diff2) && undefined;
    }
}
