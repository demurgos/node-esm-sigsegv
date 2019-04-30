"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const ucs2_string_1 = require("../../lib/types/ucs2-string");
const test_1 = require("../helpers/test");
describe("Ucs2StringType", function () {
    describe("basic support", function () {
        const type = new ucs2_string_1.Ucs2StringType({ maxLength: 500 });
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
    describe("Simple UCS2 behavior", function () {
        it("should accept the empty string, when requiring length exactly 0", function () {
            chai_1.default.assert.isTrue(new ucs2_string_1.Ucs2StringType({ minLength: 0, maxLength: 0 }).test(""));
        });
        it("should accept the string \"a\" (ASCII codepoint), when requiring length exactly 1", function () {
            chai_1.default.assert.isTrue(new ucs2_string_1.Ucs2StringType({ minLength: 1, maxLength: 1 }).test("a"));
        });
        it("should accept the string \"∑\" (BMP codepoint), when requiring length exactly 1", function () {
            chai_1.default.assert.isTrue(new ucs2_string_1.Ucs2StringType({ minLength: 1, maxLength: 1 }).test("∑"));
        });
        it("should accept the string \"𝄞\" (non-BMP codepoint), when requiring length exactly 2", function () {
            chai_1.default.assert.isTrue(new ucs2_string_1.Ucs2StringType({ minLength: 2, maxLength: 2 }).test("𝄞"));
        });
        it("should reject the string \"𝄞\" (non-BMP codepoint), when requiring length exactly 1", function () {
            chai_1.default.assert.isFalse(new ucs2_string_1.Ucs2StringType({ minLength: 1, maxLength: 1 }).test("𝄞"));
        });
        it("should accept unmatched surrogate halves", function () {
            // 𝄞 corresponds to the surrogate pair (0xd834, 0xdd1e)
            const type = new ucs2_string_1.Ucs2StringType({ maxLength: 500 });
            const items = ["\ud834", "a\ud834", "\ud834b", "a\ud834b", "\udd1e", "a\udd1e", "\udd1eb", "a\udd1eb"];
            for (const item of items) {
                it(JSON.stringify(item), function () {
                    chai_1.default.assert.isTrue(type.test(item));
                });
            }
        });
        it("should accept reversed (invalid) surrogate pairs", function () {
            chai_1.default.assert.isTrue(new ucs2_string_1.Ucs2StringType({ maxLength: 500 }).test("\udd1e\ud834"));
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L3R5cGVzL3VjczItc3RyaW5nLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBd0I7QUFDeEIsNkRBQTZEO0FBQzdELDBDQUF1RDtBQUV2RCxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7SUFDekIsUUFBUSxDQUFDLGVBQWUsRUFBRTtRQUN4QixNQUFNLElBQUksR0FBbUIsSUFBSSw0QkFBYyxDQUFDLEVBQUMsU0FBUyxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7UUFFbEUsTUFBTSxLQUFLLEdBQWlCO1lBQzFCLGNBQWM7WUFDZCxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO1lBQ3RDLEVBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztZQUM5RCxFQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO1lBQzVELGdCQUFnQjtZQUNoQiwyQ0FBMkM7WUFDM0MsRUFBQyxJQUFJLEVBQUUsOEJBQThCLEVBQUUsS0FBSyxFQUFFLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7WUFDdkYsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztZQUN2QyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1lBQzdDLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7WUFDakQsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFL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QUM7WUFDbEUsTUFBTSxLQUFLLEdBQWEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDakgsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7Z0JBQ3hCLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN2QixjQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxrREFBa0QsRUFBRTtZQUNyRCxjQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLDRCQUFjLENBQUMsRUFBQyxTQUFTLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNoRixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC90eXBlcy91Y3MyLXN0cmluZy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSBcImNoYWlcIjtcbmltcG9ydCB7IFVjczJTdHJpbmdUeXBlIH0gZnJvbSBcIi4uLy4uL2xpYi90eXBlcy91Y3MyLXN0cmluZ1wiO1xuaW1wb3J0IHsgcnVuVGVzdHMsIFR5cGVkVmFsdWUgfSBmcm9tIFwiLi4vaGVscGVycy90ZXN0XCI7XG5cbmRlc2NyaWJlKFwiVWNzMlN0cmluZ1R5cGVcIiwgZnVuY3Rpb24gKCkge1xuICBkZXNjcmliZShcImJhc2ljIHN1cHBvcnRcIiwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHR5cGU6IFVjczJTdHJpbmdUeXBlID0gbmV3IFVjczJTdHJpbmdUeXBlKHttYXhMZW5ndGg6IDUwMH0pO1xuXG4gICAgY29uc3QgaXRlbXM6IFR5cGVkVmFsdWVbXSA9IFtcbiAgICAgIC8vIFZhbGlkIGl0ZW1zXG4gICAgICB7bmFtZTogXCJcXFwiXFxcIlwiLCB2YWx1ZTogXCJcIiwgdmFsaWQ6IHRydWV9LFxuICAgICAge25hbWU6IFwiXFxcIkhlbGxvIFdvcmxkIVxcXCJcIiwgdmFsdWU6IFwiSGVsbG8gV29ybGQhXCIsIHZhbGlkOiB0cnVlfSxcbiAgICAgIHtuYW1lOiBcIkRyb3AgdGhlIGJhc3NcIiwgdmFsdWU6IFwi1ILQr8OYx7cgxYHGleCprCDJg8mFz6jPnlwiLCB2YWxpZDogdHJ1ZX0sXG4gICAgICAvLyBJbnZhbGlkIGl0ZW1zXG4gICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc3RydWN0ICovXG4gICAgICB7bmFtZTogXCJuZXcgU3RyaW5nKFxcXCJzdHJpbmdPYmplY3RcXFwiKVwiLCB2YWx1ZTogbmV3IFN0cmluZyhcInN0cmluZ09iamVjdFwiKSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIjAuNVwiLCB2YWx1ZTogMC41LCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiMC4wMDAxXCIsIHZhbHVlOiAwLjAwMDEsIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJJbmZpbml0eVwiLCB2YWx1ZTogSW5maW5pdHksIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCItSW5maW5pdHlcIiwgdmFsdWU6IC1JbmZpbml0eSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIk5hTlwiLCB2YWx1ZTogTmFOLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwidW5kZWZpbmVkXCIsIHZhbHVlOiB1bmRlZmluZWQsIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJudWxsXCIsIHZhbHVlOiBudWxsLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwidHJ1ZVwiLCB2YWx1ZTogdHJ1ZSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcImZhbHNlXCIsIHZhbHVlOiBmYWxzZSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIltdXCIsIHZhbHVlOiBbXSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcInt9XCIsIHZhbHVlOiB7fSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIm5ldyBEYXRlKClcIiwgdmFsdWU6IG5ldyBEYXRlKCksIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCIvcmVnZXgvXCIsIHZhbHVlOiAvcmVnZXgvLCB2YWxpZDogZmFsc2V9LFxuICAgIF07XG5cbiAgICBydW5UZXN0cyh0eXBlLCBpdGVtcyk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKFwiU2ltcGxlIFVDUzIgYmVoYXZpb3JcIiwgZnVuY3Rpb24gKCkge1xuICAgIGl0KFwic2hvdWxkIGFjY2VwdCB0aGUgZW1wdHkgc3RyaW5nLCB3aGVuIHJlcXVpcmluZyBsZW5ndGggZXhhY3RseSAwXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoYWkuYXNzZXJ0LmlzVHJ1ZShuZXcgVWNzMlN0cmluZ1R5cGUoe21pbkxlbmd0aDogMCwgbWF4TGVuZ3RoOiAwfSkudGVzdChcIlwiKSk7XG4gICAgfSk7XG4gICAgaXQoXCJzaG91bGQgYWNjZXB0IHRoZSBzdHJpbmcgXFxcImFcXFwiIChBU0NJSSBjb2RlcG9pbnQpLCB3aGVuIHJlcXVpcmluZyBsZW5ndGggZXhhY3RseSAxXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoYWkuYXNzZXJ0LmlzVHJ1ZShuZXcgVWNzMlN0cmluZ1R5cGUoe21pbkxlbmd0aDogMSwgbWF4TGVuZ3RoOiAxfSkudGVzdChcImFcIikpO1xuICAgIH0pO1xuICAgIGl0KFwic2hvdWxkIGFjY2VwdCB0aGUgc3RyaW5nIFxcXCLiiJFcXFwiIChCTVAgY29kZXBvaW50KSwgd2hlbiByZXF1aXJpbmcgbGVuZ3RoIGV4YWN0bHkgMVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjaGFpLmFzc2VydC5pc1RydWUobmV3IFVjczJTdHJpbmdUeXBlKHttaW5MZW5ndGg6IDEsIG1heExlbmd0aDogMX0pLnRlc3QoXCLiiJFcIikpO1xuICAgIH0pO1xuICAgIGl0KFwic2hvdWxkIGFjY2VwdCB0aGUgc3RyaW5nIFxcXCLwnYSeXFxcIiAobm9uLUJNUCBjb2RlcG9pbnQpLCB3aGVuIHJlcXVpcmluZyBsZW5ndGggZXhhY3RseSAyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoYWkuYXNzZXJ0LmlzVHJ1ZShuZXcgVWNzMlN0cmluZ1R5cGUoe21pbkxlbmd0aDogMiwgbWF4TGVuZ3RoOiAyfSkudGVzdChcIvCdhJ5cIikpO1xuICAgIH0pO1xuICAgIGl0KFwic2hvdWxkIHJlamVjdCB0aGUgc3RyaW5nIFxcXCLwnYSeXFxcIiAobm9uLUJNUCBjb2RlcG9pbnQpLCB3aGVuIHJlcXVpcmluZyBsZW5ndGggZXhhY3RseSAxXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoYWkuYXNzZXJ0LmlzRmFsc2UobmV3IFVjczJTdHJpbmdUeXBlKHttaW5MZW5ndGg6IDEsIG1heExlbmd0aDogMX0pLnRlc3QoXCLwnYSeXCIpKTtcbiAgICB9KTtcbiAgICBpdChcInNob3VsZCBhY2NlcHQgdW5tYXRjaGVkIHN1cnJvZ2F0ZSBoYWx2ZXNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgLy8g8J2EniBjb3JyZXNwb25kcyB0byB0aGUgc3Vycm9nYXRlIHBhaXIgKDB4ZDgzNCwgMHhkZDFlKVxuICAgICAgY29uc3QgdHlwZTogVWNzMlN0cmluZ1R5cGUgPSBuZXcgVWNzMlN0cmluZ1R5cGUoe21heExlbmd0aDogNTAwfSk7XG4gICAgICBjb25zdCBpdGVtczogc3RyaW5nW10gPSBbXCJcXHVkODM0XCIsIFwiYVxcdWQ4MzRcIiwgXCJcXHVkODM0YlwiLCBcImFcXHVkODM0YlwiLCBcIlxcdWRkMWVcIiwgXCJhXFx1ZGQxZVwiLCBcIlxcdWRkMWViXCIsIFwiYVxcdWRkMWViXCJdO1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGl0KEpTT04uc3RyaW5naWZ5KGl0ZW0pLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2hhaS5hc3NlcnQuaXNUcnVlKHR5cGUudGVzdChpdGVtKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGl0KFwic2hvdWxkIGFjY2VwdCByZXZlcnNlZCAoaW52YWxpZCkgc3Vycm9nYXRlIHBhaXJzXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoYWkuYXNzZXJ0LmlzVHJ1ZShuZXcgVWNzMlN0cmluZ1R5cGUoe21heExlbmd0aDogNTAwfSkudGVzdChcIlxcdWRkMWVcXHVkODM0XCIpKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
