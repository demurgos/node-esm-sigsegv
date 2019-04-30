import { lazyProperties } from "../_helpers/lazy-properties";
import { createInvalidIntegerError } from "../errors/invalid-integer";
import { createInvalidTypeError } from "../errors/invalid-type";
import { createLazyOptionsError } from "../errors/lazy-options";
import { readVisitor } from "../readers/read-visitor";
export const name = "integer";
/**
 * Default value for the `min` option.
 * It corresponds to `-(2**53)`.
 */
export const DEFAULT_MIN = Number.MIN_SAFE_INTEGER - 1;
/**
 * Default value for the `max` option.
 * It corresponds to `2**53 - 1`.
 */
export const DEFAULT_MAX = Number.MAX_SAFE_INTEGER;
export class IntegerType {
    constructor(options) {
        this.name = name;
        if (options === undefined) {
            this._options = {};
            this._applyOptions();
            return;
        }
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazyProperties(this, this._applyOptions, ["min", "max"]);
        }
    }
    static fromJSON(options) {
        return new IntegerType(options);
    }
    toJSON() {
        return { name, min: this.min, max: this.max };
    }
    read(reader, raw) {
        return reader.readFloat64(raw, readVisitor({
            fromFloat64: (input) => {
                const error = reader.trustInput ? undefined : this.testError(input);
                if (error !== undefined) {
                    throw error;
                }
                return input;
            },
        }));
    }
    // TODO: Dynamically add with prototype?
    write(writer, value) {
        return writer.writeFloat64(value);
    }
    testError(val) {
        if (typeof val !== "number") {
            return createInvalidTypeError("number", val);
        }
        if (Math.round(val) !== val) {
            return createInvalidIntegerError(val);
        }
        if (val < this.min || val > this.max) {
            return new Error("Range");
        }
        return undefined;
    }
    test(val) {
        return typeof val === "number" && val >= this.min && val <= this.max && Math.round(val) === val;
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
    diff(oldVal, newVal) {
        return newVal === oldVal ? undefined : newVal - oldVal;
    }
    patch(oldVal, diff) {
        return diff === undefined ? oldVal : oldVal + diff;
    }
    reverseDiff(diff) {
        /* tslint:disable-next-line:strict-boolean-expressions */
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
    _applyOptions() {
        if (this._options === undefined) {
            throw createLazyOptionsError(this);
        }
        const options = typeof this._options === "function" ? this._options() : this._options;
        const min = options.min !== undefined ? options.min : DEFAULT_MIN;
        const max = options.max !== undefined ? options.max : DEFAULT_MAX;
        Object.assign(this, { min, max });
    }
}
