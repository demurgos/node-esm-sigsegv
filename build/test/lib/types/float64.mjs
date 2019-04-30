import { lazyProperties } from "../_helpers/lazy-properties";
import { createInvalidFloat64Error } from "../errors/invalid-float64";
import { createInvalidTypeError } from "../errors/invalid-type";
import { createLazyOptionsError } from "../errors/lazy-options";
import { readVisitor } from "../readers/read-visitor";
export const name = "float64";
export class Float64Type {
    constructor(options) {
        this.name = name;
        this._options = options !== undefined ? options : {};
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazyProperties(this, this._applyOptions, ["allowNaN", "allowInfinity"]);
        }
    }
    static fromJSON(options) {
        return new Float64Type(options);
    }
    toJSON() {
        return {
            name,
            allowNaN: this.allowNaN,
            allowInfinity: this.allowInfinity,
        };
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
        if (isNaN(val) && !this.allowNaN) {
            return createInvalidFloat64Error(val);
        }
        else if (Math.abs(val) === Infinity && !this.allowInfinity) {
            return createInvalidFloat64Error(val);
        }
        return undefined;
    }
    test(val) {
        return typeof val === "number"
            && (this.allowNaN || !isNaN(val))
            && (this.allowInfinity || Math.abs(val) !== Infinity);
    }
    /**
     * Tests the equivalence of two valid float64 values.
     *
     * Two values are equivalent if they are both `NaN`, both `-0`, both `+0` or non-zero and
     * numerically equal.
     */
    equals(left, right) {
        return Object.is(left, right);
    }
    /**
     * Compares two valid float64 values.
     *
     * The values are ordered as follow:
     * - `-Infinity`
     * - Negative non-zero finite values
     * - `-0`
     * - `+0`
     * - Positive non-zero finite values
     * - `+Infinity`
     * - `NaN`
     *
     * @param left Left operand.
     * @param right Right operand.
     * @return Boolean indicating if `left <= right`
     */
    lte(left, right) {
        if (isNaN(right)) {
            return true;
        }
        else if (isNaN(left)) {
            return false;
        }
        if (left === 0 && right === 0) {
            return Object.is(left, -0) || Object.is(right, +0);
        }
        return left <= right;
    }
    clone(value) {
        return value;
    }
    diff(oldVal, newVal) {
        // We can't use an arithmetic difference due to possible precision loss
        return this.equals(oldVal, newVal) ? undefined : [oldVal, newVal];
    }
    patch(oldVal, diff) {
        return diff === undefined ? oldVal : diff[1];
    }
    reverseDiff(diff) {
        return diff === undefined ? undefined : [diff[1], diff[0]];
    }
    squash(diff1, diff2) {
        if (diff1 === undefined) {
            return diff2 === undefined ? undefined : [diff2[0], diff2[1]];
        }
        else if (diff2 === undefined) {
            return [diff1[0], diff1[1]];
        }
        return this.equals(diff1[0], diff2[1]) ? undefined : [diff1[0], diff2[1]];
    }
    _applyOptions() {
        if (this._options === undefined) {
            throw createLazyOptionsError(this);
        }
        const options = typeof this._options === "function" ? this._options() : this._options;
        const allowNaN = options.allowNaN !== undefined ? options.allowNaN : false;
        const allowInfinity = options.allowInfinity !== undefined ? options.allowInfinity : false;
        Object.assign(this, { allowNaN, allowInfinity });
    }
}
