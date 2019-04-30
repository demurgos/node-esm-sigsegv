import { lazyProperties } from "../_helpers/lazy-properties";
import { createLazyOptionsError } from "../errors/lazy-options";
import { testError } from "../test-error";
export const name = "literal";
/**
 * You may need to explicitly write the type or inference won't pick it.
 * For example, in the case of enum values, inference will pick the type of the enum instead of
 * the specific property you pass.
 *
 * @see https://github.com/Microsoft/TypeScript/issues/10195
 */
// tslint:disable-next-line:variable-name
export const LiteralType = class {
    constructor(options) {
        this.name = name;
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazyProperties(this, this._applyOptions, ["type", "value"]);
        }
    }
    read(reader, raw) {
        if (this.type.read === undefined) {
            throw new Error("NotReadable");
        }
        return reader.trustInput ? this.clone(this.value) : this.type.read(reader, raw);
    }
    write(writer, value) {
        if (this.type.write === undefined) {
            throw new Error("NotWritable");
        }
        return this.type.write(writer, value);
    }
    testError(val) {
        const error = testError(this.type, val);
        if (error !== undefined) {
            return error;
        }
        if (!this.type.equals(val, this.value)) {
            return Error("InvalidLiteral");
        }
        return undefined;
    }
    test(value) {
        return this.type.test(value) && this.type.equals(value, this.value);
    }
    equals(val1, val2) {
        return this.type.equals(val1, val2);
    }
    clone(val) {
        return this.type.clone(val);
    }
    diff(_oldVal, _newVal) {
        return;
    }
    patch(oldVal, _diff) {
        return this.type.clone(oldVal);
    }
    reverseDiff(_diff) {
        return;
    }
    squash(_diff1, _diff2) {
        return;
    }
    _applyOptions() {
        if (this._options === undefined) {
            throw createLazyOptionsError(this);
        }
        const options = typeof this._options === "function"
            ? this._options()
            : this._options;
        const type = options.type;
        const value = options.value;
        Object.assign(this, { type, value });
    }
};
