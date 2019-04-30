import { lazyProperties } from "../_helpers/lazy-properties";
import { createLazyOptionsError } from "../errors/lazy-options";
import { testError } from "../test-error";
export const name = "white-list";
export class WhiteListType {
    constructor(options) {
        this.name = name;
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazyProperties(this, this._applyOptions, ["itemType", "values"]);
        }
    }
    read(reader, raw) {
        if (this.itemType.read === undefined) {
            throw new Error("NotReadable");
        }
        const result = this.itemType.read(reader, raw);
        for (const allowed of this.values) {
            if (this.itemType.equals(result, allowed)) {
                return result;
            }
        }
        throw new Error("UnkownVariant");
    }
    write(writer, value) {
        if (this.itemType.write !== undefined) {
            return this.itemType.write(writer, value);
        }
        else {
            throw new Error("NotWritable");
        }
    }
    testError(val) {
        const error = testError(this.itemType, val);
        if (error !== undefined) {
            return error;
        }
        for (const allowed of this.values) {
            if (this.itemType.equals(val, allowed)) {
                return undefined;
            }
        }
        return new Error("UnkownVariant");
    }
    test(value) {
        if (!this.itemType.test(value)) {
            return false;
        }
        for (const allowed of this.values) {
            if (this.itemType.equals(value, allowed)) {
                return true;
            }
        }
        return false;
    }
    equals(val1, val2) {
        return this.itemType.equals(val1, val2);
    }
    clone(val) {
        return this.itemType.clone(val);
    }
    diff(oldVal, newVal) {
        return this.itemType.diff(oldVal, newVal);
    }
    patch(oldVal, diff) {
        return this.itemType.patch(oldVal, diff);
    }
    reverseDiff(diff) {
        return this.itemType.reverseDiff(diff);
    }
    squash(diff1, diff2) {
        return this.itemType.squash(diff1, diff2);
    }
    _applyOptions() {
        if (this._options === undefined) {
            throw createLazyOptionsError(this);
        }
        const options = typeof this._options === "function" ? this._options() : this._options;
        const itemType = options.itemType;
        const values = options.values;
        Object.assign(this, { itemType, values });
    }
}
