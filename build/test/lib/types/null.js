"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invalid_type_1 = require("../errors/invalid-type");
const read_visitor_1 = require("../readers/read-visitor");
exports.name = "null";
class NullType {
    constructor() {
        this.name = exports.name;
    }
    read(reader, raw) {
        return reader.readNull(raw, read_visitor_1.readVisitor({
            fromNull: () => null,
        }));
    }
    // TODO: Dynamically add with prototype?
    write(writer, _) {
        return writer.writeNull();
    }
    testError(val) {
        if (val !== null) {
            return invalid_type_1.createInvalidTypeError("null", val);
        }
        return undefined;
    }
    test(val) {
        return val === null;
    }
    equals(val1, val2) {
        return val1 === val2;
    }
    clone(val) {
        return val;
    }
    /**
     * @param _oldVal
     * @param _newVal
     * @returns `true` if there is a difference, `undefined` otherwise
     */
    diff(_oldVal, _newVal) {
        return;
    }
    patch(_oldVal, _diff) {
        return null;
    }
    reverseDiff(_diff) {
        return;
    }
    squash(_diff1, _diff2) {
        return;
    }
}
exports.NullType = NullType;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdHlwZXMvbnVsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUFnRTtBQUNoRSwwREFBc0Q7QUFHekMsUUFBQSxJQUFJLEdBQVMsTUFBTSxDQUFDO0FBRWpDLE1BQWEsUUFBUTtJQUFyQjtRQUNXLFNBQUksR0FBUyxZQUFJLENBQUM7SUFvRDdCLENBQUM7SUFsREMsSUFBSSxDQUFJLE1BQWlCLEVBQUUsR0FBTTtRQUMvQixPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLDBCQUFXLENBQUM7WUFDdEMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUk7U0FDckIsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQsd0NBQXdDO0lBQ3hDLEtBQUssQ0FBSSxNQUFpQixFQUFFLENBQU87UUFDakMsT0FBTyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFNBQVMsQ0FBQyxHQUFTO1FBQ2pCLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtZQUNoQixPQUFPLHFDQUFzQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFJLENBQUMsR0FBUztRQUNaLE9BQU8sR0FBRyxLQUFLLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVUsRUFBRSxJQUFVO1FBQzNCLE9BQU8sSUFBSSxLQUFLLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQVM7UUFDYixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsSUFBSSxDQUFDLE9BQWEsRUFBRSxPQUFhO1FBQy9CLE9BQU87SUFDVCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQWEsRUFBRSxLQUFnQjtRQUNuQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBZ0I7UUFDMUIsT0FBTztJQUNULENBQUM7SUFFRCxNQUFNLENBQUMsTUFBaUIsRUFBRSxNQUFpQjtRQUN6QyxPQUFPO0lBQ1QsQ0FBQztDQUNGO0FBckRELDRCQXFEQyIsImZpbGUiOiJsaWIvdHlwZXMvbnVsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElvVHlwZSwgUmVhZGVyLCBWZXJzaW9uZWRUeXBlLCBXcml0ZXIgfSBmcm9tIFwiLi4vY29yZVwiO1xuaW1wb3J0IHsgY3JlYXRlSW52YWxpZFR5cGVFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvaW52YWxpZC10eXBlXCI7XG5pbXBvcnQgeyByZWFkVmlzaXRvciB9IGZyb20gXCIuLi9yZWFkZXJzL3JlYWQtdmlzaXRvclwiO1xuXG5leHBvcnQgdHlwZSBOYW1lID0gXCJudWxsXCI7XG5leHBvcnQgY29uc3QgbmFtZTogTmFtZSA9IFwibnVsbFwiO1xuXG5leHBvcnQgY2xhc3MgTnVsbFR5cGUgaW1wbGVtZW50cyBJb1R5cGU8bnVsbD4sIFZlcnNpb25lZFR5cGU8bnVsbCwgdW5kZWZpbmVkPiB7XG4gIHJlYWRvbmx5IG5hbWU6IE5hbWUgPSBuYW1lO1xuXG4gIHJlYWQ8Uj4ocmVhZGVyOiBSZWFkZXI8Uj4sIHJhdzogUik6IG51bGwge1xuICAgIHJldHVybiByZWFkZXIucmVhZE51bGwocmF3LCByZWFkVmlzaXRvcih7XG4gICAgICBmcm9tTnVsbDogKCkgPT4gbnVsbCxcbiAgICB9KSk7XG4gIH1cblxuICAvLyBUT0RPOiBEeW5hbWljYWxseSBhZGQgd2l0aCBwcm90b3R5cGU/XG4gIHdyaXRlPFc+KHdyaXRlcjogV3JpdGVyPFc+LCBfOiBudWxsKTogVyB7XG4gICAgcmV0dXJuIHdyaXRlci53cml0ZU51bGwoKTtcbiAgfVxuXG4gIHRlc3RFcnJvcih2YWw6IG51bGwpOiBFcnJvciB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHZhbCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUludmFsaWRUeXBlRXJyb3IoXCJudWxsXCIsIHZhbCk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICB0ZXN0KHZhbDogbnVsbCk6IHZhbCBpcyBudWxsIHtcbiAgICByZXR1cm4gdmFsID09PSBudWxsO1xuICB9XG5cbiAgZXF1YWxzKHZhbDE6IG51bGwsIHZhbDI6IG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmFsMSA9PT0gdmFsMjtcbiAgfVxuXG4gIGNsb25lKHZhbDogbnVsbCk6IG51bGwge1xuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIF9vbGRWYWxcbiAgICogQHBhcmFtIF9uZXdWYWxcbiAgICogQHJldHVybnMgYHRydWVgIGlmIHRoZXJlIGlzIGEgZGlmZmVyZW5jZSwgYHVuZGVmaW5lZGAgb3RoZXJ3aXNlXG4gICAqL1xuICBkaWZmKF9vbGRWYWw6IG51bGwsIF9uZXdWYWw6IG51bGwpOiB1bmRlZmluZWQge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHBhdGNoKF9vbGRWYWw6IG51bGwsIF9kaWZmOiB1bmRlZmluZWQpOiBudWxsIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldmVyc2VEaWZmKF9kaWZmOiB1bmRlZmluZWQpOiB1bmRlZmluZWQge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHNxdWFzaChfZGlmZjE6IHVuZGVmaW5lZCwgX2RpZmYyOiB1bmRlZmluZWQpOiB1bmRlZmluZWQge1xuICAgIHJldHVybjtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
