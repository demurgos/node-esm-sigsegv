"use strict";
/**
 * @module kryo/writers/structured
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base class for `json`, `qs` and `bson` writers.
 */
class StructuredWriter {
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
exports.StructuredWriter = StructuredWriter;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvd3JpdGVycy9zdHJ1Y3R1cmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7QUFJSDs7R0FFRztBQUNILE1BQXNCLGdCQUFnQjtJQWFwQyxRQUFRLENBQUMsS0FBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBWSxFQUFFLE9BQXdEO1FBQzlFLE1BQU0sTUFBTSxHQUFVLEVBQUUsQ0FBQztRQUN6QixLQUFLLElBQUksS0FBSyxHQUFXLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELGFBQWEsQ0FDWCxJQUFpQixFQUNqQixPQUFrRDtRQUVsRCxNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7UUFDdkIsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbEM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBT0Y7QUF6Q0QsNENBeUNDIiwiZmlsZSI6ImxpYi93cml0ZXJzL3N0cnVjdHVyZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBtb2R1bGUga3J5by93cml0ZXJzL3N0cnVjdHVyZWRcbiAqL1xuXG5pbXBvcnQgeyBXcml0ZXIgfSBmcm9tIFwiLi4vY29yZVwiO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGBqc29uYCwgYHFzYCBhbmQgYGJzb25gIHdyaXRlcnMuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdHJ1Y3R1cmVkV3JpdGVyIGltcGxlbWVudHMgV3JpdGVyPGFueT4ge1xuICBhYnN0cmFjdCB3cml0ZUJvb2xlYW4odmFsdWU6IGJvb2xlYW4pOiBhbnk7XG5cbiAgYWJzdHJhY3Qgd3JpdGVEYXRlKHZhbHVlOiBEYXRlKTogYW55O1xuXG4gIGFic3RyYWN0IHdyaXRlRmxvYXQ2NCh2YWx1ZTogbnVtYmVyKTogYW55O1xuXG4gIGFic3RyYWN0IHdyaXRlU3RyaW5nKHZhbHVlOiBzdHJpbmcpOiBhbnk7XG5cbiAgYWJzdHJhY3Qgd3JpdGVCeXRlcyh2YWx1ZTogVWludDhBcnJheSk6IGFueTtcblxuICBhYnN0cmFjdCB3cml0ZU51bGwoKTogYW55O1xuXG4gIHdyaXRlQW55KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gIH1cblxuICB3cml0ZUxpc3Qoc2l6ZTogbnVtYmVyLCBoYW5kbGVyOiAoaW5kZXg6IG51bWJlciwgaXRlbVdyaXRlcjogV3JpdGVyPGFueT4pID0+IGFueSk6IGFueVtdIHtcbiAgICBjb25zdCByZXN1bHQ6IGFueVtdID0gW107XG4gICAgZm9yIChsZXQgaW5kZXg6IG51bWJlciA9IDA7IGluZGV4IDwgc2l6ZTsgaW5kZXgrKykge1xuICAgICAgcmVzdWx0LnB1c2goaGFuZGxlcihpbmRleCwgdGhpcykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgd3JpdGVEb2N1bWVudDxLIGV4dGVuZHMgc3RyaW5nPihcbiAgICBrZXlzOiBJdGVyYWJsZTxLPixcbiAgICBoYW5kbGVyOiAoa2V5OiBLLCBmaWVsZFdyaXRlcjogV3JpdGVyPGFueT4pID0+IGFueSxcbiAgKTogUmVjb3JkPEssIGFueT4ge1xuICAgIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgcmVzdWx0W2tleV0gPSBoYW5kbGVyKGtleSwgdGhpcyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBhYnN0cmFjdCB3cml0ZU1hcChcbiAgICBzaXplOiBudW1iZXIsXG4gICAga2V5SGFuZGxlcjogPEtXPihpbmRleDogbnVtYmVyLCBtYXBLZXlXcml0ZXI6IFdyaXRlcjxLVz4pID0+IEtXLFxuICAgIHZhbHVlSGFuZGxlcjogPFZXPihpbmRleDogbnVtYmVyLCBtYXBWYWx1ZVdyaXRlcjogV3JpdGVyPFZXPikgPT4gVlcsXG4gICk6IGFueTtcbn1cbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==