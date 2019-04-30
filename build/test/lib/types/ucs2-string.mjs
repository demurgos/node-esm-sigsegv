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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdHlwZXMvdWNzMi1zdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFN0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbEYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR3RELE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBUyxhQUFhLENBQUM7QUFpRHhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOENHO0FBQ0gsTUFBTSxPQUFPLGNBQWM7SUFXekIsWUFBWSxPQUFvQztRQVZ2QyxTQUFJLEdBQVMsSUFBSSxDQUFDO1FBV3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksT0FBTyxPQUFPLEtBQUssVUFBVSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjthQUFNO1lBQ0wsY0FBYyxDQUNaLElBQUksRUFDSixJQUFJLENBQUMsYUFBYSxFQUNsQixDQUFDLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFdBQVcs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RSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRTdHLE1BQU0sa0JBQWtCLEdBQVksT0FBTyxDQUFDLGtCQUFrQixLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakgsTUFBTSxPQUFPLEdBQXVCLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDcEQsTUFBTSxTQUFTLEdBQVksT0FBTyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN2RixNQUFNLE9BQU8sR0FBWSxPQUFPLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2pGLE1BQU0sU0FBUyxHQUF1QixPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ3hELE1BQU0sU0FBUyxHQUFXLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFFNUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBQyxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztJQUMvRixDQUFDO0NBQ0YiLCJmaWxlIjoibGliL3R5cGVzL3VjczItc3RyaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5jaWRlbnQgfSBmcm9tIFwiaW5jaWRlbnRcIjtcbmltcG9ydCB7IGxhenlQcm9wZXJ0aWVzIH0gZnJvbSBcIi4uL19oZWxwZXJzL2xhenktcHJvcGVydGllc1wiO1xuaW1wb3J0IHsgSW9UeXBlLCBMYXp5LCBSZWFkZXIsIFZlcnNpb25lZFR5cGUsIFdyaXRlciB9IGZyb20gXCIuLi9jb3JlXCI7XG5pbXBvcnQgeyBjcmVhdGVJbnZhbGlkVHlwZUVycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9pbnZhbGlkLXR5cGVcIjtcbmltcG9ydCB7IGNyZWF0ZUxhenlPcHRpb25zRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL2xhenktb3B0aW9uc1wiO1xuaW1wb3J0IHsgY3JlYXRlTG93ZXJDYXNlRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL2xvd2VyLWNhc2VcIjtcbmltcG9ydCB7IGNyZWF0ZU1heFVjczJTdHJpbmdMZW5ndGhFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvbWF4LXVjczItc3RyaW5nLWxlbmd0aFwiO1xuaW1wb3J0IHsgY3JlYXRlTWluVWNzMlN0cmluZ0xlbmd0aEVycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9taW4tdWNzMi1zdHJpbmctbGVuZ3RoXCI7XG5pbXBvcnQgeyBjcmVhdGVOb3RUcmltbWVkRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL25vdC10cmltbWVkXCI7XG5pbXBvcnQgeyBjcmVhdGVQYXR0ZXJuTm90TWF0Y2hlZEVycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9wYXR0ZXJuLW5vdC1tYXRjaGVkXCI7XG5pbXBvcnQgeyByZWFkVmlzaXRvciB9IGZyb20gXCIuLi9yZWFkZXJzL3JlYWQtdmlzaXRvclwiO1xuXG5leHBvcnQgdHlwZSBOYW1lID0gXCJ1Y3MyLXN0cmluZ1wiO1xuZXhwb3J0IGNvbnN0IG5hbWU6IE5hbWUgPSBcInVjczItc3RyaW5nXCI7XG5leHBvcnQgbmFtZXNwYWNlIGpzb24ge1xuICBleHBvcnQgdHlwZSBJbnB1dCA9IHN0cmluZztcbiAgZXhwb3J0IHR5cGUgT3V0cHV0ID0gc3RyaW5nO1xuXG4gIGV4cG9ydCBpbnRlcmZhY2UgVHlwZSB7XG4gICAgbmFtZTogTmFtZTtcbiAgICBhbGxvd1VuaWNvZGVSZWdFeHA6IGJvb2xlYW47XG4gICAgcGF0dGVybj86IFtzdHJpbmcsIHN0cmluZ107XG4gICAgbG93ZXJDYXNlOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEBzZWUgW1tVY3MyU3RyaW5nVHlwZU9wdGlvbnMudHJpbW1lZF1dXG4gICAgICovXG4gICAgdHJpbW1lZDogYm9vbGVhbjtcbiAgICBtaW5MZW5ndGg/OiBudW1iZXI7XG4gICAgbWF4TGVuZ3RoOiBudW1iZXI7XG4gIH1cbn1cbmV4cG9ydCB0eXBlIERpZmYgPSBbc3RyaW5nLCBzdHJpbmddO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVjczJTdHJpbmdUeXBlT3B0aW9ucyB7XG4gIGFsbG93VW5pY29kZVJlZ0V4cD86IGJvb2xlYW47XG4gIHBhdHRlcm4/OiBSZWdFeHA7XG4gIGxvd2VyQ2FzZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBzdHJpbmcgY2Fubm90IHN0YXJ0IG9yIGVuZCB3aXRoIGFueSBvZiB0aGUgZm9sbG93aW5nIHdoaXRlc3BhY2UgYW5kIGxpbmUgdGVybWluYXRvclxuICAgKiBjaGFyYWN0ZXJzOlxuICAgKlxuICAgKiAtIFVuaWNvZGUgQ2hhcmFjdGVyICdDSEFSQUNURVIgVEFCVUxBVElPTicgKFUrMDAwOSlcbiAgICogLSBVbmljb2RlIENoYXJhY3RlciAnTElORSBGRUVEIChMRiknIChVKzAwMEEpXG4gICAqIC0gVW5pY29kZSBDaGFyYWN0ZXIgJ0xJTkUgVEFCVUxBVElPTicgKFUrMDAwQilcbiAgICogLSBVbmljb2RlIENoYXJhY3RlciAnRk9STSBGRUVEIChGRiknIChVKzAwMEMpXG4gICAqIC0gVW5pY29kZSBDaGFyYWN0ZXIgJ0NBUlJJQUdFIFJFVFVSTiAoQ1IpJyAoVSswMDBEKVxuICAgKiAtIFVuaWNvZGUgQ2hhcmFjdGVyICdTUEFDRScgKFUrMDAyMClcbiAgICogLSBVbmljb2RlIENoYXJhY3RlciAnTk8tQlJFQUsgU1BBQ0UnIChVKzAwQTApXG4gICAqIC0gVW5pY29kZSBDaGFyYWN0ZXIgJ0xJTkUgU0VQQVJBVE9SJyAoVSsyMDI4KVxuICAgKiAtIFVuaWNvZGUgQ2hhcmFjdGVyICdQQVJBR1JBUEggU0VQQVJBVE9SJyAoVSsyMDI5KVxuICAgKiAtIFVuaWNvZGUgQ2hhcmFjdGVyICdaRVJPIFdJRFRIIE5PLUJSRUFLIFNQQUNFJyAoVStGRUZGKVxuICAgKiAtIEFueSBvdGhlciBVbmljb2RlIGNoYXJhY3RlciBvZiB0aGUgXCJTZXBhcmF0b3IsIHNwYWNlXCIgKFpzKSBnZW5lcmFsIGNhdGVnb3J5XG4gICAqXG4gICAqIEBzZWUgPGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9UcmltPlxuICAgKiBAc2VlIDxodHRwOi8vd3d3LmZpbGVmb3JtYXQuaW5mby9pbmZvL3VuaWNvZGUvY2F0ZWdvcnkvWnMvbGlzdC5odG0+XG4gICAqL1xuICB0cmltbWVkPzogYm9vbGVhbjtcbiAgbWluTGVuZ3RoPzogbnVtYmVyO1xuICBtYXhMZW5ndGg6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBUaGUgdHlwZSB1c2VkIGZvciBzaW1wbGUgSmF2YXNjcmlwdCBzdHJpbmdzLlxuICogSmF2YXNjcmlwdCBzdHJpbmdzIGV4cG9zZSBjaGFyYWN0ZXJzIGFzIFVDUzIgY29kZSB1bml0cy4gVGhpcyBpcyBhIGZpeGVkLXNpemUgZW5jb2RpbmcgdGhhdCBzdXBwb3J0cyB0aGUgdW5pY29kZVxuICogY29kZXBvaW50cyBmcm9tIFUrMDAwMDAwIHRvIFUrMDBGRkZGIChCYXNpYyBNdWx0aWxpbmd1YWwgUGxhbmUgb3IgQk1QKS4gRGlzcGxheWluZyBsYXJnZXIgY29kZXBvaW50cyBpc1xuICogYSBwcm9wZXJ0eSBvZiB0aGUgZW52aXJvbm1lbnQgYmFzZWQgb24gVVRGLTE2IHN1cnJvZ2F0ZSBwYWlycy4gVW5pY29kZSBkb2VzIG5vdCwgYW5kIHdpbGwgbmV2ZXIsIGFzc2lnblxuICogY2hhcmFjdGVycyB0byB0aGUgY29kZXBvaW50cyBmcm9tIFUrT09EODAwIHRvIFUrMDBERkZGLiBUaGVzZSBzcGFyZSBjb2RlcG9pbnRzIGFsbG93cyBVVEYxNiB0byBjb21iaW5lXG4gKiBjb2RldW5pdHMgZnJvbSAweGQ4MDAgdG8gMHhkZmZmIGluIHBhaXJzIChjYWxsZWQgc3Vycm9nYXRlIHBhaXJzKSB0byByZXByZXNlbnQgY29kZXBvaW50cyBmcm9tIHN1cHBsZW1lbnRhcnkgcGxhbmVzLlxuICogVGhpcyB0cmFuc2Zvcm1hdGlvbiBoYXBwZW5zIGR1cmluZyB0aGUgdHJhbnNpdGlvbiBmcm9tIGNvZGV1bml0cyB0byBjb2RlcG9pbnRzIGluIFVURi0xNi5cbiAqIEluIFVDUzIsIHRoZSBjb2RldW5pdHMgZnJvbSAweGQ4MDAgdG8gMHhkZmZmIGRpcmVjdGx5IHByb2R1Y2UgY29kZXBvaW50cyBpbiB0aGUgcmFuZ2UgZnJvbSBVK09PRDhPTyB0b1xuICogVStPT0RGRi4gVGhlbiwgdGhlIGRpc3BsYXkgbWlnaHQgbWVyZ2UgdGhlc2UgY29kZXBvaW50cyBpbnRvIGhpZ2hlciBjb2RlcG9pbnRzIGR1cmluZyB0aGUgcmVuZGVyaW5nLlxuICpcbiAqXG4gKiBMZXRzIHRha2UgYW4gZXhhbXBsZSAoYWxsIHRoZSBudW1iZXJzIGFyZSBpbiBoZXhhZGVjaW1hbCk6XG4gKlxuICogYGBgXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKy0tLSstLS0rLS0tKy0tLSstLS0rLS0tK1xuICogQnl0ZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMDB8IDQxfCBkOHwgMzR8IGRkfCAxZXxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArLS0tKy0tLSstLS0rLS0tKy0tLSstLS0rXG4gKiBVVEYtMTZCRSBjb2RldW5pdHMgICAgICAgICAgICAgICAgICAgICAgfCAweDAwNDF8IDB4ZDgzNHwgMHhkZDFlfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICstLS0tLS0tKy0tLS0tLS0rLS0tLS0tLStcbiAqIENvZGVwb2ludHMgKGZyb20gVVRGLTE2QkUpICAgICAgICAgICAgICB8ICBVKzQxIHwgICBVKzAxRDExRSAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKy0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tK1xuICogRGlzcGxheWVkIChmcm9tIFVURi0xNkJFKSAgICAgICAgICAgICAgIHwgICBBICAgfCAgICAgICDwnYSeICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArLS0tLS0tLSstLS0tLS0tKy0tLS0tLS0rXG4gKiBVQ1MyIGNvZGV1bml0cyAgICAgICAgICAgICAgICAgICAgICAgICAgfCAweDAwNDF8IDB4ZDgzNHwgMHhkZDFlfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICstLS0tLS0tKy0tLS0tLS0rLS0tLS0tLStcbiAqIENvZGVwb2ludHMgKGZyb20gVUNTMkJFKSAgICAgICAgICAgICAgICB8ICBVKzQxIHwgVStEODM0fCBVK0REMUV8ICA8LSBUaGlzIGlzIHdoYXQgSmF2YXNjcmlwdCBzZWVzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKy0tLS0tLS0rLS0tLS0tLSstLS0tLS0tK1xuICogRGlzcGxheWVkIChmcm9tIFVDUzJCRSkgICAgICAgICAgICAgICAgIHwgICBBICAgfCAgIO+/vSAgIHwgICDvv70gICB8ICA8LSBUaGlzIGlzIHdoYXQgdGhlIHVzZXIgbWF5IHNlZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICstLS0tLS0tKy0tLS0tLS0rLS0tLS0tLStcbiAqIERpc3BsYXllZCAoZnJvbSBVQ1MyQkUgd2l0aCBzdXJyb2dhdGVzKSB8ICAgQSAgIHwgICAgICAg8J2EniAgICAgICB8ICA8LSBUaGlzIGlzIHdoYXQgdGhlIHVzZXIgbWF5IHNlZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICstLS0tLS0tKy0tLS0tLS0tLS0tLS0tLStcbiAqIGBgYFxuICpcbiAqIFRoZSBtb3N0IGltcG9ydGFudCB0YWtlYXdheSBpcyB0aGF0IGNvZGVwb2ludHMgb3V0c2lkZSBvZiB0aGUgQk1QIGFyZSBhIHByb3BlcnR5IG9mIHRoZSBkaXNwbGF5LCBub3Qgb2ZcbiAqIHRoZSBKYXZhc2NyaXB0IHN0cmluZy5cbiAqIFRoaXMgaXMgdGhlIGNhdXNlIG9mIG11bHRpcGxlIGlzc3Vlcy5cbiAqIC0gU3Vycm9nYXRlIGhhbHZlcyBhcmUgZXhwb3NlZCBhcyBkaXN0aW5jdCBjaGFyYWN0ZXJzOiBgXCLwnYSeXCIubGVuZ3RoID09PSAyYFxuICogLSBVbm1hdGNoZWQgc3Vycm9nYXRlIGhhbHZlcyBhcmUgYWxsb3dlZDogYFwiXFx1ZDgzNFwiYFxuICogLSBTdXJyb2dhdGUgcGFpcnMgaW4gdGhlIHdyb25nIG9yZGVyIGFyZSBhbGxvd2VkOiBgXCJcXHVkZDFlXFx1ZDgzNFwiYFxuICpcbiAqIElmIHlvdSBuZWVkIHRvIHN1cHBvcnQgdGhlIGZ1bGwgdW5pY29kZSByYW5nZSBieSBtYW5pcHVsYXRpbmcgY29kZXBvaW50cyBpbnN0ZWFkIG9mIFVDUzIgY2hhcmFjdGVyIGNvZGVzLCB5b3UgbWF5XG4gKiB3YW50IHRvIHVzZSBDb2RlcG9pbnRTdHJpbmcgb3IgQ29kZXBvaW50QXJyYXkgaW5zdGVhZCBvZiBVY3MyU3RyaW5nLlxuICpcbiAqIFBTOiBUaGlzIHR5cGUgZG9lcyBub3QgZGVhbCB3aXRoIFVuaWNkb2Ugbm9ybWFsaXphdGlvbiBlaXRoZXIuIFVzZSBDb2RlcG9pbnRTdHJpbmcgYW5kIENvZGVwb2ludEFycmF5IGlmIHlvdSBuZWVkXG4gKiBpdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFVjczJTdHJpbmdUeXBlIGltcGxlbWVudHMgSW9UeXBlPHN0cmluZz4sIFZlcnNpb25lZFR5cGU8c3RyaW5nLCBEaWZmPiB7XG4gIHJlYWRvbmx5IG5hbWU6IE5hbWUgPSBuYW1lO1xuICByZWFkb25seSBhbGxvd1VuaWNvZGVSZWdFeHAhOiBib29sZWFuO1xuICByZWFkb25seSBwYXR0ZXJuPzogUmVnRXhwO1xuICByZWFkb25seSBsb3dlckNhc2UhOiBib29sZWFuO1xuICByZWFkb25seSB0cmltbWVkITogYm9vbGVhbjtcbiAgcmVhZG9ubHkgbWluTGVuZ3RoPzogbnVtYmVyO1xuICByZWFkb25seSBtYXhMZW5ndGghOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBfb3B0aW9uczogTGF6eTxVY3MyU3RyaW5nVHlwZU9wdGlvbnM+O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IExhenk8VWNzMlN0cmluZ1R5cGVPcHRpb25zPikge1xuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aGlzLl9hcHBseU9wdGlvbnMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGF6eVByb3BlcnRpZXMoXG4gICAgICAgIHRoaXMsXG4gICAgICAgIHRoaXMuX2FwcGx5T3B0aW9ucyxcbiAgICAgICAgW1wiYWxsb3dVbmljb2RlUmVnRXhwXCIsIFwicGF0dGVyblwiLCBcImxvd2VyQ2FzZVwiLCBcInRyaW1tZWRcIiwgXCJtaW5MZW5ndGhcIiwgXCJtYXhMZW5ndGhcIl0sXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihvcHRpb25zOiBqc29uLlR5cGUpOiBVY3MyU3RyaW5nVHlwZSB7XG4gICAgY29uc3QgcmVzb2x2ZWRPcHRpb25zOiBVY3MyU3RyaW5nVHlwZU9wdGlvbnMgPSB7XG4gICAgICBhbGxvd1VuaWNvZGVSZWdFeHA6IG9wdGlvbnMuYWxsb3dVbmljb2RlUmVnRXhwLFxuICAgICAgbG93ZXJDYXNlOiBvcHRpb25zLmxvd2VyQ2FzZSxcbiAgICAgIHRyaW1tZWQ6IG9wdGlvbnMudHJpbW1lZCxcbiAgICAgIG1heExlbmd0aDogb3B0aW9ucy5tYXhMZW5ndGgsXG4gICAgfTtcbiAgICBpZiAob3B0aW9ucy5wYXR0ZXJuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlc29sdmVkT3B0aW9ucy5wYXR0ZXJuID0gbmV3IFJlZ0V4cChvcHRpb25zLnBhdHRlcm5bMF0sIG9wdGlvbnMucGF0dGVyblsxXSk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm1pbkxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXNvbHZlZE9wdGlvbnMubWluTGVuZ3RoID0gb3B0aW9ucy5taW5MZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBuZXcgVWNzMlN0cmluZ1R5cGUocmVzb2x2ZWRPcHRpb25zKTtcbiAgfVxuXG4gIHRvSlNPTigpOiBqc29uLlR5cGUge1xuICAgIGNvbnN0IGpzb25UeXBlOiBqc29uLlR5cGUgPSB7XG4gICAgICBuYW1lLFxuICAgICAgYWxsb3dVbmljb2RlUmVnRXhwOiB0aGlzLmFsbG93VW5pY29kZVJlZ0V4cCxcbiAgICAgIGxvd2VyQ2FzZTogdGhpcy5sb3dlckNhc2UsXG4gICAgICB0cmltbWVkOiB0aGlzLnRyaW1tZWQsXG4gICAgICBtYXhMZW5ndGg6IHRoaXMubWF4TGVuZ3RoLFxuICAgIH07XG4gICAgaWYgKHRoaXMucGF0dGVybiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBqc29uVHlwZS5wYXR0ZXJuID0gW3RoaXMucGF0dGVybi5zb3VyY2UsIHRoaXMucGF0dGVybi5mbGFnc107XG4gICAgfVxuICAgIGlmICh0aGlzLm1pbkxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBqc29uVHlwZS5taW5MZW5ndGggPSB0aGlzLm1pbkxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGpzb25UeXBlO1xuICB9XG5cbiAgLy8gVE9ETzogRHluYW1pY2FsbHkgYWRkIHdpdGggcHJvdG90eXBlP1xuICByZWFkPFI+KHJlYWRlcjogUmVhZGVyPFI+LCByYXc6IFIpOiBzdHJpbmcge1xuICAgIHJldHVybiByZWFkZXIucmVhZFN0cmluZyhyYXcsIHJlYWRWaXNpdG9yKHtcbiAgICAgIGZyb21TdHJpbmc6IChpbnB1dDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgICAgY29uc3QgZXJyb3I6IEVycm9yIHwgdW5kZWZpbmVkID0gdGhpcy50ZXN0RXJyb3IoaW5wdXQpO1xuICAgICAgICBpZiAoZXJyb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgIH0sXG4gICAgfSkpO1xuICB9XG5cbiAgLy8gVE9ETzogRHluYW1pY2FsbHkgYWRkIHdpdGggcHJvdG90eXBlP1xuICB3cml0ZTxXPih3cml0ZXI6IFdyaXRlcjxXPiwgdmFsdWU6IHN0cmluZyk6IFcge1xuICAgIHJldHVybiB3cml0ZXIud3JpdGVTdHJpbmcodmFsdWUpO1xuICB9XG5cbiAgdGVzdEVycm9yKHZhbDogc3RyaW5nKTogRXJyb3IgfCB1bmRlZmluZWQge1xuICAgIGlmICh0eXBlb2YgdmFsICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gY3JlYXRlSW52YWxpZFR5cGVFcnJvcihcInN0cmluZ1wiLCB2YWwpO1xuICAgIH1cbiAgICBpZiAodGhpcy5sb3dlckNhc2UgJiYgdmFsLnRvTG93ZXJDYXNlKCkgIT09IHZhbCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUxvd2VyQ2FzZUVycm9yKHZhbCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnRyaW1tZWQgJiYgdmFsLnRyaW0oKSAhPT0gdmFsKSB7XG4gICAgICByZXR1cm4gY3JlYXRlTm90VHJpbW1lZEVycm9yKHZhbCk7XG4gICAgfVxuICAgIGNvbnN0IHN0ckxlbjogbnVtYmVyID0gdmFsLmxlbmd0aDtcbiAgICBjb25zdCBtaW5MZW5ndGg6IG51bWJlciB8IHVuZGVmaW5lZCA9IHRoaXMubWluTGVuZ3RoO1xuICAgIGlmIChtaW5MZW5ndGggIT09IHVuZGVmaW5lZCAmJiBzdHJMZW4gPCBtaW5MZW5ndGgpIHtcbiAgICAgIHJldHVybiBjcmVhdGVNaW5VY3MyU3RyaW5nTGVuZ3RoRXJyb3IodmFsLCBtaW5MZW5ndGgpO1xuICAgIH1cbiAgICBpZiAoc3RyTGVuID4gdGhpcy5tYXhMZW5ndGgpIHtcbiAgICAgIHJldHVybiBjcmVhdGVNYXhVY3MyU3RyaW5nTGVuZ3RoRXJyb3IodmFsLCB0aGlzLm1heExlbmd0aCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGF0dGVybiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgaWYgKHRoaXMucGF0dGVybi51bmljb2RlICYmICF0aGlzLmFsbG93VW5pY29kZVJlZ0V4cCkge1xuICAgICAgICB0aHJvdyBuZXcgSW5jaWRlbnQoXG4gICAgICAgICAgXCJVbmljb2RlUmVnRXhwXCIsXG4gICAgICAgICAgXCJEaXNhbGxvd2VkIHVuaWNvZGUgUmVnRXhwLCB1c2UgYGFsbG93VW5pY29kZVJlZ0V4cGAgb3IgYENvZGVwb2ludFN0cmluZ1R5cGVgXCIsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5wYXR0ZXJuLnRlc3QodmFsKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlUGF0dGVybk5vdE1hdGNoZWRFcnJvcih0aGlzLnBhdHRlcm4sIHZhbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHRlc3QodmFsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy50ZXN0RXJyb3IodmFsKSA9PT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZXF1YWxzKHZhbDE6IHN0cmluZywgdmFsMjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZhbDEgPT09IHZhbDI7XG4gIH1cblxuICBjbG9uZSh2YWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIGRpZmYob2xkVmFsOiBzdHJpbmcsIG5ld1ZhbDogc3RyaW5nKTogRGlmZiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIG9sZFZhbCA9PT0gbmV3VmFsID8gdW5kZWZpbmVkIDogW29sZFZhbCwgbmV3VmFsXTtcbiAgfVxuXG4gIHBhdGNoKG9sZFZhbDogc3RyaW5nLCBkaWZmOiBEaWZmIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGlmZiA9PT0gdW5kZWZpbmVkID8gb2xkVmFsIDogZGlmZlsxXTtcbiAgfVxuXG4gIHJldmVyc2VEaWZmKGRpZmY6IERpZmYgfCB1bmRlZmluZWQpOiBEaWZmIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gZGlmZiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogW2RpZmZbMV0sIGRpZmZbMF1dO1xuICB9XG5cbiAgc3F1YXNoKGRpZmYxOiBEaWZmIHwgdW5kZWZpbmVkLCBkaWZmMjogRGlmZiB8IHVuZGVmaW5lZCk6IERpZmYgfCB1bmRlZmluZWQge1xuICAgIGlmIChkaWZmMSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZGlmZjIgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IFtkaWZmMlswXSwgZGlmZjJbMV1dO1xuICAgIH0gZWxzZSBpZiAoZGlmZjIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIFtkaWZmMVswXSwgZGlmZjFbMV1dO1xuICAgIH1cbiAgICByZXR1cm4gZGlmZjFbMF0gPT09IGRpZmYyWzFdID8gdW5kZWZpbmVkIDogW2RpZmYxWzBdLCBkaWZmMlsxXV07XG4gIH1cblxuICBwcml2YXRlIF9hcHBseU9wdGlvbnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX29wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgY3JlYXRlTGF6eU9wdGlvbnNFcnJvcih0aGlzKTtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9uczogVWNzMlN0cmluZ1R5cGVPcHRpb25zID0gdHlwZW9mIHRoaXMuX29wdGlvbnMgPT09IFwiZnVuY3Rpb25cIiA/IHRoaXMuX29wdGlvbnMoKSA6IHRoaXMuX29wdGlvbnM7XG5cbiAgICBjb25zdCBhbGxvd1VuaWNvZGVSZWdFeHA6IGJvb2xlYW4gPSBvcHRpb25zLmFsbG93VW5pY29kZVJlZ0V4cCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5hbGxvd1VuaWNvZGVSZWdFeHAgOiB0cnVlO1xuICAgIGNvbnN0IHBhdHRlcm46IFJlZ0V4cCB8IHVuZGVmaW5lZCA9IG9wdGlvbnMucGF0dGVybjtcbiAgICBjb25zdCBsb3dlckNhc2U6IGJvb2xlYW4gPSBvcHRpb25zLmxvd2VyQ2FzZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5sb3dlckNhc2UgOiBmYWxzZTtcbiAgICBjb25zdCB0cmltbWVkOiBib29sZWFuID0gb3B0aW9ucy50cmltbWVkICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLnRyaW1tZWQgOiBmYWxzZTtcbiAgICBjb25zdCBtaW5MZW5ndGg6IG51bWJlciB8IHVuZGVmaW5lZCA9IG9wdGlvbnMubWluTGVuZ3RoO1xuICAgIGNvbnN0IG1heExlbmd0aDogbnVtYmVyID0gb3B0aW9ucy5tYXhMZW5ndGg7XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHthbGxvd1VuaWNvZGVSZWdFeHAsIHBhdHRlcm4sIGxvd2VyQ2FzZSwgdHJpbW1lZCwgbWluTGVuZ3RoLCBtYXhMZW5ndGh9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
