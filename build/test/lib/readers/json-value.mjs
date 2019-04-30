/**
 * @module kryo/readers/json-value
 */
import { createInvalidTypeError } from "../errors/invalid-type";
export class JsonValueReader {
    constructor(trust) {
        this.trustInput = trust;
    }
    readAny(raw, visitor) {
        switch (typeof raw) {
            case "boolean":
                return visitor.fromBoolean(raw);
            case "string":
                return visitor.fromString(raw);
            case "object":
                return raw === null
                    ? visitor.fromNull()
                    : visitor.fromMap(new Map(Object.keys(raw).map(k => [k, raw[k]])), this, this);
            default:
                throw createInvalidTypeError("array | boolean | null | object | string", raw);
        }
    }
    readBoolean(raw, visitor) {
        if (typeof raw !== "boolean") {
            throw createInvalidTypeError("boolean", raw);
        }
        return visitor.fromBoolean(raw);
    }
    readBytes(raw, visitor) {
        if (typeof raw !== "string") {
            throw createInvalidTypeError("string", raw);
        }
        else if (!/^(?:[0-9a-f]{2})*$/.test(raw)) {
            throw createInvalidTypeError("lowerCaseHexEvenLengthString", raw);
        }
        let result;
        const len = raw.length / 2;
        result = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            result[i] = parseInt(raw.substr(2 * i, 2), 16);
        }
        return visitor.fromBytes(result);
    }
    readDate(raw, visitor) {
        if (this.trustInput) {
            return visitor.fromDate(new Date(raw));
        }
        if (typeof raw === "string") {
            return visitor.fromDate(new Date(raw));
        }
        else if (typeof raw === "number") {
            return visitor.fromDate(new Date(raw));
        }
        throw createInvalidTypeError("string | number", raw);
    }
    readDocument(raw, visitor) {
        if (typeof raw !== "object" || raw === null) {
            throw createInvalidTypeError("object", raw);
        }
        const input = new Map();
        for (const key in raw) {
            input.set(key, raw[key]);
        }
        return visitor.fromMap(input, this, this);
    }
    readFloat64(raw, visitor) {
        const specialValues = new Map([
            ["NaN", NaN],
            ["Infinity", Infinity],
            ["+Infinity", Infinity],
            ["-Infinity", -Infinity],
        ]);
        const special = specialValues.get(raw);
        if (special === undefined && typeof raw !== "number") {
            throw new Error("InvalidInput");
        }
        return visitor.fromFloat64(special !== undefined ? special : raw);
    }
    readList(raw, visitor) {
        if (!Array.isArray(raw)) {
            throw createInvalidTypeError("array", raw);
        }
        return visitor.fromList(raw, this);
    }
    readMap(raw, visitor) {
        if (typeof raw !== "object" || raw === null) {
            throw createInvalidTypeError("object", raw);
        }
        const keyReader = new JsonValueReader();
        const input = new Map();
        for (const rawKey in raw) {
            let key;
            try {
                key = JSON.parse(rawKey);
                // key = (/* keyType */ undefined as any).read(jsonReader, key);
            }
            catch (err) {
                throw new Error(err);
            }
            input.set(key, raw[rawKey]);
        }
        return visitor.fromMap(input, keyReader, this);
    }
    readNull(raw, visitor) {
        if (this.trustInput) {
            return visitor.fromNull();
        }
        if (raw !== null) {
            throw createInvalidTypeError("null", raw);
        }
        return visitor.fromNull();
    }
    readString(raw, visitor) {
        if (typeof raw !== "string") {
            throw createInvalidTypeError("string", raw);
        }
        return visitor.fromString(raw);
    }
}
