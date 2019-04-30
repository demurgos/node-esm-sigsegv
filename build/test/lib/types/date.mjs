import { createInvalidTimestampError } from "../errors/invalid-timestamp";
import { createInvalidTypeError } from "../errors/invalid-type";
import { readVisitor } from "../readers/read-visitor";
export const name = "date";
export class DateType {
    constructor() {
        this.name = name;
    }
    // TODO: Dynamically add with prototype?
    read(reader, raw) {
        return reader.readDate(raw, readVisitor({
            fromDate: (input) => {
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
        return writer.writeDate(value);
    }
    testError(val) {
        if (!(val instanceof Date)) {
            return createInvalidTypeError("Date", val);
        }
        const time = val.getTime();
        if (isNaN(time) || time > Number.MAX_SAFE_INTEGER || time < Number.MIN_SAFE_INTEGER) {
            return createInvalidTimestampError(val);
        }
        return undefined;
    }
    test(val) {
        return this.testError(val) === undefined;
    }
    equals(left, right) {
        return left.getTime() === right.getTime();
    }
    lte(left, right) {
        return left.getTime() <= right.getTime();
    }
    clone(val) {
        return new Date(val.getTime());
    }
    diff(oldVal, newVal) {
        // tslint:disable-next-line:strict-boolean-expressions
        return newVal.getTime() - oldVal.getTime() || undefined;
    }
    patch(oldVal, diff) {
        // tslint:disable-next-line:strict-boolean-expressions
        return new Date(oldVal.getTime() + (diff || 0));
    }
    reverseDiff(diff) {
        // tslint:disable-next-line:strict-boolean-expressions
        return diff && -diff;
    }
    squash(diff1, diff2) {
        if (diff1 === undefined) {
            return diff2;
        }
        else if (diff2 === undefined) {
            return diff1;
        }
        return diff2 === -diff1 ? undefined : diff1 + diff2;
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdHlwZXMvZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHdEQsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFTLE1BQU0sQ0FBQztBQUdqQyxNQUFNLE9BQU8sUUFBUTtJQUFyQjtRQUNXLFNBQUksR0FBUyxJQUFJLENBQUM7SUF1RTdCLENBQUM7SUFyRUMsd0NBQXdDO0lBQ3hDLElBQUksQ0FBSSxNQUFpQixFQUFFLEdBQU07UUFDL0IsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUM7WUFDdEMsUUFBUSxFQUFFLENBQUMsS0FBVyxFQUFRLEVBQUU7Z0JBQzlCLE1BQU0sS0FBSyxHQUFzQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2RCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQ3ZCLE1BQU0sS0FBSyxDQUFDO2lCQUNiO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztTQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELHdDQUF3QztJQUN4QyxLQUFLLENBQUksTUFBaUIsRUFBRSxLQUFXO1FBQ3JDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsU0FBUyxDQUFDLEdBQVM7UUFDakIsSUFBSSxDQUFDLENBQUMsR0FBRyxZQUFZLElBQUksQ0FBQyxFQUFFO1lBQzFCLE9BQU8sc0JBQXNCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsTUFBTSxJQUFJLEdBQVcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25DLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsZ0JBQWdCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtZQUNuRixPQUFPLDJCQUEyQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksQ0FBQyxHQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVUsRUFBRSxLQUFXO1FBQzVCLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVUsRUFBRSxLQUFXO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQVM7UUFDYixPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLENBQUMsTUFBWSxFQUFFLE1BQVk7UUFDN0Isc0RBQXNEO1FBQ3RELE9BQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxTQUFTLENBQUM7SUFDMUQsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFZLEVBQUUsSUFBc0I7UUFDeEMsc0RBQXNEO1FBQ3RELE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFzQjtRQUNoQyxzREFBc0Q7UUFDdEQsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUF1QixFQUFFLEtBQXVCO1FBQ3JELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUN2QixPQUFPLEtBQUssQ0FBQztTQUNkO2FBQU0sSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQzlCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3RELENBQUM7Q0FDRiIsImZpbGUiOiJsaWIvdHlwZXMvZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElvVHlwZSwgT3JkLCBSZWFkZXIsIFZlcnNpb25lZFR5cGUsIFdyaXRlciB9IGZyb20gXCIuLi9jb3JlXCI7XG5pbXBvcnQgeyBjcmVhdGVJbnZhbGlkVGltZXN0YW1wRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL2ludmFsaWQtdGltZXN0YW1wXCI7XG5pbXBvcnQgeyBjcmVhdGVJbnZhbGlkVHlwZUVycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9pbnZhbGlkLXR5cGVcIjtcbmltcG9ydCB7IHJlYWRWaXNpdG9yIH0gZnJvbSBcIi4uL3JlYWRlcnMvcmVhZC12aXNpdG9yXCI7XG5cbmV4cG9ydCB0eXBlIE5hbWUgPSBcImRhdGVcIjtcbmV4cG9ydCBjb25zdCBuYW1lOiBOYW1lID0gXCJkYXRlXCI7XG5leHBvcnQgdHlwZSBEaWZmID0gbnVtYmVyO1xuXG5leHBvcnQgY2xhc3MgRGF0ZVR5cGUgaW1wbGVtZW50cyBJb1R5cGU8RGF0ZT4sIFZlcnNpb25lZFR5cGU8RGF0ZSwgRGlmZj4sIE9yZDxEYXRlPiB7XG4gIHJlYWRvbmx5IG5hbWU6IE5hbWUgPSBuYW1lO1xuXG4gIC8vIFRPRE86IER5bmFtaWNhbGx5IGFkZCB3aXRoIHByb3RvdHlwZT9cbiAgcmVhZDxSPihyZWFkZXI6IFJlYWRlcjxSPiwgcmF3OiBSKTogRGF0ZSB7XG4gICAgcmV0dXJuIHJlYWRlci5yZWFkRGF0ZShyYXcsIHJlYWRWaXNpdG9yKHtcbiAgICAgIGZyb21EYXRlOiAoaW5wdXQ6IERhdGUpOiBEYXRlID0+IHtcbiAgICAgICAgY29uc3QgZXJyb3I6IEVycm9yIHwgdW5kZWZpbmVkID0gdGhpcy50ZXN0RXJyb3IoaW5wdXQpO1xuICAgICAgICBpZiAoZXJyb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgIH0sXG4gICAgfSkpO1xuICB9XG5cbiAgLy8gVE9ETzogRHluYW1pY2FsbHkgYWRkIHdpdGggcHJvdG90eXBlP1xuICB3cml0ZTxXPih3cml0ZXI6IFdyaXRlcjxXPiwgdmFsdWU6IERhdGUpOiBXIHtcbiAgICByZXR1cm4gd3JpdGVyLndyaXRlRGF0ZSh2YWx1ZSk7XG4gIH1cblxuICB0ZXN0RXJyb3IodmFsOiBEYXRlKTogRXJyb3IgfCB1bmRlZmluZWQge1xuICAgIGlmICghKHZhbCBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICByZXR1cm4gY3JlYXRlSW52YWxpZFR5cGVFcnJvcihcIkRhdGVcIiwgdmFsKTtcbiAgICB9XG4gICAgY29uc3QgdGltZTogbnVtYmVyID0gdmFsLmdldFRpbWUoKTtcbiAgICBpZiAoaXNOYU4odGltZSkgfHwgdGltZSA+IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIHx8IHRpbWUgPCBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUikge1xuICAgICAgcmV0dXJuIGNyZWF0ZUludmFsaWRUaW1lc3RhbXBFcnJvcih2YWwpO1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICB0ZXN0KHZhbDogRGF0ZSk6IHZhbCBpcyBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy50ZXN0RXJyb3IodmFsKSA9PT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZXF1YWxzKGxlZnQ6IERhdGUsIHJpZ2h0OiBEYXRlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGxlZnQuZ2V0VGltZSgpID09PSByaWdodC5nZXRUaW1lKCk7XG4gIH1cblxuICBsdGUobGVmdDogRGF0ZSwgcmlnaHQ6IERhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbGVmdC5nZXRUaW1lKCkgPD0gcmlnaHQuZ2V0VGltZSgpO1xuICB9XG5cbiAgY2xvbmUodmFsOiBEYXRlKTogRGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHZhbC5nZXRUaW1lKCkpO1xuICB9XG5cbiAgZGlmZihvbGRWYWw6IERhdGUsIG5ld1ZhbDogRGF0ZSk6IERpZmYgfCB1bmRlZmluZWQge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpzdHJpY3QtYm9vbGVhbi1leHByZXNzaW9uc1xuICAgIHJldHVybiBuZXdWYWwuZ2V0VGltZSgpIC0gb2xkVmFsLmdldFRpbWUoKSB8fCB1bmRlZmluZWQ7XG4gIH1cblxuICBwYXRjaChvbGRWYWw6IERhdGUsIGRpZmY6IERpZmYgfCB1bmRlZmluZWQpOiBEYXRlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6c3RyaWN0LWJvb2xlYW4tZXhwcmVzc2lvbnNcbiAgICByZXR1cm4gbmV3IERhdGUob2xkVmFsLmdldFRpbWUoKSArIChkaWZmIHx8IDApKTtcbiAgfVxuXG4gIHJldmVyc2VEaWZmKGRpZmY6IERpZmYgfCB1bmRlZmluZWQpOiBEaWZmIHwgdW5kZWZpbmVkIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6c3RyaWN0LWJvb2xlYW4tZXhwcmVzc2lvbnNcbiAgICByZXR1cm4gZGlmZiAmJiAtZGlmZjtcbiAgfVxuXG4gIHNxdWFzaChkaWZmMTogRGlmZiB8IHVuZGVmaW5lZCwgZGlmZjI6IERpZmYgfCB1bmRlZmluZWQpOiBEaWZmIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoZGlmZjEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGRpZmYyO1xuICAgIH0gZWxzZSBpZiAoZGlmZjIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGRpZmYxO1xuICAgIH1cbiAgICByZXR1cm4gZGlmZjIgPT09IC1kaWZmMSA/IHVuZGVmaW5lZCA6IGRpZmYxICsgZGlmZjI7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==