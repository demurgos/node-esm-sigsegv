/**
 * @module kryo/writers/json-stream
 */
export class JsonStreamWriter {
    constructor(stream) {
        this.stream = stream;
    }
    writeAny(value) {
        return this.stream.write(JSON.stringify(value));
    }
    writeBoolean(value) {
        return this.stream.write(value ? "true" : "false");
    }
    writeBytes(value) {
        const result = new Array(value.length);
        const len = value.length;
        for (let i = 0; i < len; i++) {
            result[i] = (value[i] < 16 ? "0" : "") + value[i].toString(16);
        }
        return this.writeString(result.join(""));
    }
    writeDocument(keys, handler) {
        let shouldContinue = true;
        shouldContinue = this.stream.write("{") && shouldContinue;
        let first = true;
        for (const key of keys) {
            if (!first) {
                shouldContinue = this.stream.write(",") && shouldContinue;
            }
            shouldContinue = this.writeString(key) && shouldContinue;
            shouldContinue = this.stream.write(":") && shouldContinue;
            shouldContinue = handler(key, this) && shouldContinue;
            first = false;
        }
        return this.stream.write("}") && shouldContinue;
    }
    writeFloat64(value) {
        if (isNaN(value)) {
            return this.writeString("NaN");
        }
        else if (value === Infinity) {
            return this.writeString("+Infinity");
        }
        else if (value === -Infinity) {
            return this.writeString("-Infinity");
        }
        else if (Object.is(value, -0)) {
            return this.writeString("-0");
        }
        return this.stream.write(value.toString(10));
    }
    writeDate(value) {
        return this.writeString(value.toISOString());
    }
    writeList(size, handler) {
        let shouldContinue = true;
        shouldContinue = this.stream.write("[") && shouldContinue;
        for (let index = 0; index < size; index++) {
            if (index > 0) {
                shouldContinue = this.stream.write(",") && shouldContinue;
            }
            shouldContinue = handler(index, this) && shouldContinue;
        }
        return this.stream.write("]") && shouldContinue;
    }
    writeNull() {
        return this.stream.write("null");
    }
    writeMap(size, keyHandler, valueHandler) {
        let shouldContinue = true;
        shouldContinue = this.stream.write("{") && shouldContinue;
        for (let index = 0; index < size; index++) {
            if (index > 0) {
                shouldContinue = this.stream.write(",") && shouldContinue;
            }
            const chunks = [];
            const subStream = new JsonStreamWriter({
                write(chunk) {
                    chunks.push(chunk);
                    return shouldContinue;
                },
            });
            shouldContinue = keyHandler(index, subStream) && shouldContinue;
            shouldContinue = this.writeString(chunks.join("")) && shouldContinue;
            shouldContinue = this.stream.write(":") && shouldContinue;
            shouldContinue = valueHandler(index, this) && shouldContinue;
        }
        return this.stream.write("}") && shouldContinue;
    }
    writeString(value) {
        return this.stream.write(JSON.stringify(value));
    }
}
