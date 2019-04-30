"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lazy_properties_1 = require("../_helpers/lazy-properties");
const invalid_type_1 = require("../errors/invalid-type");
const lazy_options_1 = require("../errors/lazy-options");
const max_array_length_1 = require("../errors/max-array-length");
const not_implemented_1 = require("../errors/not-implemented");
const read_visitor_1 = require("../readers/read-visitor");
class BytesType {
    constructor(options) {
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazy_properties_1.lazyProperties(this, this._applyOptions, ["maxLength"]);
        }
    }
    // TODO: Dynamically add with prototype?
    read(reader, raw) {
        return reader.readBytes(raw, read_visitor_1.readVisitor({
            fromBytes(input) {
                return input;
            },
        }));
    }
    // TODO: Dynamically add with prototype?
    write(writer, value) {
        return writer.writeBytes(value);
    }
    testError(val) {
        if (!(val instanceof Uint8Array)) {
            return invalid_type_1.createInvalidTypeError("Uint8Array", val);
        }
        if (this.maxLength !== undefined && val.length > this.maxLength) {
            return max_array_length_1.createMaxArrayLengthError(val, this.maxLength);
        }
        return undefined;
    }
    test(val) {
        return this.testError(val) === undefined;
    }
    equals(left, right) {
        if (left.length !== right.length) {
            return false;
        }
        for (let i = 0; i < left.length; i++) {
            if (left[i] !== right[i]) {
                return false;
            }
        }
        return true;
    }
    lte(left, right) {
        const minLength = Math.min(left.length, right.length);
        for (let i = 0; i < minLength; i++) {
            if (left[i] > right[i]) {
                return false;
            }
        }
        return left.length <= right.length;
    }
    clone(val) {
        return Uint8Array.from(val);
    }
    /**
     * @param _oldVal
     * @param _newVal
     * @returns `true` if there is a difference, `undefined` otherwise
     */
    diff(_oldVal, _newVal) {
        throw not_implemented_1.createNotImplementedError("BufferType#diff");
    }
    patch(_oldVal, _diff) {
        throw not_implemented_1.createNotImplementedError("BufferType#patch");
    }
    reverseDiff(_diff) {
        throw not_implemented_1.createNotImplementedError("BufferType#reverseDiff");
    }
    squash(_diff1, _diff2) {
        throw not_implemented_1.createNotImplementedError("BufferType#squash");
    }
    _applyOptions() {
        if (this._options === undefined) {
            throw lazy_options_1.createLazyOptionsError(this);
        }
        const options = typeof this._options === "function" ? this._options() : this._options;
        const maxLength = options.maxLength;
        Object.assign(this, { maxLength });
    }
}
exports.BytesType = BytesType;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdHlwZXMvYnl0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpRUFBNkQ7QUFFN0QseURBQWdFO0FBQ2hFLHlEQUFnRTtBQUNoRSxpRUFBdUU7QUFDdkUsK0RBQXNFO0FBQ3RFLDBEQUFzRDtBQVF0RCxNQUFhLFNBQVM7SUFLcEIsWUFBWSxPQUErQjtRQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLE9BQU8sT0FBTyxLQUFLLFVBQVUsRUFBRTtZQUNqQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdEI7YUFBTTtZQUNMLGdDQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQUVELHdDQUF3QztJQUN4QyxJQUFJLENBQUksTUFBaUIsRUFBRSxHQUFNO1FBQy9CLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsMEJBQVcsQ0FBQztZQUN2QyxTQUFTLENBQUMsS0FBaUI7Z0JBQ3pCLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztTQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELHdDQUF3QztJQUN4QyxLQUFLLENBQUksTUFBaUIsRUFBRSxLQUFpQjtRQUMzQyxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELFNBQVMsQ0FBQyxHQUFlO1FBQ3ZCLElBQUksQ0FBQyxDQUFDLEdBQUcsWUFBWSxVQUFVLENBQUMsRUFBRTtZQUNoQyxPQUFPLHFDQUFzQixDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNsRDtRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQy9ELE9BQU8sNENBQXlCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN2RDtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFJLENBQUMsR0FBZTtRQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFDO0lBQzNDLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBZ0IsRUFBRSxLQUFpQjtRQUN4QyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNoQyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsS0FBSyxJQUFJLENBQUMsR0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN4QixPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBZ0IsRUFBRSxLQUFpQjtRQUNyQyxNQUFNLFNBQVMsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlELEtBQUssSUFBSSxDQUFDLEdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN0QixPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNyQyxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQWU7UUFDbkIsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsSUFBSSxDQUFDLE9BQW1CLEVBQUUsT0FBbUI7UUFDM0MsTUFBTSwyQ0FBeUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxLQUFLLENBQUMsT0FBbUIsRUFBRSxLQUF1QjtRQUNoRCxNQUFNLDJDQUF5QixDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUF1QjtRQUNqQyxNQUFNLDJDQUF5QixDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUF3QixFQUFFLE1BQXdCO1FBQ3ZELE1BQU0sMkNBQXlCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRU8sYUFBYTtRQUNuQixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQy9CLE1BQU0scUNBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEM7UUFDRCxNQUFNLE9BQU8sR0FBcUIsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRXhHLE1BQU0sU0FBUyxHQUFXLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFFNUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Q0FDRjtBQW5HRCw4QkFtR0MiLCJmaWxlIjoibGliL3R5cGVzL2J5dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbGF6eVByb3BlcnRpZXMgfSBmcm9tIFwiLi4vX2hlbHBlcnMvbGF6eS1wcm9wZXJ0aWVzXCI7XG5pbXBvcnQgeyBJb1R5cGUsIExhenksIE9yZCwgUmVhZGVyLCBWZXJzaW9uZWRUeXBlLCBXcml0ZXIgfSBmcm9tIFwiLi4vY29yZVwiO1xuaW1wb3J0IHsgY3JlYXRlSW52YWxpZFR5cGVFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvaW52YWxpZC10eXBlXCI7XG5pbXBvcnQgeyBjcmVhdGVMYXp5T3B0aW9uc0Vycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9sYXp5LW9wdGlvbnNcIjtcbmltcG9ydCB7IGNyZWF0ZU1heEFycmF5TGVuZ3RoRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL21heC1hcnJheS1sZW5ndGhcIjtcbmltcG9ydCB7IGNyZWF0ZU5vdEltcGxlbWVudGVkRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL25vdC1pbXBsZW1lbnRlZFwiO1xuaW1wb3J0IHsgcmVhZFZpc2l0b3IgfSBmcm9tIFwiLi4vcmVhZGVycy9yZWFkLXZpc2l0b3JcIjtcblxuZXhwb3J0IHR5cGUgRGlmZiA9IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBCeXRlc1R5cGVPcHRpb25zIHtcbiAgbWF4TGVuZ3RoOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBCeXRlc1R5cGUgaW1wbGVtZW50cyBJb1R5cGU8VWludDhBcnJheT4sIFZlcnNpb25lZFR5cGU8VWludDhBcnJheSwgRGlmZj4sIE9yZDxVaW50OEFycmF5PiB7XG4gIHJlYWRvbmx5IG1heExlbmd0aCE6IG51bWJlcjtcblxuICBwcml2YXRlIF9vcHRpb25zOiBMYXp5PEJ5dGVzVHlwZU9wdGlvbnM+O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IExhenk8Qnl0ZXNUeXBlT3B0aW9ucz4pIHtcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5fYXBwbHlPcHRpb25zKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhenlQcm9wZXJ0aWVzKHRoaXMsIHRoaXMuX2FwcGx5T3B0aW9ucywgW1wibWF4TGVuZ3RoXCJdKTtcbiAgICB9XG4gIH1cblxuICAvLyBUT0RPOiBEeW5hbWljYWxseSBhZGQgd2l0aCBwcm90b3R5cGU/XG4gIHJlYWQ8Uj4ocmVhZGVyOiBSZWFkZXI8Uj4sIHJhdzogUik6IFVpbnQ4QXJyYXkge1xuICAgIHJldHVybiByZWFkZXIucmVhZEJ5dGVzKHJhdywgcmVhZFZpc2l0b3Ioe1xuICAgICAgZnJvbUJ5dGVzKGlucHV0OiBVaW50OEFycmF5KTogVWludDhBcnJheSB7XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgIH0sXG4gICAgfSkpO1xuICB9XG5cbiAgLy8gVE9ETzogRHluYW1pY2FsbHkgYWRkIHdpdGggcHJvdG90eXBlP1xuICB3cml0ZTxXPih3cml0ZXI6IFdyaXRlcjxXPiwgdmFsdWU6IFVpbnQ4QXJyYXkpOiBXIHtcbiAgICByZXR1cm4gd3JpdGVyLndyaXRlQnl0ZXModmFsdWUpO1xuICB9XG5cbiAgdGVzdEVycm9yKHZhbDogVWludDhBcnJheSk6IEVycm9yIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoISh2YWwgaW5zdGFuY2VvZiBVaW50OEFycmF5KSkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUludmFsaWRUeXBlRXJyb3IoXCJVaW50OEFycmF5XCIsIHZhbCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1heExlbmd0aCAhPT0gdW5kZWZpbmVkICYmIHZhbC5sZW5ndGggPiB0aGlzLm1heExlbmd0aCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZU1heEFycmF5TGVuZ3RoRXJyb3IodmFsLCB0aGlzLm1heExlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICB0ZXN0KHZhbDogVWludDhBcnJheSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnRlc3RFcnJvcih2YWwpID09PSB1bmRlZmluZWQ7XG4gIH1cblxuICBlcXVhbHMobGVmdDogVWludDhBcnJheSwgcmlnaHQ6IFVpbnQ4QXJyYXkpOiBib29sZWFuIHtcbiAgICBpZiAobGVmdC5sZW5ndGggIT09IHJpZ2h0Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgbGVmdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxlZnRbaV0gIT09IHJpZ2h0W2ldKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBsdGUobGVmdDogVWludDhBcnJheSwgcmlnaHQ6IFVpbnQ4QXJyYXkpOiBib29sZWFuIHtcbiAgICBjb25zdCBtaW5MZW5ndGg6IG51bWJlciA9IE1hdGgubWluKGxlZnQubGVuZ3RoLCByaWdodC5sZW5ndGgpO1xuICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBtaW5MZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxlZnRbaV0gPiByaWdodFtpXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsZWZ0Lmxlbmd0aCA8PSByaWdodC5sZW5ndGg7XG4gIH1cblxuICBjbG9uZSh2YWw6IFVpbnQ4QXJyYXkpOiBVaW50OEFycmF5IHtcbiAgICByZXR1cm4gVWludDhBcnJheS5mcm9tKHZhbCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIF9vbGRWYWxcbiAgICogQHBhcmFtIF9uZXdWYWxcbiAgICogQHJldHVybnMgYHRydWVgIGlmIHRoZXJlIGlzIGEgZGlmZmVyZW5jZSwgYHVuZGVmaW5lZGAgb3RoZXJ3aXNlXG4gICAqL1xuICBkaWZmKF9vbGRWYWw6IFVpbnQ4QXJyYXksIF9uZXdWYWw6IFVpbnQ4QXJyYXkpOiBEaWZmIHwgdW5kZWZpbmVkIHtcbiAgICB0aHJvdyBjcmVhdGVOb3RJbXBsZW1lbnRlZEVycm9yKFwiQnVmZmVyVHlwZSNkaWZmXCIpO1xuICB9XG5cbiAgcGF0Y2goX29sZFZhbDogVWludDhBcnJheSwgX2RpZmY6IERpZmYgfCB1bmRlZmluZWQpOiBVaW50OEFycmF5IHtcbiAgICB0aHJvdyBjcmVhdGVOb3RJbXBsZW1lbnRlZEVycm9yKFwiQnVmZmVyVHlwZSNwYXRjaFwiKTtcbiAgfVxuXG4gIHJldmVyc2VEaWZmKF9kaWZmOiBEaWZmIHwgdW5kZWZpbmVkKTogRGlmZiB8IHVuZGVmaW5lZCB7XG4gICAgdGhyb3cgY3JlYXRlTm90SW1wbGVtZW50ZWRFcnJvcihcIkJ1ZmZlclR5cGUjcmV2ZXJzZURpZmZcIik7XG4gIH1cblxuICBzcXVhc2goX2RpZmYxOiBEaWZmIHwgdW5kZWZpbmVkLCBfZGlmZjI6IERpZmYgfCB1bmRlZmluZWQpOiBEaWZmIHwgdW5kZWZpbmVkIHtcbiAgICB0aHJvdyBjcmVhdGVOb3RJbXBsZW1lbnRlZEVycm9yKFwiQnVmZmVyVHlwZSNzcXVhc2hcIik7XG4gIH1cblxuICBwcml2YXRlIF9hcHBseU9wdGlvbnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX29wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgY3JlYXRlTGF6eU9wdGlvbnNFcnJvcih0aGlzKTtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9uczogQnl0ZXNUeXBlT3B0aW9ucyA9IHR5cGVvZiB0aGlzLl9vcHRpb25zID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzLl9vcHRpb25zKCkgOiB0aGlzLl9vcHRpb25zO1xuXG4gICAgY29uc3QgbWF4TGVuZ3RoOiBudW1iZXIgPSBvcHRpb25zLm1heExlbmd0aDtcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcywge21heExlbmd0aH0pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
