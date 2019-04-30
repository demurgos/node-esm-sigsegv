/**
 * @module kryo/writers/json
 */
import { JsonValueWriter } from "./json-value";
export class JsonWriter {
    constructor() {
        this.valueWriter = new JsonValueWriter();
    }
    writeAny(value) {
        return JSON.stringify(this.valueWriter.writeAny(value));
    }
    writeBoolean(value) {
        return JSON.stringify(this.valueWriter.writeBoolean(value));
    }
    writeBytes(value) {
        return JSON.stringify(this.valueWriter.writeBytes(value));
    }
    writeDate(value) {
        return JSON.stringify(this.valueWriter.writeDate(value));
    }
    writeDocument(keys, handler) {
        return JSON.stringify(this.valueWriter.writeDocument(keys, handler));
    }
    writeFloat64(value) {
        return JSON.stringify(this.valueWriter.writeFloat64(value));
    }
    writeList(size, handler) {
        return JSON.stringify(this.valueWriter.writeList(size, handler));
    }
    writeMap(size, keyHandler, valueHandler) {
        return JSON.stringify(this.valueWriter.writeMap(size, keyHandler, valueHandler));
    }
    writeNull() {
        return JSON.stringify(this.valueWriter.writeNull());
    }
    writeString(value) {
        return JSON.stringify(this.valueWriter.writeString(value));
    }
}
