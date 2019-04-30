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
