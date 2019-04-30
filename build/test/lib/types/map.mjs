import { Incident } from "incident";
import { lazyProperties } from "../_helpers/lazy-properties";
import { createInvalidTypeError } from "../errors/invalid-type";
import { createLazyOptionsError } from "../errors/lazy-options";
import { createNotImplementedError } from "../errors/not-implemented";
import { readVisitor } from "../readers/read-visitor";
import { testError } from "../test-error";
export const name = "map";
export class MapType {
    constructor(options) {
        this.name = name;
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazyProperties(this, this._applyOptions, ["keyType", "valueType", "maxSize", "assumeStringKey"]);
        }
    }
    // TODO: Dynamically add with prototype?
    read(reader, raw) {
        if (this.assumeStringKey) {
            return reader.readDocument(raw, readVisitor({
                fromMap: (input, keyReader, valueReader) => {
                    const result = new Map();
                    for (const [rawKey, rawValue] of input) {
                        const uncheckedKey = keyReader.readString(rawKey, readVisitor({ fromString: (input) => input }));
                        const keyErr = this.keyType.testError(uncheckedKey);
                        if (keyErr !== undefined) {
                            throw keyErr;
                        }
                        const key = uncheckedKey;
                        let value;
                        try {
                            value = this.valueType.read(valueReader, rawValue);
                        }
                        catch (err) {
                            throw err;
                        }
                        result.set(key, value);
                    }
                    const error = this.testError(result);
                    if (error !== undefined) {
                        throw error;
                    }
                    return result;
                },
            }));
        }
        return reader.readMap(raw, readVisitor({
            fromMap: (input, keyReader, valueReader) => {
                const result = new Map();
                for (const [rawKey, rawValue] of input) {
                    const key = this.keyType.read(keyReader, rawKey);
                    const value = this.valueType.read(valueReader, rawValue);
                    result.set(key, value);
                }
                const error = this.testError(result);
                if (error !== undefined) {
                    throw error;
                }
                return result;
            },
        }));
    }
    // TODO: Dynamically add with prototype?
    write(writer, value) {
        if (this.assumeStringKey) {
            return writer.writeDocument(value.keys(), (outKey, fieldWriter) => {
                return this.valueType.write(fieldWriter, value.get(outKey));
            });
        }
        const entries = [...value];
        return writer.writeMap(entries.length, (index, keyWriter) => {
            if (this.keyType.write === undefined) {
                throw new Incident("NotWritable", { type: this.keyType });
            }
            return this.keyType.write(keyWriter, entries[index][0]);
        }, (index, valueWriter) => {
            if (this.valueType.write === undefined) {
                throw new Incident("NotWritable", { type: this.valueType });
            }
            return this.valueType.write(valueWriter, entries[index][1]);
        });
    }
    testError(val) {
        if (!(val instanceof Map)) {
            return createInvalidTypeError("Map", val);
        }
        for (const [key, value] of val) {
            const keyError = testError(this.keyType, key);
            if (keyError !== undefined) {
                return new Incident("InvalidMapKey", { key, value }, "Invalid map entry: invalid key");
            }
            const valueError = testError(this.valueType, value);
            if (valueError !== undefined) {
                return new Incident("InvalidMapValue", { key, value }, "Invalid map entry: invalid value");
            }
        }
        return undefined;
    }
    test(val) {
        if (!(val instanceof Map)) {
            return false;
        }
        for (const [key, value] of val) {
            if (!this.keyType.test(key) || !this.valueType.test(value)) {
                return false;
            }
        }
        return true;
    }
    equals(val1, val2) {
        if (val2.size !== val1.size) {
            return false;
        }
        const unmatched = new Map(val1);
        for (const [key2, value2] of val2) {
            for (const [key1, value1] of unmatched) {
                if (this.keyType.equals(key1, key2)) {
                    if (!this.valueType.equals(value1, value2)) {
                        return false;
                    }
                    unmatched.delete(key1);
                    break;
                }
            }
        }
        return true;
    }
    clone(val) {
        const result = new Map();
        for (const [key, value] of val) {
            const keyClone = this.keyType.clone(key);
            const valueClone = this.valueType.clone(value);
            result.set(keyClone, valueClone);
        }
        return result;
    }
    diff(_oldVal, _newVal) {
        throw createNotImplementedError("MapType#diff");
    }
    patch(_oldVal, _diff) {
        throw createNotImplementedError("MapType#patch");
    }
    reverseDiff(_diff) {
        throw createNotImplementedError("MapType#reverseDiff");
    }
    squash(_diff1, _diff2) {
        throw createNotImplementedError("MapType#squash");
    }
    _applyOptions() {
        if (this._options === undefined) {
            throw createLazyOptionsError(this);
        }
        const options = typeof this._options === "function" ? this._options() : this._options;
        const keyType = options.keyType;
        const valueType = options.valueType;
        const maxSize = options.maxSize;
        const assumeStringKey = options.assumeStringKey || false;
        Object.assign(this, { keyType, valueType, maxSize, assumeStringKey });
    }
}
