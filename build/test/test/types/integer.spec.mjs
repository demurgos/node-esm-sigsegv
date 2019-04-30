import chai from "chai";
import { QsValueReader } from "../../lib/readers/qs-value";
import { IntegerType } from "../../lib/types/integer";
import { runTests } from "../helpers/test";
describe("IntegerType", function () {
    describe("General", function () {
        const type = new IntegerType();
        const items = [
            // Valid values
            { name: "0", value: 0, valid: true },
            { name: "1", value: 1, valid: true },
            { name: "-1", value: -1, valid: true },
            { name: "2", value: 2, valid: true },
            { name: "1e3", value: 1e3, valid: true },
            { name: "-1e3", value: 1e3, valid: true },
            { name: "Number.MAX_SAFE_INTEGER", value: Number.MAX_SAFE_INTEGER, valid: true },
            { name: "Number.MAX_SAFE_INTEGER - 1", value: Number.MAX_SAFE_INTEGER - 1, valid: true },
            { name: "Number.MIN_SAFE_INTEGER", value: Number.MIN_SAFE_INTEGER, valid: true },
            { name: "Number.MIN_SAFE_INTEGER - 1", value: Number.MIN_SAFE_INTEGER - 1, valid: true },
            /* tslint:disable-next-line:restrict-plus-operands */
            { name: "Number.MIN_SAFE_INTEGER + 1", value: Number.MIN_SAFE_INTEGER + 1, valid: true },
            // Invalid values
            { name: "0.5", value: 0.5, valid: false },
            { name: "0.0001", value: 0.0001, valid: false },
            { name: "Number.EPSILON", value: Number.EPSILON, valid: false },
            /* tslint:disable-next-line:restrict-plus-operands */
            { name: "Number.MAX_SAFE_INTEGER + 1", value: Number.MAX_SAFE_INTEGER + 1, valid: false },
            { name: "Number.MIN_SAFE_INTEGER - 2", value: Number.MIN_SAFE_INTEGER - 2, valid: true },
            { name: "Number.MAX_VALUE", value: Number.MAX_VALUE, valid: false },
            /* tslint:disable-next-line:no-construct */
            { name: "new Number(true)", value: new Number(1), valid: false },
            { name: "\"\"", value: "", valid: false },
            { name: "\"0\"", value: "0", valid: false },
            { name: "Infinity", value: Infinity, valid: false },
            { name: "-Infinity", value: -Infinity, valid: false },
            { name: "NaN", value: NaN, valid: false },
            { name: "\"true\"", value: "true", valid: false },
            { name: "\"false\"", value: "false", valid: false },
            { name: "undefined", value: undefined, valid: false },
            { name: "null", value: null, valid: false },
            { name: "[]", value: [], valid: false },
            { name: "{}", value: {}, valid: false },
            { name: "new Date()", value: new Date(), valid: false },
            { name: "/regex/", value: /regex/, valid: false },
        ];
        runTests(type, items);
    });
    it("readQs(val)", function () {
        const qsReader = new QsValueReader();
        const type = new IntegerType();
        chai.assert.strictEqual(type.read(qsReader, "0"), 0);
        chai.assert.strictEqual(type.read(qsReader, "1"), 1);
        chai.assert.strictEqual(type.read(qsReader, "-1"), -1);
        chai.assert.strictEqual(type.read(qsReader, "-1234"), -1234);
        chai.assert.strictEqual(type.read(qsReader, "2147483647"), 2147483647);
        chai.assert.strictEqual(type.read(qsReader, "-2147483648"), -2147483648);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L3R5cGVzL2ludGVnZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsUUFBUSxFQUFjLE1BQU0saUJBQWlCLENBQUM7QUFFdkQsUUFBUSxDQUFDLGFBQWEsRUFBRTtJQUN0QixRQUFRLENBQUMsU0FBUyxFQUFFO1FBQ2xCLE1BQU0sSUFBSSxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRTVDLE1BQU0sS0FBSyxHQUFpQjtZQUMxQixlQUFlO1lBQ2YsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztZQUNsQyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO1lBQ2xDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztZQUNwQyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO1lBQ2xDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7WUFDdEMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztZQUN2QyxFQUFDLElBQUksRUFBRSx5QkFBeUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7WUFDOUUsRUFBQyxJ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LENBQUMsQ0FBQztJQUMzRSxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdHlwZXMvaW50ZWdlci5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSBcImNoYWlcIjtcbmltcG9ydCB7IFFzVmFsdWVSZWFkZXIgfSBmcm9tIFwiLi4vLi4vbGliL3JlYWRlcnMvcXMtdmFsdWVcIjtcbmltcG9ydCB7IEludGVnZXJUeXBlIH0gZnJvbSBcIi4uLy4uL2xpYi90eXBlcy9pbnRlZ2VyXCI7XG5pbXBvcnQgeyBydW5UZXN0cywgVHlwZWRWYWx1ZSB9IGZyb20gXCIuLi9oZWxwZXJzL3Rlc3RcIjtcblxuZGVzY3JpYmUoXCJJbnRlZ2VyVHlwZVwiLCBmdW5jdGlvbiAoKSB7XG4gIGRlc2NyaWJlKFwiR2VuZXJhbFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdHlwZTogSW50ZWdlclR5cGUgPSBuZXcgSW50ZWdlclR5cGUoKTtcblxuICAgIGNvbnN0IGl0ZW1zOiBUeXBlZFZhbHVlW10gPSBbXG4gICAgICAvLyBWYWxpZCB2YWx1ZXNcbiAgICAgIHtuYW1lOiBcIjBcIiwgdmFsdWU6IDAsIHZhbGlkOiB0cnVlfSxcbiAgICAgIHtuYW1lOiBcIjFcIiwgdmFsdWU6IDEsIHZhbGlkOiB0cnVlfSxcbiAgICAgIHtuYW1lOiBcIi0xXCIsIHZhbHVlOiAtMSwgdmFsaWQ6IHRydWV9LFxuICAgICAge25hbWU6IFwiMlwiLCB2YWx1ZTogMiwgdmFsaWQ6IHRydWV9LFxuICAgICAge25hbWU6IFwiMWUzXCIsIHZhbHVlOiAxZTMsIHZhbGlkOiB0cnVlfSxcbiAgICAgIHtuYW1lOiBcIi0xZTNcIiwgdmFsdWU6IDFlMywgdmFsaWQ6IHRydWV9LFxuICAgICAge25hbWU6IFwiTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJcIiwgdmFsdWU6IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLCB2YWxpZDogdHJ1ZX0sXG4gICAgICB7bmFtZTogXCJOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiAtIDFcIiwgdmFsdWU6IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIC0gMSwgdmFsaWQ6IHRydWV9LFxuICAgICAge25hbWU6IFwiTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVJcIiwgdmFsdWU6IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSLCB2YWxpZDogdHJ1ZX0sXG4gICAgICB7bmFtZTogXCJOdW1iZXIuTUlOX1NBRkVfSU5URUdFUiAtIDFcIiwgdmFsdWU6IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSIC0gMSwgdmFsaWQ6IHRydWV9LFxuICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnJlc3RyaWN0LXBsdXMtb3BlcmFuZHMgKi9cbiAgICAgIHtuYW1lOiBcIk51bWJlci5NSU5fU0FGRV9JTlRFR0VSICsgMVwiLCB2YWx1ZTogTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIgKyAxLCB2YWxpZDogdHJ1ZX0sXG4gICAgICAvLyBJbnZhbGlkIHZhbHVlc1xuICAgICAge25hbWU6IFwiMC41XCIsIHZhbHVlOiAwLjUsIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCIwLjAwMDFcIiwgdmFsdWU6IDAuMDAwMSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIk51bWJlci5FUFNJTE9OXCIsIHZhbHVlOiBOdW1iZXIuRVBTSUxPTiwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpyZXN0cmljdC1wbHVzLW9wZXJhbmRzICovXG4gICAgICB7bmFtZTogXCJOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiArIDFcIiwgdmFsdWU6IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSICsgMSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIk51bWJlci5NSU5fU0FGRV9JTlRFR0VSIC0gMlwiLCB2YWx1ZTogTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIgLSAyLCB2YWxpZDogdHJ1ZX0sXG4gICAgICB7bmFtZTogXCJOdW1iZXIuTUFYX1ZBTFVFXCIsIHZhbHVlOiBOdW1iZXIuTUFYX1ZBTFVFLCB2YWxpZDogZmFsc2V9LFxuICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnN0cnVjdCAqL1xuICAgICAge25hbWU6IFwibmV3IE51bWJlcih0cnVlKVwiLCB2YWx1ZTogbmV3IE51bWJlcigxKSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIlxcXCJcXFwiXCIsIHZhbHVlOiBcIlwiLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiXFxcIjBcXFwiXCIsIHZhbHVlOiBcIjBcIiwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIkluZmluaXR5XCIsIHZhbHVlOiBJbmZpbml0eSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIi1JbmZpbml0eVwiLCB2YWx1ZTogLUluZmluaXR5LCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiTmFOXCIsIHZhbHVlOiBOYU4sIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJcXFwidHJ1ZVxcXCJcIiwgdmFsdWU6IFwidHJ1ZVwiLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiXFxcImZhbHNlXFxcIlwiLCB2YWx1ZTogXCJmYWxzZVwiLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwidW5kZWZpbmVkXCIsIHZhbHVlOiB1bmRlZmluZWQsIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJudWxsXCIsIHZhbHVlOiBudWxsLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiW11cIiwgdmFsdWU6IFtdLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwie31cIiwgdmFsdWU6IHt9LCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwibmV3IERhdGUoKVwiLCB2YWx1ZTogbmV3IERhdGUoKSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIi9yZWdleC9cIiwgdmFsdWU6IC9yZWdleC8sIHZhbGlkOiBmYWxzZX0sXG4gICAgXTtcblxuICAgIHJ1blRlc3RzKHR5cGUsIGl0ZW1zKTtcbiAgfSk7XG5cbiAgaXQoXCJyZWFkUXModmFsKVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgcXNSZWFkZXI6IFFzVmFsdWVSZWFkZXIgPSBuZXcgUXNWYWx1ZVJlYWRlcigpO1xuICAgIGNvbnN0IHR5cGU6IEludGVnZXJUeXBlID0gbmV3IEludGVnZXJUeXBlKCk7XG4gICAgY2hhaS5hc3NlcnQuc3RyaWN0RXF1YWwodHlwZS5yZWFkKHFzUmVhZGVyLCBcIjBcIiksIDApO1xuICAgIGNoYWkuYXNzZXJ0LnN0cmljdEVxdWFsKHR5cGUucmVhZChxc1JlYWRlciwgXCIxXCIpLCAxKTtcbiAgICBjaGFpLmFzc2VydC5zdHJpY3RFcXVhbCh0eXBlLnJlYWQocXNSZWFkZXIsIFwiLTFcIiksIC0xKTtcbiAgICBjaGFpLmFzc2VydC5zdHJpY3RFcXVhbCh0eXBlLnJlYWQocXNSZWFkZXIsIFwiLTEyMzRcIiksIC0xMjM0KTtcbiAgICBjaGFpLmFzc2VydC5zdHJpY3RFcXVhbCh0eXBlLnJlYWQocXNSZWFkZXIsIFwiMjE0NzQ4MzY0N1wiKSwgMjE0NzQ4MzY0Nyk7XG4gICAgY2hhaS5hc3NlcnQuc3RyaWN0RXF1YWwodHlwZS5yZWFkKHFzUmVhZGVyLCBcIi0yMTQ3NDgzNjQ4XCIpLCAtMjE0NzQ4MzY0OCk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=