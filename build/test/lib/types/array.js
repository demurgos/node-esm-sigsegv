"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
const lazy_properties_1 = require("../_helpers/lazy-properties");
const invalid_array_items_1 = require("../errors/invalid-array-items");
const invalid_type_1 = require("../errors/invalid-type");
const lazy_options_1 = require("../errors/lazy-options");
const max_array_length_1 = require("../errors/max-array-length");
const min_array_length_1 = require("../errors/min-array-length");
const read_visitor_1 = require("../readers/read-visitor");
const test_error_1 = require("../test-error");
exports.name = "array";
// tslint:disable-next-line:variable-name
exports.ArrayType = class {
    constructor(options) {
        this.name = exports.name;
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazy_properties_1.lazyProperties(this, this._applyOptions, ["itemType", "minLength", "maxLength"]);
        }
    }
    // TODO: Dynamically add with prototype?
    read(reader, raw) {
        const itemType = this.itemType;
        const minLength = this.minLength;
        const maxLength = this.maxLength;
        return reader.readList(raw, read_visitor_1.readVisitor({
            fromList(input, itemReader) {
                let invalid = undefined;
                const result = [];
                let i = 0;
                for (const rawItem of input) {
                    if (maxLength !== undefined && i === maxLength) {
                        throw max_array_length_1.createMaxArrayLengthError([...input], maxLength);
                    }
                    try {
                        const item = itemType.read(itemReader, rawItem);
                        if (invalid === undefined) {
                            result.push(item);
                        }
                    }
                    catch (err) {
                        if (invalid === undefined) {
                            invalid = new Map();
                        }
                        invalid.set(i, err);
                    }
                    i++;
                }
                if (invalid !== undefined) {
                    throw invalid_array_items_1.createInvalidArrayItemsError(invalid);
                }
                if (minLength !== undefined && i < minLength) {
                    throw min_array_length_1.createMinArrayLengthError([...input], minLength);
                }
                return result;
            },
        }));
    }
    // TODO: Dynamically add with prototype?
    write(writer, value) {
        return writer.writeList(value.length, (index, itemWriter) => {
            if (this.itemType.write === undefined) {
                throw new incident_1.Incident("NotWritable", { type: this.itemType });
            }
            return this.itemType.write(itemWriter, value[index]);
        });
    }
    testError(value) {
        if (!Array.isArray(value)) {
            return invalid_type_1.createInvalidTypeError("array", value);
        }
        if (this.maxLength !== undefined && value.length > this.maxLength) {
            return max_array_length_1.createMaxArrayLengthError(value, this.maxLength);
        }
        if (this.minLength !== undefined && value.length < this.minLength) {
            return min_array_length_1.createMinArrayLengthError(value, this.minLength);
        }
        const invalid = new Map();
        const itemCount = value.length;
        for (let i = 0; i < itemCount; i++) {
            const error = test_error_1.testError(this.itemType, value[i]);
            if (error !== undefined) {
                invalid.set(i, error);
            }
        }
        if (invalid.size !== 0) {
            return invalid_array_items_1.createInvalidArrayItemsError(invalid);
        }
        return undefined;
    }
    test(val) {
        if (!Array.isArray(val)
            || (this.maxLength !== undefined && val.length > this.maxLength)
            || (this.minLength !== undefined && val.length < this.minLength)) {
            return false;
        }
        for (const item of val) {
            if (!this.itemType.test(item)) {
                return false;
            }
        }
        return true;
    }
    equals(val1, val2) {
        if (val2.length !== val1.length) {
            return false;
        }
        for (let i = 0; i < val1.length; i++) {
            if (!this.itemType.equals(val2[i], val1[i])) {
                return false;
            }
        }
        return true;
    }
    clone(val) {
        return val.map((item) => this.itemType.clone(item));
    }
    _applyOptions() {
        if (this._options === undefined) {
            throw lazy_options_1.createLazyOptionsError(this);
        }
        const options = typeof this._options === "function" ? this._options() : this._options;
        const itemType = options.itemType;
        const minLength = options.minLength;
        const maxLength = options.maxLength;
        Object.assign(this, { itemType, minLength, maxLength });
    }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdHlwZXMvYXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBb0M7QUFDcEMsaUVBQTZEO0FBRTdELHVFQUE2RTtBQUM3RSx5REFBZ0U7QUFDaEUseURBQWdFO0FBQ2hFLGlFQUF1RTtBQUN2RSxpRUFBdUU7QUFDdkUsMERBQXNEO0FBQ3RELDhDQUEwQztBQUc3QixRQUFBLElBQUksR0FBUyxPQUFPLENBQUM7QUFnQ2xDLHlDQUF5QztBQUM1QixRQUFBLFNBQVMsR0FBK0I7SUFRbkQsWUFBWSxPQUFxQztRQVB4QyxTQUFJLEdBQVMsWUFBSSxDQUFDO1FBUXpCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksT0FBTyxPQUFPLEtBQUssVUFBVSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjthQUFNO1lBQ0wsZ0NBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztTQUNsRjtJQUNILENBQUM7SUFFRCx3Q0FBd0M7SUFDeEMsSUFBSSxDQUFJLE1BQWlCLEVBQUUsR0FBTTtRQUMvQixNQUFNLFFBQVEsR0FBTSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2xDLE1BQU0sU0FBUyxHQUF1QixJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3JELE1BQU0sU0FBUyxHQUF1QixJQUFJLENBQUMsU0FBUyxDQUFDO1FBRXJELE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsMEJBQVcsQ0FBQztZQUN0QyxRQUFRLENBQUssS0FBbUIsRUFBRSxVQUFzQjtnQkFDdEQsSUFBSSxPQUFPLEdBQW1DLFNBQVMsQ0FBQztnQkFDeEQsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsR0FBVyxDQUFDLENBQUM7Z0JBQ2xCLEtBQUssTUFBTSxPQUFP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LENBQUM7YUFDZDtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQVE7UUFDWixPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFPLEVBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVPLGFBQWE7UUFDbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUMvQixNQUFNLHFDQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsTUFBTSxPQUFPLEdBQTJCLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUU5RyxNQUFNLFFBQVEsR0FBTSxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3JDLE1BQU0sU0FBUyxHQUF1QixPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ3hELE1BQU0sU0FBUyxHQUFXLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFFNUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNGLENBQUMiLCJmaWxlIjoibGliL3R5cGVzL2FycmF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5jaWRlbnQgfSBmcm9tIFwiaW5jaWRlbnRcIjtcbmltcG9ydCB7IGxhenlQcm9wZXJ0aWVzIH0gZnJvbSBcIi4uL19oZWxwZXJzL2xhenktcHJvcGVydGllc1wiO1xuaW1wb3J0IHsgSW9UeXBlLCBMYXp5LCBSZWFkZXIsIFR5cGUsIFdyaXRlciB9IGZyb20gXCIuLi9jb3JlXCI7XG5pbXBvcnQgeyBjcmVhdGVJbnZhbGlkQXJyYXlJdGVtc0Vycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9pbnZhbGlkLWFycmF5LWl0ZW1zXCI7XG5pbXBvcnQgeyBjcmVhdGVJbnZhbGlkVHlwZUVycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9pbnZhbGlkLXR5cGVcIjtcbmltcG9ydCB7IGNyZWF0ZUxhenlPcHRpb25zRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL2xhenktb3B0aW9uc1wiO1xuaW1wb3J0IHsgY3JlYXRlTWF4QXJyYXlMZW5ndGhFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvbWF4LWFycmF5LWxlbmd0aFwiO1xuaW1wb3J0IHsgY3JlYXRlTWluQXJyYXlMZW5ndGhFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvbWluLWFycmF5LWxlbmd0aFwiO1xuaW1wb3J0IHsgcmVhZFZpc2l0b3IgfSBmcm9tIFwiLi4vcmVhZGVycy9yZWFkLXZpc2l0b3JcIjtcbmltcG9ydCB7IHRlc3RFcnJvciB9IGZyb20gXCIuLi90ZXN0LWVycm9yXCI7XG5cbmV4cG9ydCB0eXBlIE5hbWUgPSBcImFycmF5XCI7XG5leHBvcnQgY29uc3QgbmFtZTogTmFtZSA9IFwiYXJyYXlcIjtcbmV4cG9ydCB0eXBlIERpZmYgPSBhbnk7XG5cbi8qKlxuICogVDogSXRlbSB0eXBlXG4gKiBNOiBNZXRhLVR5cGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBcnJheVR5cGVPcHRpb25zPFQsIE0gZXh0ZW5kcyBUeXBlPFQ+ID0gVHlwZTxUPj4ge1xuICBpdGVtVHlwZTogTTtcbiAgbWluTGVuZ3RoPzogbnVtYmVyO1xuICBtYXhMZW5ndGg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBcnJheVR5cGVDb25zdHJ1Y3RvciB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgYXJyYXkgdHlwZSB3aXRoIGZ1bGwgcmVhZC93cml0ZSBzdXBwb3J0XG4gICAqL1xuICBuZXc8VD4ob3B0aW9uczogTGF6eTxBcnJheVR5cGVPcHRpb25zPFQsIElvVHlwZTxUPj4+KTogQXJyYXlJb1R5cGU8VCwgSW9UeXBlPFQ+PjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHNpbXBsZSBhcnJheSB0eXBlXG4gICAqL1xuICBuZXc8VD4ob3B0aW9uczogTGF6eTxBcnJheVR5cGVPcHRpb25zPFQ+Pik6IEFycmF5VHlwZTxUPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBcnJheVR5cGU8VCwgTSBleHRlbmRzIFR5cGU8VD4gPSBUeXBlPFQ+PiBleHRlbmRzIFR5cGU8VFtdPiwgQXJyYXlUeXBlT3B0aW9uczxULCBNPiB7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXJyYXlJb1R5cGU8VCwgTSBleHRlbmRzIElvVHlwZTxUPiA9IElvVHlwZTxUPj4gZXh0ZW5kcyBJb1R5cGU8VFtdPixcbiAgQXJyYXlUeXBlT3B0aW9uczxULCBNPiB7XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lXG5leHBvcnQgY29uc3QgQXJyYXlUeXBlOiBBcnJheVR5cGVDb25zdHJ1Y3RvciA9IDxhbnk+IGNsYXNzPFQsIE0gZXh0ZW5kcyBUeXBlPFQ+ID0gVHlwZTxUPj4ge1xuICByZWFkb25seSBuYW1lOiBOYW1lID0gbmFtZTtcbiAgcmVhZG9ubHkgaXRlbVR5cGUhOiBNO1xuICByZWFkb25seSBtaW5MZW5ndGg/OiBudW1iZXI7XG4gIHJlYWRvbmx5IG1heExlbmd0aCE6IG51bWJlcjtcblxuICBwcml2YXRlIF9vcHRpb25zOiBMYXp5PEFycmF5VHlwZU9wdGlvbnM8VCwgTT4+O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IExhenk8QXJyYXlUeXBlT3B0aW9uczxULCBNPj4pIHtcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5fYXBwbHlPcHRpb25zKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhenlQcm9wZXJ0aWVzKHRoaXMsIHRoaXMuX2FwcGx5T3B0aW9ucywgW1wiaXRlbVR5cGVcIiwgXCJtaW5MZW5ndGhcIiwgXCJtYXhMZW5ndGhcIl0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE86IER5bmFtaWNhbGx5IGFkZCB3aXRoIHByb3RvdHlwZT9cbiAgcmVhZDxSPihyZWFkZXI6IFJlYWRlcjxSPiwgcmF3OiBSKTogVFtdIHtcbiAgICBjb25zdCBpdGVtVHlwZTogTSA9IHRoaXMuaXRlbVR5cGU7XG4gICAgY29uc3QgbWluTGVuZ3RoOiBudW1iZXIgfCB1bmRlZmluZWQgPSB0aGlzLm1pbkxlbmd0aDtcbiAgICBjb25zdCBtYXhMZW5ndGg6IG51bWJlciB8IHVuZGVmaW5lZCA9IHRoaXMubWF4TGVuZ3RoO1xuXG4gICAgcmV0dXJuIHJlYWRlci5yZWFkTGlzdChyYXcsIHJlYWRWaXNpdG9yKHtcbiAgICAgIGZyb21MaXN0PFJJPihpbnB1dDogSXRlcmFibGU8Ukk+LCBpdGVtUmVhZGVyOiBSZWFkZXI8Ukk+KTogVFtdIHtcbiAgICAgICAgbGV0IGludmFsaWQ6IHVuZGVmaW5lZCB8IE1hcDxudW1iZXIsIEVycm9yPiA9IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgcmVzdWx0OiBUW10gPSBbXTtcbiAgICAgICAgbGV0IGk6IG51bWJlciA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgcmF3SXRlbSBvZiBpbnB1dCkge1xuICAgICAgICAgIGlmIChtYXhMZW5ndGggIT09IHVuZGVmaW5lZCAmJiBpID09PSBtYXhMZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZU1heEFycmF5TGVuZ3RoRXJyb3IoWy4uLmlucHV0XSwgbWF4TGVuZ3RoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW06IFQgPSBpdGVtVHlwZS5yZWFkIShpdGVtUmVhZGVyLCByYXdJdGVtKTtcbiAgICAgICAgICAgIGlmIChpbnZhbGlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoaW52YWxpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGludmFsaWQgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnZhbGlkLnNldChpLCBlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGludmFsaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IGNyZWF0ZUludmFsaWRBcnJheUl0ZW1zRXJyb3IoaW52YWxpZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1pbkxlbmd0aCAhPT0gdW5kZWZpbmVkICYmIGkgPCBtaW5MZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBjcmVhdGVNaW5BcnJheUxlbmd0aEVycm9yKFsuLi5pbnB1dF0sIG1pbkxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0sXG4gICAgfSkpO1xuICB9XG5cbiAgLy8gVE9ETzogRHluYW1pY2FsbHkgYWRkIHdpdGggcHJvdG90eXBlP1xuICB3cml0ZTxXPih3cml0ZXI6IFdyaXRlcjxXPiwgdmFsdWU6IFRbXSk6IFcge1xuICAgIHJldHVybiB3cml0ZXIud3JpdGVMaXN0KHZhbHVlLmxlbmd0aCwgPElXPihpbmRleDogbnVtYmVyLCBpdGVtV3JpdGVyOiBXcml0ZXI8SVc+KTogSVcgPT4ge1xuICAgICAgaWYgKHRoaXMuaXRlbVR5cGUud3JpdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgSW5jaWRlbnQoXCJOb3RXcml0YWJsZVwiLCB7dHlwZTogdGhpcy5pdGVtVHlwZX0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuaXRlbVR5cGUud3JpdGUoaXRlbVdyaXRlciwgdmFsdWVbaW5kZXhdKTtcbiAgICB9KTtcbiAgfVxuXG4gIHRlc3RFcnJvcih2YWx1ZTogVFtdKTogRXJyb3IgfCB1bmRlZmluZWQge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjcmVhdGVJbnZhbGlkVHlwZUVycm9yKFwiYXJyYXlcIiwgdmFsdWUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5tYXhMZW5ndGggIT09IHVuZGVmaW5lZCAmJiB2YWx1ZS5sZW5ndGggPiB0aGlzLm1heExlbmd0aCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZU1heEFycmF5TGVuZ3RoRXJyb3IodmFsdWUsIHRoaXMubWF4TGVuZ3RoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubWluTGVuZ3RoICE9PSB1bmRlZmluZWQgJiYgdmFsdWUubGVuZ3RoIDwgdGhpcy5taW5MZW5ndGgpIHtcbiAgICAgIHJldHVybiBjcmVhdGVNaW5BcnJheUxlbmd0aEVycm9yKHZhbHVlLCB0aGlzLm1pbkxlbmd0aCk7XG4gICAgfVxuICAgIGNvbnN0IGludmFsaWQ6IE1hcDxudW1iZXIsIEVycm9yPiA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBpdGVtQ291bnQ6IG51bWJlciA9IHZhbHVlLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgaXRlbUNvdW50OyBpKyspIHtcbiAgICAgIGNvbnN0IGVycm9yOiBFcnJvciB8IHVuZGVmaW5lZCA9IHRlc3RFcnJvcih0aGlzLml0ZW1UeXBlLCB2YWx1ZVtpXSk7XG4gICAgICBpZiAoZXJyb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpbnZhbGlkLnNldChpLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpbnZhbGlkLnNpemUgIT09IDApIHtcbiAgICAgIHJldHVybiBjcmVhdGVJbnZhbGlkQXJyYXlJdGVtc0Vycm9yKGludmFsaWQpO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgdGVzdCh2YWw6IFRbXSk6IHZhbCBpcyBUW10ge1xuICAgIGlmIChcbiAgICAgICFBcnJheS5pc0FycmF5KHZhbClcbiAgICAgIHx8ICh0aGlzLm1heExlbmd0aCAhPT0gdW5kZWZpbmVkICYmIHZhbC5sZW5ndGggPiB0aGlzLm1heExlbmd0aClcbiAgICAgIHx8ICh0aGlzLm1pbkxlbmd0aCAhPT0gdW5kZWZpbmVkICYmIHZhbC5sZW5ndGggPCB0aGlzLm1pbkxlbmd0aClcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHZhbCkge1xuICAgICAgaWYgKCF0aGlzLml0ZW1UeXBlLnRlc3QoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGVxdWFscyh2YWwxOiBUW10sIHZhbDI6IFRbXSk6IGJvb2xlYW4ge1xuICAgIGlmICh2YWwyLmxlbmd0aCAhPT0gdmFsMS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHZhbDEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghdGhpcy5pdGVtVHlwZS5lcXVhbHModmFsMltpXSwgdmFsMVtpXSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNsb25lKHZhbDogVFtdKTogVFtdIHtcbiAgICByZXR1cm4gdmFsLm1hcCgoaXRlbTogVCk6IFQgPT4gdGhpcy5pdGVtVHlwZS5jbG9uZShpdGVtKSk7XG4gIH1cblxuICBwcml2YXRlIF9hcHBseU9wdGlvbnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX29wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgY3JlYXRlTGF6eU9wdGlvbnNFcnJvcih0aGlzKTtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9uczogQXJyYXlUeXBlT3B0aW9uczxULCBNPiA9IHR5cGVvZiB0aGlzLl9vcHRpb25zID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzLl9vcHRpb25zKCkgOiB0aGlzLl9vcHRpb25zO1xuXG4gICAgY29uc3QgaXRlbVR5cGU6IE0gPSBvcHRpb25zLml0ZW1UeXBlO1xuICAgIGNvbnN0IG1pbkxlbmd0aDogbnVtYmVyIHwgdW5kZWZpbmVkID0gb3B0aW9ucy5taW5MZW5ndGg7XG4gICAgY29uc3QgbWF4TGVuZ3RoOiBudW1iZXIgPSBvcHRpb25zLm1heExlbmd0aDtcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcywge2l0ZW1UeXBlLCBtaW5MZW5ndGgsIG1heExlbmd0aH0pO1xuICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
