import { Incident } from "incident";
import { checkedUcs2Decode } from "../_helpers/checked-ucs2-decode";
import { lazyProperties } from "../_helpers/lazy-properties";
import { createInvalidTypeError } from "../errors/invalid-type";
import { createLazyOptionsError } from "../errors/lazy-options";
import { createLowerCaseError } from "../errors/lower-case";
import { createMaxCodepointsError } from "../errors/max-codepoints";
import { createMinCodepointsError } from "../errors/min-codepoints";
import { createMissingDependencyError } from "../errors/missing-dependency";
import { createNotTrimmedError } from "../errors/not-trimmed";
import { createPatternNotMatchedError } from "../errors/pattern-not-matched";
import { readVisitor } from "../readers/read-visitor";
export var Normalization;
(function (Normalization) {
    Normalization[Normalization["None"] = 0] = "None";
    Normalization[Normalization["Nfc"] = 1] = "Nfc";
})(Normalization || (Normalization = {}));
export const name = "codepoint-string";
export class CodepointStringType {
    constructor(options) {
        this.name = name;
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazyProperties(this, this._applyOptions, [
                "normalization",
                "enforceUnicodeRegExp",
                "pattern",
                "lowerCase",
                "trimmed",
                "minCodepoints",
                "maxCodepoints",
                "unorm",
            ]);
        }
    }
    static fromJSON(options) {
        const resolvedOptions = {
            normalization: options.normalization === "none" ? Normalization.None : Normalization.Nfc,
            enforceUnicodeRegExp: options.enforceUnicodeRegExp,
            lowerCase: options.lowerCase,
            trimmed: options.trimmed,
            maxCodepoints: options.maxCodepoints,
        };
        if (options.pattern !== undefined) {
            resolvedOptions.pattern = new RegExp(options.pattern[0], options.pattern[1]);
        }
        if (options.minCodepoints !== undefined) {
            resolvedOptions.minCodepoints = options.minCodepoints;
        }
        return new CodepointStringType(resolvedOptions);
    }
    toJSON() {
        const jsonType = {
            name,
            normalization: this.normalization === Normalization.None ? "none" : "nfc",
            enforceUnicodeRegExp: this.enforceUnicodeRegExp,
            lowerCase: this.lowerCase,
            trimmed: this.trimmed,
            maxCodepoints: this.maxCodepoints,
        };
        if (this.pattern !== undefined) {
            jsonType.pattern = [this.pattern.source, this.pattern.flags];
        }
        if (this.minCodepoints !== undefined) {
            jsonType.minCodepoints = this.minCodepoints;
        }
        return jsonType;
    }
    // TODO: Dynamically add with prototype?
    read(reader, raw) {
        return reader.readString(raw, readVisitor({
            fromString: (input) => {
                const error = this.testError(input);
                if (error !== undefined) {
                    throw error;
                }
                return input;
            },
        }));
    }
    // TODO: Dynamically add with prototype?
    write(writer, value) {
        return writer.writeString(value);
    }
    testError(val) {
        if (!(typeof val === "string")) {
            return createInvalidTypeError("string", val);
        }
        switch (this.normalization) {
            case Normalization.Nfc:
                if (this.unorm === undefined) {
                    throw createMissingDependencyError("unorm", "Required to normalize unicode strings to NFC.");
                }
                if (val !== this.unorm.nfc(val)) {
                    return Incident("UnicodeNormalization", "Not NFC-Normalized");
                }
                break;
            case Normalization.None:
                break;
            default:
                throw new Incident(`IncompleteSwitch: Received unexpected variant for this.normalization: ${this.normalization}`);
        }
        if (this.lowerCase && val !== val.toLowerCase()) {
            return createLowerCaseError(val);
        }
        if (this.trimmed && val !== val.trim()) {
            return createNotTrimmedError(val);
        }
        let codepointCount;
        try {
            codepointCount = checkedUcs2Decode(val).length;
        }
        catch (err) {
            return err;
        }
        const minCodepoints = this.minCodepoints;
        if (typeof minCodepoints === "number" && codepointCount < minCodepoints) {
            return createMinCodepointsError(val, codepointCount, minCodepoints);
        }
        if (codepointCount > this.maxCodepoints) {
            return createMaxCodepointsError(val, codepointCount, this.maxCodepoints);
        }
        if (this.pattern instanceof RegExp) {
            if (!this.pattern.unicode && this.enforceUnicodeRegExp) {
                throw new Incident("NonUnicodeRegExp", "Enforced unicode RegExp, use `enforceUnicodeRegExp = false` or `Ucs2StringType`");
            }
            if (!this.pattern.test(val)) {
                return createPatternNotMatchedError(this.pattern, val);
            }
        }
        return undefined;
    }
    test(val) {
        return this.testError(val) === undefined;
    }
    equals(val1, val2) {
        return val1 === val2;
    }
    clone(val) {
        return val;
    }
    diff(oldVal, newVal) {
        return oldVal === newVal ? undefined : [oldVal, newVal];
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
        return diff1[0] === diff2[1] ? undefined : [diff1[0], diff2[1]];
    }
    _applyOptions() {
        if (this._options === undefined) {
            throw createLazyOptionsError(this);
        }
        const options = typeof this._options === "function" ? this._options() : this._options;
        const normalization = options.normalization !== undefined ?
            options.normalization :
            Normalization.Nfc;
        const enforceUnicodeRegExp = options.enforceUnicodeRegExp !== undefined ?
            options.enforceUnicodeRegExp :
            true;
        const pattern = options.pattern;
        const lowerCase = options.lowerCase !== undefined ? options.lowerCase : false;
        const trimmed = options.trimmed !== undefined ? options.trimmed : false;
        const minCodepoints = options.minCodepoints;
        const maxCodepoints = options.maxCodepoints;
        const unorm = options.unorm;
        Object.assign(this, { normalization, enforceUnicodeRegExp, pattern, lowerCase, trimmed, minCodepoints, maxCodepoints, unorm });
    }
}
