import { Incident } from "incident";
import { lazyProperties } from "../_helpers/lazy-properties";
import { rename } from "../case-style";
import { createInvalidDocumentError } from "../errors/invalid-document";
import { createInvalidTypeError } from "../errors/invalid-type";
import { createLazyOptionsError } from "../errors/lazy-options";
import { createNotImplementedError } from "../errors/not-implemented";
import { readVisitor } from "../readers/read-visitor";
export const name = "document";
// We use an `any` cast because of the `properties` property.
// tslint:disable-next-line:variable-name
export const DocumentType = class {
    constructor(options) {
        this.name = name;
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazyProperties(this, this._applyOptions, ["noExtraKeys", "properties", "changeCase", "rename"]);
        }
    }
    /**
     * Map from serialized keys to the document keys
     */
    get outKeys() {
        if (this._outKeys === undefined) {
            this._outKeys = new Map();
            for (const key of Object.keys(this.properties)) {
                this._outKeys.set(this.getOutKey(key), key);
            }
        }
        return this._outKeys;
    }
    getOutKey(key) {
        if (typeof key !== "string") {
            throw new Error(`NonStringKey: ${key}`);
        }
        const descriptor = this.properties[key];
        if (descriptor.rename !== undefined) {
            return descriptor.rename;
        }
        else if (descriptor.changeCase !== undefined) {
            return rename(key, descriptor.changeCase);
        }
        if (this.rename !== undefined && this.rename[key] !== undefined) {
            return this.rename[key];
        }
        else if (this.changeCase !== undefined) {
            return rename(key, this.changeCase);
        }
        return key;
    }
    // TODO: Dynamically add with prototype?
    read(reader, raw) {
        return reader.readDocument(raw, readVisitor({
            fromMap: (input, keyReader, valueReader) => {
                const extra = new Set();
                const missing = new Set();
                for (const key in this.properties) {
                    const descriptor = this.properties[key];
                    if (!descriptor.optional) {
                        missing.add(key);
                    }
                }
                const invalid = new Map();
                const result = {}; // Object.create(null);
                for (const [rawKey, rawValue] of input) {
                    const outKey = keyReader.readString(rawKey, readVisitor({ fromString: (input) => input }));
                    const key = this.outKeys.get(outKey);
                    if (key === undefined) {
                        // Extra key
                        extra.add(outKey);
                        continue;
                    }
                    missing.delete(key);
                    const descriptor = this.properties[key];
                    // TODO: Update readers so `undefined` is impossible/not handled here
                    if (rawValue === undefined) {
                        if (descriptor.optional) {
                            result[key] = undefined;
                        }
                        else {
                            missing.add(key);
                        }
                        continue;
                    }
                    try {
                        result[key] = descriptor.type.read(valueReader, rawValue);
                    }
                    catch (err) {
                        invalid.set(key, err);
                    }
                }
                if (this.noExtraKeys && extra.size > 0 || missing.size > 0 || invalid.size > 0) {
                    throw createInvalidDocumentError({ extra, missing, invalid });
                }
                return result;
            },
        }));
    }
    // TODO: Dynamically add with prototype?
    write(writer, value) {
        const outKeys = new Map(this.outKeys);
        for (const [outKey, jskey] of outKeys) {
            if (value[jskey] === undefined) {
                outKeys.delete(outKey);
            }
        }
        return writer.writeDocument(outKeys.keys(), (outKey, fieldWriter) => {
            const jsKey = this.outKeys.get(outKey);
            const descriptor = this.properties[jsKey];
            if (descriptor.type.write === undefined) {
                throw new Incident("NotWritable", { type: descriptor.type });
            }
            return descriptor.type.write(fieldWriter, value[jsKey]);
        });
    }
    testError(val) {
        if (typeof val !== "object" || val === null) {
            return createInvalidTypeError("object", val);
        }
        const extra = this.noExtraKeys ? new Set(Object.keys(val)) : undefined;
        const missing = new Set();
        const invalid = new Map();
        for (const key in this.properties) {
            if (extra !== undefined) {
                extra.delete(key);
            }
            const descriptor = this.properties[key];
            const propertyValue = val[key];
            if (propertyValue === undefined) {
                if (!descriptor.optional) {
                    missing.add(key);
                }
                continue;
            }
            const error = descriptor.type.testError(propertyValue);
            if (error !== undefined) {
                invalid.set(key, error);
            }
        }
        if (extra !== undefined && extra.size > 0 || missing.size > 0 || invalid.size > 0) {
            return createInvalidDocumentError({ extra, missing, invalid });
        }
        return undefined;
    }
    test(val) {
        if (typeof val !== "object" || val === null) {
            return false;
        }
        const extra = this.noExtraKeys ? new Set(Object.keys(val)) : undefined;
        for (const key in this.properties) {
            if (extra !== undefined) {
                extra.delete(key);
            }
            const descriptor = this.properties[key];
            const propertyValue = val[key];
            if (propertyValue === undefined) {
                if (!descriptor.optional) {
                    return false;
                }
            }
            else if (!descriptor.type.test(propertyValue)) {
                return false;
            }
        }
        return extra === undefined || extra.size === 0;
    }
    equals(val1, val2) {
        for (const key in this.properties) {
            const descriptor = this.properties[key];
            if (!descriptor.optional) {
                if (!descriptor.type.equals(val1[key], val2[key])) {
                    return false;
                }
                continue;
            }
            if (val1[key] === undefined && val2[key] === undefined) {
                continue;
            }
            if (val1[key] === undefined || val2[key] === undefined || !descriptor.type.equals(val1[key], val2[key])) {
                return false;
            }
        }
        return true;
    }
    clone(val) {
        const result = {}; // Object.create(null);
        for (const key in this.properties) {
            result[key] = val[key] === undefined ? undefined : this.properties[key].type.clone(val[key]);
        }
        return result;
    }
    diff(oldVal, newVal) {
        let equal = true;
        const result = { set: {}, unset: {}, update: {} };
        for (const key in this.properties) {
            // TODO: Remove cast
            const descriptor = this.properties[key];
            const oldMember = oldVal[key];
            const newMember = newVal[key];
            if (oldMember !== undefined) {
                if (newMember !== undefined) {
                    const diff = descriptor.type.diff(oldMember, newMember);
                    if (diff !== undefined) {
                        result.update[key] = diff;
                        equal = false;
                    }
                }
                else {
                    result.unset[key] = descriptor.type.clone(oldMember);
                    equal = false;
                }
            }
            else {
                if (newMember === undefined) {
                    result.set[key] = descriptor.type.clone(newMember);
                    equal = false;
                }
            }
        }
        return equal ? undefined : result;
    }
    patch(oldVal, diff) {
        const result = this.clone(oldVal);
        if (diff === undefined) {
            return result;
        }
        for (const key in diff.set) {
            result[key] = this.properties[key].type.clone(diff.set[key]);
        }
        for (const key in diff.unset) {
            Reflect.deleteProperty(result, key);
        }
        for (const key in diff.update) {
            // TODO: Remove cast
            result[key] = this.properties[key].type.patch(result[key], diff.update[key]);
        }
        return result;
    }
    reverseDiff(diff) {
        if (diff === undefined) {
            return undefined;
        }
        const result = { set: {}, unset: {}, update: {} };
        for (const key in diff.unset) {
            result.set[key] = this.properties[key].type.clone(diff.unset[key]);
        }
        for (const key in diff.set) {
            result.unset[key] = this.properties[key].type.clone(diff.set[key]);
        }
        for (const key in diff.update) {
            // TODO: Remove cast
            result.update[key] = this.properties[key].type.reverseDiff(diff.update[key]);
        }
        return result;
    }
    squash(_diff1, _diff2) {
        throw createNotImplementedError("DocumentType#squash");
    }
    _applyOptions() {
        if (this._options === undefined) {
            throw createLazyOptionsError(this);
        }
        const options = typeof this._options === "function" ?
            this._options() :
            this._options;
        const noExtraKeys = options.noExtraKeys;
        const properties = options.properties;
        const rename = options.rename;
        const changeCase = options.changeCase;
        Object.assign(this, { noExtraKeys, properties, rename, changeCase });
    }
};
export function renameKeys(obj, renameAll) {
    const keys = Object.keys(obj);
    const result = new Map();
    const outKeys = new Set();
    for (const key of keys) {
        const renamed = renameAll === undefined ? key : rename(key, renameAll);
        result.set(key, renamed);
        if (outKeys.has(renamed)) {
            throw new Incident("NonBijectiveKeyRename", "Some keys are the same after renaming");
        }
        outKeys.add(renamed);
    }
    return result;
}
