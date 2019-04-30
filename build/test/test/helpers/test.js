"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = __importDefault(require("bson"));
const chai_1 = __importDefault(require("chai"));
const qs_1 = __importDefault(require("qs"));
const bson_2 = require("../../lib/readers/bson");
const json_1 = require("../../lib/readers/json");
const qs_2 = require("../../lib/readers/qs");
const bson_3 = require("../../lib/writers/bson");
const json_2 = require("../../lib/writers/json");
const qs_3 = require("../../lib/writers/qs");
function getName(namedValue) {
    return "name" in namedValue ? namedValue.name : JSON.stringify(namedValue.value);
}
function testInvalidValue(type, item) {
    if (type.testError !== undefined) {
        it("Should return an Error for .testError", function () {
            chai_1.default.assert.instanceOf(type.testError(item.value), Error);
        });
    }
    it("Should return `false` for .test", function () {
        chai_1.default.assert.isFalse(type.test(item.value));
    });
}
exports.testInvalidValue = testInvalidValue;
function testValidValue(type, item) {
    if (type.testError !== undefined) {
        it("Should return `undefined` for .testError", function () {
            const error = type.testError(item.value);
            if (error !== undefined) {
                chai_1.default.assert.fail(error, undefined, String(error));
            }
        });
    }
    it("Should return `true` for .test", function () {
        chai_1.default.assert.isTrue(type.test(item.value));
    });
}
exports.testValidValue = testValidValue;
function testBsonSerialization(type, typedValue) {
    const writer = new bson_3.BsonWriter(bson_1.default);
    const reader = new bson_2.BsonReader(bson_1.default);
    const trustedReader = new bson_2.BsonReader(bson_1.default, true);
    let actualSerialized;
    if (typedValue.output !== undefined && "bson" in typedValue.output) {
        const output = typedValue.output["bson"];
        it("`.writeBson(val)` should return the expected value", function () {
            actualSerialized = type.write(writer, typedValue.value);
            chai_1.default.assert.deepEqual(actualSerialized, output);
        });
    }
    else {
        it("`t.writeBson(val)` should not throw", function () {
            actualSerialized = type.write(writer, typedValue.value);
        });
    }
    it("`t.readTrustedBson(t.writeBson(val))` should be valid and equal to `val`", function () {
        const imported = type.read(trustedReader, actualSerialized);
        chai_1.default.assert.isTrue(type.test(imported));
        chai_1.default.assert.isTrue(type.equals(imported, typedValue.value));
    });
    it("`t.readBson(t.writeBson(val))` should be valid and equal to `val`", function () {
        const imported = type.read(reader, actualSerialized);
        chai_1.default.assert.isTrue(type.test(imported));
        chai_1.default.assert.isTrue(type.equals(imported, typedValue.value));
    });
}
exports.testBsonSerialization = testBsonSerialization;
function testJsonSerialization(type, typedValue) {
    const writer = new json_2.JsonWriter();
    const reader = new json_1.JsonReader();
    const trustedReader = new json_1.JsonReader(true);
    let actualSerialized;
    if (typedValue.output !== undefined && "json" in typedValue.output) {
        const output = typedValue.output["json"];
        const expectedSerialized = JSON.stringify(output);
        it(`\`.writeJson(val)\` should return \`${expectedSerialized}\``, function () {
            actualSerialized = type.write(writer, typedValue.value);
            chai_1.default.assert.strictEqual(actualSerialized, output);
        });
    }
    else {
        it("`t.writeJson(val)` should not throw", function () {
            actualSerialized = type.write(writer, typedValue.value);
        });
    }
    it("`t.readTrustedJson(t.writeJson(val))` should be valid and equal to `val`", function () {
        const imported = type.read(trustedReader, actualSerialized);
        chai_1.default.assert.isTrue(type.test(imported));
        chai_1.default.assert.isTrue(type.equals(imported, typedValue.value));
    });
    it("`t.readJson(t.writeJson(val))` should be valid and equal to `val`", function () {
        const imported = type.read(reader, actualSerialized);
        chai_1.default.assert.isTrue(type.test(imported));
        chai_1.default.assert.isTrue(type.equals(imported, typedValue.value));
    });
}
exports.testJsonSerialization = testJsonSerialization;
function testQsSerialization(type, typedValue) {
    const writer = new qs_3.QsWriter(qs_1.default);
    const reader = new qs_2.QsReader(qs_1.default);
    const trustedReader = new qs_2.QsReader(qs_1.default, true);
    let actualSerialized;
    if (typedValue.output !== undefined && "qs" in typedValue.output) {
        if (typedValue.output["qs"] === "ignore") {
            return;
        }
        const expectedSerialized = typedValue.output["qs"];
        it(`\`.writeQs(val)\` should return the value \`${expectedSerialized}\``, function () {
            actualSerialized = type.write(writer, typedValue.value);
            chai_1.default.assert.strictEqual(actualSerialized, expectedSerialized);
        });
    }
    else {
        it("`t.writeQs(val)` should not throw", function () {
            actualSerialized = type.write(writer, typedValue.value);
        });
    }
    it("`t.readTrustedQs(t.writeQs(val))` should be valid and equal to `val`", function () {
        const imported = type.read(trustedReader, actualSerialized);
        chai_1.default.assert.isTrue(type.test(imported));
        chai_1.default.assert.isTrue(type.equals(imported, typedValue.value));
    });
    it("`t.readQs(t.writeQs(val))` should be valid and equal to `val`", function () {
        const imported = type.read(reader, actualSerialized);
        chai_1.default.assert.isTrue(type.test(imported));
        chai_1.default.assert.isTrue(type.equals(imported, typedValue.value));
    });
}
exports.testQsSerialization = testQsSerialization;
function testSerialization(type, typedValue) {
    testBsonSerialization(type, typedValue);
    testJsonSerialization(type, typedValue);
    testQsSerialization(type, typedValue);
}
exports.testSerialization = testSerialization;
function testValueSync(type, item) {
    if (item.valid) {
        testValidValue(type, item);
        testSerialization(type, item);
    }
    else {
        testInvalidValue(type, item);
    }
}
exports.testValueSync = testValueSync;
function runTests(type, items) {
    for (const item of items) {
        describe(`Item: ${getName(item)}`, function () {
            testValueSync(type, item);
        });
    }
}
exports.runTests = runTests;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L2hlbHBlcnMvdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUF3QjtBQUN4QixnREFBd0I7QUFDeEIsNENBQW9CO0FBRXBCLGlEQUFvRDtBQUNwRCxpREFBb0Q7QUFDcEQsNkNBQWdEO0FBQ2hELGlEQUFvRDtBQUNwRCxpREFBb0Q7QUFDcEQsNkNBQWdEO0FBa0NoRCxTQUFTLE9BQU8sQ0FBQyxVQUFzQjtJQUNyQyxPQUFPLE1BQU0sSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25GLENBQUM7QUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxJQUFlLEVBQUUsSUFBdUI7SUFDdkUsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtRQUNoQyxFQUFFLENBQUMsdUNBQXVDLEVBQUU7WUFDMUMsY0FBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUVELEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtRQUNwQyxjQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVZELDRDQVVDO0FBRUQsU0FBZ0IsY0FBYyxDQUFDLElBQWUsRUFBRSxJQUFxQjtJQUNuRSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1FBQ2hDLEVBQUUsQ0FBQywwQ0FBMEMsRUFBRTtZQUM3QyxNQUFNLEtBQUssR0FBc0IsSUFBSSxDQUFDLFNBQVUsQ0FBQyxJQUFJLENBQUMs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LElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNkLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0IsaUJBQWlCLENBQUMsSUFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUM5QztTQUFNO1FBQ0wsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzlCO0FBQ0gsQ0FBQztBQVBELHNDQU9DO0FBRUQsU0FBZ0IsUUFBUSxDQUFDLElBQWUsRUFBRSxLQUFtQjtJQUMzRCxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtRQUN4QixRQUFRLENBQUMsU0FBUyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDO0FBTkQsNEJBTUMiLCJmaWxlIjoidGVzdC9oZWxwZXJzL3Rlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYnNvbiBmcm9tIFwiYnNvblwiO1xuaW1wb3J0IGNoYWkgZnJvbSBcImNoYWlcIjtcbmltcG9ydCBxcyBmcm9tIFwicXNcIjtcbmltcG9ydCB7IElvVHlwZSwgVHlwZSB9IGZyb20gXCIuLi8uLi9saWIvY29yZVwiO1xuaW1wb3J0IHsgQnNvblJlYWRlciB9IGZyb20gXCIuLi8uLi9saWIvcmVhZGVycy9ic29uXCI7XG5pbXBvcnQgeyBKc29uUmVhZGVyIH0gZnJvbSBcIi4uLy4uL2xpYi9yZWFkZXJzL2pzb25cIjtcbmltcG9ydCB7IFFzUmVhZGVyIH0gZnJvbSBcIi4uLy4uL2xpYi9yZWFkZXJzL3FzXCI7XG5pbXBvcnQgeyBCc29uV3JpdGVyIH0gZnJvbSBcIi4uLy4uL2xpYi93cml0ZXJzL2Jzb25cIjtcbmltcG9ydCB7IEpzb25Xcml0ZXIgfSBmcm9tIFwiLi4vLi4vbGliL3dyaXRlcnMvanNvblwiO1xuaW1wb3J0IHsgUXNXcml0ZXIgfSBmcm9tIFwiLi4vLi4vbGliL3dyaXRlcnMvcXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBOYW1lZFZhbHVlIHtcbiAgbmFtZT86IHN0cmluZztcbiAgdmFsdWU6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDaGVja2VkVmFsdWUgZXh0ZW5kcyBOYW1lZFZhbHVlIHtcbiAgdmFsaWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW52YWxpZFR5cGVkVmFsdWUgZXh0ZW5kcyBDaGVja2VkVmFsdWUge1xuICB2YWxpZDogYm9vbGVhbjtcbiAgdGVzdEVycm9yPzogRXJyb3I7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRUeXBlZFZhbHVlIGV4dGVuZHMgQ2hlY2tlZFZhbHVlIHtcbiAgdmFsaWQ6IGJvb2xlYW47XG5cbiAgb3V0cHV0Pzoge1xuICAgIFtmb3JtYXROYW1lOiBzdHJpbmddOiBhbnk7XG4gIH07XG5cbiAgaW5wdXRzPzoge1xuICAgIFtmb3JtYXROYW1lOiBzdHJpbmddOiBhbnk7XG4gIH07XG5cbiAgaW52YWxpZElucHV0cz86IHtcbiAgICBbZm9ybWF0TmFtZTogc3RyaW5nXTogYW55O1xuICB9O1xufVxuXG5leHBvcnQgdHlwZSBUeXBlZFZhbHVlID0gSW52YWxpZFR5cGVkVmFsdWUgfCBWYWxpZFR5cGVkVmFsdWU7XG5cbmZ1bmN0aW9uIGdldE5hbWUobmFtZWRWYWx1ZTogTmFtZWRWYWx1ZSkge1xuICByZXR1cm4gXCJuYW1lXCIgaW4gbmFtZWRWYWx1ZSA/IG5hbWVkVmFsdWUubmFtZSA6IEpTT04uc3RyaW5naWZ5KG5hbWVkVmFsdWUudmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVzdEludmFsaWRWYWx1ZSh0eXBlOiBUeXBlPGFueT4sIGl0ZW06IEludmFsaWRUeXBlZFZhbHVlKSB7XG4gIGlmICh0eXBlLnRlc3RFcnJvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaXQoXCJTaG91bGQgcmV0dXJuIGFuIEVycm9yIGZvciAudGVzdEVycm9yXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoYWkuYXNzZXJ0Lmluc3RhbmNlT2YodHlwZS50ZXN0RXJyb3IhKGl0ZW0udmFsdWUpLCBFcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBpdChcIlNob3VsZCByZXR1cm4gYGZhbHNlYCBmb3IgLnRlc3RcIiwgZnVuY3Rpb24gKCkge1xuICAgIGNoYWkuYXNzZXJ0LmlzRmFsc2UodHlwZS50ZXN0KGl0ZW0udmFsdWUpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0VmFsaWRWYWx1ZSh0eXBlOiBUeXBlPGFueT4sIGl0ZW06IFZhbGlkVHlwZWRWYWx1ZSkge1xuICBpZiAodHlwZS50ZXN0RXJyb3IgIT09IHVuZGVmaW5lZCkge1xuICAgIGl0KFwiU2hvdWxkIHJldHVybiBgdW5kZWZpbmVkYCBmb3IgLnRlc3RFcnJvclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBlcnJvcjogRXJyb3IgfCB1bmRlZmluZWQgPSB0eXBlLnRlc3RFcnJvciEoaXRlbS52YWx1ZSk7XG4gICAgICBpZiAoZXJyb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjaGFpLmFzc2VydC5mYWlsKGVycm9yLCB1bmRlZmluZWQsIFN0cmluZyhlcnJvcikpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaXQoXCJTaG91bGQgcmV0dXJuIGB0cnVlYCBmb3IgLnRlc3RcIiwgZnVuY3Rpb24gKCkge1xuICAgIGNoYWkuYXNzZXJ0LmlzVHJ1ZSh0eXBlLnRlc3QoaXRlbS52YWx1ZSkpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RCc29uU2VyaWFsaXphdGlvbjxUPih0eXBlOiBJb1R5cGU8VD4sIHR5cGVkVmFsdWU6IFZhbGlkVHlwZWRWYWx1ZSk6IHZvaWQge1xuICBjb25zdCB3cml0ZXI6IEJzb25Xcml0ZXIgPSBuZXcgQnNvbldyaXRlcihic29uKTtcbiAgY29uc3QgcmVhZGVyOiBCc29uUmVhZGVyID0gbmV3IEJzb25SZWFkZXIoYnNvbik7XG4gIGNvbnN0IHRydXN0ZWRSZWFkZXI6IEJzb25SZWFkZXIgPSBuZXcgQnNvblJlYWRlcihic29uLCB0cnVlKTtcbiAgbGV0IGFjdHVhbFNlcmlhbGl6ZWQ6IEJ1ZmZlcjtcblxuICBpZiAodHlwZWRWYWx1ZS5vdXRwdXQgIT09IHVuZGVmaW5lZCAmJiBcImJzb25cIiBpbiB0eXBlZFZhbHVlLm91dHB1dCkge1xuICAgIGNvbnN0IG91dHB1dDogYW55ID0gdHlwZWRWYWx1ZS5vdXRwdXRbXCJic29uXCJdO1xuICAgIGl0KFwiYC53cml0ZUJzb24odmFsKWAgc2hvdWxkIHJldHVybiB0aGUgZXhwZWN0ZWQgdmFsdWVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYWN0dWFsU2VyaWFsaXplZCA9IHR5cGUud3JpdGUod3JpdGVyLCB0eXBlZFZhbHVlLnZhbHVlKTtcbiAgICAgIGNoYWkuYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWxTZXJpYWxpemVkLCBvdXRwdXQpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGl0KFwiYHQud3JpdGVCc29uKHZhbClgIHNob3VsZCBub3QgdGhyb3dcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYWN0dWFsU2VyaWFsaXplZCA9IHR5cGUud3JpdGUod3JpdGVyLCB0eXBlZFZhbHVlLnZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGl0KFwiYHQucmVhZFRydXN0ZWRCc29uKHQud3JpdGVCc29uKHZhbCkpYCBzaG91bGQgYmUgdmFsaWQgYW5kIGVxdWFsIHRvIGB2YWxgXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBpbXBvcnRlZDogVCA9IHR5cGUucmVhZCEodHJ1c3RlZFJlYWRlciwgYWN0dWFsU2VyaWFsaXplZCk7XG4gICAgY2hhaS5hc3NlcnQuaXNUcnVlKHR5cGUudGVzdChpbXBvcnRlZCkpO1xuICAgIGNoYWkuYXNzZXJ0LmlzVHJ1ZSh0eXBlLmVxdWFscyhpbXBvcnRlZCwgdHlwZWRWYWx1ZS52YWx1ZSkpO1xuICB9KTtcblxuICBpdChcImB0LnJlYWRCc29uKHQud3JpdGVCc29uKHZhbCkpYCBzaG91bGQgYmUgdmFsaWQgYW5kIGVxdWFsIHRvIGB2YWxgXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBpbXBvcnRlZDogVCA9IHR5cGUucmVhZCEocmVhZGVyLCBhY3R1YWxTZXJpYWxpemVkKTtcbiAgICBjaGFpLmFzc2VydC5pc1RydWUodHlwZS50ZXN0KGltcG9ydGVkKSk7XG4gICAgY2hhaS5hc3NlcnQuaXNUcnVlKHR5cGUuZXF1YWxzKGltcG9ydGVkLCB0eXBlZFZhbHVlLnZhbHVlKSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVzdEpzb25TZXJpYWxpemF0aW9uPFQ+KHR5cGU6IElvVHlwZTxUPiwgdHlwZWRWYWx1ZTogVmFsaWRUeXBlZFZhbHVlKTogdm9pZCB7XG4gIGNvbnN0IHdyaXRlcjogSnNvbldyaXRlciA9IG5ldyBKc29uV3JpdGVyKCk7XG4gIGNvbnN0IHJlYWRlcjogSnNvblJlYWRlciA9IG5ldyBKc29uUmVhZGVyKCk7XG4gIGNvbnN0IHRydXN0ZWRSZWFkZXI6IEpzb25SZWFkZXIgPSBuZXcgSnNvblJlYWRlcih0cnVlKTtcbiAgbGV0IGFjdHVhbFNlcmlhbGl6ZWQ6IHN0cmluZztcblxuICBpZiAodHlwZWRWYWx1ZS5vdXRwdXQgIT09IHVuZGVmaW5lZCAmJiBcImpzb25cIiBpbiB0eXBlZFZhbHVlLm91dHB1dCkge1xuICAgIGNvbnN0IG91dHB1dDogYW55ID0gdHlwZWRWYWx1ZS5vdXRwdXRbXCJqc29uXCJdO1xuICAgIGNvbnN0IGV4cGVjdGVkU2VyaWFsaXplZDogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkob3V0cHV0KTtcbiAgICBpdChgXFxgLndyaXRlSnNvbih2YWwpXFxgIHNob3VsZCByZXR1cm4gXFxgJHtleHBlY3RlZFNlcmlhbGl6ZWR9XFxgYCwgZnVuY3Rpb24gKCkge1xuICAgICAgYWN0dWFsU2VyaWFsaXplZCA9IHR5cGUud3JpdGUod3JpdGVyLCB0eXBlZFZhbHVlLnZhbHVlKTtcbiAgICAgIGNoYWkuYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbFNlcmlhbGl6ZWQsIG91dHB1dCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgaXQoXCJgdC53cml0ZUpzb24odmFsKWAgc2hvdWxkIG5vdCB0aHJvd1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhY3R1YWxTZXJpYWxpemVkID0gdHlwZS53cml0ZSh3cml0ZXIsIHR5cGVkVmFsdWUudmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgaXQoXCJgdC5yZWFkVHJ1c3RlZEpzb24odC53cml0ZUpzb24odmFsKSlgIHNob3VsZCBiZSB2YWxpZCBhbmQgZXF1YWwgdG8gYHZhbGBcIiwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGltcG9ydGVkOiBUID0gdHlwZS5yZWFkISh0cnVzdGVkUmVhZGVyLCBhY3R1YWxTZXJpYWxpemVkKTtcbiAgICBjaGFpLmFzc2VydC5pc1RydWUodHlwZS50ZXN0KGltcG9ydGVkKSk7XG4gICAgY2hhaS5hc3NlcnQuaXNUcnVlKHR5cGUuZXF1YWxzKGltcG9ydGVkLCB0eXBlZFZhbHVlLnZhbHVlKSk7XG4gIH0pO1xuXG4gIGl0KFwiYHQucmVhZEpzb24odC53cml0ZUpzb24odmFsKSlgIHNob3VsZCBiZSB2YWxpZCBhbmQgZXF1YWwgdG8gYHZhbGBcIiwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGltcG9ydGVkOiBUID0gdHlwZS5yZWFkIShyZWFkZXIsIGFjdHVhbFNlcmlhbGl6ZWQpO1xuICAgIGNoYWkuYXNzZXJ0LmlzVHJ1ZSh0eXBlLnRlc3QoaW1wb3J0ZWQpKTtcbiAgICBjaGFpLmFzc2VydC5pc1RydWUodHlwZS5lcXVhbHMoaW1wb3J0ZWQsIHR5cGVkVmFsdWUudmFsdWUpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0UXNTZXJpYWxpemF0aW9uPFQ+KHR5cGU6IElvVHlwZTxUPiwgdHlwZWRWYWx1ZTogVmFsaWRUeXBlZFZhbHVlKTogdm9pZCB7XG4gIGNvbnN0IHdyaXRlcjogUXNXcml0ZXIgPSBuZXcgUXNXcml0ZXIocXMpO1xuICBjb25zdCByZWFkZXI6IFFzUmVhZGVyID0gbmV3IFFzUmVhZGVyKHFzKTtcbiAgY29uc3QgdHJ1c3RlZFJlYWRlcjogUXNSZWFkZXIgPSBuZXcgUXNSZWFkZXIocXMsIHRydWUpO1xuICBsZXQgYWN0dWFsU2VyaWFsaXplZDogc3RyaW5nO1xuXG4gIGlmICh0eXBlZFZhbHVlLm91dHB1dCAhPT0gdW5kZWZpbmVkICYmIFwicXNcIiBpbiB0eXBlZFZhbHVlLm91dHB1dCkge1xuICAgIGlmICh0eXBlZFZhbHVlLm91dHB1dFtcInFzXCJdID09PSBcImlnbm9yZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGV4cGVjdGVkU2VyaWFsaXplZDogc3RyaW5nID0gdHlwZWRWYWx1ZS5vdXRwdXRbXCJxc1wiXTtcbiAgICBpdChgXFxgLndyaXRlUXModmFsKVxcYCBzaG91bGQgcmV0dXJuIHRoZSB2YWx1ZSBcXGAke2V4cGVjdGVkU2VyaWFsaXplZH1cXGBgLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhY3R1YWxTZXJpYWxpemVkID0gdHlwZS53cml0ZSh3cml0ZXIsIHR5cGVkVmFsdWUudmFsdWUpO1xuICAgICAgY2hhaS5hc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsU2VyaWFsaXplZCwgZXhwZWN0ZWRTZXJpYWxpemVkKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBpdChcImB0LndyaXRlUXModmFsKWAgc2hvdWxkIG5vdCB0aHJvd1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhY3R1YWxTZXJpYWxpemVkID0gdHlwZS53cml0ZSh3cml0ZXIsIHR5cGVkVmFsdWUudmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgaXQoXCJgdC5yZWFkVHJ1c3RlZFFzKHQud3JpdGVRcyh2YWwpKWAgc2hvdWxkIGJlIHZhbGlkIGFuZCBlcXVhbCB0byBgdmFsYFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaW1wb3J0ZWQ6IFQgPSB0eXBlLnJlYWQhKHRydXN0ZWRSZWFkZXIsIGFjdHVhbFNlcmlhbGl6ZWQpO1xuICAgIGNoYWkuYXNzZXJ0LmlzVHJ1ZSh0eXBlLnRlc3QoaW1wb3J0ZWQpKTtcbiAgICBjaGFpLmFzc2VydC5pc1RydWUodHlwZS5lcXVhbHMoaW1wb3J0ZWQsIHR5cGVkVmFsdWUudmFsdWUpKTtcbiAgfSk7XG5cbiAgaXQoXCJgdC5yZWFkUXModC53cml0ZVFzKHZhbCkpYCBzaG91bGQgYmUgdmFsaWQgYW5kIGVxdWFsIHRvIGB2YWxgXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBpbXBvcnRlZDogVCA9IHR5cGUucmVhZCEocmVhZGVyLCBhY3R1YWxTZXJpYWxpemVkKTtcbiAgICBjaGFpLmFzc2VydC5pc1RydWUodHlwZS50ZXN0KGltcG9ydGVkKSk7XG4gICAgY2hhaS5hc3NlcnQuaXNUcnVlKHR5cGUuZXF1YWxzKGltcG9ydGVkLCB0eXBlZFZhbHVlLnZhbHVlKSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVzdFNlcmlhbGl6YXRpb248VD4odHlwZTogSW9UeXBlPFQ+LCB0eXBlZFZhbHVlOiBWYWxpZFR5cGVkVmFsdWUpOiB2b2lkIHtcbiAgdGVzdEJzb25TZXJpYWxpemF0aW9uKHR5cGUsIHR5cGVkVmFsdWUpO1xuICB0ZXN0SnNvblNlcmlhbGl6YXRpb24odHlwZSwgdHlwZWRWYWx1ZSk7XG4gIHRlc3RRc1NlcmlhbGl6YXRpb24odHlwZSwgdHlwZWRWYWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0VmFsdWVTeW5jKHR5cGU6IFR5cGU8YW55PiwgaXRlbTogVHlwZWRWYWx1ZSk6IHZvaWQge1xuICBpZiAoaXRlbS52YWxpZCkge1xuICAgIHRlc3RWYWxpZFZhbHVlKHR5cGUsIGl0ZW0pO1xuICAgIHRlc3RTZXJpYWxpemF0aW9uKHR5cGUgYXMgSW9UeXBlPGFueT4sIGl0ZW0pO1xuICB9IGVsc2Uge1xuICAgIHRlc3RJbnZhbGlkVmFsdWUodHlwZSwgaXRlbSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1blRlc3RzKHR5cGU6IFR5cGU8YW55PiwgaXRlbXM6IFR5cGVkVmFsdWVbXSk6IHZvaWQge1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBkZXNjcmliZShgSXRlbTogJHtnZXROYW1lKGl0ZW0pfWAsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRlc3RWYWx1ZVN5bmModHlwZSwgaXRlbSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==