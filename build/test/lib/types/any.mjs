export class AnyType {
    constructor() {
    }
    read(_reader, raw) {
        return raw;
    }
    // TODO: Dynamically add with prototype?
    write(writer, value) {
        return writer.writeAny(value);
    }
    testError(value) {
        try {
            JSON.parse(JSON.stringify(value));
            return undefined;
        }
        catch (err) {
            return err;
        }
    }
    test(_value) {
        return true;
    }
    equals(val1, val2) {
        // TODO: From arg
        return val1 === val2;
    }
    clone(val) {
        return JSON.parse(JSON.stringify(val));
    }
}
