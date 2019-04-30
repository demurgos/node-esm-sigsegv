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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdHlwZXMvdHMtZW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWxELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQVF0RCxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQVMsU0FBUyxDQUFDO0FBS3BDOztHQUVHO0FBQ0gsU0FBUyxXQUFXLENBQThDLE1BQW9CO0lBQ3BGLE1BQU0sTUFBTSxHQUFjLElBQUksR0FBRyxFQUFFLENBQUM7SUFDcEMsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUU7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLFNBQVM7U0FDVjtRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzlCO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFTLGlCQUFpQixDQUFDLEdBQVc7SUFDcEMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssR0FBRyxJQUFJLEdBQUcsS0FBSyxVQUFVLElBQUksR0FBRyxLQUFLLFdBQVcsSUFBSSxHQUFHLEtBQUssS0FBSyxDQUFDO0FBQ2pHLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFTLFdBQVcsQ0FDbEIsTUFBb0IsRUFDcEIsVUFBaUMsRUFDakMsU0FBK0I7SUFFL0IsTUFB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QzFELENBQUM7Q0FDRiIsImZpbGUiOiJsaWIvdHlwZXMvdHMtZW51bS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluY2lkZW50IH0gZnJvbSBcImluY2lkZW50XCI7XG5pbXBvcnQgeyBsYXp5UHJvcGVydGllcyB9IGZyb20gXCIuLi9faGVscGVycy9sYXp5LXByb3BlcnRpZXNcIjtcbmltcG9ydCB7IENhc2VTdHlsZSwgcmVuYW1lIH0gZnJvbSBcIi4uL2Nhc2Utc3R5bGVcIjtcbmltcG9ydCB7IElvVHlwZSwgTGF6eSwgUmVhZGVyLCBXcml0ZXIgfSBmcm9tIFwiLi4vY29yZVwiO1xuaW1wb3J0IHsgY3JlYXRlTGF6eU9wdGlvbnNFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvbGF6eS1vcHRpb25zXCI7XG5pbXBvcnQgeyBjcmVhdGVOb3RJbXBsZW1lbnRlZEVycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9ub3QtaW1wbGVtZW50ZWRcIjtcbmltcG9ydCB7IHJlYWRWaXNpdG9yIH0gZnJvbSBcIi4uL3JlYWRlcnMvcmVhZC12aXNpdG9yXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBlbnVtIHZhbHVlIGRlZmluZWQgaW4gYEVudW1Db25zdHJ1Y3RvcmBcbiAqL1xuZXhwb3J0IHR5cGUgVHNFbnVtPEVudW1Db25zdHJ1Y3Rvcj4gPSB7W0sgaW4ga2V5b2YgRW51bUNvbnN0cnVjdG9yXTogRW51bUNvbnN0cnVjdG9yW0tdfTtcblxuZXhwb3J0IHR5cGUgTmFtZSA9IFwidHMtZW51bVwiO1xuZXhwb3J0IGNvbnN0IG5hbWU6IE5hbWUgPSBcInRzLWVudW1cIjtcbmV4cG9ydCB0eXBlIERpZmYgPSBudW1iZXI7XG5cbmV4cG9ydCB0eXBlIEVudW1PYmplY3Q8RU8sIEUgZXh0ZW5kcyBudW1iZXIgfCBzdHJpbmc+ID0gUmVjb3JkPGtleW9mIEVPLCBFPjtcblxuLyoqXG4gKiBCdWlsZHMgYSBtYXAgZnJvbSBhIFRTIGVudW0gYnkgcmVtb3ZpbmcgcmV2ZXJzZS1sb29rdXAga2V5cy5cbiAqL1xuZnVuY3Rpb24gdHNFbnVtVG9NYXA8SyBleHRlbmRzIHN0cmluZywgRSBleHRlbmRzIHN0cmluZyB8IG51bWJlcj4odHNFbnVtOiBSZWNvcmQ8SywgRT4pOiBNYXA8SywgRT4ge1xuICBjb25zdCByZXN1bHQ6IE1hcDxLLCBFPiA9IG5ldyBNYXAoKTtcbiAgZm9yIChjb25zdCBrZXkgaW4gdHNFbnVtKSB7XG4gICAgaWYgKCFpc1ZhbGlkRW51bU1lbWJlcihrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmVzdWx0LnNldChrZXksIHRzRW51bVtrZXldKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEZ1bmN0aW9uIHVzZWQgYnkgVFMgdG8gY2hlY2sgdGhlIG5hbWVzIG9mIGVudW1zIChpc051bWVyaWNMaXRlcmFsTmFtZSlcbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9ibG9iLzg5ZGU0YzlhM2FiM2Y3Zjg4YTE0MWYxNTI5Yjc3NjI4MjA0YmZmNzMvbGliL3RzYy5qcyNMMzY4NzdcbiAqL1xuZnVuY3Rpb24gaXNWYWxpZEVudW1NZW1iZXIoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuICgra2V5KS50b1N0cmluZygpICE9PSBrZXkgfHwga2V5ID09PSBcIkluZmluaXR5XCIgfHwga2V5ID09PSBcIi1JbmZpbml0eVwiIHx8IGtleSA9PT0gXCJOYU5cIjtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIFRTIGVudW0gYW5kIHJlbmFtZSBvcHRpb25zIHRvIHR3byBtYXBzOiBmcm9tIG91dCBuYW1lcyB0byB2YWx1ZXMgYW5kIGZyb21cbiAqIHZhbHVlcyB0byBvdXQgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGdldEVudW1NYXBzPEsgZXh0ZW5kcyBzdHJpbmcsIEUgZXh0ZW5kcyBzdHJpbmcgfCBudW1iZXI+KFxuICB0c0VudW06IFJlY29yZDxLLCBFPixcbiAgY2hhbmdlQ2FzZTogQ2FzZVN0eWxlIHwgdW5kZWZpbmVkLFxuICByZW5hbWVBbGw/OiB7W1AgaW4gS10/OiBzdHJpbmd9LFxuKTogW01hcDxFLCBzdHJpbmc+LCBNYXA8c3RyaW5nLCBFPl0ge1xuICBjb25zdCBqc1RvT3V0OiBNYXA8RSwgc3RyaW5nPiA9IG5ldyBNYXAoKTtcbiAgY29uc3Qgb3V0VG9KczogTWFwPHN0cmluZywgRT4gPSBuZXcgTWFwKCk7XG5cbiAgLy8gVE9ETzogQ2hlY2sgZm9yIGJpamVjdGlvblxuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiB0c0VudW1Ub01hcCh0c0VudW0pKSB7XG4gICAgbGV0IG5hbWU6IHN0cmluZyA9IGtleTtcbiAgICBpZiAocmVuYW1lQWxsICE9PSB1bmRlZmluZWQgJiYgcmVuYW1lQWxsW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgbmFtZSA9IHJlbmFtZUFsbFtrZXldIGFzIHN0cmluZztcbiAgICB9IGVsc2UgaWYgKGNoYW5nZUNhc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbmFtZSA9IHJlbmFtZShrZXksIGNoYW5nZUNhc2UpO1xuICAgIH1cbiAgICBqc1RvT3V0LnNldCh2YWx1ZSwgbmFtZSk7XG4gICAgb3V0VG9Kcy5zZXQobmFtZSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBbanNUb091dCwgb3V0VG9Kc107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHNFbnVtVHlwZU9wdGlvbnM8RSBleHRlbmRzIHN0cmluZyB8IG51bWJlciwgRU8gZXh0ZW5kcyB7fSA9IHt9PiB7XG4gIGVudW06IEVudW1PYmplY3Q8RU8sIEU+O1xuICBjaGFuZ2VDYXNlPzogQ2FzZVN0eWxlO1xuICByZW5hbWU/OiB7W1AgaW4ga2V5b2YgRU9dPzogc3RyaW5nfTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgVFMtc3R5bGUgZW51bSB2YWx1ZS5cbiAqXG4gKiBBIFRTIGVudW0gdmFsdWUgaXMgZGVmaW5lZCBpbiBhbiBvYmplY3QgKFwiZW51bSBvYmplY3RcIikuIEl0IGNvbnRhaW5zIFwiZm9yd2FyZFwicHJvcGVydGllcyBmcm9tXG4gKiBub24tbnVtZXJpYyBzdHJpbmdzIHRvIHN0cmluZ3Mgb3IgbnVtYmVycyBhbmQgXCJyZXZlcnNlZFwiIHByb3BlcnRpZXMgZnJvbSBudW1lcmljIHN0cmluZ3MgdG9cbiAqIGtleXMgb2YgZm9yd2FyZCBwcm9wZXJ0aWVzIHdpdGggY29uc3RhbnQgbnVtZXJpYyB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBUc0VudW1UeXBlPEUgZXh0ZW5kcyBzdHJpbmcgfCBudW1iZXIsIEVPIGV4dGVuZHMge30gPSB7fT4gaW1wbGVtZW50cyBJb1R5cGU8RT4sIFRzRW51bVR5cGVPcHRpb25zPEUsIEVPPiB7XG4gIHJlYWRvbmx5IG5hbWU6IE5hbWUgPSBuYW1lO1xuICByZWFkb25seSBlbnVtITogUmVjb3JkPGtleW9mIEVPLCBFPjtcbiAgcmVhZG9ubHkgY2hhbmdlQ2FzZT86IENhc2VTdHlsZTtcbiAgcmVhZG9ubHkgcmVuYW1lPzoge1tQIGluIGtleW9mIEVPXT86IHN0cmluZ307XG5cbiAgcHJpdmF0ZSBnZXQganNUb091dCgpOiBNYXA8RSwgc3RyaW5nPiB7XG4gICAgaWYgKHRoaXMuX2pzVG9PdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgW3RoaXMuX2pzVG9PdXQsIHRoaXMuX291dFRvSnNdID0gZ2V0RW51bU1hcHModGhpcy5lbnVtLCB0aGlzLmNoYW5nZUNhc2UsIHRoaXMucmVuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2pzVG9PdXQ7XG4gIH1cblxuICBwcml2YXRlIGdldCBvdXRUb0pzKCk6IE1hcDxzdHJpbmcsIEU+IHtcbiAgICBpZiAodGhpcy5fb3V0VG9KcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBbdGhpcy5fanNUb091dCwgdGhpcy5fb3V0VG9Kc10gPSBnZXRFbnVtTWFwcyh0aGlzLmVudW0sIHRoaXMuY2hhbmdlQ2FzZSwgdGhpcy5yZW5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fb3V0VG9KcztcbiAgfVxuXG4gIHByaXZhdGUgX2pzVG9PdXQ6IE1hcDxFLCBzdHJpbmc+IHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9vdXRUb0pzOiBNYXA8c3RyaW5nLCBFPiB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIF9vcHRpb25zOiBMYXp5PFRzRW51bVR5cGVPcHRpb25zPEU+PjtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBMYXp5PFRzRW51bVR5cGVPcHRpb25zPEU+Pikge1xuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aGlzLl9hcHBseU9wdGlvbnMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGF6eVByb3BlcnRpZXModGhpcywgdGhpcy5fYXBwbHlPcHRpb25zLCBbXCJlbnVtXCIsIFwiY2hhbmdlQ2FzZVwiLCBcInJlbmFtZVwiXSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21KU09OKCk6IFRzRW51bVR5cGU8YW55PiB7XG4gICAgdGhyb3cgY3JlYXRlTm90SW1wbGVtZW50ZWRFcnJvcihcIlRzRW51bVR5cGUuZnJvbUpTT05cIik7XG4gIH1cblxuICByZWFkPFI+KHJlYWRlcjogUmVhZGVyPFI+LCByYXc6IFIpOiBFIHtcbiAgICByZXR1cm4gcmVhZGVyLnJlYWRTdHJpbmcocmF3LCByZWFkVmlzaXRvcih7XG4gICAgICBmcm9tU3RyaW5nOiAoaW5wdXQ6IHN0cmluZyk6IEUgPT4ge1xuICAgICAgICBpZiAoIXJlYWRlci50cnVzdElucHV0ICYmICF0aGlzLm91dFRvSnMuaGFzKGlucHV0KSkge1xuICAgICAgICAgIHRocm93IEluY2lkZW50KFwiVW5rbm93biBlbnVtIHZhcmlhbnQgbmFtZVwiLCBpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub3V0VG9Kcy5nZXQoaW5wdXQpITtcbiAgICAgIH0sXG4gICAgfSkpO1xuICB9XG5cbiAgd3JpdGU8Vz4od3JpdGVyOiBXcml0ZXI8Vz4sIHZhbHVlOiBFKTogVyB7XG4gICAgcmV0dXJuIHdyaXRlci53cml0ZVN0cmluZyh0aGlzLmpzVG9PdXQuZ2V0KHZhbHVlKSEpO1xuICB9XG5cbiAgdGVzdEVycm9yKHZhbHVlOiBFKTogRXJyb3IgfCB1bmRlZmluZWQge1xuICAgIGlmICghdGhpcy5qc1RvT3V0Lmhhcyh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBJbmNpZGVudChcIlVua25vd25WYXJpYW50RXJyb3JcIiwge3ZhbHVlfSwgXCJVbmtub3duIGVudW0gdmFyaWFudCB2YWx1ZVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHRlc3QodmFsdWU6IEUpOiB2YWx1ZSBpcyBFIHtcbiAgICByZXR1cm4gdGhpcy5qc1RvT3V0Lmhhcyh2YWx1ZSk7XG4gIH1cblxuICBlcXVhbHModmFsMTogRSwgdmFsMjogRSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWwxID09PSB2YWwyO1xuICB9XG5cbiAgY2xvbmUodmFsOiBFKTogRSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIHByaXZhdGUgX2FwcGx5T3B0aW9ucygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBjcmVhdGVMYXp5T3B0aW9uc0Vycm9yKHRoaXMpO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zOiBUc0VudW1UeXBlT3B0aW9uczxFPiA9IHR5cGVvZiB0aGlzLl9vcHRpb25zID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzLl9vcHRpb25zKCkgOiB0aGlzLl9vcHRpb25zO1xuXG4gICAgY29uc3QgdHNFbnVtOiBFTyA9IG9wdGlvbnMuZW51bSBhcyBFTztcbiAgICBjb25zdCBjaGFuZ2VDYXNlOiBDYXNlU3R5bGUgfCB1bmRlZmluZWQgPSBvcHRpb25zLmNoYW5nZUNhc2U7XG4gICAgY29uc3QgcmVuYW1lOiB7W1AgaW4ga2V5b2YgRU9dPzogc3RyaW5nfSB8IHVuZGVmaW5lZCA9IG9wdGlvbnMucmVuYW1lO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7ZW51bTogdHNFbnVtLCBjaGFuZ2VDYXNlLCByZW5hbWV9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9