"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
const lazy_properties_1 = require("../_helpers/lazy-properties");
const invalid_type_1 = require("../errors/invalid-type");
const lazy_options_1 = require("../errors/lazy-options");
const lower_case_1 = require("../errors/lower-case");
const max_ucs2_string_length_1 = require("../errors/max-ucs2-string-length");
const min_ucs2_string_length_1 = require("../errors/min-ucs2-string-length");
const not_trimmed_1 = require("../errors/not-trimmed");
const pattern_not_matched_1 = require("../errors/pattern-not-matched");
const read_visitor_1 = require("../readers/read-visitor");
exports.name = "ucs2-string";
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
class Ucs2StringType {
    constructor(options) {
        this.name = exports.name;
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazy_properties_1.lazyProperties(this, this._applyOptions, ["allowUnicodeRegExp", "pattern", "lowerCase", "trimmed", "minLength", "maxLength"]);
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
            name: exports.name,
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
        return reader.readString(raw, read_visitor_1.readVisitor({
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
            return invalid_type_1.createInvalidTypeError("string", val);
        }
        if (this.lowerCase && val.toLowerCase() !== val) {
            return lower_case_1.createLowerCaseError(val);
        }
        if (this.trimmed && val.trim() !== val) {
            return not_trimmed_1.createNotTrimmedError(val);
        }
        const strLen = val.length;
        const minLength = this.minLength;
        if (minLength !== undefined && strLen < minLength) {
            return min_ucs2_string_length_1.createMinUcs2StringLengthError(val, minLength);
        }
        if (strLen > this.maxLength) {
            return max_ucs2_string_length_1.createMaxUcs2StringLengthError(val, this.maxLength);
        }
        if (this.pattern instanceof RegExp) {
            if (this.pattern.unicode && !this.allowUnicodeRegExp) {
                throw new incident_1.Incident("UnicodeRegExp", "Disallowed unicode RegExp, use `allowUnicodeRegExp` or `CodepointStringType`");
            }
            if (!this.pattern.test(val)) {
                return pattern_not_matched_1.createPatternNotMatchedError(this.pattern, val);
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
            throw lazy_options_1.createLazyOptionsError(this);
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
exports.Ucs2StringType = Ucs2StringType;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdHlwZXMvdWNzMi1zdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBb0M7QUFDcEMsaUVBQTZEO0FBRTdELHlEQUFnRTtBQUNoRSx5REFBZ0U7QUFDaEUscURBQTREO0FBQzVELDZFQUFrRjtBQUNsRiw2RUFBa0Y7QUFDbEYsdURBQThEO0FBQzlELHVFQUE2RTtBQUM3RSwwREFBc0Q7QUFHekMsUUFBQSxJQUFJLEdBQVMsYUFBYSxDQUFDO0FBaUR4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThDRztBQUNILE1BQWEsY0FBYztJQVd6QixZQUFZLE9BQW9DO1FBVnZDLFNBQUksR0FBUyxZQUFJLENBQUM7UUFXekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxPQUFPLE9BQU8sS0FBSyxVQUFVLEVBQUU7WUFDakMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO2FBQU07WUFDTCxnQ0FBYyxDQUNaLElBQUksRUFDSixJQUFJLENBQUMsYUFBYSxFQUNsQixDQUFDLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FDcEYsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBa0I7UUFDaEMsTUFBTSxlQUFlLEdBQTBCO1lBQzdDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxrQkFBa0I7WUFDOUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO1lBQzVCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztZQUN4QixTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7U0FDN0IsQ0FBQztRQUNGLElBQUksT0FBTyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDakMsZUFBZSxDQUFDLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMs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LENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2pGLE1BQU0sU0FBUyxHQUF1QixPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ3hELE1BQU0sU0FBUyxHQUFXLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFFNUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBQyxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztJQUMvRixDQUFDO0NBQ0Y7QUE5SkQsd0NBOEpDIiwiZmlsZSI6ImxpYi90eXBlcy91Y3MyLXN0cmluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluY2lkZW50IH0gZnJvbSBcImluY2lkZW50XCI7XG5pbXBvcnQgeyBsYXp5UHJvcGVydGllcyB9IGZyb20gXCIuLi9faGVscGVycy9sYXp5LXByb3BlcnRpZXNcIjtcbmltcG9ydCB7IElvVHlwZSwgTGF6eSwgUmVhZGVyLCBWZXJzaW9uZWRUeXBlLCBXcml0ZXIgfSBmcm9tIFwiLi4vY29yZVwiO1xuaW1wb3J0IHsgY3JlYXRlSW52YWxpZFR5cGVFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvaW52YWxpZC10eXBlXCI7XG5pbXBvcnQgeyBjcmVhdGVMYXp5T3B0aW9uc0Vycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9sYXp5LW9wdGlvbnNcIjtcbmltcG9ydCB7IGNyZWF0ZUxvd2VyQ2FzZUVycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9sb3dlci1jYXNlXCI7XG5pbXBvcnQgeyBjcmVhdGVNYXhVY3MyU3RyaW5nTGVuZ3RoRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL21heC11Y3MyLXN0cmluZy1sZW5ndGhcIjtcbmltcG9ydCB7IGNyZWF0ZU1pblVjczJTdHJpbmdMZW5ndGhFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvbWluLXVjczItc3RyaW5nLWxlbmd0aFwiO1xuaW1wb3J0IHsgY3JlYXRlTm90VHJpbW1lZEVycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9ub3QtdHJpbW1lZFwiO1xuaW1wb3J0IHsgY3JlYXRlUGF0dGVybk5vdE1hdGNoZWRFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvcGF0dGVybi1ub3QtbWF0Y2hlZFwiO1xuaW1wb3J0IHsgcmVhZFZpc2l0b3IgfSBmcm9tIFwiLi4vcmVhZGVycy9yZWFkLXZpc2l0b3JcIjtcblxuZXhwb3J0IHR5cGUgTmFtZSA9IFwidWNzMi1zdHJpbmdcIjtcbmV4cG9ydCBjb25zdCBuYW1lOiBOYW1lID0gXCJ1Y3MyLXN0cmluZ1wiO1xuZXhwb3J0IG5hbWVzcGFjZSBqc29uIHtcbiAgZXhwb3J0IHR5cGUgSW5wdXQgPSBzdHJpbmc7XG4gIGV4cG9ydCB0eXBlIE91dHB1dCA9IHN0cmluZztcblxuICBleHBvcnQgaW50ZXJmYWNlIFR5cGUge1xuICAgIG5hbWU6IE5hbWU7XG4gICAgYWxsb3dVbmljb2RlUmVnRXhwOiBib29sZWFuO1xuICAgIHBhdHRlcm4/OiBbc3RyaW5nLCBzdHJpbmddO1xuICAgIGxvd2VyQ2FzZTogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBAc2VlIFtbVWNzMlN0cmluZ1R5cGVPcHRpb25zLnRyaW1tZWRdXVxuICAgICAqL1xuICAgIHRyaW1tZWQ6IGJvb2xlYW47XG4gICAgbWluTGVuZ3RoPzogbnVtYmVyO1xuICAgIG1heExlbmd0aDogbnVtYmVyO1xuICB9XG59XG5leHBvcnQgdHlwZSBEaWZmID0gW3N0cmluZywgc3RyaW5nXTtcblxuZXhwb3J0IGludGVyZmFjZSBVY3MyU3RyaW5nVHlwZU9wdGlvbnMge1xuICBhbGxvd1VuaWNvZGVSZWdFeHA/OiBib29sZWFuO1xuICBwYXR0ZXJuPzogUmVnRXhwO1xuICBsb3dlckNhc2U/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgc3RyaW5nIGNhbm5vdCBzdGFydCBvciBlbmQgd2l0aCBhbnkgb2YgdGhlIGZvbGxvd2luZyB3aGl0ZXNwYWNlIGFuZCBsaW5lIHRlcm1pbmF0b3JcbiAgICogY2hhcmFjdGVyczpcbiAgICpcbiAgICogLSBVbmljb2RlIENoYXJhY3RlciAnQ0hBUkFDVEVSIFRBQlVMQVRJT04nIChVKzAwMDkpXG4gICAqIC0gVW5pY29kZSBDaGFyYWN0ZXIgJ0xJTkUgRkVFRCAoTEYpJyAoVSswMDBBKVxuICAgKiAtIFVuaWNvZGUgQ2hhcmFjdGVyICdMSU5FIFRBQlVMQVRJT04nIChVKzAwMEIpXG4gICAqIC0gVW5pY29kZSBDaGFyYWN0ZXIgJ0ZPUk0gRkVFRCAoRkYpJyAoVSswMDBDKVxuICAgKiAtIFVuaWNvZGUgQ2hhcmFjdGVyICdDQVJSSUFHRSBSRVRVUk4gKENSKScgKFUrMDAwRClcbiAgICogLSBVbmljb2RlIENoYXJhY3RlciAnU1BBQ0UnIChVKzAwMjApXG4gICAqIC0gVW5pY29kZSBDaGFyYWN0ZXIgJ05PLUJSRUFLIFNQQUNFJyAoVSswMEEwKVxuICAgKiAtIFVuaWNvZGUgQ2hhcmFjdGVyICdMSU5FIFNFUEFSQVRPUicgKFUrMjAyOClcbiAgICogLSBVbmljb2RlIENoYXJhY3RlciAnUEFSQUdSQVBIIFNFUEFSQVRPUicgKFUrMjAyOSlcbiAgICogLSBVbmljb2RlIENoYXJhY3RlciAnWkVSTyBXSURUSCBOTy1CUkVBSyBTUEFDRScgKFUrRkVGRilcbiAgICogLSBBbnkgb3RoZXIgVW5pY29kZSBjaGFyYWN0ZXIgb2YgdGhlIFwiU2VwYXJhdG9yLCBzcGFjZVwiIChacykgZ2VuZXJhbCBjYXRlZ29yeVxuICAgKlxuICAgKiBAc2VlIDxodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvVHJpbT5cbiAgICogQHNlZSA8aHR0cDovL3d3dy5maWxlZm9ybWF0LmluZm8vaW5mby91bmljb2RlL2NhdGVnb3J5L1pzL2xpc3QuaHRtPlxuICAgKi9cbiAgdHJpbW1lZD86IGJvb2xlYW47XG4gIG1pbkxlbmd0aD86IG51bWJlcjtcbiAgbWF4TGVuZ3RoOiBudW1iZXI7XG59XG5cbi8qKlxuICogVGhlIHR5cGUgdXNlZCBmb3Igc2ltcGxlIEphdmFzY3JpcHQgc3RyaW5ncy5cbiAqIEphdmFzY3JpcHQgc3RyaW5ncyBleHBvc2UgY2hhcmFjdGVycyBhcyBVQ1MyIGNvZGUgdW5pdHMuIFRoaXMgaXMgYSBmaXhlZC1zaXplIGVuY29kaW5nIHRoYXQgc3VwcG9ydHMgdGhlIHVuaWNvZGVcbiAqIGNvZGVwb2ludHMgZnJvbSBVKzAwMDAwMCB0byBVKzAwRkZGRiAoQmFzaWMgTXVsdGlsaW5ndWFsIFBsYW5lIG9yIEJNUCkuIERpc3BsYXlpbmcgbGFyZ2VyIGNvZGVwb2ludHMgaXNcbiAqIGEgcHJvcGVydHkgb2YgdGhlIGVudmlyb25tZW50IGJhc2VkIG9uIFVURi0xNiBzdXJyb2dhdGUgcGFpcnMuIFVuaWNvZGUgZG9lcyBub3QsIGFuZCB3aWxsIG5ldmVyLCBhc3NpZ25cbiAqIGNoYXJhY3RlcnMgdG8gdGhlIGNvZGVwb2ludHMgZnJvbSBVK09PRDgwMCB0byBVKzAwREZGRi4gVGhlc2Ugc3BhcmUgY29kZXBvaW50cyBhbGxvd3MgVVRGMTYgdG8gY29tYmluZVxuICogY29kZXVuaXRzIGZyb20gMHhkODAwIHRvIDB4ZGZmZiBpbiBwYWlycyAoY2FsbGVkIHN1cnJvZ2F0ZSBwYWlycykgdG8gcmVwcmVzZW50IGNvZGVwb2ludHMgZnJvbSBzdXBwbGVtZW50YXJ5IHBsYW5lcy5cbiAqIFRoaXMgdHJhbnNmb3JtYXRpb24gaGFwcGVucyBkdXJpbmcgdGhlIHRyYW5zaXRpb24gZnJvbSBjb2RldW5pdHMgdG8gY29kZXBvaW50cyBpbiBVVEYtMTYuXG4gKiBJbiBVQ1MyLCB0aGUgY29kZXVuaXRzIGZyb20gMHhkODAwIHRvIDB4ZGZmZiBkaXJlY3RseSBwcm9kdWNlIGNvZGVwb2ludHMgaW4gdGhlIHJhbmdlIGZyb20gVStPT0Q4T08gdG9cbiAqIFUrT09ERkYuIFRoZW4sIHRoZSBkaXNwbGF5IG1pZ2h0IG1lcmdlIHRoZXNlIGNvZGVwb2ludHMgaW50byBoaWdoZXIgY29kZXBvaW50cyBkdXJpbmcgdGhlIHJlbmRlcmluZy5cbiAqXG4gKlxuICogTGV0cyB0YWtlIGFuIGV4YW1wbGUgKGFsbCB0aGUgbnVtYmVycyBhcmUgaW4gaGV4YWRlY2ltYWwpOlxuICpcbiAqIGBgYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICstLS0rLS0tKy0tLSstLS0rLS0tKy0tLStcbiAqIEJ5dGVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDAwfCA0MXwgZDh8IDM0fCBkZHwgMWV8XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKy0tLSstLS0rLS0tKy0tLSstLS0rLS0tK1xuICogVVRGLTE2QkUgY29kZXVuaXRzICAgICAgICAgICAgICAgICAgICAgIHwgMHgwMDQxfCAweGQ4MzR8IDB4ZGQxZXxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArLS0tLS0tLSstLS0tLS0tKy0tLS0tLS0rXG4gKiBDb2RlcG9pbnRzIChmcm9tIFVURi0xNkJFKSAgICAgICAgICAgICAgfCAgVSs0MSB8ICAgVSswMUQxMUUgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICstLS0tLS0tKy0tLS0tLS0tLS0tLS0tLStcbiAqIERpc3BsYXllZCAoZnJvbSBVVEYtMTZCRSkgICAgICAgICAgICAgICB8ICAgQSAgIHwgICAgICAg8J2EniAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKy0tLS0tLS0rLS0tLS0tLSstLS0tLS0tK1xuICogVUNTMiBjb2RldW5pdHMgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMHgwMDQxfCAweGQ4MzR8IDB4ZGQxZXxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArLS0tLS0tLSstLS0tLS0tKy0tLS0tLS0rXG4gKiBDb2RlcG9pbnRzIChmcm9tIFVDUzJCRSkgICAgICAgICAgICAgICAgfCAgVSs0MSB8IFUrRDgzNHwgVStERDFFfCAgPC0gVGhpcyBpcyB3aGF0IEphdmFzY3JpcHQgc2Vlc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICstLS0tLS0tKy0tLS0tLS0rLS0tLS0tLStcbiAqIERpc3BsYXllZCAoZnJvbSBVQ1MyQkUpICAgICAgICAgICAgICAgICB8ICAgQSAgIHwgICDvv70gICB8ICAg77+9ICAgfCAgPC0gVGhpcyBpcyB3aGF0IHRoZSB1c2VyIG1heSBzZWVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArLS0tLS0tLSstLS0tLS0tKy0tLS0tLS0rXG4gKiBEaXNwbGF5ZWQgKGZyb20gVUNTMkJFIHdpdGggc3Vycm9nYXRlcykgfCAgIEEgICB8ICAgICAgIPCdhJ4gICAgICAgfCAgPC0gVGhpcyBpcyB3aGF0IHRoZSB1c2VyIG1heSBzZWVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0rXG4gKiBgYGBcbiAqXG4gKiBUaGUgbW9zdCBpbXBvcnRhbnQgdGFrZWF3YXkgaXMgdGhhdCBjb2RlcG9pbnRzIG91dHNpZGUgb2YgdGhlIEJNUCBhcmUgYSBwcm9wZXJ0eSBvZiB0aGUgZGlzcGxheSwgbm90IG9mXG4gKiB0aGUgSmF2YXNjcmlwdCBzdHJpbmcuXG4gKiBUaGlzIGlzIHRoZSBjYXVzZSBvZiBtdWx0aXBsZSBpc3N1ZXMuXG4gKiAtIFN1cnJvZ2F0ZSBoYWx2ZXMgYXJlIGV4cG9zZWQgYXMgZGlzdGluY3QgY2hhcmFjdGVyczogYFwi8J2EnlwiLmxlbmd0aCA9PT0gMmBcbiAqIC0gVW5tYXRjaGVkIHN1cnJvZ2F0ZSBoYWx2ZXMgYXJlIGFsbG93ZWQ6IGBcIlxcdWQ4MzRcImBcbiAqIC0gU3Vycm9nYXRlIHBhaXJzIGluIHRoZSB3cm9uZyBvcmRlciBhcmUgYWxsb3dlZDogYFwiXFx1ZGQxZVxcdWQ4MzRcImBcbiAqXG4gKiBJZiB5b3UgbmVlZCB0byBzdXBwb3J0IHRoZSBmdWxsIHVuaWNvZGUgcmFuZ2UgYnkgbWFuaXB1bGF0aW5nIGNvZGVwb2ludHMgaW5zdGVhZCBvZiBVQ1MyIGNoYXJhY3RlciBjb2RlcywgeW91IG1heVxuICogd2FudCB0byB1c2UgQ29kZXBvaW50U3RyaW5nIG9yIENvZGVwb2ludEFycmF5IGluc3RlYWQgb2YgVWNzMlN0cmluZy5cbiAqXG4gKiBQUzogVGhpcyB0eXBlIGRvZXMgbm90IGRlYWwgd2l0aCBVbmljZG9lIG5vcm1hbGl6YXRpb24gZWl0aGVyLiBVc2UgQ29kZXBvaW50U3RyaW5nIGFuZCBDb2RlcG9pbnRBcnJheSBpZiB5b3UgbmVlZFxuICogaXQuXG4gKi9cbmV4cG9ydCBjbGFzcyBVY3MyU3RyaW5nVHlwZSBpbXBsZW1lbnRzIElvVHlwZTxzdHJpbmc+LCBWZXJzaW9uZWRUeXBlPHN0cmluZywgRGlmZj4ge1xuICByZWFkb25seSBuYW1lOiBOYW1lID0gbmFtZTtcbiAgcmVhZG9ubHkgYWxsb3dVbmljb2RlUmVnRXhwITogYm9vbGVhbjtcbiAgcmVhZG9ubHkgcGF0dGVybj86IFJlZ0V4cDtcbiAgcmVhZG9ubHkgbG93ZXJDYXNlITogYm9vbGVhbjtcbiAgcmVhZG9ubHkgdHJpbW1lZCE6IGJvb2xlYW47XG4gIHJlYWRvbmx5IG1pbkxlbmd0aD86IG51bWJlcjtcbiAgcmVhZG9ubHkgbWF4TGVuZ3RoITogbnVtYmVyO1xuXG4gIHByaXZhdGUgX29wdGlvbnM6IExhenk8VWNzMlN0cmluZ1R5cGVPcHRpb25zPjtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBMYXp5PFVjczJTdHJpbmdUeXBlT3B0aW9ucz4pIHtcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5fYXBwbHlPcHRpb25zKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhenlQcm9wZXJ0aWVzKFxuICAgICAgICB0aGlzLFxuICAgICAgICB0aGlzLl9hcHBseU9wdGlvbnMsXG4gICAgICAgIFtcImFsbG93VW5pY29kZVJlZ0V4cFwiLCBcInBhdHRlcm5cIiwgXCJsb3dlckNhc2VcIiwgXCJ0cmltbWVkXCIsIFwibWluTGVuZ3RoXCIsIFwibWF4TGVuZ3RoXCJdLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbUpTT04ob3B0aW9uczoganNvbi5UeXBlKTogVWNzMlN0cmluZ1R5cGUge1xuICAgIGNvbnN0IHJlc29sdmVkT3B0aW9uczogVWNzMlN0cmluZ1R5cGVPcHRpb25zID0ge1xuICAgICAgYWxsb3dVbmljb2RlUmVnRXhwOiBvcHRpb25zLmFsbG93VW5pY29kZVJlZ0V4cCxcbiAgICAgIGxvd2VyQ2FzZTogb3B0aW9ucy5sb3dlckNhc2UsXG4gICAgICB0cmltbWVkOiBvcHRpb25zLnRyaW1tZWQsXG4gICAgICBtYXhMZW5ndGg6IG9wdGlvbnMubWF4TGVuZ3RoLFxuICAgIH07XG4gICAgaWYgKG9wdGlvbnMucGF0dGVybiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXNvbHZlZE9wdGlvbnMucGF0dGVybiA9IG5ldyBSZWdFeHAob3B0aW9ucy5wYXR0ZXJuWzBdLCBvcHRpb25zLnBhdHRlcm5bMV0pO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5taW5MZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzb2x2ZWRPcHRpb25zLm1pbkxlbmd0aCA9IG9wdGlvbnMubWluTGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFVjczJTdHJpbmdUeXBlKHJlc29sdmVkT3B0aW9ucyk7XG4gIH1cblxuICB0b0pTT04oKToganNvbi5UeXBlIHtcbiAgICBjb25zdCBqc29uVHlwZToganNvbi5UeXBlID0ge1xuICAgICAgbmFtZSxcbiAgICAgIGFsbG93VW5pY29kZVJlZ0V4cDogdGhpcy5hbGxvd1VuaWNvZGVSZWdFeHAsXG4gICAgICBsb3dlckNhc2U6IHRoaXMubG93ZXJDYXNlLFxuICAgICAgdHJpbW1lZDogdGhpcy50cmltbWVkLFxuICAgICAgbWF4TGVuZ3RoOiB0aGlzLm1heExlbmd0aCxcbiAgICB9O1xuICAgIGlmICh0aGlzLnBhdHRlcm4gIT09IHVuZGVmaW5lZCkge1xuICAgICAganNvblR5cGUucGF0dGVybiA9IFt0aGlzLnBhdHRlcm4uc291cmNlLCB0aGlzLnBhdHRlcm4uZmxhZ3NdO1xuICAgIH1cbiAgICBpZiAodGhpcy5taW5MZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAganNvblR5cGUubWluTGVuZ3RoID0gdGhpcy5taW5MZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBqc29uVHlwZTtcbiAgfVxuXG4gIC8vIFRPRE86IER5bmFtaWNhbGx5IGFkZCB3aXRoIHByb3RvdHlwZT9cbiAgcmVhZDxSPihyZWFkZXI6IFJlYWRlcjxSPiwgcmF3OiBSKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcmVhZGVyLnJlYWRTdHJpbmcocmF3LCByZWFkVmlzaXRvcih7XG4gICAgICBmcm9tU3RyaW5nOiAoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICAgIGNvbnN0IGVycm9yOiBFcnJvciB8IHVuZGVmaW5lZCA9IHRoaXMudGVzdEVycm9yKGlucHV0KTtcbiAgICAgICAgaWYgKGVycm9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICB9LFxuICAgIH0pKTtcbiAgfVxuXG4gIC8vIFRPRE86IER5bmFtaWNhbGx5IGFkZCB3aXRoIHByb3RvdHlwZT9cbiAgd3JpdGU8Vz4od3JpdGVyOiBXcml0ZXI8Vz4sIHZhbHVlOiBzdHJpbmcpOiBXIHtcbiAgICByZXR1cm4gd3JpdGVyLndyaXRlU3RyaW5nKHZhbHVlKTtcbiAgfVxuXG4gIHRlc3RFcnJvcih2YWw6IHN0cmluZyk6IEVycm9yIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodHlwZW9mIHZhbCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIGNyZWF0ZUludmFsaWRUeXBlRXJyb3IoXCJzdHJpbmdcIiwgdmFsKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubG93ZXJDYXNlICYmIHZhbC50b0xvd2VyQ2FzZSgpICE9PSB2YWwpIHtcbiAgICAgIHJldHVybiBjcmVhdGVMb3dlckNhc2VFcnJvcih2YWwpO1xuICAgIH1cbiAgICBpZiAodGhpcy50cmltbWVkICYmIHZhbC50cmltKCkgIT09IHZhbCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZU5vdFRyaW1tZWRFcnJvcih2YWwpO1xuICAgIH1cbiAgICBjb25zdCBzdHJMZW46IG51bWJlciA9IHZhbC5sZW5ndGg7XG4gICAgY29uc3QgbWluTGVuZ3RoOiBudW1iZXIgfCB1bmRlZmluZWQgPSB0aGlzLm1pbkxlbmd0aDtcbiAgICBpZiAobWluTGVuZ3RoICE9PSB1bmRlZmluZWQgJiYgc3RyTGVuIDwgbWluTGVuZ3RoKSB7XG4gICAgICByZXR1cm4gY3JlYXRlTWluVWNzMlN0cmluZ0xlbmd0aEVycm9yKHZhbCwgbWluTGVuZ3RoKTtcbiAgICB9XG4gICAgaWYgKHN0ckxlbiA+IHRoaXMubWF4TGVuZ3RoKSB7XG4gICAgICByZXR1cm4gY3JlYXRlTWF4VWNzMlN0cmluZ0xlbmd0aEVycm9yKHZhbCwgdGhpcy5tYXhMZW5ndGgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhdHRlcm4gaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIGlmICh0aGlzLnBhdHRlcm4udW5pY29kZSAmJiAhdGhpcy5hbGxvd1VuaWNvZGVSZWdFeHApIHtcbiAgICAgICAgdGhyb3cgbmV3IEluY2lkZW50KFxuICAgICAgICAgIFwiVW5pY29kZVJlZ0V4cFwiLFxuICAgICAgICAgIFwiRGlzYWxsb3dlZCB1bmljb2RlIFJlZ0V4cCwgdXNlIGBhbGxvd1VuaWNvZGVSZWdFeHBgIG9yIGBDb2RlcG9pbnRTdHJpbmdUeXBlYFwiLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMucGF0dGVybi50ZXN0KHZhbCkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVBhdHRlcm5Ob3RNYXRjaGVkRXJyb3IodGhpcy5wYXR0ZXJuLCB2YWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICB0ZXN0KHZhbDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudGVzdEVycm9yKHZhbCkgPT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGVxdWFscyh2YWwxOiBzdHJpbmcsIHZhbDI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWwxID09PSB2YWwyO1xuICB9XG5cbiAgY2xvbmUodmFsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBkaWZmKG9sZFZhbDogc3RyaW5nLCBuZXdWYWw6IHN0cmluZyk6IERpZmYgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBvbGRWYWwgPT09IG5ld1ZhbCA/IHVuZGVmaW5lZCA6IFtvbGRWYWwsIG5ld1ZhbF07XG4gIH1cblxuICBwYXRjaChvbGRWYWw6IHN0cmluZywgZGlmZjogRGlmZiB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRpZmYgPT09IHVuZGVmaW5lZCA/IG9sZFZhbCA6IGRpZmZbMV07XG4gIH1cblxuICByZXZlcnNlRGlmZihkaWZmOiBEaWZmIHwgdW5kZWZpbmVkKTogRGlmZiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGRpZmYgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IFtkaWZmWzFdLCBkaWZmWzBdXTtcbiAgfVxuXG4gIHNxdWFzaChkaWZmMTogRGlmZiB8IHVuZGVmaW5lZCwgZGlmZjI6IERpZmYgfCB1bmRlZmluZWQpOiBEaWZmIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoZGlmZjEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGRpZmYyID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBbZGlmZjJbMF0sIGRpZmYyWzFdXTtcbiAgICB9IGVsc2UgaWYgKGRpZmYyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBbZGlmZjFbMF0sIGRpZmYxWzFdXTtcbiAgICB9XG4gICAgcmV0dXJuIGRpZmYxWzBdID09PSBkaWZmMlsxXSA/IHVuZGVmaW5lZCA6IFtkaWZmMVswXSwgZGlmZjJbMV1dO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlPcHRpb25zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vcHRpb25zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IGNyZWF0ZUxhenlPcHRpb25zRXJyb3IodGhpcyk7XG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbnM6IFVjczJTdHJpbmdUeXBlT3B0aW9ucyA9IHR5cGVvZiB0aGlzLl9vcHRpb25zID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzLl9vcHRpb25zKCkgOiB0aGlzLl9vcHRpb25zO1xuXG4gICAgY29uc3QgYWxsb3dVbmljb2RlUmVnRXhwOiBib29sZWFuID0gb3B0aW9ucy5hbGxvd1VuaWNvZGVSZWdFeHAgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuYWxsb3dVbmljb2RlUmVnRXhwIDogdHJ1ZTtcbiAgICBjb25zdCBwYXR0ZXJuOiBSZWdFeHAgfCB1bmRlZmluZWQgPSBvcHRpb25zLnBhdHRlcm47XG4gICAgY29uc3QgbG93ZXJDYXNlOiBib29sZWFuID0gb3B0aW9ucy5sb3dlckNhc2UgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubG93ZXJDYXNlIDogZmFsc2U7XG4gICAgY29uc3QgdHJpbW1lZDogYm9vbGVhbiA9IG9wdGlvbnMudHJpbW1lZCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy50cmltbWVkIDogZmFsc2U7XG4gICAgY29uc3QgbWluTGVuZ3RoOiBudW1iZXIgfCB1bmRlZmluZWQgPSBvcHRpb25zLm1pbkxlbmd0aDtcbiAgICBjb25zdCBtYXhMZW5ndGg6IG51bWJlciA9IG9wdGlvbnMubWF4TGVuZ3RoO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7YWxsb3dVbmljb2RlUmVnRXhwLCBwYXR0ZXJuLCBsb3dlckNhc2UsIHRyaW1tZWQsIG1pbkxlbmd0aCwgbWF4TGVuZ3RofSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
