import { lazyProperties } from "../_helpers/lazy-properties";
import { createInvalidArrayItemsError } from "../errors/invalid-array-items";
import { createInvalidTypeError } from "../errors/invalid-type";
import { createLazyOptionsError } from "../errors/lazy-options";
import { createMaxArrayLengthError } from "../errors/max-array-length";
import { createMinArrayLengthError } from "../errors/min-array-length";
import { readVisitor } from "../readers/read-visitor";
import { testError } from "../test-error";
export const name = "array";
// tslint:disable-next-line:variable-name
export const ArrayType = class {
    constructor(options) {
        this.name = name;
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazyProperties(this, this._applyOptions, ["itemType", "minLength", "maxLength"]);
        }
    }
    // TODO: Dynamically add with prototype?
    read(reader, raw) {
        const itemType = this.itemType;
        const minLength = this.minLength;
        const maxLength = this.maxLength;
        return reader.readList(raw, readVisitor({
            fromList(input, itemReader) {
                let invalid = undefined;
                const result = [];
                let i = 0;
                for (const rawItem of input) {
                    if (maxLength !== undefined && i === maxLength) {
                        throw createMaxArrayLengthError([...input], maxLength);
                    }
                    try {
                        const item = itemType.read(itemReader, rawItem);
                        if (invalid === undefined) {
                            result.push(item);
                        }
                    }
                    catch (err) {
                        if (invalid === undefined) {
                            invalid = new Map();
                        }
                        invalid.set(i, err);
                    }
                    i++;
                }
                if (invalid !== undefined) {
                    throw createInvalidArrayItemsError(invalid);
                }
                if (minLength !== undefined && i < minLength) {
                    throw createMinArrayLengthError([...input], minLength);
                }
                return result;
            },
        }));
    }
    // TODO: Dynamically add with prototype?
    write(writer, value) {
        return writer.writeList(value.length, (index, itemWriter) => {
            if (this.itemType.write === undefined) {
                throw new Error("NotWritable");
            }
            return this.itemType.write(itemWriter, value[index]);
        });
    }
    testError(value) {
        if (!Array.isArray(value)) {
            return createInvalidTypeError("array", value);
        }
        if (this.maxLength !== undefined && value.length > this.maxLength) {
            return createMaxArrayLengthError(value, this.maxLength);
        }
        if (this.minLength !== undefined && value.length < this.minLength) {
            return createMinArrayLengthError(value, this.minLength);
        }
        const invalid = new Map();
        const itemCount = value.length;
        for (let i = 0; i < itemCount; i++) {
            const error = testError(this.itemType, value[i]);
            if (error !== undefined) {
                invalid.set(i, error);
            }
        }
        if (invalid.size !== 0) {
            return createInvalidArrayItemsError(invalid);
        }
        return undefined;
    }
    test(val) {
        if (!Array.isArray(val)
            || (this.maxLength !== undefined && val.length > this.maxLength)
            || (this.minLength !== undefined && val.length < this.minLength)) {
            return false;
        }
        for (const item of val) {
            if (!this.itemType.test(item)) {
                return false;
            }
        }
        return true;
    }
    equals(val1, val2) {
        if (val2.length !== val1.length) {
            return false;
        }
        for (let i = 0; i < val1.length; i++) {
            if (!this.itemType.equals(val2[i], val1[i])) {
                return false;
            }
        }
        return true;
    }
    clone(val) {
        return val.map((item) => this.itemType.clone(item));
    }
    _applyOptions() {
        if (this._options === undefined) {
            throw createLazyOptionsError(this);
        }
        const options = typeof this._options === "function" ? this._options() : this._options;
        const itemType = options.itemType;
        const minLength = options.minLength;
        const maxLength = options.maxLength;
        Object.assign(this, { itemType, minLength, maxLength });
    }
};
