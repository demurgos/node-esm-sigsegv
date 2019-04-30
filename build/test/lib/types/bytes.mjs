import { lazyProperties } from "../_helpers/lazy-properties";
import { createInvalidTypeError } from "../errors/invalid-type";
import { createLazyOptionsError } from "../errors/lazy-options";
import { createMaxArrayLengthError } from "../errors/max-array-length";
import { createNotImplementedError } from "../errors/not-implemented";
import { readVisitor } from "../readers/read-visitor";
export class BytesType {
    constructor(options) {
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazyProperties(this, this._applyOptions, ["maxLength"]);
        }
    }
    // TODO: Dynamically add with prototype?
    read(reader, raw) {
        return reader.readBytes(raw, readVisitor({
            fromBytes(input) {
                return input;
            },
        }));
    }
    // TODO: Dynamically add with prototype?
    write(writer, value) {
        return writer.writeBytes(value);
    }
    testError(val) {
        if (!(val instanceof Uint8Array)) {
            return createInvalidTypeError("Uint8Array", val);
        }
        if (this.maxLength !== undefined && val.length > this.maxLength) {
            return createMaxArrayLengthError(val, this.maxLength);
        }
        return undefined;
    }
    test(val) {
        return this.testError(val) === undefined;
    }
    equals(left, right) {
        if (left.length !== right.length) {
            return false;
        }
        for (let i = 0; i < left.length; i++) {
            if (left[i] !== right[i]) {
                return false;
            }
        }
        return true;
    }
    lte(left, right) {
        const minLength = Math.min(left.length, right.length);
        for (let i = 0; i < minLength; i++) {
            if (left[i] > right[i]) {
                return false;
            }
        }
        return left.length <= right.length;
    }
    clone(val) {
        return Uint8Array.from(val);
    }
    /**
     * @param _oldVal
     * @param _newVal
     * @returns `true` if there is a difference, `undefined` otherwise
     */
    diff(_oldVal, _newVal) {
        throw createNotImplementedError("BufferType#diff");
    }
    patch(_oldVal, _diff) {
        throw createNotImplementedError("BufferType#patch");
    }
    reverseDiff(_diff) {
        throw createNotImplementedError("BufferType#reverseDiff");
    }
    squash(_diff1, _diff2) {
        throw createNotImplementedError("BufferType#squash");
    }
    _applyOptions() {
        if (this._options === undefined) {
            throw createLazyOptionsError(this);
        }
        const options = typeof this._options === "function" ? this._options() : this._options;
        const maxLength = options.maxLength;
        Object.assign(this, { maxLength });
    }
}
