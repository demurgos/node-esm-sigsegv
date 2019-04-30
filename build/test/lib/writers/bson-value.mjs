/**
 * @module kryo/writers/bson-value
 */
import { JsonWriter } from "./json";
import { StructuredWriter } from "./structured";
export class BsonValueWriter extends StructuredWriter {
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
            const jsonWriter = new JsonWriter();
            const key = keyHandler(index, jsonWriter);
            result[JSON.stringify(key)] = valueHandler(index, this);
        }
        return result;
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvd3JpdGVycy9ic29uLXZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBSUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNwQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFaEQsTUFBTSxPQUFPLGVBQWdCLFNBQVEsZ0JBQWdCO0lBR25ELFlBQVksT0FBb0I7UUFDOUIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWE7UUFDeEIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWM7UUFDekIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFpQjtRQUMxQixxQ0FBcUM7UUFDckMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBWSxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQVc7UUFDbkIsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQWE7UUFDdkIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsUUFBUSxDQUNOLElBQVksRUFDWixVQUErRCxFQUMvRCxZQUFtRTtRQUVuRSxNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7UUFDdkIsS0FBSyxJQUFJLEtBQUssR0FBVyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNqRCwrRkFBK0Y7WUFDL0Ysa0RBQWtEO1lBQ2xELE1BQU0sVUFBVSxHQUFlLElBQUksVUFBVSxFQUFFLENBQUM7WUFDaEQsTUFBTSxHQUFHLEdBQVEsVUFBVSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDekQ7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0YiLCJmaWxlIjoibGliL3dyaXRlcnMvYnNvbi12YWx1ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1vZHVsZSBrcnlvL3dyaXRlcnMvYnNvbi12YWx1ZVxuICovXG5cbmltcG9ydCBic29uIGZyb20gXCJic29uXCI7XG5pbXBvcnQgeyBXcml0ZXIgfSBmcm9tIFwiLi4vY29yZVwiO1xuaW1wb3J0IHsgSnNvbldyaXRlciB9IGZyb20gXCIuL2pzb25cIjtcbmltcG9ydCB7IFN0cnVjdHVyZWRXcml0ZXIgfSBmcm9tIFwiLi9zdHJ1Y3R1cmVkXCI7XG5cbmV4cG9ydCBjbGFzcyBCc29uVmFsdWVXcml0ZXIgZXh0ZW5kcyBTdHJ1Y3R1cmVkV3JpdGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBic29uTGliOiB0eXBlb2YgYnNvbjtcblxuICBjb25zdHJ1Y3Rvcihic29uTGliOiB0eXBlb2YgYnNvbikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5ic29uTGliID0gYnNvbkxpYjtcbiAgfVxuXG4gIHdyaXRlRmxvYXQ2NCh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICB3cml0ZUJvb2xlYW4odmFsdWU6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICB3cml0ZU51bGwoKTogbnVsbCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB3cml0ZUJ5dGVzKHZhbHVlOiBVaW50OEFycmF5KTogYnNvbi5CaW5hcnkge1xuICAgIC8vIFRPRE86IFVwZGF0ZSBOb2RlIHR5cGUgZGVmaW5pdGlvbnNcbiAgICByZXR1cm4gbmV3IHRoaXMuYnNvbkxpYi5CaW5hcnkoQnVmZmVyLmZyb20odmFsdWUgYXMgYW55KSk7XG4gIH1cblxuICB3cml0ZURhdGUodmFsdWU6IERhdGUpOiBEYXRlIHtcbiAgICByZXR1cm4gbmV3IERhdGUodmFsdWUuZ2V0VGltZSgpKTtcbiAgfVxuXG4gIHdyaXRlU3RyaW5nKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHdyaXRlTWFwKFxuICAgIHNpemU6IG51bWJlcixcbiAgICBrZXlIYW5kbGVyOiA8S1c+KGluZGV4OiBudW1iZXIsIG1hcEtleVdyaXRlcjogV3JpdGVyPEtXPikgPT4gS1csXG4gICAgdmFsdWVIYW5kbGVyOiA8Vlc+KGluZGV4OiBudW1iZXIsIG1hcFZhbHVlV3JpdGVyOiBXcml0ZXI8Vlc+KSA9PiBWVyxcbiAgKTogYW55IHtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICAgIGZvciAobGV0IGluZGV4OiBudW1iZXIgPSAwOyBpbmRleCA8IHNpemU7IGluZGV4KyspIHtcbiAgICAgIC8vIFRPRE86IFVzZSBhIHNwZWNpYWxpemVkIHdyaXRlciB0aGF0IG9ubHkgYWNjZXB0cyBzdHJpbmdzIGFuZCBudW1iZXJzIChLZXlNdXN0QmVBU3RyaW5nRXJyb3IpXG4gICAgICAvLyBMZXQgdXNlcnMgYnVpbGQgY3VzdG9tIHNlcmlhbGl6ZXJzIGlmIHRoZXkgd2FudFxuICAgICAgY29uc3QganNvbldyaXRlcjogSnNvbldyaXRlciA9IG5ldyBKc29uV3JpdGVyKCk7XG4gICAgICBjb25zdCBrZXk6IGFueSA9IGtleUhhbmRsZXIoaW5kZXgsIGpzb25Xcml0ZXIpO1xuICAgICAgcmVzdWx0W0pTT04uc3RyaW5naWZ5KGtleSldID0gdmFsdWVIYW5kbGVyKGluZGV4LCB0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9