/**
 * @module kryo/readers/json
 */
import { JsonValueReader } from "./json-value";
export class JsonReader {
    constructor(trust) {
        this.trustInput = trust;
        this.valueReader = new JsonValueReader(trust);
    }
    readAny(raw, visitor) {
        return this.valueReader.readAny(JSON.parse(raw), visitor);
    }
    readBoolean(raw, visitor) {
        return this.valueReader.readBoolean(JSON.parse(raw), visitor);
    }
    readBytes(raw, visitor) {
        return this.valueReader.readBytes(JSON.parse(raw), visitor);
    }
    readDate(raw, visitor) {
        return this.valueReader.readDate(JSON.parse(raw), visitor);
    }
    readDocument(raw, visitor) {
        return this.valueReader.readDocument(JSON.parse(raw), visitor);
    }
    readFloat64(raw, visitor) {
        return this.valueReader.readFloat64(JSON.parse(raw), visitor);
    }
    readList(raw, visitor) {
        return this.valueReader.readList(JSON.parse(raw), visitor);
    }
    readMap(raw, visitor) {
        return this.valueReader.readMap(JSON.parse(raw), visitor);
    }
    readNull(raw, visitor) {
        return this.valueReader.readNull(JSON.parse(raw), visitor);
    }
    readString(raw, visitor) {
        return this.valueReader.readString(JSON.parse(raw), visitor);
    }
}
