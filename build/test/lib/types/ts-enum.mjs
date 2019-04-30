import { Incident } from "incident";
import { lazyProperties } from "../_helpers/lazy-properties";
import { rename } from "../case-style";
import { createLazyOptionsError } from "../errors/lazy-options";
import { createNotImplementedError } from "../errors/not-implemented";
import { readVisitor } from "../readers/read-visitor";
export const name = "ts-enum";
/**
 * Builds a map from a TS enum by removing reverse-lookup keys.
 */
function tsEnumToMap(tsEnum) {
    const result = new Map();
    for (const key in tsEnum) {
        if (!isValidEnumMember(key)) {
            continue;
        }
        result.set(key, tsEnum[key]);
    }
    return result;
}
/**
 * Function used by TS to check the names of enums (isNumericLiteralName)
 *
 * @see https://github.com/Microsoft/TypeScript/blob/89de4c9a3ab3f7f88a141f1529b77628204bff73/lib/tsc.js#L36877
 */
function isValidEnumMember(key) {
    return (+key).toString() !== key || key === "Infinity" || key === "-Infinity" || key === "NaN";
}
/**
 * Converts a TS enum and rename options to two maps: from out names to values and from
 * values to out names.
 */
function getEnumMaps(tsEnum, changeCase, renameAll) {
    const jsToOut = new Map();
    const outToJs = new Map();
    // TODO: Check for bijection
    for (const [key, value] of tsEnumToMap(tsEnum)) {
        let name = key;
        if (renameAll !== undefined && renameAll[key] !== undefined) {
            name = renameAll[key];
        }
        else if (changeCase !== undefined) {
            name = rename(key, changeCase);
        }
        jsToOut.set(value, name);
        outToJs.set(name, value);
    }
    return [jsToOut, outToJs];
}
/**
 * Represents a TS-style enum value.
 *
 * A TS enum value is defined in an object ("enum object"). It contains "forward"properties from
 * non-numeric strings to strings or numbers and "reversed" properties from numeric strings to
 * keys of forward properties with constant numeric values.
 */
export class TsEnumType {
    constructor(options) {
        this.name = name;
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazyProperties(this, this._applyOptions, ["enum", "changeCase", "rename"]);
        }
    }
    get jsToOut() {
        if (this._jsToOut === undefined) {
            [this._jsToOut, this._outToJs] = getEnumMaps(this.enum, this.changeCase, this.rename);
        }
        return this._jsToOut;
    }
    get outToJs() {
        if (this._outToJs === undefined) {
            [this._jsToOut, this._outToJs] = getEnumMaps(this.enum, this.changeCase, this.rename);
        }
        return this._outToJs;
    }
    static fromJSON() {
        throw createNotImplementedError("TsEnumType.fromJSON");
    }
    read(reader, raw) {
        return reader.readString(raw, readVisitor({
            fromString: (input) => {
                if (!reader.trustInput && !this.outToJs.has(input)) {
                    throw Incident("Unknown enum variant name", input);
                }
                return this.outToJs.get(input);
            },
        }));
    }
    write(writer, value) {
        return writer.writeString(this.jsToOut.get(value));
    }
    testError(value) {
        if (!this.jsToOut.has(value)) {
            return Incident("UnknownVariantError", { value }, "Unknown enum variant value");
        }
        return undefined;
    }
    test(value) {
        return this.jsToOut.has(value);
    }
    equals(val1, val2) {
        return val1 === val2;
    }
    clone(val) {
        return val;
    }
    _applyOptions() {
        if (this._options === undefined) {
            throw createLazyOptionsError(this);
        }
        const options = typeof this._options === "function" ? this._options() : this._options;
        const tsEnum = options.enum;
        const changeCase = options.changeCase;
        const rename = options.rename;
        Object.assign(this, { enum: tsEnum, changeCase, rename });
    }
}
