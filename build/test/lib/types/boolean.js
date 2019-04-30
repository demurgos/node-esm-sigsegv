"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invalid_type_1 = require("../errors/invalid-type");
const read_visitor_1 = require("../readers/read-visitor");
exports.name = "boolean";
class BooleanType {
    constructor() {
        this.name = exports.name;
    }
    // TODO: Dynamically add with prototype?
    read(reader, raw) {
        return reader.readBoolean(raw, read_visitor_1.readVisitor({
            fromBoolean(input) {
                return input;
            },
        }));
    }
    // TODO: Dynamically add with prototype?
    write(writer, value) {
        return writer.writeBoolean(value);
    }
    testError(val) {
        if (typeof val !== "boolean") {
            return invalid_type_1.createInvalidTypeError("boolean", val);
        }
        return undefined;
    }
    test(value) {
        return typeof value === "boolean";
    }
    equals(left, right) {
        return left === right;
    }
    lte(left, right) {
        return left <= right;
    }
    clone(val) {
        return val;
    }
    /**
     * @param oldVal
     * @param newVal
     * @returns `true` if there is a difference, `undefined` otherwise
     */
    diff(oldVal, newVal) {
        /* tslint:disable-next-line:strict-boolean-expressions */
        return (oldVal !== newVal) || undefined;
    }
    patch(oldVal, diff) {
        return oldVal === (diff === undefined);
    }
    reverseDiff(diff) {
        return diff;
    }
    squash(diff1, diff2) {
        /* tslint:disable-next-line:strict-boolean-expressions */
        return (diff1 !== diff2) && undefined;
    }
}
exports.BooleanType = BooleanType;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdHlwZXMvYm9vbGVhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUFnRTtBQUNoRSwwREFBc0Q7QUFHekMsUUFBQSxJQUFJLEdBQVMsU0FBUyxDQUFDO0FBSXBDLE1BQWEsV0FBVztJQUF4QjtRQUNXLFNBQUksR0FBUyxZQUFJLENBQUM7SUE2RDdCLENBQUM7SUEzREMsd0NBQXdDO0lBQ3hDLElBQUksQ0FBSSxNQUFpQixFQUFFLEdBQU07UUFDL0IsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSwwQkFBVyxDQUFDO1lBQ3pDLFdBQVcsQ0FBQyxLQUFjO2dCQUN4QixPQUFPLEtBQUssQ0FBQztZQUNmLENBQUM7U0FDRixDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCx3Q0FBd0M7SUFDeEMsS0FBSyxDQUFJLE1BQWlCLEVBQUUsS0FBYztRQUN4QyxPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELFNBQVMsQ0FBQyxHQUFZO1FBQ3BCLElBQUksT0FBTyxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQzVCLE9BQU8scUNBQXNCLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFjO1FBQ2pCLE9BQU8sT0FBTyxLQUFLLEtBQUssU0FBUyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBYSxFQUFFLEtBQWM7UUFDbEMsT0FBTyxJQUFJLEtBQUssS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBYSxFQUFFLEtBQWM7UUFDL0IsT0FBTyxJQUFJLElBQUksS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBWTtRQUNoQixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsSUFBSSxDQUFDLE1BQWUsRUFBRSxNQUFlO1FBQ25DLHlEQUF5RDtRQUN6RCxPQUFPLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQWUsRUFBRSxJQUFzQjtRQUMzQyxPQUFPLE1BQU0sS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQXNCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUF1QixFQUFFLEtBQXVCO1FBQ3JELHlEQUF5RDtRQUN6RCxPQUFPLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxJQUFJLFNBQVMsQ0FBQztJQUN4QyxDQUFDO0NBQ0Y7QUE5REQsa0NBOERDIiwiZmlsZSI6ImxpYi90eXBlcy9ib29sZWFuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW9UeXBlLCBPcmQsIFJlYWRlciwgVmVyc2lvbmVkVHlwZSwgV3JpdGVyIH0gZnJvbSBcIi4uL2NvcmVcIjtcbmltcG9ydCB7IGNyZWF0ZUludmFsaWRUeXBlRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL2ludmFsaWQtdHlwZVwiO1xuaW1wb3J0IHsgcmVhZFZpc2l0b3IgfSBmcm9tIFwiLi4vcmVhZGVycy9yZWFkLXZpc2l0b3JcIjtcblxuZXhwb3J0IHR5cGUgTmFtZSA9IFwiYm9vbGVhblwiO1xuZXhwb3J0IGNvbnN0IG5hbWU6IE5hbWUgPSBcImJvb2xlYW5cIjtcblxuZXhwb3J0IHR5cGUgRGlmZiA9IGJvb2xlYW47XG5cbmV4cG9ydCBjbGFzcyBCb29sZWFuVHlwZSBpbXBsZW1lbnRzIElvVHlwZTxib29sZWFuPiwgVmVyc2lvbmVkVHlwZTxib29sZWFuLCBEaWZmPiwgT3JkPGJvb2xlYW4+IHtcbiAgcmVhZG9ubHkgbmFtZTogTmFtZSA9IG5hbWU7XG5cbiAgLy8gVE9ETzogRHluYW1pY2FsbHkgYWRkIHdpdGggcHJvdG90eXBlP1xuICByZWFkPFI+KHJlYWRlcjogUmVhZGVyPFI+LCByYXc6IFIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcmVhZGVyLnJlYWRCb29sZWFuKHJhdywgcmVhZFZpc2l0b3Ioe1xuICAgICAgZnJvbUJvb2xlYW4oaW5wdXQ6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgICAgfSxcbiAgICB9KSk7XG4gIH1cblxuICAvLyBUT0RPOiBEeW5hbWljYWxseSBhZGQgd2l0aCBwcm90b3R5cGU/XG4gIHdyaXRlPFc+KHdyaXRlcjogV3JpdGVyPFc+LCB2YWx1ZTogYm9vbGVhbik6IFcge1xuICAgIHJldHVybiB3cml0ZXIud3JpdGVCb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIHRlc3RFcnJvcih2YWw6IGJvb2xlYW4pOiBFcnJvciB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHR5cGVvZiB2YWwgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgICByZXR1cm4gY3JlYXRlSW52YWxpZFR5cGVFcnJvcihcImJvb2xlYW5cIiwgdmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHRlc3QodmFsdWU6IGJvb2xlYW4pOiB2YWx1ZSBpcyBib29sZWFuIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbiAgfVxuXG4gIGVxdWFscyhsZWZ0OiBib29sZWFuLCByaWdodDogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsZWZ0ID09PSByaWdodDtcbiAgfVxuXG4gIGx0ZShsZWZ0OiBib29sZWFuLCByaWdodDogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsZWZ0IDw9IHJpZ2h0O1xuICB9XG5cbiAgY2xvbmUodmFsOiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gb2xkVmFsXG4gICAqIEBwYXJhbSBuZXdWYWxcbiAgICogQHJldHVybnMgYHRydWVgIGlmIHRoZXJlIGlzIGEgZGlmZmVyZW5jZSwgYHVuZGVmaW5lZGAgb3RoZXJ3aXNlXG4gICAqL1xuICBkaWZmKG9sZFZhbDogYm9vbGVhbiwgbmV3VmFsOiBib29sZWFuKTogRGlmZiB8IHVuZGVmaW5lZCB7XG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnN0cmljdC1ib29sZWFuLWV4cHJlc3Npb25zICovXG4gICAgcmV0dXJuIChvbGRWYWwgIT09IG5ld1ZhbCkgfHwgdW5kZWZpbmVkO1xuICB9XG5cbiAgcGF0Y2gob2xkVmFsOiBib29sZWFuLCBkaWZmOiBEaWZmIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG9sZFZhbCA9PT0gKGRpZmYgPT09IHVuZGVmaW5lZCk7XG4gIH1cblxuICByZXZlcnNlRGlmZihkaWZmOiBEaWZmIHwgdW5kZWZpbmVkKTogRGlmZiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGRpZmY7XG4gIH1cblxuICBzcXVhc2goZGlmZjE6IERpZmYgfCB1bmRlZmluZWQsIGRpZmYyOiBEaWZmIHwgdW5kZWZpbmVkKTogRGlmZiB8IHVuZGVmaW5lZCB7XG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnN0cmljdC1ib29sZWFuLWV4cHJlc3Npb25zICovXG4gICAgcmV0dXJuIChkaWZmMSAhPT0gZGlmZjIpICYmIHVuZGVmaW5lZDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
