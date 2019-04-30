/**
 * @module kryo/writers/structured
 */
/**
 * Base class for `json` writers.
 */
export class StructuredWriter {
    writeAny(value) {
        return JSON.parse(JSON.stringify(value));
    }
    writeList(size, handler) {
        const result = [];
        for (let index = 0; index < size; index++) {
            result.push(handler(index, this));
        }
        return result;
    }
    writeDocument(keys, handler) {
        const result = {};
        for (const key of keys) {
            result[key] = handler(key, this);
        }
        return result;
    }
}
