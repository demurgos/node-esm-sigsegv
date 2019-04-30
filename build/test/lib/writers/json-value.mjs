/**
 * @module kryo/writers/json-value
 */
import { StructuredWriter } from "./structured";
export class JsonValueWriter extends StructuredWriter {
    writeFloat64(value) {
        if (isNaN(value)) {
            return "NaN";
        }
        else if (value === Infinity) {
            return "+Infinity";
        }
        else if (value === -Infinity) {
            return "-Infinity";
        }
        else if (Object.is(value, "-0")) {
            return "-0";
        }
        return value;
    }
    writeDate(value) {
        return value.toISOString();
    }
    writeNull() {
        return null;
    }
    writeBytes(value) {
        const result = new Array(value.length);
        const len = value.length;
        for (let i = 0; i < len; i++) {
            result[i] = (value[i] < 16 ? "0" : "") + value[i].toString(16);
        }
        return result.join("");
    }
    writeBoolean(value) {
        return value;
    }
    writeString(value) {
        return value;
    }
    writeMap(size, keyHandler, valueHandler) {
        // TODO: Use a specialized writer that only accepts strings and numbers (KeyMustBeAStringError)
        // Let users build custom serializers if they want
        const jsonWriter = new JsonValueWriter();
        const result = {};
        for (let index = 0; index < size; index++) {
            const key = keyHandler(index, jsonWriter);
            result[JSON.stringify(key)] = valueHandler(index, this);
        }
        return result;
    }
}
