"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const boolean_1 = require("../../lib/types/boolean");
const test_1 = require("../helpers/test");
describe("BooleanType", function () {
    const type = new boolean_1.BooleanType();
    const items = [
        { name: "true", value: true, valid: true },
        { name: "false", value: false, valid: true },
        // tslint:disable-next-line:no-construct
        { name: "new Boolean(true)", value: new Boolean(true), valid: false },
        // tslint:disable-next-line:no-construct
        { name: "new Boolean(false)", value: new Boolean(false), valid: false },
        { name: "0", value: 0, valid: false },
        { name: "1", value: 1, valid: false },
        { name: "\"\"", value: "", valid: false },
        { name: "\"0\"", value: "0", valid: false },
        { name: "\"true\"", value: "true", valid: false },
        { name: "\"false\"", value: "false", valid: false },
        { name: "Infinity", value: Infinity, valid: false },
        { name: "-Infinity", value: -Infinity, valid: false },
        { name: "NaN", value: NaN, valid: false },
        { name: "undefined", value: undefined, valid: false },
        { name: "null", value: null, valid: false },
        { name: "[]", value: [], valid: false },
        { name: "{}", value: {}, valid: false },
        { name: "new Date()", value: new Date(), valid: false },
        { name: "/regex/", value: /regex/, valid: false },
    ];
    test_1.runTests(type, items);
    describe("lte", function () {
        const $Boolean = new boolean_1.BooleanType();
        const testItems = [
            { left: false, right: false, expected: true },
            { left: false, right: true, expected: true },
            { left: true, right: false, expected: false },
            { left: true, right: true, expected: true },
        ];
        for (const { left, right, expected } of testItems) {
            it(`.lte(${left}, ${right}) should return ${expected}`, function () {
                chai_1.default.assert.strictEqual($Boolean.lte(left, right), expected);
            });
        }
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L3R5cGVzL2Jvb2xlYW4uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUF3QjtBQUN4QixxREFBc0Q7QUFDdEQsMENBQXVEO0FBRXZELFFBQVEsQ0FBQyxhQUFhLEVBQUU7SUFDdEIsTUFBTSxJQUFJLEdBQWdCLElBQUkscUJBQVcsRUFBRSxDQUFDO0lBRTVDLE1BQU0sS0FBSyxHQUFpQjtRQUMxQixFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO1FBQ3hDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7UUFFMUMsd0NBQXdDO1FBQ3hDLEVBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1FBQ25FLHdDQUF3QztRQUN4QyxFQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztRQUNyRSxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1FBQ25DLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7UUFDbkMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztRQUN2QyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1FBQ3pDLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7UUFDL0MsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztRQUNqRCxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1FBQ2pELEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztRQUNuRCxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1FBQ3ZDLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7UUFDbkQsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztRQUN6QyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1FBQ3JDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7UUFDckMsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7UUFDckQsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztLQUNoRCxDQUFDO0lBRUYsZUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUV0QixRQUFRLENBQUMsS0FBSyxFQUFFO1FBQ2QsTUFBTSxRQUFRLEdBQWdCLElBQUkscUJBQVcsRUFBRSxDQUFDO1FBUWhELE1BQU0sU0FBUyxHQUFlO1lBQzVCLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7WUFDM0MsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztZQUMxQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDO1lBQzNDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7U0FDMUMsQ0FBQztRQUVGLEtBQUssTUFBTSxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFDLElBQUksU0FBUyxFQUFFO1lBQy9DLEVBQUUsQ0FBQyxRQUFRLElBQUksS0FBSyxLQUFLLG1CQUFtQixRQUFRLEVBQUUsRUFBRTtnQkFDdEQsY0FBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDL0QsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC90eXBlcy9ib29sZWFuLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tIFwiY2hhaVwiO1xuaW1wb3J0IHsgQm9vbGVhblR5cGUgfSBmcm9tIFwiLi4vLi4vbGliL3R5cGVzL2Jvb2xlYW5cIjtcbmltcG9ydCB7IHJ1blRlc3RzLCBUeXBlZFZhbHVlIH0gZnJvbSBcIi4uL2hlbHBlcnMvdGVzdFwiO1xuXG5kZXNjcmliZShcIkJvb2xlYW5UeXBlXCIsIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgdHlwZTogQm9vbGVhblR5cGUgPSBuZXcgQm9vbGVhblR5cGUoKTtcblxuICBjb25zdCBpdGVtczogVHlwZWRWYWx1ZVtdID0gW1xuICAgIHtuYW1lOiBcInRydWVcIiwgdmFsdWU6IHRydWUsIHZhbGlkOiB0cnVlfSxcbiAgICB7bmFtZTogXCJmYWxzZVwiLCB2YWx1ZTogZmFsc2UsIHZhbGlkOiB0cnVlfSxcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zdHJ1Y3RcbiAgICB7bmFtZTogXCJuZXcgQm9vbGVhbih0cnVlKVwiLCB2YWx1ZTogbmV3IEJvb2xlYW4odHJ1ZSksIHZhbGlkOiBmYWxzZX0sXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnN0cnVjdFxuICAgIHtuYW1lOiBcIm5ldyBCb29sZWFuKGZhbHNlKVwiLCB2YWx1ZTogbmV3IEJvb2xlYW4oZmFsc2UpLCB2YWxpZDogZmFsc2V9LFxuICAgIHtuYW1lOiBcIjBcIiwgdmFsdWU6IDAsIHZhbGlkOiBmYWxzZX0sXG4gICAge25hbWU6IFwiMVwiLCB2YWx1ZTogMSwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCJcXFwiXFxcIlwiLCB2YWx1ZTogXCJcIiwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCJcXFwiMFxcXCJcIiwgdmFsdWU6IFwiMFwiLCB2YWxpZDogZmFsc2V9LFxuICAgIHtuYW1lOiBcIlxcXCJ0cnVlXFxcIlwiLCB2YWx1ZTogXCJ0cnVlXCIsIHZhbGlkOiBmYWxzZX0sXG4gICAge25hbWU6IFwiXFxcImZhbHNlXFxcIlwiLCB2YWx1ZTogXCJmYWxzZVwiLCB2YWxpZDogZmFsc2V9LFxuICAgIHtuYW1lOiBcIkluZmluaXR5XCIsIHZhbHVlOiBJbmZpbml0eSwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCItSW5maW5pdHlcIiwgdmFsdWU6IC1JbmZpbml0eSwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCJOYU5cIiwgdmFsdWU6IE5hTiwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCJ1bmRlZmluZWRcIiwgdmFsdWU6IHVuZGVmaW5lZCwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCJudWxsXCIsIHZhbHVlOiBudWxsLCB2YWxpZDogZmFsc2V9LFxuICAgIHtuYW1lOiBcIltdXCIsIHZhbHVlOiBbXSwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCJ7fVwiLCB2YWx1ZToge30sIHZhbGlkOiBmYWxzZX0sXG4gICAge25hbWU6IFwibmV3IERhdGUoKVwiLCB2YWx1ZTogbmV3IERhdGUoKSwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCIvcmVnZXgvXCIsIHZhbHVlOiAvcmVnZXgvLCB2YWxpZDogZmFsc2V9LFxuICBdO1xuXG4gIHJ1blRlc3RzKHR5cGUsIGl0ZW1zKTtcblxuICBkZXNjcmliZShcImx0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgJEJvb2xlYW46IEJvb2xlYW5UeXBlID0gbmV3IEJvb2xlYW5UeXBlKCk7XG5cbiAgICBpbnRlcmZhY2UgVGVzdEl0ZW0ge1xuICAgICAgbGVmdDogYm9vbGVhbjtcbiAgICAgIHJpZ2h0OiBib29sZWFuO1xuICAgICAgZXhwZWN0ZWQ6IGJvb2xlYW47XG4gICAgfVxuXG4gICAgY29uc3QgdGVzdEl0ZW1zOiBUZXN0SXRlbVtdID0gW1xuICAgICAge2xlZnQ6IGZhbHNlLCByaWdodDogZmFsc2UsIGV4cGVjdGVkOiB0cnVlfSxcbiAgICAgIHtsZWZ0OiBmYWxzZSwgcmlnaHQ6IHRydWUsIGV4cGVjdGVkOiB0cnVlfSxcbiAgICAgIHtsZWZ0OiB0cnVlLCByaWdodDogZmFsc2UsIGV4cGVjdGVkOiBmYWxzZX0sXG4gICAgICB7bGVmdDogdHJ1ZSwgcmlnaHQ6IHRydWUsIGV4cGVjdGVkOiB0cnVlfSxcbiAgICBdO1xuXG4gICAgZm9yIChjb25zdCB7bGVmdCwgcmlnaHQsIGV4cGVjdGVkfSBvZiB0ZXN0SXRlbXMpIHtcbiAgICAgIGl0KGAubHRlKCR7bGVmdH0sICR7cmlnaHR9KSBzaG91bGQgcmV0dXJuICR7ZXhwZWN0ZWR9YCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBjaGFpLmFzc2VydC5zdHJpY3RFcXVhbCgkQm9vbGVhbi5sdGUobGVmdCwgcmlnaHQpLCBleHBlY3RlZCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=