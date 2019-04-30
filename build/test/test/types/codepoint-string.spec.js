"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const unorm_1 = __importDefault(require("unorm"));
const codepoint_string_1 = require("../../lib/types/codepoint-string");
const test_1 = require("../helpers/test");
describe("CodepointStringType", function () {
    describe("basic support", function () {
        const type = new codepoint_string_1.CodepointStringType({ maxCodepoints: 500, unorm: unorm_1.default });
        const items = [
            // Valid items
            { name: "\"\"", value: "", valid: true },
            { name: "\"Hello World!\"", value: "Hello World!", valid: true },
            { name: "Drop the bass", value: "ԂЯØǷ Łƕ੬ ɃɅϨϞ", valid: true },
            // Invalid items
            /* tslint:disable-next-line:no-construct */
            { name: "new String(\"stringObject\")", value: new String("stringObject"), valid: false },
            { name: "0.5", value: 0.5, valid: false },
            { name: "0.0001", value: 0.0001, valid: false },
            { name: "Infinity", value: Infinity, valid: false },
            { name: "-Infinity", value: -Infinity, valid: false },
            { name: "NaN", value: NaN, valid: false },
            { name: "undefined", value: undefined, valid: false },
            { name: "null", value: null, valid: false },
            { name: "true", value: true, valid: false },
            { name: "false", value: false, valid: false },
            { name: "[]", value: [], valid: false },
            { name: "{}", value: {}, valid: false },
            { name: "new Date()", value: new Date(), valid: false },
            { name: "/regex/", value: /regex/, valid: false },
        ];
        test_1.runTests(type, items);
    });
    describe("Ensure valid codepoints with Javascript (UCS2) strings", function () {
        it("should accept the empty string, when requiring length exactly 0", function () {
            chai_1.default.assert.isTrue(new codepoint_string_1.CodepointStringType({ minCodepoints: 0, maxCodepoints: 0, unorm: unorm_1.default }).test(""));
        });
        it("should accept the string \"a\" (ASCII codepoint), when requiring length exactly 1", function () {
            chai_1.default.assert.isTrue(new codepoint_string_1.CodepointStringType({ minCodepoints: 1, maxCodepoints: 1, unorm: unorm_1.default }).test("a"));
        });
        it("should accept the string \"∑\" (BMP codepoint), when requiring length exactly 1", function () {
            chai_1.default.assert.isTrue(new codepoint_string_1.CodepointStringType({ minCodepoints: 1, maxCodepoints: 1, unorm: unorm_1.default }).test("∑"));
        });
        it("should reject the string \"𝄞\" (non-BMP codepoint), when requiring length exactly 2", function () {
            chai_1.default.assert.isFalse(new codepoint_string_1.CodepointStringType({ minCodepoints: 2, maxCodepoints: 2, unorm: unorm_1.default }).test("𝄞"));
        });
        it("should accept the string \"𝄞\" (non-BMP codepoint), when requiring length exactly 1", function () {
            chai_1.default.assert.isTrue(new codepoint_string_1.CodepointStringType({ minCodepoints: 1, maxCodepoints: 1, unorm: unorm_1.default }).test("𝄞"));
        });
        describe("should reject unmatched surrogate halves", function () {
            // 𝄞 corresponds to the surrogate pair (0xd834, 0xdd1e)
            const type = new codepoint_string_1.CodepointStringType({ maxCodepoints: 500, unorm: unorm_1.default });
            const items = ["\ud834", "a\ud834", "\ud834b", "a\ud834b", "\udd1e", "a\udd1e", "\udd1eb", "a\udd1eb"];
            for (const item of items) {
                it(JSON.stringify(item), function () {
                    chai_1.default.assert.isFalse(type.test(item));
                });
            }
        });
        it("should reject reversed (invalid) surrogate pairs", function () {
            chai_1.default.assert.isFalse(new codepoint_string_1.CodepointStringType({ maxCodepoints: 500, unorm: unorm_1.default }).test("\udd1e\ud834"));
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L3R5cGVzL2NvZGVwb2ludC1zdHJpbmcuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUF3QjtBQUN4QixrREFBMEI7QUFDMUIsdUVBQXVFO0FBQ3ZFLDBDQUF1RDtBQUV2RCxRQUFRLENBQUMscUJBQXFCLEVBQUU7SUFDOUIsUUFBUSxDQUFDLGVBQWUsRUFBRTtRQUN4QixNQUFNLElBQUksR0FBd0IsSUFBSSxzQ0FBbUIsQ0FBQyxFQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFMLGVBQUssRUFBQyxDQUFDLENBQUM7UUFFdkYsTUFBTSxLQUFLLEdBQWlCO1lBQzFCLGNBQWM7WUFDZCxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO1lBQ3RDLEVBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztZQUM5RCxFQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO1lBQzVELGdCQUFnQjtZQUNoQiwyQ0FBMkM7WUFDM0MsRUFBQyxJQUFJLEVBQUUsOEJBQThCLEVBQUUsS0FBSyxFQUFFLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7WUFDdkYsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztZQUN2QyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1lBQzdDLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7WUFDakQsRUFBQyxJQUFJLEVBQUUs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QUMsQ0FBQyxDQUFDO1FBQ3RHLENBQUMsQ0FBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLDBDQUEwQyxFQUFFO1lBQ25ELHdEQUF3RDtZQUN4RCxNQUFNLElBQUksR0FBd0IsSUFBSSxzQ0FBbUIsQ0FBQyxFQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFMLGVBQUssRUFBQyxDQUFDLENBQUM7WUFDdkYsTUFBTSxLQUFLLEdBQWEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDakgsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7Z0JBQ3hCLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN2QixjQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxrREFBa0QsRUFBRTtZQUNyRCxjQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLHNDQUFtQixDQUFDLEVBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUwsZUFBSyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNqRyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC90eXBlcy9jb2RlcG9pbnQtc3RyaW5nLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tIFwiY2hhaVwiO1xuaW1wb3J0IHVub3JtIGZyb20gXCJ1bm9ybVwiO1xuaW1wb3J0IHsgQ29kZXBvaW50U3RyaW5nVHlwZSB9IGZyb20gXCIuLi8uLi9saWIvdHlwZXMvY29kZXBvaW50LXN0cmluZ1wiO1xuaW1wb3J0IHsgcnVuVGVzdHMsIFR5cGVkVmFsdWUgfSBmcm9tIFwiLi4vaGVscGVycy90ZXN0XCI7XG5cbmRlc2NyaWJlKFwiQ29kZXBvaW50U3RyaW5nVHlwZVwiLCBmdW5jdGlvbiAoKSB7XG4gIGRlc2NyaWJlKFwiYmFzaWMgc3VwcG9ydFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdHlwZTogQ29kZXBvaW50U3RyaW5nVHlwZSA9IG5ldyBDb2RlcG9pbnRTdHJpbmdUeXBlKHttYXhDb2RlcG9pbnRzOiA1MDAsIHVub3JtfSk7XG5cbiAgICBjb25zdCBpdGVtczogVHlwZWRWYWx1ZVtdID0gW1xuICAgICAgLy8gVmFsaWQgaXRlbXNcbiAgICAgIHtuYW1lOiBcIlxcXCJcXFwiXCIsIHZhbHVlOiBcIlwiLCB2YWxpZDogdHJ1ZX0sXG4gICAgICB7bmFtZTogXCJcXFwiSGVsbG8gV29ybGQhXFxcIlwiLCB2YWx1ZTogXCJIZWxsbyBXb3JsZCFcIiwgdmFsaWQ6IHRydWV9LFxuICAgICAge25hbWU6IFwiRHJvcCB0aGUgYmFzc1wiLCB2YWx1ZTogXCLUgtCvw5jHtyDFgcaV4KmsIMmDyYXPqM+eXCIsIHZhbGlkOiB0cnVlfSxcbiAgICAgIC8vIEludmFsaWQgaXRlbXNcbiAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zdHJ1Y3QgKi9cbiAgICAgIHtuYW1lOiBcIm5ldyBTdHJpbmcoXFxcInN0cmluZ09iamVjdFxcXCIpXCIsIHZhbHVlOiBuZXcgU3RyaW5nKFwic3RyaW5nT2JqZWN0XCIpLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiMC41XCIsIHZhbHVlOiAwLjUsIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCIwLjAwMDFcIiwgdmFsdWU6IDAuMDAwMSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIkluZmluaXR5XCIsIHZhbHVlOiBJbmZpbml0eSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIi1JbmZpbml0eVwiLCB2YWx1ZTogLUluZmluaXR5LCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiTmFOXCIsIHZhbHVlOiBOYU4sIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJ1bmRlZmluZWRcIiwgdmFsdWU6IHVuZGVmaW5lZCwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIm51bGxcIiwgdmFsdWU6IG51bGwsIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJ0cnVlXCIsIHZhbHVlOiB0cnVlLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiZmFsc2VcIiwgdmFsdWU6IGZhbHNlLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiW11cIiwgdmFsdWU6IFtdLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwie31cIiwgdmFsdWU6IHt9LCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwibmV3IERhdGUoKVwiLCB2YWx1ZTogbmV3IERhdGUoKSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIi9yZWdleC9cIiwgdmFsdWU6IC9yZWdleC8sIHZhbGlkOiBmYWxzZX0sXG4gICAgXTtcblxuICAgIHJ1blRlc3RzKHR5cGUsIGl0ZW1zKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoXCJFbnN1cmUgdmFsaWQgY29kZXBvaW50cyB3aXRoIEphdmFzY3JpcHQgKFVDUzIpIHN0cmluZ3NcIiwgZnVuY3Rpb24gKCkge1xuICAgIGl0KFwic2hvdWxkIGFjY2VwdCB0aGUgZW1wdHkgc3RyaW5nLCB3aGVuIHJlcXVpcmluZyBsZW5ndGggZXhhY3RseSAwXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoYWkuYXNzZXJ0LmlzVHJ1ZShuZXcgQ29kZXBvaW50U3RyaW5nVHlwZSh7bWluQ29kZXBvaW50czogMCwgbWF4Q29kZXBvaW50czogMCwgdW5vcm19KS50ZXN0KFwiXCIpKTtcbiAgICB9KTtcbiAgICBpdChcInNob3VsZCBhY2NlcHQgdGhlIHN0cmluZyBcXFwiYVxcXCIgKEFTQ0lJIGNvZGVwb2ludCksIHdoZW4gcmVxdWlyaW5nIGxlbmd0aCBleGFjdGx5IDFcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgY2hhaS5hc3NlcnQuaXNUcnVlKG5ldyBDb2RlcG9pbnRTdHJpbmdUeXBlKHttaW5Db2RlcG9pbnRzOiAxLCBtYXhDb2RlcG9pbnRzOiAxLCB1bm9ybX0pLnRlc3QoXCJhXCIpKTtcbiAgICB9KTtcbiAgICBpdChcInNob3VsZCBhY2NlcHQgdGhlIHN0cmluZyBcXFwi4oiRXFxcIiAoQk1QIGNvZGVwb2ludCksIHdoZW4gcmVxdWlyaW5nIGxlbmd0aCBleGFjdGx5IDFcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgY2hhaS5hc3NlcnQuaXNUcnVlKG5ldyBDb2RlcG9pbnRTdHJpbmdUeXBlKHttaW5Db2RlcG9pbnRzOiAxLCBtYXhDb2RlcG9pbnRzOiAxLCB1bm9ybX0pLnRlc3QoXCLiiJFcIikpO1xuICAgIH0pO1xuICAgIGl0KFwic2hvdWxkIHJlamVjdCB0aGUgc3RyaW5nIFxcXCLwnYSeXFxcIiAobm9uLUJNUCBjb2RlcG9pbnQpLCB3aGVuIHJlcXVpcmluZyBsZW5ndGggZXhhY3RseSAyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoYWkuYXNzZXJ0LmlzRmFsc2UobmV3IENvZGVwb2ludFN0cmluZ1R5cGUoe21pbkNvZGVwb2ludHM6IDIsIG1heENvZGVwb2ludHM6IDIsIHVub3JtfSkudGVzdChcIvCdhJ5cIikpO1xuICAgIH0pO1xuICAgIGl0KFwic2hvdWxkIGFjY2VwdCB0aGUgc3RyaW5nIFxcXCLwnYSeXFxcIiAobm9uLUJNUCBjb2RlcG9pbnQpLCB3aGVuIHJlcXVpcmluZyBsZW5ndGggZXhhY3RseSAxXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoYWkuYXNzZXJ0LmlzVHJ1ZShuZXcgQ29kZXBvaW50U3RyaW5nVHlwZSh7bWluQ29kZXBvaW50czogMSwgbWF4Q29kZXBvaW50czogMSwgdW5vcm19KS50ZXN0KFwi8J2EnlwiKSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoXCJzaG91bGQgcmVqZWN0IHVubWF0Y2hlZCBzdXJyb2dhdGUgaGFsdmVzXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIPCdhJ4gY29ycmVzcG9uZHMgdG8gdGhlIHN1cnJvZ2F0ZSBwYWlyICgweGQ4MzQsIDB4ZGQxZSlcbiAgICAgIGNvbnN0IHR5cGU6IENvZGVwb2ludFN0cmluZ1R5cGUgPSBuZXcgQ29kZXBvaW50U3RyaW5nVHlwZSh7bWF4Q29kZXBvaW50czogNTAwLCB1bm9ybX0pO1xuICAgICAgY29uc3QgaXRlbXM6IHN0cmluZ1tdID0gW1wiXFx1ZDgzNFwiLCBcImFcXHVkODM0XCIsIFwiXFx1ZDgzNGJcIiwgXCJhXFx1ZDgzNGJcIiwgXCJcXHVkZDFlXCIsIFwiYVxcdWRkMWVcIiwgXCJcXHVkZDFlYlwiLCBcImFcXHVkZDFlYlwiXTtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICBpdChKU09OLnN0cmluZ2lmeShpdGVtKSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNoYWkuYXNzZXJ0LmlzRmFsc2UodHlwZS50ZXN0KGl0ZW0pKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaXQoXCJzaG91bGQgcmVqZWN0IHJldmVyc2VkIChpbnZhbGlkKSBzdXJyb2dhdGUgcGFpcnNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgY2hhaS5hc3NlcnQuaXNGYWxzZShuZXcgQ29kZXBvaW50U3RyaW5nVHlwZSh7bWF4Q29kZXBvaW50czogNTAwLCB1bm9ybX0pLnRlc3QoXCJcXHVkZDFlXFx1ZDgzNFwiKSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
