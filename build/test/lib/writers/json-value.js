"use strict";
/**
 * @module kryo/writers/json-value
 */
Object.defineProperty(exports, "__esModule", { value: true });
const structured_1 = require("./structured");
class JsonValueWriter extends structured_1.StructuredWriter {
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
exports.JsonValueWriter = JsonValueWriter;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvd3JpdGVycy9qc29uLXZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7QUFHSCw2Q0FBZ0Q7QUFFaEQsTUFBYSxlQUFnQixTQUFRLDZCQUFnQjtJQUNuRCxZQUFZLENBQUMsS0FBYTtRQUN4QixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoQixPQUFPLEtBQUssQ0FBQztTQUNkO2FBQU0sSUFBSSxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLE9BQU8sV0FBVyxDQUFDO1NBQ3BCO2FBQU0sSUFBSSxLQUFLLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDOUIsT0FBTyxXQUFXLENBQUM7U0FDcEI7YUFBTSxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ2pDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBVztRQUNuQixPQUFPLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFpQjtRQUMxQixNQUFNLE1BQU0sR0FBYSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsTUFBTSxHQUFHLEdBQVcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNoRTtRQUNELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWM7UUFDekIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQWE7UUFDdkIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsUUFBUSxDQUNOLElBQVksRUFDWixVQUErRCxFQUMvRCxZQUFtRTtRQUVuRSwrRkFBK0Y7UUFDL0Ysa0RBQWtEO1FBQ2xELE1BQU0sVUFBVSxHQUFvQixJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQzFELE1BQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztRQUN2QixLQUFLLElBQUksS0FBSyxHQUFXLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2pELE1BQU0sR0FBRyxHQUFRLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGO0FBdERELDBDQXNEQyIsImZpbGUiOiJsaWIvd3JpdGVycy9qc29uLXZhbHVlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlIGtyeW8vd3JpdGVycy9qc29uLXZhbHVlXG4gKi9cblxuaW1wb3J0IHsgV3JpdGVyIH0gZnJvbSBcIi4uL2NvcmVcIjtcbmltcG9ydCB7IFN0cnVjdHVyZWRXcml0ZXIgfSBmcm9tIFwiLi9zdHJ1Y3R1cmVkXCI7XG5cbmV4cG9ydCBjbGFzcyBKc29uVmFsdWVXcml0ZXIgZXh0ZW5kcyBTdHJ1Y3R1cmVkV3JpdGVyIHtcbiAgd3JpdGVGbG9hdDY0KHZhbHVlOiBudW1iZXIpOiBudW1iZXIgfCBzdHJpbmcge1xuICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBcIk5hTlwiO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgICByZXR1cm4gXCIrSW5maW5pdHlcIjtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAtSW5maW5pdHkpIHtcbiAgICAgIHJldHVybiBcIi1JbmZpbml0eVwiO1xuICAgIH0gZWxzZSBpZiAoT2JqZWN0LmlzKHZhbHVlLCBcIi0wXCIpKSB7XG4gICAgICByZXR1cm4gXCItMFwiO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICB3cml0ZURhdGUodmFsdWU6IERhdGUpOiBzdHJpbmcge1xuICAgIHJldHVybiB2YWx1ZS50b0lTT1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVOdWxsKCk6IG51bGwge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgd3JpdGVCeXRlcyh2YWx1ZTogVWludDhBcnJheSk6IHN0cmluZyB7XG4gICAgY29uc3QgcmVzdWx0OiBzdHJpbmdbXSA9IG5ldyBBcnJheSh2YWx1ZS5sZW5ndGgpO1xuICAgIGNvbnN0IGxlbjogbnVtYmVyID0gdmFsdWUubGVuZ3RoO1xuICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgcmVzdWx0W2ldID0gKHZhbHVlW2ldIDwgMTYgPyBcIjBcIiA6IFwiXCIpICsgdmFsdWVbaV0udG9TdHJpbmcoMTYpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XG4gIH1cblxuICB3cml0ZUJvb2xlYW4odmFsdWU6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICB3cml0ZVN0cmluZyh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICB3cml0ZU1hcChcbiAgICBzaXplOiBudW1iZXIsXG4gICAga2V5SGFuZGxlcjogPEtXPihpbmRleDogbnVtYmVyLCBtYXBLZXlXcml0ZXI6IFdyaXRlcjxLVz4pID0+IEtXLFxuICAgIHZhbHVlSGFuZGxlcjogPFZXPihpbmRleDogbnVtYmVyLCBtYXBWYWx1ZVdyaXRlcjogV3JpdGVyPFZXPikgPT4gVlcsXG4gICk6IGFueSB7XG4gICAgLy8gVE9ETzogVXNlIGEgc3BlY2lhbGl6ZWQgd3JpdGVyIHRoYXQgb25seSBhY2NlcHRzIHN0cmluZ3MgYW5kIG51bWJlcnMgKEtleU11c3RCZUFTdHJpbmdFcnJvcilcbiAgICAvLyBMZXQgdXNlcnMgYnVpbGQgY3VzdG9tIHNlcmlhbGl6ZXJzIGlmIHRoZXkgd2FudFxuICAgIGNvbnN0IGpzb25Xcml0ZXI6IEpzb25WYWx1ZVdyaXRlciA9IG5ldyBKc29uVmFsdWVXcml0ZXIoKTtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICAgIGZvciAobGV0IGluZGV4OiBudW1iZXIgPSAwOyBpbmRleCA8IHNpemU7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGtleTogYW55ID0ga2V5SGFuZGxlcihpbmRleCwganNvbldyaXRlcik7XG4gICAgICByZXN1bHRbSlNPTi5zdHJpbmdpZnkoa2V5KV0gPSB2YWx1ZUhhbmRsZXIoaW5kZXgsIHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
