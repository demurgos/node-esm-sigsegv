import { createInvalidTypeError } from "../errors/invalid-type";
import { readVisitor } from "../readers/read-visitor";
export const name = "null";
export class NullType {
    constructor() {
        this.name = name;
    }
    read(reader, raw) {
        return reader.readNull(raw, readVisitor({
            fromNull: () => null,
        }));
    }
    // TODO: Dynamically add with prototype?
    write(writer, _) {
        return writer.writeNull();
    }
    testError(val) {
        if (val !== null) {
            return createInvalidTypeError("null", val);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdHlwZXMvbnVsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHdEQsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFTLE1BQU0sQ0FBQztBQUVqQyxNQUFNLE9BQU8sUUFBUTtJQUFyQjtRQUNXLFNBQUksR0FBUyxJQUFJLENBQUM7SUFvRDdCLENBQUM7SUFsREMsSUFBSSxDQUFJLE1BQWlCLEVBQUUsR0FBTTtRQUMvQixPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQztZQUN0QyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSTtTQUNyQixDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCx3Q0FBd0M7SUFDeEMsS0FBSyxDQUFJLE1BQWlCLEVBQUUsQ0FBTztRQUNqQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsU0FBUyxDQUFDLEdBQVM7UUFDakIsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQ2hCLE9BQU8sc0JBQXNCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksQ0FBQyxHQUFTO1FBQ1osT0FBTyxHQUFHLEtBQUssSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBVSxFQUFFLElBQVU7UUFDM0IsT0FBTyxJQUFJLEtBQUssSUFBSSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBUztRQUNiLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLENBQUMsT0FBYSxFQUFFLE9BQWE7UUFDL0IsT0FBTztJQUNULENBQUM7SUFFRCxLQUFLLENBQUMsT0FBYSxFQUFFLEtBQWdCO1FBQ25DLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFnQjtRQUMxQixPQUFPO0lBQ1QsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFpQixFQUFFLE1BQWlCO1FBQ3pDLE9BQU87SUFDVCxDQUFDO0NBQ0YiLCJmaWxlIjoibGliL3R5cGVzL251bGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJb1R5cGUsIFJlYWRlciwgVmVyc2lvbmVkVHlwZSwgV3JpdGVyIH0gZnJvbSBcIi4uL2NvcmVcIjtcbmltcG9ydCB7IGNyZWF0ZUludmFsaWRUeXBlRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL2ludmFsaWQtdHlwZVwiO1xuaW1wb3J0IHsgcmVhZFZpc2l0b3IgfSBmcm9tIFwiLi4vcmVhZGVycy9yZWFkLXZpc2l0b3JcIjtcblxuZXhwb3J0IHR5cGUgTmFtZSA9IFwibnVsbFwiO1xuZXhwb3J0IGNvbnN0IG5hbWU6IE5hbWUgPSBcIm51bGxcIjtcblxuZXhwb3J0IGNsYXNzIE51bGxUeXBlIGltcGxlbWVudHMgSW9UeXBlPG51bGw+LCBWZXJzaW9uZWRUeXBlPG51bGwsIHVuZGVmaW5lZD4ge1xuICByZWFkb25seSBuYW1lOiBOYW1lID0gbmFtZTtcblxuICByZWFkPFI+KHJlYWRlcjogUmVhZGVyPFI+LCByYXc6IFIpOiBudWxsIHtcbiAgICByZXR1cm4gcmVhZGVyLnJlYWROdWxsKHJhdywgcmVhZFZpc2l0b3Ioe1xuICAgICAgZnJvbU51bGw6ICgpID0+IG51bGwsXG4gICAgfSkpO1xuICB9XG5cbiAgLy8gVE9ETzogRHluYW1pY2FsbHkgYWRkIHdpdGggcHJvdG90eXBlP1xuICB3cml0ZTxXPih3cml0ZXI6IFdyaXRlcjxXPiwgXzogbnVsbCk6IFcge1xuICAgIHJldHVybiB3cml0ZXIud3JpdGVOdWxsKCk7XG4gIH1cblxuICB0ZXN0RXJyb3IodmFsOiBudWxsKTogRXJyb3IgfCB1bmRlZmluZWQge1xuICAgIGlmICh2YWwgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiBjcmVhdGVJbnZhbGlkVHlwZUVycm9yKFwibnVsbFwiLCB2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgdGVzdCh2YWw6IG51bGwpOiB2YWwgaXMgbnVsbCB7XG4gICAgcmV0dXJuIHZhbCA9PT0gbnVsbDtcbiAgfVxuXG4gIGVxdWFscyh2YWwxOiBudWxsLCB2YWwyOiBudWxsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZhbDEgPT09IHZhbDI7XG4gIH1cblxuICBjbG9uZSh2YWw6IG51bGwpOiBudWxsIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBfb2xkVmFsXG4gICAqIEBwYXJhbSBfbmV3VmFsXG4gICAqIEByZXR1cm5zIGB0cnVlYCBpZiB0aGVyZSBpcyBhIGRpZmZlcmVuY2UsIGB1bmRlZmluZWRgIG90aGVyd2lzZVxuICAgKi9cbiAgZGlmZihfb2xkVmFsOiBudWxsLCBfbmV3VmFsOiBudWxsKTogdW5kZWZpbmVkIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBwYXRjaChfb2xkVmFsOiBudWxsLCBfZGlmZjogdW5kZWZpbmVkKTogbnVsbCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXZlcnNlRGlmZihfZGlmZjogdW5kZWZpbmVkKTogdW5kZWZpbmVkIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBzcXVhc2goX2RpZmYxOiB1bmRlZmluZWQsIF9kaWZmMjogdW5kZWZpbmVkKTogdW5kZWZpbmVkIHtcbiAgICByZXR1cm47XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
