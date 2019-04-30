import { Incident } from "incident";
import { lazyProperties } from "../_helpers/lazy-properties";
import { createInvalidTypeError } from "../errors/invalid-type";
import { createLazyOptionsError } from "../errors/lazy-options";
import { createLowerCaseError } from "../errors/lower-case";
import { createMaxUcs2StringLengthError } from "../errors/max-ucs2-string-length";
import { createMinUcs2StringLengthError } from "../errors/min-ucs2-string-length";
import { createNotTrimmedError } from "../errors/not-trimmed";
import { createPatternNotMatchedError } from "../errors/pattern-not-matched";
import { readVisitor } from "../readers/read-visitor";
export const name = "ucs2-string";
/**
 * The type used for simple Javascript strings.
 * Javascript strings expose characters as UCS2 code units. This is a fixed-size encoding that supports the unicode
 * codepoints from U+000000 to U+00FFFF (Basic Multilingual Plane or BMP). Displaying larger codepoints is
 * a property of the environment based on UTF-16 surrogate pairs. Unicode does not, and will never, assign
 * characters to the codepoints from U+OOD800 to U+00DFFF. These spare codepoints allows UTF16 to combine
 * codeunits from 0xd800 to 0xdfff in pairs (called surrogate pairs) to represent codepoints from supplementary planes.
 * This transformation happens during the transition from codeunits to codepoints in UTF-16.
 * In UCS2, the codeunits from 0xd800 to 0xdfff directly produce codepoints in the range from U+OOD8OO to
 * U+OODFF. Then, the display might merge these codepoints into higher codepoints during the rendering.
 *
 *
 * Lets take an example (all the numbers are in hexadecimal):
 *
 * ```
 *                                         +---+---+---+---+---+---+
 * Bytes                                   | 00| 41| d8| 34| dd| 1e|
 *                                         +---+---+---+---+---+---+
 * UTF-16BE codeunits                      | 0x0041| 0xd834| 0xdd1e|
 *                                         +-------+-------+-------+
 * Codepoints (from UTF-16BE)              |  U+41 |   U+01D11E    |
 *                                         +-------+---------------+
 * Displayed (from UTF-16BE)               |   A   |       𝄞       |
 *                                         +-------+-------+-------+
 * UCS2 codeunits                          | 0x0041| 0xd834| 0xdd1e|
 *                                         +-------+-------+-------+
 * Codepoints (from UCS2BE)                |  U+41 | U+D834| U+DD1E|  <- This is what Javascript sees
 *                                         +-------+-------+-------+
 * Displayed (from UCS2BE)                 |   A   |   �   |   �   |  <- This is what the user may see
 *                                         +-------+-------+-------+
 * Displayed (from UCS2BE with surrogates) |   A   |       𝄞       |  <- This is what the user may see
 *                                         +-------+---------------+
 * ```
 *
 * The most important takeaway is that codepoints outside of the BMP are a property of the display, not of
 * the Javascript string.
 * This is the cause of multiple issues.
 * - Surrogate halves are exposed as distinct characters: `"𝄞".length === 2`
 * - Unmatched surrogate halves are allowed: `"\ud834"`
 * - Surrogate pairs in the wrong order are allowed: `"\udd1e\ud834"`
 *
 * If you need to support the full unicode range by manipulating codepoints instead of UCS2 character codes, you may
 * want to use CodepointString or CodepointArray instead of Ucs2String.
 *
 * PS: This type does not deal with Unicdoe normalization either. Use CodepointString and CodepointArray if you need
 * it.
 */
export class Ucs2StringType {
    constructor(options) {
        this.name = name;
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazyProperties(this, this._applyOptions, ["allowUnicodeRegExp", "pattern", "lowerCase", "trimmed", "minLength", "maxLength"]);
        }
    }
    static fromJSON(options) {
        const resolvedOptions = {
            allowUnicodeRegExp: options.allowUnicodeRegExp,
            lowerCase: options.lowerCase,
            trimmed: options.trimmed,
            maxLength: options.maxLength,
        };
        if (options.pattern !== undefined) {
            resolvedOptions.pattern = new RegExp(options.pattern[0], options.pattern[1]);
        }
        if (options.minLength !== undefined) {
            resolvedOptions.minLength = options.minLength;
        }
        return new Ucs2StringType(resolvedOptions);
    }
    toJSON() {
        const jsonType = {
            name,
            allowUnicodeRegExp: this.allowUnicodeRegExp,
            lowerCase: this.lowerCase,
            trimmed: this.trimmed,
            maxLength: this.maxLength,
        };
        if (this.pattern !== undefined) {
            jsonType.pattern = [this.pattern.source, this.pattern.flags];
        }
        if (this.minLength !== undefined) {
            jsonType.minLength = this.minLength;
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
        if (typeof val !== "string") {
            return createInvalidTypeError("string", val);
        }
        if (this.lowerCase && val.toLowerCase() !== val) {
            return createLowerCaseError(val);
        }
        if (this.trimmed && val.trim() !== val) {
            return createNotTrimmedError(val);
        }
        const strLen = val.length;
        const minLength = this.minLength;
        if (minLength !== undefined && strLen < minLength) {
            return createMinUcs2StringLengthError(val, minLength);
        }
        if (strLen > this.maxLength) {
            return createMaxUcs2StringLengthError(val, this.maxLength);
        }
        if (this.pattern instanceof RegExp) {
            if (this.pattern.unicode && !this.allowUnicodeRegExp) {
                throw new Incident("UnicodeRegExp", "Disallowed unicode RegExp, use `allowUnicodeRegExp` or `CodepointStringType`");
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
        const allowUnicodeRegExp = options.allowUnicodeRegExp !== undefined ? options.allowUnicodeRegExp : true;
        const pattern = options.pattern;
        const lowerCase = options.lowerCase !== undefined ? options.lowerCase : false;
        const trimmed = options.trimmed !== undefined ? options.trimmed : false;
        const minLength = options.minLength;
        const maxLength = options.maxLength;
        Object.assign(this, { allowUnicodeRegExp, pattern, lowerCase, trimmed, minLength, maxLength });
    }
}
