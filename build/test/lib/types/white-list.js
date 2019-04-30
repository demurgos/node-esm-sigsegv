"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
const lazy_properties_1 = require("../_helpers/lazy-properties");
const lazy_options_1 = require("../errors/lazy-options");
const test_error_1 = require("../test-error");
exports.name = "white-list";
class WhiteListType {
    constructor(options) {
        this.name = exports.name;
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazy_properties_1.lazyProperties(this, this._applyOptions, ["itemType", "values"]);
        }
    }
    read(reader, raw) {
        if (this.itemType.read === undefined) {
            throw new incident_1.Incident("NotReadable", { type: this });
        }
        const result = this.itemType.read(reader, raw);
        for (const allowed of this.values) {
            if (this.itemType.equals(result, allowed)) {
                return result;
            }
        }
        throw incident_1.Incident("UnkownVariant", "Unknown variant");
    }
    write(writer, value) {
        if (this.itemType.write !== undefined) {
            return this.itemType.write(writer, value);
        }
        else {
            throw new incident_1.Incident("NotWritable", { type: this });
        }
    }
    testError(val) {
        const error = test_error_1.testError(this.itemType, val);
        if (error !== undefined) {
            return error;
        }
        for (const allowed of this.values) {
            if (this.itemType.equals(val, allowed)) {
                return undefined;
            }
        }
        return incident_1.Incident("UnkownVariant", "Unknown variant");
    }
    test(value) {
        if (!this.itemType.test(value)) {
            return false;
        }
        for (const allowed of this.values) {
            if (this.itemType.equals(value, allowed)) {
                return true;
            }
        }
        return false;
    }
    equals(val1, val2) {
        return this.itemType.equals(val1, val2);
    }
    clone(val) {
        return this.itemType.clone(val);
    }
    diff(oldVal, newVal) {
        return this.itemType.diff(oldVal, newVal);
    }
    patch(oldVal, diff) {
        return this.itemType.patch(oldVal, diff);
    }
    reverseDiff(diff) {
        return this.itemType.reverseDiff(diff);
    }
    squash(diff1, diff2) {
        return this.itemType.squash(diff1, diff2);
    }
    _applyOptions() {
        if (this._options === undefined) {
            throw lazy_options_1.createLazyOptionsError(this);
        }
        const options = typeof this._options === "function" ? this._options() : this._options;
        const itemType = options.itemType;
        const values = options.values;
        Object.assign(this, { itemType, values });
    }
}
exports.WhiteListType = WhiteListType;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdHlwZXMvd2hpdGUtbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFvQztBQUNwQyxpRUFBNkQ7QUFFN0QseURBQWdFO0FBQ2hFLDhDQUEwQztBQUc3QixRQUFBLElBQUksR0FBUyxZQUFZLENBQUM7QUFRdkMsTUFBYSxhQUFhO0lBT3hCLFlBQVksT0FBc0M7UUFOekMsU0FBSSxHQUFTLFlBQUksQ0FBQztRQU96QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLE9BQU8sT0FBTyxLQUFLLFVBQVUsRUFBRTtZQUNqQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdEI7YUFBTTtZQUNMLGdDQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUM7SUFFRCxJQUFJLENBQUksTUFBaUIsRUFBRSxHQUFNO1FBQy9CLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3BDLE1BQU0sSUFBSSxtQkFBUSxDQUFDLGFBQWEsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsTUFBTSxNQUFNLEdBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELEtBQUssTUFBTSxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNqQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRTtnQkFDekMsT0FBTyxNQUFNLENBQUM7YUFDZjtTQUNGO1FBQ0QsTUFBTSxtQkFBUSxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxLQUFLLENBQUksTUFBaUIsRUFBRSxLQUFRO1FBQ2xDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3JDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzNDO2FBQU07WUFDTCxNQUFNLElBQUksbUJBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztTQUNqRDtJQUNILENBQUM7SUFFRCxTQUFTLENBQUMsR0FBTTtRQUNkLE1BQU0sS0FBSyxHQUFzQixzQkFBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0QsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxLQUFLLE1BQU0sT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDakMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEVBQUU7Z0JBQ3RDLE9BQU8sU0FBUyxDQUFDO2FBQ2xCO1NBQ0Y7UUFDRCxPQUFPLG1CQUFRLENBQUMsZUFBZSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFRO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxLQUFLLE1BQU0sT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDakMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUU7Z0JBQ3hDLE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFPLEVBQUUsSUFBTztRQUNyQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQU07UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJLENBQUMsTUFBUyxFQUFFLE1BQVM7UUFDdkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFTLEVBQUUsSUFBc0I7UUFDckMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFzQjtRQUNoQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBdUIsRUFBRSxLQUF1QjtRQUNyRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU8sYUFBYTtRQUNuQixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQy9CLE1BQU0scUNBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEM7UUFDRCxNQUFNLE9BQU8sR0FBNEIsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRS9HLE1BQU0sUUFBUSxHQUE0QixPQUFPLENBQUMsUUFBUSxDQUFDO1FBQzNELE1BQU0sTUFBTSxHQUFRLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFFbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7QUFqR0Qsc0NBaUdDIiwiZmlsZSI6ImxpYi90eXBlcy93aGl0ZS1saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5jaWRlbnQgfSBmcm9tIFwiaW5jaWRlbnRcIjtcbmltcG9ydCB7IGxhenlQcm9wZXJ0aWVzIH0gZnJvbSBcIi4uL19oZWxwZXJzL2xhenktcHJvcGVydGllc1wiO1xuaW1wb3J0IHsgSW9UeXBlLCBMYXp5LCBSZWFkZXIsIFZlcnNpb25lZFR5cGUsIFdyaXRlciB9IGZyb20gXCIuLi9jb3JlXCI7XG5pbXBvcnQgeyBjcmVhdGVMYXp5T3B0aW9uc0Vycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9sYXp5LW9wdGlvbnNcIjtcbmltcG9ydCB7IHRlc3RFcnJvciB9IGZyb20gXCIuLi90ZXN0LWVycm9yXCI7XG5cbmV4cG9ydCB0eXBlIE5hbWUgPSBcIndoaXRlLWxpc3RcIjtcbmV4cG9ydCBjb25zdCBuYW1lOiBOYW1lID0gXCJ3aGl0ZS1saXN0XCI7XG5leHBvcnQgdHlwZSBEaWZmID0gW251bWJlciwgbnVtYmVyXTtcblxuZXhwb3J0IGludGVyZmFjZSBXaGl0ZUxpc3RUeXBlT3B0aW9uczxUPiB7XG4gIGl0ZW1UeXBlOiBWZXJzaW9uZWRUeXBlPGFueSwgYW55PjtcbiAgdmFsdWVzOiBUW107XG59XG5cbmV4cG9ydCBjbGFzcyBXaGl0ZUxpc3RUeXBlPFQ+IGltcGxlbWVudHMgSW9UeXBlPFQ+LCBWZXJzaW9uZWRUeXBlPFQsIERpZmY+IHtcbiAgcmVhZG9ubHkgbmFtZTogTmFtZSA9IG5hbWU7XG4gIHJlYWRvbmx5IGl0ZW1UeXBlITogVmVyc2lvbmVkVHlwZTxhbnksIGFueT47XG4gIHJlYWRvbmx5IHZhbHVlcyE6IFRbXTtcblxuICBwcml2YXRlIF9vcHRpb25zOiBMYXp5PFdoaXRlTGlzdFR5cGVPcHRpb25zPFQ+PjtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBMYXp5PFdoaXRlTGlzdFR5cGVPcHRpb25zPFQ+Pikge1xuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aGlzLl9hcHBseU9wdGlvbnMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGF6eVByb3BlcnRpZXModGhpcywgdGhpcy5fYXBwbHlPcHRpb25zLCBbXCJpdGVtVHlwZVwiLCBcInZhbHVlc1wiXSk7XG4gICAgfVxuICB9XG5cbiAgcmVhZDxSPihyZWFkZXI6IFJlYWRlcjxSPiwgcmF3OiBSKTogVCB7XG4gICAgaWYgKHRoaXMuaXRlbVR5cGUucmVhZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgSW5jaWRlbnQoXCJOb3RSZWFkYWJsZVwiLCB7dHlwZTogdGhpc30pO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQ6IFQgPSB0aGlzLml0ZW1UeXBlLnJlYWQocmVhZGVyLCByYXcpO1xuICAgIGZvciAoY29uc3QgYWxsb3dlZCBvZiB0aGlzLnZhbHVlcykge1xuICAgICAgaWYgKHRoaXMuaXRlbVR5cGUuZXF1YWxzKHJlc3VsdCwgYWxsb3dlZCkpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgSW5jaWRlbnQoXCJVbmtvd25WYXJpYW50XCIsIFwiVW5rbm93biB2YXJpYW50XCIpO1xuICB9XG5cbiAgd3JpdGU8Vz4od3JpdGVyOiBXcml0ZXI8Vz4sIHZhbHVlOiBUKTogVyB7XG4gICAgaWYgKHRoaXMuaXRlbVR5cGUud3JpdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXRlbVR5cGUud3JpdGUod3JpdGVyLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbmNpZGVudChcIk5vdFdyaXRhYmxlXCIsIHt0eXBlOiB0aGlzfSk7XG4gICAgfVxuICB9XG5cbiAgdGVzdEVycm9yKHZhbDogVCk6IEVycm9yIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBlcnJvcjogRXJyb3IgfCB1bmRlZmluZWQgPSB0ZXN0RXJyb3IodGhpcy5pdGVtVHlwZSwgdmFsKTtcbiAgICBpZiAoZXJyb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGVycm9yO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGFsbG93ZWQgb2YgdGhpcy52YWx1ZXMpIHtcbiAgICAgIGlmICh0aGlzLml0ZW1UeXBlLmVxdWFscyh2YWwsIGFsbG93ZWQpKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJbmNpZGVudChcIlVua293blZhcmlhbnRcIiwgXCJVbmtub3duIHZhcmlhbnRcIik7XG4gIH1cblxuICB0ZXN0KHZhbHVlOiBUKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLml0ZW1UeXBlLnRlc3QodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAoY29uc3QgYWxsb3dlZCBvZiB0aGlzLnZhbHVlcykge1xuICAgICAgaWYgKHRoaXMuaXRlbVR5cGUuZXF1YWxzKHZhbHVlLCBhbGxvd2VkKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZXF1YWxzKHZhbDE6IFQsIHZhbDI6IFQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtVHlwZS5lcXVhbHModmFsMSwgdmFsMik7XG4gIH1cblxuICBjbG9uZSh2YWw6IFQpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtVHlwZS5jbG9uZSh2YWwpO1xuICB9XG5cbiAgZGlmZihvbGRWYWw6IFQsIG5ld1ZhbDogVCk6IERpZmYgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLml0ZW1UeXBlLmRpZmYob2xkVmFsLCBuZXdWYWwpO1xuICB9XG5cbiAgcGF0Y2gob2xkVmFsOiBULCBkaWZmOiBEaWZmIHwgdW5kZWZpbmVkKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbVR5cGUucGF0Y2gob2xkVmFsLCBkaWZmKTtcbiAgfVxuXG4gIHJldmVyc2VEaWZmKGRpZmY6IERpZmYgfCB1bmRlZmluZWQpOiBEaWZmIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtVHlwZS5yZXZlcnNlRGlmZihkaWZmKTtcbiAgfVxuXG4gIHNxdWFzaChkaWZmMTogRGlmZiB8IHVuZGVmaW5lZCwgZGlmZjI6IERpZmYgfCB1bmRlZmluZWQpOiBEaWZmIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtVHlwZS5zcXVhc2goZGlmZjEsIGRpZmYyKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FwcGx5T3B0aW9ucygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBjcmVhdGVMYXp5T3B0aW9uc0Vycm9yKHRoaXMpO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zOiBXaGl0ZUxpc3RUeXBlT3B0aW9uczxUPiA9IHR5cGVvZiB0aGlzLl9vcHRpb25zID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzLl9vcHRpb25zKCkgOiB0aGlzLl9vcHRpb25zO1xuXG4gICAgY29uc3QgaXRlbVR5cGU6IFZlcnNpb25lZFR5cGU8YW55LCBhbnk+ID0gb3B0aW9ucy5pdGVtVHlwZTtcbiAgICBjb25zdCB2YWx1ZXM6IFRbXSA9IG9wdGlvbnMudmFsdWVzO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7aXRlbVR5cGUsIHZhbHVlc30pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=