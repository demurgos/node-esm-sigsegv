"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
const checked_ucs2_decode_1 = require("../_helpers/checked-ucs2-decode");
const lazy_properties_1 = require("../_helpers/lazy-properties");
const invalid_type_1 = require("../errors/invalid-type");
const lazy_options_1 = require("../errors/lazy-options");
const lower_case_1 = require("../errors/lower-case");
const max_codepoints_1 = require("../errors/max-codepoints");
const min_codepoints_1 = require("../errors/min-codepoints");
const missing_dependency_1 = require("../errors/missing-dependency");
const not_trimmed_1 = require("../errors/not-trimmed");
const pattern_not_matched_1 = require("../errors/pattern-not-matched");
const read_visitor_1 = require("../readers/read-visitor");
var Normalization;
(function (Normalization) {
    Normalization[Normalization["None"] = 0] = "None";
    Normalization[Normalization["Nfc"] = 1] = "Nfc";
})(Normalization = exports.Normalization || (exports.Normalization = {}));
exports.name = "codepoint-string";
class CodepointStringType {
    constructor(options) {
        this.name = exports.name;
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazy_properties_1.lazyProperties(this, this._applyOptions, [
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
            name: exports.name,
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
        if (!(typeof val === "string")) {
            return invalid_type_1.createInvalidTypeError("string", val);
        }
        switch (this.normalization) {
            case Normalization.Nfc:
                if (this.unorm === undefined) {
                    throw missing_dependency_1.createMissingDependencyError("unorm", "Required to normalize unicode strings to NFC.");
                }
                if (val !== this.unorm.nfc(val)) {
                    return incident_1.Incident("UnicodeNormalization", "Not NFC-Normalized");
                }
                break;
            case Normalization.None:
                break;
            default:
                throw new incident_1.Incident(`IncompleteSwitch: Received unexpected variant for this.normalization: ${this.normalization}`);
        }
        if (this.lowerCase && val !== val.toLowerCase()) {
            return lower_case_1.createLowerCaseError(val);
        }
        if (this.trimmed && val !== val.trim()) {
            return not_trimmed_1.createNotTrimmedError(val);
        }
        let codepointCount;
        try {
            codepointCount = checked_ucs2_decode_1.checkedUcs2Decode(val).length;
        }
        catch (err) {
            return err;
        }
        const minCodepoints = this.minCodepoints;
        if (typeof minCodepoints === "number" && codepointCount < minCodepoints) {
            return min_codepoints_1.createMinCodepointsError(val, codepointCount, minCodepoints);
        }
        if (codepointCount > this.maxCodepoints) {
            return max_codepoints_1.createMaxCodepointsError(val, codepointCount, this.maxCodepoints);
        }
        if (this.pattern instanceof RegExp) {
            if (!this.pattern.unicode && this.enforceUnicodeRegExp) {
                throw new incident_1.Incident("NonUnicodeRegExp", "Enforced unicode RegExp, use `enforceUnicodeRegExp = false` or `Ucs2StringType`");
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
exports.CodepointStringType = CodepointStringType;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdHlwZXMvY29kZXBvaW50LXN0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFvQztBQUNwQyx5RUFBb0U7QUFDcEUsaUVBQTZEO0FBRTdELHlEQUFnRTtBQUNoRSx5REFBZ0U7QUFDaEUscURBQTREO0FBQzVELDZEQUFvRTtBQUNwRSw2REFBb0U7QUFDcEUscUVBQTRFO0FBQzVFLHVEQUE4RDtBQUM5RCx1RUFBNkU7QUFDN0UsMERBQXNEO0FBUXRELElBQVksYUFHWDtBQUhELFdBQVksYUFBYTtJQUN2QixpREFBSSxDQUFBO0lBQ0osK0NBQUcsQ0FBQTtBQUNMLENBQUMsRUFIVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQUd4QjtBQUdZLFFBQUEsSUFBSSxHQUFTLGtCQUFrQixDQUFDO0FBNkQ3QyxNQUFhLG1CQUFtQjtJQWM5QixZQUFZLE9BQXFDO1FBWnhDLFNBQUksR0FBUyxZQUFJLENBQUM7UUFhekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxPQUFPLE9BQU8sS0FBSyxVQUFVLEVBQUU7WUFDakMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO2FBQU07WUFDTCxnQ0FBYyxDQUNaLElBQUksRUFDSixJQUFJLENBQUMsYUFBYSxFQUNsQjtnQkFDRSxlQUFlO2dCQUNmLHNCQUFzQjtnQkFDdEIsU0FBUztnQkFDVCxXQUFXO2dCQUNYLFNBQVM7Z0JBQ1QsZUFBZTtnQkFDZixlQUFlO2dCQUNmLE9BQU87YUFDUixDQUNGLENBQUM7U0FDSDtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQWtCO1FBQ2hDLE1BQU0sZUFBZSxHQUEyQjtZQUM5QyxhQUFhLEVBQUUsT0FBTyxDQUFDLGFBQWEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHO1lBQ3hGLG9CQUFv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QUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN2RixNQUFNLE9BQU8sR0FBWSxPQUFPLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2pGLE1BQU0sYUFBYSxHQUF1QixPQUFPLENBQUMsYUFBYSxDQUFDO1FBQ2hFLE1BQU0sYUFBYSxHQUFXLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDcEQsTUFBTSxLQUFLLEdBQTBCLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFFbkQsTUFBTSxDQUFDLE1BQU0sQ0FDWCxJQUFJLEVBQ0osRUFBQyxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUMsQ0FDeEcsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWhORCxrREFnTkMiLCJmaWxlIjoibGliL3R5cGVzL2NvZGVwb2ludC1zdHJpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmNpZGVudCB9IGZyb20gXCJpbmNpZGVudFwiO1xuaW1wb3J0IHsgY2hlY2tlZFVjczJEZWNvZGUgfSBmcm9tIFwiLi4vX2hlbHBlcnMvY2hlY2tlZC11Y3MyLWRlY29kZVwiO1xuaW1wb3J0IHsgbGF6eVByb3BlcnRpZXMgfSBmcm9tIFwiLi4vX2hlbHBlcnMvbGF6eS1wcm9wZXJ0aWVzXCI7XG5pbXBvcnQgeyBJb1R5cGUsIExhenksIFJlYWRlciwgVmVyc2lvbmVkVHlwZSwgV3JpdGVyIH0gZnJvbSBcIi4uL2NvcmVcIjtcbmltcG9ydCB7IGNyZWF0ZUludmFsaWRUeXBlRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL2ludmFsaWQtdHlwZVwiO1xuaW1wb3J0IHsgY3JlYXRlTGF6eU9wdGlvbnNFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvbGF6eS1vcHRpb25zXCI7XG5pbXBvcnQgeyBjcmVhdGVMb3dlckNhc2VFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvbG93ZXItY2FzZVwiO1xuaW1wb3J0IHsgY3JlYXRlTWF4Q29kZXBvaW50c0Vycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9tYXgtY29kZXBvaW50c1wiO1xuaW1wb3J0IHsgY3JlYXRlTWluQ29kZXBvaW50c0Vycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9taW4tY29kZXBvaW50c1wiO1xuaW1wb3J0IHsgY3JlYXRlTWlzc2luZ0RlcGVuZGVuY3lFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvbWlzc2luZy1kZXBlbmRlbmN5XCI7XG5pbXBvcnQgeyBjcmVhdGVOb3RUcmltbWVkRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL25vdC10cmltbWVkXCI7XG5pbXBvcnQgeyBjcmVhdGVQYXR0ZXJuTm90TWF0Y2hlZEVycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9wYXR0ZXJuLW5vdC1tYXRjaGVkXCI7XG5pbXBvcnQgeyByZWFkVmlzaXRvciB9IGZyb20gXCIuLi9yZWFkZXJzL3JlYWQtdmlzaXRvclwiO1xuXG5leHBvcnQgdHlwZSBVbm9ybU5mYyA9IChzdHI6IHN0cmluZykgPT4gc3RyaW5nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVub3JtTGlrZSB7XG4gIG5mYzogVW5vcm1OZmM7XG59XG5cbmV4cG9ydCBlbnVtIE5vcm1hbGl6YXRpb24ge1xuICBOb25lLFxuICBOZmMsXG59XG5cbmV4cG9ydCB0eXBlIE5hbWUgPSBcImNvZGVwb2ludC1zdHJpbmdcIjtcbmV4cG9ydCBjb25zdCBuYW1lOiBOYW1lID0gXCJjb2RlcG9pbnQtc3RyaW5nXCI7XG5leHBvcnQgbmFtZXNwYWNlIGpzb24ge1xuICBleHBvcnQgaW50ZXJmYWNlIFR5cGUge1xuICAgIG5hbWU6IE5hbWU7XG4gICAgbm9ybWFsaXphdGlvbjogXCJub25lXCIgfCBcIm5mY1wiO1xuICAgIGVuZm9yY2VVbmljb2RlUmVnRXhwOiBib29sZWFuO1xuICAgIHBhdHRlcm4/OiBbc3RyaW5nLCBzdHJpbmddO1xuICAgIGxvd2VyQ2FzZTogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBAc2VlIFtbVWNzMlN0cmluZ09wdGlvbnMudHJpbW1lZF1dXG4gICAgICovXG4gICAgdHJpbW1lZDogYm9vbGVhbjtcbiAgICBtaW5Db2RlcG9pbnRzPzogbnVtYmVyO1xuICAgIG1heENvZGVwb2ludHM6IG51bWJlcjtcbiAgfVxufVxuZXhwb3J0IHR5cGUgRGlmZiA9IFtzdHJpbmcsIHN0cmluZ107XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29kZXBvaW50U3RyaW5nT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBFbnN1cmUgTkZDIG5vcm1hbGl6YXRpb24gd2hlbiByZWFkaW5nIHN0cmluZ3MuXG4gICAqXG4gICAqIFJlZmVyZW5jZXM6XG4gICAqIC0gaHR0cDovL3VuaWNvZGUub3JnL2ZhcS9ub3JtYWxpemF0aW9uLmh0bWxcbiAgICogLSBodHRwOi8vdW5pY29kZS5vcmcvcmVwb3J0cy90cjE1L1xuICAgKi9cbiAgbm9ybWFsaXphdGlvbj86IE5vcm1hbGl6YXRpb247XG5cbiAgZW5mb3JjZVVuaWNvZGVSZWdFeHA/OiBib29sZWFuO1xuICBwYXR0ZXJuPzogUmVnRXhwO1xuICBsb3dlckNhc2U/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgc3RyaW5nIGNhbm5vdCBzdGFydCBvciBlbmQgd2l0aCBhbnkgb2YgdGhlIGZvbGxvd2luZyB3aGl0ZXNwYWNlIGFuZCBsaW5lIHRlcm1pbmF0b3JcbiAgICogY2hhcmFjdGVyczpcbiAgICpcbiAgICogLSBVbmljb2RlIENoYXJhY3RlciAnQ0hBUkFDVEVSIFRBQlVMQVRJT04nIChVKzAwMDkpXG4gICAqIC0gVW5pY29kZSBDaGFyYWN0ZXIgJ0xJTkUgRkVFRCAoTEYpJyAoVSswMDBBKVxuICAgKiAtIFVuaWNvZGUgQ2hhcmFjdGVyICdMSU5FIFRBQlVMQVRJT04nIChVKzAwMEIpXG4gICAqIC0gVW5pY29kZSBDaGFyYWN0ZXIgJ0ZPUk0gRkVFRCAoRkYpJyAoVSswMDBDKVxuICAgKiAtIFVuaWNvZGUgQ2hhcmFjdGVyICdDQVJSSUFHRSBSRVRVUk4gKENSKScgKFUrMDAwRClcbiAgICogLSBVbmljb2RlIENoYXJhY3RlciAnU1BBQ0UnIChVKzAwMjApXG4gICAqIC0gVW5pY29kZSBDaGFyYWN0ZXIgJ05PLUJSRUFLIFNQQUNFJyAoVSswMEEwKVxuICAgKiAtIFVuaWNvZGUgQ2hhcmFjdGVyICdMSU5FIFNFUEFSQVRPUicgKFUrMjAyOClcbiAgICogLSBVbmljb2RlIENoYXJhY3RlciAnUEFSQUdSQVBIIFNFUEFSQVRPUicgKFUrMjAyOSlcbiAgICogLSBVbmljb2RlIENoYXJhY3RlciAnWkVSTyBXSURUSCBOTy1CUkVBSyBTUEFDRScgKFUrRkVGRilcbiAgICogLSBBbnkgb3RoZXIgVW5pY29kZSBjaGFyYWN0ZXIgb2YgdGhlIFwiU2VwYXJhdG9yLCBzcGFjZVwiIChacykgZ2VuZXJhbCBjYXRlZ29yeVxuICAgKlxuICAgKiBAc2VlIDxodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvVHJpbT5cbiAgICogQHNlZSA8aHR0cDovL3d3dy5maWxlZm9ybWF0LmluZm8vaW5mby91bmljb2RlL2NhdGVnb3J5L1pzL2xpc3QuaHRtPlxuICAgKi9cbiAgdHJpbW1lZD86IGJvb2xlYW47XG4gIG1pbkNvZGVwb2ludHM/OiBudW1iZXI7XG4gIG1heENvZGVwb2ludHM6IG51bWJlcjtcblxuICAvKipcbiAgICogVW5pY29kZSBub3JtYWxpemF0aW9uIGxpYnJhcnkgdG8gdXNlLlxuICAgKi9cbiAgdW5vcm0/OiBVbm9ybUxpa2U7XG59XG5cbmV4cG9ydCBjbGFzcyBDb2RlcG9pbnRTdHJpbmdUeXBlIGltcGxlbWVudHMgSW9UeXBlPHN0cmluZz4sIFZlcnNpb25lZFR5cGU8c3RyaW5nLCBEaWZmPiB7XG5cbiAgcmVhZG9ubHkgbmFtZTogTmFtZSA9IG5hbWU7XG4gIHJlYWRvbmx5IG5vcm1hbGl6YXRpb24hOiBOb3JtYWxpemF0aW9uO1xuICByZWFkb25seSBlbmZvcmNlVW5pY29kZVJlZ0V4cCE6IGJvb2xlYW47XG4gIHJlYWRvbmx5IHBhdHRlcm4/OiBSZWdFeHA7XG4gIHJlYWRvbmx5IGxvd2VyQ2FzZSE6IGJvb2xlYW47XG4gIHJlYWRvbmx5IHRyaW1tZWQhOiBib29sZWFuO1xuICByZWFkb25seSBtaW5Db2RlcG9pbnRzPzogbnVtYmVyO1xuICByZWFkb25seSBtYXhDb2RlcG9pbnRzITogbnVtYmVyO1xuICByZWFkb25seSB1bm9ybT86IFVub3JtTGlrZTtcblxuICBwcml2YXRlIF9vcHRpb25zOiBMYXp5PENvZGVwb2ludFN0cmluZ09wdGlvbnM+O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IExhenk8Q29kZXBvaW50U3RyaW5nT3B0aW9ucz4pIHtcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5fYXBwbHlPcHRpb25zKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhenlQcm9wZXJ0aWVzKFxuICAgICAgICB0aGlzLFxuICAgICAgICB0aGlzLl9hcHBseU9wdGlvbnMsXG4gICAgICAgIFtcbiAgICAgICAgICBcIm5vcm1hbGl6YXRpb25cIixcbiAgICAgICAgICBcImVuZm9yY2VVbmljb2RlUmVnRXhwXCIsXG4gICAgICAgICAgXCJwYXR0ZXJuXCIsXG4gICAgICAgICAgXCJsb3dlckNhc2VcIixcbiAgICAgICAgICBcInRyaW1tZWRcIixcbiAgICAgICAgICBcIm1pbkNvZGVwb2ludHNcIixcbiAgICAgICAgICBcIm1heENvZGVwb2ludHNcIixcbiAgICAgICAgICBcInVub3JtXCIsXG4gICAgICAgIF0sXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihvcHRpb25zOiBqc29uLlR5cGUpOiBDb2RlcG9pbnRTdHJpbmdUeXBlIHtcbiAgICBjb25zdCByZXNvbHZlZE9wdGlvbnM6IENvZGVwb2ludFN0cmluZ09wdGlvbnMgPSB7XG4gICAgICBub3JtYWxpemF0aW9uOiBvcHRpb25zLm5vcm1hbGl6YXRpb24gPT09IFwibm9uZVwiID8gTm9ybWFsaXphdGlvbi5Ob25lIDogTm9ybWFsaXphdGlvbi5OZmMsXG4gICAgICBlbmZvcmNlVW5pY29kZVJlZ0V4cDogb3B0aW9ucy5lbmZvcmNlVW5pY29kZVJlZ0V4cCxcbiAgICAgIGxvd2VyQ2FzZTogb3B0aW9ucy5sb3dlckNhc2UsXG4gICAgICB0cmltbWVkOiBvcHRpb25zLnRyaW1tZWQsXG4gICAgICBtYXhDb2RlcG9pbnRzOiBvcHRpb25zLm1heENvZGVwb2ludHMsXG4gICAgfTtcbiAgICBpZiAob3B0aW9ucy5wYXR0ZXJuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlc29sdmVkT3B0aW9ucy5wYXR0ZXJuID0gbmV3IFJlZ0V4cChvcHRpb25zLnBhdHRlcm5bMF0sIG9wdGlvbnMucGF0dGVyblsxXSk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm1pbkNvZGVwb2ludHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzb2x2ZWRPcHRpb25zLm1pbkNvZGVwb2ludHMgPSBvcHRpb25zLm1pbkNvZGVwb2ludHM7XG4gICAgfVxuICAgIHJldHVybiBuZXcgQ29kZXBvaW50U3RyaW5nVHlwZShyZXNvbHZlZE9wdGlvbnMpO1xuICB9XG5cbiAgdG9KU09OKCk6IGpzb24uVHlwZSB7XG4gICAgY29uc3QganNvblR5cGU6IGpzb24uVHlwZSA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBub3JtYWxpemF0aW9uOiB0aGlzLm5vcm1hbGl6YXRpb24gPT09IE5vcm1hbGl6YXRpb24uTm9uZSA/IFwibm9uZVwiIDogXCJuZmNcIixcbiAgICAgIGVuZm9yY2VVbmljb2RlUmVnRXhwOiB0aGlzLmVuZm9yY2VVbmljb2RlUmVnRXhwLFxuICAgICAgbG93ZXJDYXNlOiB0aGlzLmxvd2VyQ2FzZSxcbiAgICAgIHRyaW1tZWQ6IHRoaXMudHJpbW1lZCxcbiAgICAgIG1heENvZGVwb2ludHM6IHRoaXMubWF4Q29kZXBvaW50cyxcbiAgICB9O1xuICAgIGlmICh0aGlzLnBhdHRlcm4gIT09IHVuZGVmaW5lZCkge1xuICAgICAganNvblR5cGUucGF0dGVybiA9IFt0aGlzLnBhdHRlcm4uc291cmNlLCB0aGlzLnBhdHRlcm4uZmxhZ3NdO1xuICAgIH1cbiAgICBpZiAodGhpcy5taW5Db2RlcG9pbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGpzb25UeXBlLm1pbkNvZGVwb2ludHMgPSB0aGlzLm1pbkNvZGVwb2ludHM7XG4gICAgfVxuICAgIHJldHVybiBqc29uVHlwZTtcbiAgfVxuXG4gIC8vIFRPRE86IER5bmFtaWNhbGx5IGFkZCB3aXRoIHByb3RvdHlwZT9cbiAgcmVhZDxSPihyZWFkZXI6IFJlYWRlcjxSPiwgcmF3OiBSKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcmVhZGVyLnJlYWRTdHJpbmcocmF3LCByZWFkVmlzaXRvcih7XG4gICAgICBmcm9tU3RyaW5nOiAoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICAgIGNvbnN0IGVycm9yOiBFcnJvciB8IHVuZGVmaW5lZCA9IHRoaXMudGVzdEVycm9yKGlucHV0KTtcbiAgICAgICAgaWYgKGVycm9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICB9LFxuICAgIH0pKTtcbiAgfVxuXG4gIC8vIFRPRE86IER5bmFtaWNhbGx5IGFkZCB3aXRoIHByb3RvdHlwZT9cbiAgd3JpdGU8Vz4od3JpdGVyOiBXcml0ZXI8Vz4sIHZhbHVlOiBzdHJpbmcpOiBXIHtcbiAgICByZXR1cm4gd3JpdGVyLndyaXRlU3RyaW5nKHZhbHVlKTtcbiAgfVxuXG4gIHRlc3RFcnJvcih2YWw6IHN0cmluZyk6IEVycm9yIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoISh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUludmFsaWRUeXBlRXJyb3IoXCJzdHJpbmdcIiwgdmFsKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMubm9ybWFsaXphdGlvbikge1xuICAgICAgY2FzZSBOb3JtYWxpemF0aW9uLk5mYzpcbiAgICAgICAgaWYgKHRoaXMudW5vcm0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEZXBlbmRlbmN5RXJyb3IoXCJ1bm9ybVwiLCBcIlJlcXVpcmVkIHRvIG5vcm1hbGl6ZSB1bmljb2RlIHN0cmluZ3MgdG8gTkZDLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsICE9PSB0aGlzLnVub3JtLm5mYyh2YWwpKSB7XG4gICAgICAgICAgcmV0dXJuIEluY2lkZW50KFwiVW5pY29kZU5vcm1hbGl6YXRpb25cIiwgXCJOb3QgTkZDLU5vcm1hbGl6ZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE5vcm1hbGl6YXRpb24uTm9uZTpcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgSW5jaWRlbnQoXG4gICAgICAgICAgYEluY29tcGxldGVTd2l0Y2g6IFJlY2VpdmVkIHVuZXhwZWN0ZWQgdmFyaWFudCBmb3IgdGhpcy5ub3JtYWxpemF0aW9uOiAke3RoaXMubm9ybWFsaXphdGlvbn1gLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxvd2VyQ2FzZSAmJiB2YWwgIT09IHZhbC50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICByZXR1cm4gY3JlYXRlTG93ZXJDYXNlRXJyb3IodmFsKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50cmltbWVkICYmIHZhbCAhPT0gdmFsLnRyaW0oKSkge1xuICAgICAgcmV0dXJuIGNyZWF0ZU5vdFRyaW1tZWRFcnJvcih2YWwpO1xuICAgIH1cblxuICAgIGxldCBjb2RlcG9pbnRDb3VudDogbnVtYmVyO1xuICAgIHRyeSB7XG4gICAgICBjb2RlcG9pbnRDb3VudCA9IGNoZWNrZWRVY3MyRGVjb2RlKHZhbCkubGVuZ3RoO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIGVycjtcbiAgICB9XG5cbiAgICBjb25zdCBtaW5Db2RlcG9pbnRzOiBudW1iZXIgfCB1bmRlZmluZWQgPSB0aGlzLm1pbkNvZGVwb2ludHM7XG4gICAgaWYgKHR5cGVvZiBtaW5Db2RlcG9pbnRzID09PSBcIm51bWJlclwiICYmIGNvZGVwb2ludENvdW50IDwgbWluQ29kZXBvaW50cykge1xuICAgICAgcmV0dXJuIGNyZWF0ZU1pbkNvZGVwb2ludHNFcnJvcih2YWwsIGNvZGVwb2ludENvdW50LCBtaW5Db2RlcG9pbnRzKTtcbiAgICB9XG5cbiAgICBpZiAoY29kZXBvaW50Q291bnQgPiB0aGlzLm1heENvZGVwb2ludHMpIHtcbiAgICAgIHJldHVybiBjcmVhdGVNYXhDb2RlcG9pbnRzRXJyb3IodmFsLCBjb2RlcG9pbnRDb3VudCwgdGhpcy5tYXhDb2RlcG9pbnRzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXR0ZXJuIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICBpZiAoIXRoaXMucGF0dGVybi51bmljb2RlICYmIHRoaXMuZW5mb3JjZVVuaWNvZGVSZWdFeHApIHtcbiAgICAgICAgdGhyb3cgbmV3IEluY2lkZW50KFxuICAgICAgICAgIFwiTm9uVW5pY29kZVJlZ0V4cFwiLFxuICAgICAgICAgIFwiRW5mb3JjZWQgdW5pY29kZSBSZWdFeHAsIHVzZSBgZW5mb3JjZVVuaWNvZGVSZWdFeHAgPSBmYWxzZWAgb3IgYFVjczJTdHJpbmdUeXBlYFwiLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMucGF0dGVybi50ZXN0KHZhbCkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVBhdHRlcm5Ob3RNYXRjaGVkRXJyb3IodGhpcy5wYXR0ZXJuLCB2YWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICB0ZXN0KHZhbDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudGVzdEVycm9yKHZhbCkgPT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGVxdWFscyh2YWwxOiBzdHJpbmcsIHZhbDI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWwxID09PSB2YWwyO1xuICB9XG5cbiAgY2xvbmUodmFsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBkaWZmKG9sZFZhbDogc3RyaW5nLCBuZXdWYWw6IHN0cmluZyk6IERpZmYgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBvbGRWYWwgPT09IG5ld1ZhbCA/IHVuZGVmaW5lZCA6IFtvbGRWYWwsIG5ld1ZhbF07XG4gIH1cblxuICBwYXRjaChvbGRWYWw6IHN0cmluZywgZGlmZjogRGlmZiB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRpZmYgPT09IHVuZGVmaW5lZCA/IG9sZFZhbCA6IGRpZmZbMV07XG4gIH1cblxuICByZXZlcnNlRGlmZihkaWZmOiBEaWZmIHwgdW5kZWZpbmVkKTogRGlmZiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGRpZmYgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IFtkaWZmWzFdLCBkaWZmWzBdXTtcbiAgfVxuXG4gIHNxdWFzaChkaWZmMTogRGlmZiB8IHVuZGVmaW5lZCwgZGlmZjI6IERpZmYgfCB1bmRlZmluZWQpOiBEaWZmIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoZGlmZjEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGRpZmYyID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBbZGlmZjJbMF0sIGRpZmYyWzFdXTtcbiAgICB9IGVsc2UgaWYgKGRpZmYyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBbZGlmZjFbMF0sIGRpZmYxWzFdXTtcbiAgICB9XG4gICAgcmV0dXJuIGRpZmYxWzBdID09PSBkaWZmMlsxXSA/IHVuZGVmaW5lZCA6IFtkaWZmMVswXSwgZGlmZjJbMV1dO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlPcHRpb25zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vcHRpb25zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IGNyZWF0ZUxhenlPcHRpb25zRXJyb3IodGhpcyk7XG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbnM6IENvZGVwb2ludFN0cmluZ09wdGlvbnMgPSB0eXBlb2YgdGhpcy5fb3B0aW9ucyA9PT0gXCJmdW5jdGlvblwiID8gdGhpcy5fb3B0aW9ucygpIDogdGhpcy5fb3B0aW9ucztcblxuICAgIGNvbnN0IG5vcm1hbGl6YXRpb246IE5vcm1hbGl6YXRpb24gPSBvcHRpb25zLm5vcm1hbGl6YXRpb24gIT09IHVuZGVmaW5lZCA/XG4gICAgICBvcHRpb25zLm5vcm1hbGl6YXRpb24gOlxuICAgICAgTm9ybWFsaXphdGlvbi5OZmM7XG4gICAgY29uc3QgZW5mb3JjZVVuaWNvZGVSZWdFeHA6IGJvb2xlYW4gPSBvcHRpb25zLmVuZm9yY2VVbmljb2RlUmVnRXhwICE9PSB1bmRlZmluZWQgP1xuICAgICAgb3B0aW9ucy5lbmZvcmNlVW5pY29kZVJlZ0V4cCA6XG4gICAgICB0cnVlO1xuICAgIGNvbnN0IHBhdHRlcm46IFJlZ0V4cCB8IHVuZGVmaW5lZCA9IG9wdGlvbnMucGF0dGVybjtcbiAgICBjb25zdCBsb3dlckNhc2U6IGJvb2xlYW4gPSBvcHRpb25zLmxvd2VyQ2FzZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5sb3dlckNhc2UgOiBmYWxzZTtcbiAgICBjb25zdCB0cmltbWVkOiBib29sZWFuID0gb3B0aW9ucy50cmltbWVkICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLnRyaW1tZWQgOiBmYWxzZTtcbiAgICBjb25zdCBtaW5Db2RlcG9pbnRzOiBudW1iZXIgfCB1bmRlZmluZWQgPSBvcHRpb25zLm1pbkNvZGVwb2ludHM7XG4gICAgY29uc3QgbWF4Q29kZXBvaW50czogbnVtYmVyID0gb3B0aW9ucy5tYXhDb2RlcG9pbnRzO1xuICAgIGNvbnN0IHVub3JtOiBVbm9ybUxpa2UgfCB1bmRlZmluZWQgPSBvcHRpb25zLnVub3JtO1xuXG4gICAgT2JqZWN0LmFzc2lnbihcbiAgICAgIHRoaXMsXG4gICAgICB7bm9ybWFsaXphdGlvbiwgZW5mb3JjZVVuaWNvZGVSZWdFeHAsIHBhdHRlcm4sIGxvd2VyQ2FzZSwgdHJpbW1lZCwgbWluQ29kZXBvaW50cywgbWF4Q29kZXBvaW50cywgdW5vcm19LFxuICAgICk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
