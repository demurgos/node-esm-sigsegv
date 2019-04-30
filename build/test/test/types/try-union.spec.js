"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = __importDefault(require("bson"));
const chai_1 = __importDefault(require("chai"));
const case_style_1 = require("../../lib/case-style");
const json_value_1 = require("../../lib/readers/json-value");
const document_1 = require("../../lib/types/document");
const integer_1 = require("../../lib/types/integer");
const try_union_1 = require("../../lib/types/try-union");
const test_1 = require("../helpers/test");
const bsonSerializer = new bson_1.default.BSON();
describe("TryUnion", function () {
    describe("TryUnion<Shape>", function () {
        const $Rectangle = new document_1.DocumentType({
            properties: {
                width: { type: new integer_1.IntegerType() },
                height: { type: new integer_1.IntegerType() },
            },
            changeCase: case_style_1.CaseStyle.KebabCase,
        });
        const $Circle = new document_1.DocumentType({
            properties: {
                radius: { type: new integer_1.IntegerType() },
            },
            changeCase: case_style_1.CaseStyle.KebabCase,
        });
        const $Shape = new try_union_1.TryUnionType({
            variants: [$Rectangle, $Circle],
        });
        const items = [
            {
                name: "Rectangle {width: 10, height: 20}",
                value: {
                    width: 10,
                    height: 20,
                },
                valid: true,
                output: {
                    bson: bsonSerializer.serialize({ width: 10, height: 20 }),
                    json: "{\"width\":10,\"height\":20}",
                    qs: "width=10&height=20",
                },
            },
            {
                name: "Circle {radius: 15}",
                value: {
                    radius: 15,
                },
                valid: true,
                output: {
                    bson: bsonSerializer.serialize({ radius: 15 }),
                    json: "{\"radius\":15}",
                    qs: "radius=15",
                },
            },
            {
                name: "{}",
                value: {},
                valid: false,
            },
            {
                name: "{type: \"circle\", radius: true}",
                value: {
                    type: "circle",
                    radius: true,
                },
                valid: false,
            },
            { name: "\"foo\"", value: "bar", valid: false },
            { name: "0", value: 0, valid: false },
            { name: "1", value: 1, valid: false },
            { name: "\"\"", value: "", valid: false },
            { name: "\"0\"", value: "0", valid: false },
            { name: "true", value: true, valid: false },
            { name: "false", value: false, valid: false },
            { name: "Infinity", value: Infinity, valid: false },
            { name: "-Infinity", value: -Infinity, valid: false },
            { name: "new Date(\"1247-05-18T19:40:08.418Z\")", value: new Date("1247-05-18T19:40:08.418Z"), valid: false },
            { name: "NaN", value: NaN, valid: false },
            { name: "undefined", value: undefined, valid: false },
            { name: "null", value: null, valid: false },
            { name: "[]", value: [], valid: false },
            { name: "{}", value: {}, valid: false },
            { name: "/regex/", value: /regex/, valid: false },
        ];
        test_1.runTests($Shape, items);
        const jsonValueReader = new json_value_1.JsonValueReader();
        it(".readTrustedWithVariant should return $Rectangle", () => {
            const { variant } = $Shape.variantRead(jsonValueReader, { width: 10, height: 20 });
            chai_1.default.assert.strictEqual(variant, $Rectangle);
        });
        it(".readTrustedWithVariant should return $Circle", () => {
            const { variant } = $Shape.variantRead(jsonValueReader, { radius: 15 });
            chai_1.default.assert.strictEqual(variant, $Circle);
        });
        // it(".testWithVariant should return [true, $Rectangle]", () => {
        //   const [test, variant] = $Shape.testWithVariant({width: 10, height: 20});
        //   assert.strictEqual(test, true);
        //   assert.strictEqual(variant, $Rectangle);
        // });
        //
        // it(".testWithVariant should return [true, $Circle]", () => {
        //   const [test, variant] = $Shape.testWithVariant({radius: 15});
        //   assert.strictEqual(test, true);
        //   assert.strictEqual(variant, $Circle);
        // });
        // it(".testWithVariant should return [false, undefined]", () => {
        //   const [test, variant] = $Shape.testWithVariant({length: 25} as any);
        //   assert.strictEqual(test, false);
        //   assert.strictEqual(variant, undefined);
        // });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L3R5cGVzL3RyeS11bmlvbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLGdEQUF3QjtBQUN4QixxREFBaUQ7QUFDakQsNkRBQStEO0FBQy9ELHVEQUF3RDtBQUN4RCxxREFBc0Q7QUFDdEQseURBQXlEO0FBQ3pELDBDQUF1RDtBQUV2RCxNQUFNLGNBQWMsR0FBYyxJQUFJLGNBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUVsRCxRQUFRLENBQUMsVUFBVSxFQUFFO0lBQ25CLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQU0xQixNQUFNLFVBQVUsR0FBNEIsSUFBSSx1QkFBWSxDQUFZO1lBQ3RFLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxxQkFBVyxFQUFFLEVBQUM7Z0JBQ2hDLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLHFCQUFXLEVBQUUsRUFBQzthQUNsQztZQUNELFVBQVUsRUFBRSxzQkFBUyxDQUFDLFNBQVM7U0FDaEMsQ0FBQyxDQUFDO1FBTUgsTUFBTSxPQUFPLEdBQXlCLElBQUksdUJBQVksQ0FBUztZQUM3RCxVQUFVLEVBQUU7Z0JBQ1YsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUkscUJBQVcsRUFBRSxFQUFDO2FBQ2xDO1lBQ0QsVUFBVSxFQUFFLHNCQUFTLENBQUMsU0FBUztTQUNoQyxDQUFDLENBQUM7UUFHSCxNQUFNLE1BQU0sR0FBd0IsSUFBSSx3QkFBWSxDQUFRO1lBQzFELFFBQVEsRUFBRSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7U0FDaEMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxLQUFLLEdBQWlCO1lBQzFCO2dCQUNFLElBQUksRUFBRSxtQ0FBbUM7Z0JBQ3pDLEtBQUssRUFBYztvQkFDakIsS0FBSyxFQUFFLEVBQUU7b0JBQ1QsTUFBTSxFQUFFLEVBQUU7aUJBQ1g7Z0JBQ0QsS0FBSyxFQUFFLElB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Q0FBQztRQUV4QixNQUFNLGVBQWUsR0FBb0IsSUFBSSw0QkFBZSxFQUFFLENBQUM7UUFFL0QsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLEdBQUcsRUFBRTtZQUMxRCxNQUFNLEVBQUMsT0FBTyxFQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDO1lBQy9FLGNBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxHQUFHLEVBQUU7WUFDdkQsTUFBTSxFQUFDLE9BQU8sRUFBQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLEVBQUMsTUFBTSxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7WUFDcEUsY0FBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO1FBRUgsa0VBQWtFO1FBQ2xFLDZFQUE2RTtRQUM3RSxvQ0FBb0M7UUFDcEMsNkNBQTZDO1FBQzdDLE1BQU07UUFDTixFQUFFO1FBQ0YsK0RBQStEO1FBQy9ELGtFQUFrRTtRQUNsRSxvQ0FBb0M7UUFDcEMsMENBQTBDO1FBQzFDLE1BQU07UUFFTixrRUFBa0U7UUFDbEUseUVBQXlFO1FBQ3pFLHFDQUFxQztRQUNyQyw0Q0FBNEM7UUFDNUMsTUFBTTtJQUNSLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC90eXBlcy90cnktdW5pb24uc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBic29uIGZyb20gXCJic29uXCI7XG5pbXBvcnQgY2hhaSBmcm9tIFwiY2hhaVwiO1xuaW1wb3J0IHsgQ2FzZVN0eWxlIH0gZnJvbSBcIi4uLy4uL2xpYi9jYXNlLXN0eWxlXCI7XG5pbXBvcnQgeyBKc29uVmFsdWVSZWFkZXIgfSBmcm9tIFwiLi4vLi4vbGliL3JlYWRlcnMvanNvbi12YWx1ZVwiO1xuaW1wb3J0IHsgRG9jdW1lbnRUeXBlIH0gZnJvbSBcIi4uLy4uL2xpYi90eXBlcy9kb2N1bWVudFwiO1xuaW1wb3J0IHsgSW50ZWdlclR5cGUgfSBmcm9tIFwiLi4vLi4vbGliL3R5cGVzL2ludGVnZXJcIjtcbmltcG9ydCB7IFRyeVVuaW9uVHlwZSB9IGZyb20gXCIuLi8uLi9saWIvdHlwZXMvdHJ5LXVuaW9uXCI7XG5pbXBvcnQgeyBydW5UZXN0cywgVHlwZWRWYWx1ZSB9IGZyb20gXCIuLi9oZWxwZXJzL3Rlc3RcIjtcblxuY29uc3QgYnNvblNlcmlhbGl6ZXI6IGJzb24uQlNPTiA9IG5ldyBic29uLkJTT04oKTtcblxuZGVzY3JpYmUoXCJUcnlVbmlvblwiLCBmdW5jdGlvbiAoKSB7XG4gIGRlc2NyaWJlKFwiVHJ5VW5pb248U2hhcGU+XCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpbnRlcmZhY2UgUmVjdGFuZ2xlIHtcbiAgICAgIHdpZHRoOiBudW1iZXI7XG4gICAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICB9XG5cbiAgICBjb25zdCAkUmVjdGFuZ2xlOiBEb2N1bWVudFR5cGU8UmVjdGFuZ2xlPiA9IG5ldyBEb2N1bWVudFR5cGU8UmVjdGFuZ2xlPih7XG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHdpZHRoOiB7dHlwZTogbmV3IEludGVnZXJUeXBlKCl9LFxuICAgICAgICBoZWlnaHQ6IHt0eXBlOiBuZXcgSW50ZWdlclR5cGUoKX0sXG4gICAgICB9LFxuICAgICAgY2hhbmdlQ2FzZTogQ2FzZVN0eWxlLktlYmFiQ2FzZSxcbiAgICB9KTtcblxuICAgIGludGVyZmFjZSBDaXJjbGUge1xuICAgICAgcmFkaXVzOiBudW1iZXI7XG4gICAgfVxuXG4gICAgY29uc3QgJENpcmNsZTogRG9jdW1lbnRUeXBlPENpcmNsZT4gPSBuZXcgRG9jdW1lbnRUeXBlPENpcmNsZT4oe1xuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICByYWRpdXM6IHt0eXBlOiBuZXcgSW50ZWdlclR5cGUoKX0sXG4gICAgICB9LFxuICAgICAgY2hhbmdlQ2FzZTogQ2FzZVN0eWxlLktlYmFiQ2FzZSxcbiAgICB9KTtcblxuICAgIHR5cGUgU2hhcGUgPSBSZWN0YW5nbGUgfCBDaXJjbGU7XG4gICAgY29uc3QgJFNoYXBlOiBUcnlVbmlvblR5cGU8U2hhcGU+ID0gbmV3IFRyeVVuaW9uVHlwZTxTaGFwZT4oe1xuICAgICAgdmFyaWFudHM6IFskUmVjdGFuZ2xlLCAkQ2lyY2xlXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGl0ZW1zOiBUeXBlZFZhbHVlW10gPSBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwiUmVjdGFuZ2xlIHt3aWR0aDogMTAsIGhlaWdodDogMjB9XCIsXG4gICAgICAgIHZhbHVlOiA8UmVjdGFuZ2xlPiB7XG4gICAgICAgICAgd2lkdGg6IDEwLFxuICAgICAgICAgIGhlaWdodDogMjAsXG4gICAgICAgIH0sXG4gICAgICAgIHZhbGlkOiB0cnVlLFxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBic29uOiBic29uU2VyaWFsaXplci5zZXJpYWxpemUoe3dpZHRoOiAxMCwgaGVpZ2h0OiAyMH0pLFxuICAgICAgICAgIGpzb246IFwie1xcXCJ3aWR0aFxcXCI6MTAsXFxcImhlaWdodFxcXCI6MjB9XCIsXG4gICAgICAgICAgcXM6IFwid2lkdGg9MTAmaGVpZ2h0PTIwXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiBcIkNpcmNsZSB7cmFkaXVzOiAxNX1cIixcbiAgICAgICAgdmFsdWU6IDxDaXJjbGU+IHtcbiAgICAgICAgICByYWRpdXM6IDE1LFxuICAgICAgICB9LFxuICAgICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgYnNvbjogYnNvblNlcmlhbGl6ZXIuc2VyaWFsaXplKHtyYWRpdXM6IDE1fSksXG4gICAgICAgICAganNvbjogXCJ7XFxcInJhZGl1c1xcXCI6MTV9XCIsXG4gICAgICAgICAgcXM6IFwicmFkaXVzPTE1XCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwie31cIixcbiAgICAgICAgdmFsdWU6IHt9LFxuICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiBcInt0eXBlOiBcXFwiY2lyY2xlXFxcIiwgcmFkaXVzOiB0cnVlfVwiLFxuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgIHR5cGU6IFwiY2lyY2xlXCIsXG4gICAgICAgICAgcmFkaXVzOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICB9LFxuICAgICAge25hbWU6IFwiXFxcImZvb1xcXCJcIiwgdmFsdWU6IFwiYmFyXCIsIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCIwXCIsIHZhbHVlOiAwLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiMVwiLCB2YWx1ZTogMSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIlxcXCJcXFwiXCIsIHZhbHVlOiBcIlwiLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiXFxcIjBcXFwiXCIsIHZhbHVlOiBcIjBcIiwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcInRydWVcIiwgdmFsdWU6IHRydWUsIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJmYWxzZVwiLCB2YWx1ZTogZmFsc2UsIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJJbmZpbml0eVwiLCB2YWx1ZTogSW5maW5pdHksIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCItSW5maW5pdHlcIiwgdmFsdWU6IC1JbmZpbml0eSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIm5ldyBEYXRlKFxcXCIxMjQ3LTA1LTE4VDE5OjQwOjA4LjQxOFpcXFwiKVwiLCB2YWx1ZTogbmV3IERhdGUoXCIxMjQ3LTA1LTE4VDE5OjQwOjA4LjQxOFpcIiksIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJOYU5cIiwgdmFsdWU6IE5hTiwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcInVuZGVmaW5lZFwiLCB2YWx1ZTogdW5kZWZpbmVkLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwibnVsbFwiLCB2YWx1ZTogbnVsbCwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIltdXCIsIHZhbHVlOiBbXSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcInt9XCIsIHZhbHVlOiB7fSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIi9yZWdleC9cIiwgdmFsdWU6IC9yZWdleC8sIHZhbGlkOiBmYWxzZX0sXG4gICAgXTtcblxuICAgIHJ1blRlc3RzKCRTaGFwZSwgaXRlbXMpO1xuXG4gICAgY29uc3QganNvblZhbHVlUmVhZGVyOiBKc29uVmFsdWVSZWFkZXIgPSBuZXcgSnNvblZhbHVlUmVhZGVyKCk7XG5cbiAgICBpdChcIi5yZWFkVHJ1c3RlZFdpdGhWYXJpYW50IHNob3VsZCByZXR1cm4gJFJlY3RhbmdsZVwiLCAoKSA9PiB7XG4gICAgICBjb25zdCB7dmFyaWFudH0gPSAkU2hhcGUudmFyaWFudFJlYWQoanNvblZhbHVlUmVhZGVyLCB7d2lkdGg6IDEwLCBoZWlnaHQ6IDIwfSk7XG4gICAgICBjaGFpLmFzc2VydC5zdHJpY3RFcXVhbCh2YXJpYW50LCAkUmVjdGFuZ2xlKTtcbiAgICB9KTtcblxuICAgIGl0KFwiLnJlYWRUcnVzdGVkV2l0aFZhcmlhbnQgc2hvdWxkIHJldHVybiAkQ2lyY2xlXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHt2YXJpYW50fSA9ICRTaGFwZS52YXJpYW50UmVhZChqc29uVmFsdWVSZWFkZXIsIHtyYWRpdXM6IDE1fSk7XG4gICAgICBjaGFpLmFzc2VydC5zdHJpY3RFcXVhbCh2YXJpYW50LCAkQ2lyY2xlKTtcbiAgICB9KTtcblxuICAgIC8vIGl0KFwiLnRlc3RXaXRoVmFyaWFudCBzaG91bGQgcmV0dXJuIFt0cnVlLCAkUmVjdGFuZ2xlXVwiLCAoKSA9PiB7XG4gICAgLy8gICBjb25zdCBbdGVzdCwgdmFyaWFudF0gPSAkU2hhcGUudGVzdFdpdGhWYXJpYW50KHt3aWR0aDogMTAsIGhlaWdodDogMjB9KTtcbiAgICAvLyAgIGFzc2VydC5zdHJpY3RFcXVhbCh0ZXN0LCB0cnVlKTtcbiAgICAvLyAgIGFzc2VydC5zdHJpY3RFcXVhbCh2YXJpYW50LCAkUmVjdGFuZ2xlKTtcbiAgICAvLyB9KTtcbiAgICAvL1xuICAgIC8vIGl0KFwiLnRlc3RXaXRoVmFyaWFudCBzaG91bGQgcmV0dXJuIFt0cnVlLCAkQ2lyY2xlXVwiLCAoKSA9PiB7XG4gICAgLy8gICBjb25zdCBbdGVzdCwgdmFyaWFudF0gPSAkU2hhcGUudGVzdFdpdGhWYXJpYW50KHtyYWRpdXM6IDE1fSk7XG4gICAgLy8gICBhc3NlcnQuc3RyaWN0RXF1YWwodGVzdCwgdHJ1ZSk7XG4gICAgLy8gICBhc3NlcnQuc3RyaWN0RXF1YWwodmFyaWFudCwgJENpcmNsZSk7XG4gICAgLy8gfSk7XG5cbiAgICAvLyBpdChcIi50ZXN0V2l0aFZhcmlhbnQgc2hvdWxkIHJldHVybiBbZmFsc2UsIHVuZGVmaW5lZF1cIiwgKCkgPT4ge1xuICAgIC8vICAgY29uc3QgW3Rlc3QsIHZhcmlhbnRdID0gJFNoYXBlLnRlc3RXaXRoVmFyaWFudCh7bGVuZ3RoOiAyNX0gYXMgYW55KTtcbiAgICAvLyAgIGFzc2VydC5zdHJpY3RFcXVhbCh0ZXN0LCBmYWxzZSk7XG4gICAgLy8gICBhc3NlcnQuc3RyaWN0RXF1YWwodmFyaWFudCwgdW5kZWZpbmVkKTtcbiAgICAvLyB9KTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
