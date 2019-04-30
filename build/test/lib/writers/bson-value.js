"use strict";
/**
 * @module kryo/writers/bson-value
 */
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("./json");
const structured_1 = require("./structured");
class BsonValueWriter extends structured_1.StructuredWriter {
    constructor(bsonLib) {
        super();
        this.bsonLib = bsonLib;
    }
    writeFloat64(value) {
        return value;
    }
    writeBoolean(value) {
        return value;
    }
    writeNull() {
        return null;
    }
    writeBytes(value) {
        // TODO: Update Node type definitions
        return new this.bsonLib.Binary(Buffer.from(value));
    }
    writeDate(value) {
        return new Date(value.getTime());
    }
    writeString(value) {
        return value;
    }
    writeMap(size, keyHandler, valueHandler) {
        const result = {};
        for (let index = 0; index < size; index++) {
            // TODO: Use a specialized writer that only accepts strings and numbers (KeyMustBeAStringError)
            // Let users build custom serializers if they want
            const jsonWriter = new json_1.JsonWriter();
            const key = keyHandler(index, jsonWriter);
            result[JSON.stringify(key)] = valueHandler(index, this);
        }
        return result;
    }
}
exports.BsonValueWriter = BsonValueWriter;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvd3JpdGVycy9ic29uLXZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7QUFJSCxpQ0FBb0M7QUFDcEMsNkNBQWdEO0FBRWhELE1BQWEsZUFBZ0IsU0FBUSw2QkFBZ0I7SUFHbkQsWUFBWSxPQUFvQjtRQUM5QixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBYTtRQUN4QixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBYztRQUN6QixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQWlCO1FBQzFCLHFDQUFxQztRQUNyQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFZLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxTQUFTLENBQUMsS0FBVztRQUNuQixPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBYTtRQUN2QixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxRQUFRLENBQ04sSUFBWSxFQUNaLFVBQStELEVBQy9ELFlBQW1FO1FBRW5FLE1BQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztRQUN2QixLQUFLLElBQUksS0FBSyxHQUFXLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2pELCtGQUErRjtZQUMvRixrREFBa0Q7WUFDbEQsTUFBTSxVQUFVLEdBQWUsSUFBSSxpQkFBVSxFQUFFLENBQUM7WUFDaEQsTUFBTSxHQUFHLEdBQVEsVUFBVSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDekQ7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0Y7QUFoREQsMENBZ0RDIiwiZmlsZSI6ImxpYi93cml0ZXJzL2Jzb24tdmFsdWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBtb2R1bGUga3J5by93cml0ZXJzL2Jzb24tdmFsdWVcbiAqL1xuXG5pbXBvcnQgYnNvbiBmcm9tIFwiYnNvblwiO1xuaW1wb3J0IHsgV3JpdGVyIH0gZnJvbSBcIi4uL2NvcmVcIjtcbmltcG9ydCB7IEpzb25Xcml0ZXIgfSBmcm9tIFwiLi9qc29uXCI7XG5pbXBvcnQgeyBTdHJ1Y3R1cmVkV3JpdGVyIH0gZnJvbSBcIi4vc3RydWN0dXJlZFwiO1xuXG5leHBvcnQgY2xhc3MgQnNvblZhbHVlV3JpdGVyIGV4dGVuZHMgU3RydWN0dXJlZFdyaXRlciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgYnNvbkxpYjogdHlwZW9mIGJzb247XG5cbiAgY29uc3RydWN0b3IoYnNvbkxpYjogdHlwZW9mIGJzb24pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYnNvbkxpYiA9IGJzb25MaWI7XG4gIH1cblxuICB3cml0ZUZsb2F0NjQodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgd3JpdGVCb29sZWFuKHZhbHVlOiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgd3JpdGVOdWxsKCk6IG51bGwge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgd3JpdGVCeXRlcyh2YWx1ZTogVWludDhBcnJheSk6IGJzb24uQmluYXJ5IHtcbiAgICAvLyBUT0RPOiBVcGRhdGUgTm9kZSB0eXBlIGRlZmluaXRpb25zXG4gICAgcmV0dXJuIG5ldyB0aGlzLmJzb25MaWIuQmluYXJ5KEJ1ZmZlci5mcm9tKHZhbHVlIGFzIGFueSkpO1xuICB9XG5cbiAgd3JpdGVEYXRlKHZhbHVlOiBEYXRlKTogRGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlLmdldFRpbWUoKSk7XG4gIH1cblxuICB3cml0ZVN0cmluZyh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICB3cml0ZU1hcChcbiAgICBzaXplOiBudW1iZXIsXG4gICAga2V5SGFuZGxlcjogPEtXPihpbmRleDogbnVtYmVyLCBtYXBLZXlXcml0ZXI6IFdyaXRlcjxLVz4pID0+IEtXLFxuICAgIHZhbHVlSGFuZGxlcjogPFZXPihpbmRleDogbnVtYmVyLCBtYXBWYWx1ZVdyaXRlcjogV3JpdGVyPFZXPikgPT4gVlcsXG4gICk6IGFueSB7XG4gICAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgICBmb3IgKGxldCBpbmRleDogbnVtYmVyID0gMDsgaW5kZXggPCBzaXplOyBpbmRleCsrKSB7XG4gICAgICAvLyBUT0RPOiBVc2UgYSBzcGVjaWFsaXplZCB3cml0ZXIgdGhhdCBvbmx5IGFjY2VwdHMgc3RyaW5ncyBhbmQgbnVtYmVycyAoS2V5TXVzdEJlQVN0cmluZ0Vycm9yKVxuICAgICAgLy8gTGV0IHVzZXJzIGJ1aWxkIGN1c3RvbSBzZXJpYWxpemVycyBpZiB0aGV5IHdhbnRcbiAgICAgIGNvbnN0IGpzb25Xcml0ZXI6IEpzb25Xcml0ZXIgPSBuZXcgSnNvbldyaXRlcigpO1xuICAgICAgY29uc3Qga2V5OiBhbnkgPSBrZXlIYW5kbGVyKGluZGV4LCBqc29uV3JpdGVyKTtcbiAgICAgIHJlc3VsdFtKU09OLnN0cmluZ2lmeShrZXkpXSA9IHZhbHVlSGFuZGxlcihpbmRleCwgdGhpcyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
