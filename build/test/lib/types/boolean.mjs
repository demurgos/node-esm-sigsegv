import { createInvalidTypeError } from "../errors/invalid-type";
import { readVisitor } from "../readers/read-visitor";
export const name = "boolean";
export class BooleanType {
    constructor() {
        this.name = name;
    }
    // TODO: Dynamically add with prototype?
    read(reader, raw) {
        return reader.readBoolean(raw, readVisitor({
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
            return createInvalidTypeError("boolean", val);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdHlwZXMvYm9vbGVhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHdEQsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFTLFNBQVMsQ0FBQztBQUlwQyxNQUFNLE9BQU8sV0FBVztJQUF4QjtRQUNXLFNBQUksR0FBUyxJQUFJLENBQUM7SUE2RDdCLENBQUM7SUEzREMsd0NBQXdDO0lBQ3hDLElBQUksQ0FBSSxNQUFpQixFQUFFLEdBQU07UUFDL0IsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUM7WUFDekMsV0FBVyxDQUFDLEtBQWM7Z0JBQ3hCLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztTQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELHdDQUF3QztJQUN4QyxLQUFLLENBQUksTUFBaUIsRUFBRSxLQUFjO1FBQ3hDLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsU0FBUyxDQUFDLEdBQVk7UUFDcEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDNUIsT0FBTyxzQkFBc0IsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDL0M7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQWM7UUFDakIsT0FBTyxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUM7SUFDcEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFhLEVBQUUsS0FBYztRQUNsQyxPQUFPLElBQUksS0FBSyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFhLEVBQUUsS0FBYztRQUMvQixPQUFPLElBQUksSUFBSSxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFZO1FBQ2hCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLENBQUMsTUFBZSxFQUFFLE1BQWU7UUFDbkMseURBQXlEO1FBQ3pELE9BQU8sQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksU0FBUyxDQUFDO0lBQzFDLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBZSxFQUFFLElBQXNCO1FBQzNDLE9BQU8sTUFBTSxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBc0I7UUFDaEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQXVCLEVBQUUsS0FBdUI7UUFDckQseURBQXlEO1FBQ3pELE9BQU8sQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDO0lBQ3hDLENBQUM7Q0FDRiIsImZpbGUiOiJsaWIvdHlwZXMvYm9vbGVhbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElvVHlwZSwgT3JkLCBSZWFkZXIsIFZlcnNpb25lZFR5cGUsIFdyaXRlciB9IGZyb20gXCIuLi9jb3JlXCI7XG5pbXBvcnQgeyBjcmVhdGVJbnZhbGlkVHlwZUVycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9pbnZhbGlkLXR5cGVcIjtcbmltcG9ydCB7IHJlYWRWaXNpdG9yIH0gZnJvbSBcIi4uL3JlYWRlcnMvcmVhZC12aXNpdG9yXCI7XG5cbmV4cG9ydCB0eXBlIE5hbWUgPSBcImJvb2xlYW5cIjtcbmV4cG9ydCBjb25zdCBuYW1lOiBOYW1lID0gXCJib29sZWFuXCI7XG5cbmV4cG9ydCB0eXBlIERpZmYgPSBib29sZWFuO1xuXG5leHBvcnQgY2xhc3MgQm9vbGVhblR5cGUgaW1wbGVtZW50cyBJb1R5cGU8Ym9vbGVhbj4sIFZlcnNpb25lZFR5cGU8Ym9vbGVhbiwgRGlmZj4sIE9yZDxib29sZWFuPiB7XG4gIHJlYWRvbmx5IG5hbWU6IE5hbWUgPSBuYW1lO1xuXG4gIC8vIFRPRE86IER5bmFtaWNhbGx5IGFkZCB3aXRoIHByb3RvdHlwZT9cbiAgcmVhZDxSPihyZWFkZXI6IFJlYWRlcjxSPiwgcmF3OiBSKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJlYWRlci5yZWFkQm9vbGVhbihyYXcsIHJlYWRWaXNpdG9yKHtcbiAgICAgIGZyb21Cb29sZWFuKGlucHV0OiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgIH0sXG4gICAgfSkpO1xuICB9XG5cbiAgLy8gVE9ETzogRHluYW1pY2FsbHkgYWRkIHdpdGggcHJvdG90eXBlP1xuICB3cml0ZTxXPih3cml0ZXI6IFdyaXRlcjxXPiwgdmFsdWU6IGJvb2xlYW4pOiBXIHtcbiAgICByZXR1cm4gd3JpdGVyLndyaXRlQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICB0ZXN0RXJyb3IodmFsOiBib29sZWFuKTogRXJyb3IgfCB1bmRlZmluZWQge1xuICAgIGlmICh0eXBlb2YgdmFsICE9PSBcImJvb2xlYW5cIikge1xuICAgICAgcmV0dXJuIGNyZWF0ZUludmFsaWRUeXBlRXJyb3IoXCJib29sZWFuXCIsIHZhbCk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICB0ZXN0KHZhbHVlOiBib29sZWFuKTogdmFsdWUgaXMgYm9vbGVhbiB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG4gIH1cblxuICBlcXVhbHMobGVmdDogYm9vbGVhbiwgcmlnaHQ6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gbGVmdCA9PT0gcmlnaHQ7XG4gIH1cblxuICBsdGUobGVmdDogYm9vbGVhbiwgcmlnaHQ6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gbGVmdCA8PSByaWdodDtcbiAgfVxuXG4gIGNsb25lKHZhbDogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIG9sZFZhbFxuICAgKiBAcGFyYW0gbmV3VmFsXG4gICAqIEByZXR1cm5zIGB0cnVlYCBpZiB0aGVyZSBpcyBhIGRpZmZlcmVuY2UsIGB1bmRlZmluZWRgIG90aGVyd2lzZVxuICAgKi9cbiAgZGlmZihvbGRWYWw6IGJvb2xlYW4sIG5ld1ZhbDogYm9vbGVhbik6IERpZmYgfCB1bmRlZmluZWQge1xuICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpzdHJpY3QtYm9vbGVhbi1leHByZXNzaW9ucyAqL1xuICAgIHJldHVybiAob2xkVmFsICE9PSBuZXdWYWwpIHx8IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHBhdGNoKG9sZFZhbDogYm9vbGVhbiwgZGlmZjogRGlmZiB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBvbGRWYWwgPT09IChkaWZmID09PSB1bmRlZmluZWQpO1xuICB9XG5cbiAgcmV2ZXJzZURpZmYoZGlmZjogRGlmZiB8IHVuZGVmaW5lZCk6IERpZmYgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBkaWZmO1xuICB9XG5cbiAgc3F1YXNoKGRpZmYxOiBEaWZmIHwgdW5kZWZpbmVkLCBkaWZmMjogRGlmZiB8IHVuZGVmaW5lZCk6IERpZmYgfCB1bmRlZmluZWQge1xuICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpzdHJpY3QtYm9vbGVhbi1leHByZXNzaW9ucyAqL1xuICAgIHJldHVybiAoZGlmZjEgIT09IGRpZmYyKSAmJiB1bmRlZmluZWQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
