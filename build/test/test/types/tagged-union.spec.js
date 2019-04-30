"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = __importDefault(require("bson"));
const case_style_1 = require("../../lib/case-style");
const document_1 = require("../../lib/types/document");
const integer_1 = require("../../lib/types/integer");
const literal_1 = require("../../lib/types/literal");
const tagged_union_1 = require("../../lib/types/tagged-union");
const ts_enum_1 = require("../../lib/types/ts-enum");
const test_1 = require("../helpers/test");
const bsonSerializer = new bson_1.default.BSON();
describe("TaggedUnion", function () {
    describe("TaggedUnion<Shape>", function () {
        let ShapeType;
        (function (ShapeType) {
            ShapeType[ShapeType["Rectangle"] = 0] = "Rectangle";
            ShapeType[ShapeType["Circle"] = 1] = "Circle";
        })(ShapeType || (ShapeType = {}));
        const shapeTypeType = new ts_enum_1.TsEnumType({
            enum: ShapeType,
            changeCase: case_style_1.CaseStyle.KebabCase,
        });
        const rectangleType = new document_1.DocumentType({
            properties: {
                type: {
                    type: new literal_1.LiteralType({
                        type: shapeTypeType,
                        value: ShapeType.Rectangle,
                    }),
                },
                width: { type: new integer_1.IntegerType() },
                height: { type: new integer_1.IntegerType() },
            },
        });
        const circleType = new document_1.DocumentType({
            properties: {
                type: {
                    type: new literal_1.LiteralType({
                        type: shapeTypeType,
                        value: ShapeType.Circle,
                    }),
                },
                radius: { type: new integer_1.IntegerType() },
            },
        });
        const shapeType = new tagged_union_1.TaggedUnionType(() => ({
            variants: [rectangleType, circleType],
            tag: "type",
        }));
        const items = [
            {
                name: "Rectangle {type: ShapeType.Rectangle, width: 10, height: 20}",
                value: {
                    type: ShapeType.Rectangle,
                    width: 10,
                    height: 20,
                },
                valid: true,
                output: {
                    bson: bsonSerializer.serialize({ type: "rectangle", width: 10, height: 20 }),
                    json: "{\"type\":\"rectangle\",\"width\":10,\"height\":20}",
                    qs: "type=rectangle&width=10&height=20",
                },
            },
            {
                name: "Circle {type: ShapeType.Circle, radius: 15}",
                value: {
                    type: ShapeType.Circle,
                    radius: 15,
                },
                valid: true,
                output: {
                    bson: bsonSerializer.serialize({ type: "circle", radius: 15 }),
                    json: "{\"type\":\"circle\",\"radius\":15}",
                    qs: "type=circle&radius=15",
                },
            },
            {
                name: "{type: ShapeType.Circle}",
                value: {
                    type: ShapeType.Circle,
                },
                valid: false,
            },
            {
                name: "{radius: 15}",
                value: {
                    radius: 15,
                },
                valid: false,
            },
            {
                name: "{type: ShapeType.Circle, radius: true}",
                value: {
                    type: ShapeType.Circle,
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
        test_1.runTests(shapeType, items);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L3R5cGVzL3RhZ2dlZC11bmlvbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLHFEQUFpRDtBQUNqRCx1REFBd0Q7QUFDeEQscURBQXNEO0FBQ3RELHFEQUFzRDtBQUN0RCwrREFBK0Q7QUFDL0QscURBQXFEO0FBQ3JELDBDQUF1RDtBQUV2RCxNQUFNLGNBQWMsR0FBYyxJQUFJLGNBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUVsRCxRQUFRLENBQUMsYUFBYSxFQUFFO0lBQ3RCLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtRQUM3QixJQUFLLFNBR0o7UUFIRCxXQUFLLFNBQVM7WUFDWixtREFBUyxDQUFBO1lBQ1QsNkNBQU0sQ0FBQTtRQUNSLENBQUMsRUFISSxTQUFTLEtBQVQsU0FBUyxRQUdiO1FBRUQsTUFBTSxhQUFhLEdBQTBCLElBQUksb0JBQVUsQ0FBQztZQUMxRCxJQUFJLEVBQUUsU0FBUztZQUNmLFVBQVUsRUFBRSxzQkFBUyxDQUFDLFNBQVM7U0FDaEMsQ0FBQyxDQUFDO1FBUUgsTUFBTSxhQUFhLEdBQTRCLElBQUksdUJBQVksQ0FBWTtZQUN6RSxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFO29CQUNKLElBQUksRUFBRSxJQUFJLHFCQUFXLENBQXNCO3dCQUN6QyxJQUFJLEVBQUUsYUFBYTt3QkFDbkIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxTQUFTO3FCQUMzQixDQUFDO2lCQUNIO2dCQUNELEtBQUssRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLHFCQUFXLEVBQUUsRUFBQztnQkFDaEMsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUkscUJBQVcsRUFBRSxFQUFDO2FBQ2xDO1NBQ0YsQ0FBQyxDQUFDO1FBT0gsTUFBTSxVQUFVLEdBQXlCLElBQUksdUJBQVksQ0FBUztZQUNoRSxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFO29CQUNKLElBQUksRUFBRSxJQUFJLHFC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QUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1lBQ2pELEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztZQUNuRCxFQUFDLElBQUksRUFBRSx3Q0FBd0MsRUFBRSxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsMEJBQTBCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1lBQzNHLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7WUFDdkMsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztZQUNuRCxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1lBQ3pDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7WUFDckMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztZQUNyQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1NBQ2hELENBQUM7UUFFRixlQUFRLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC90eXBlcy90YWdnZWQtdW5pb24uc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBic29uIGZyb20gXCJic29uXCI7XG5pbXBvcnQgeyBDYXNlU3R5bGUgfSBmcm9tIFwiLi4vLi4vbGliL2Nhc2Utc3R5bGVcIjtcbmltcG9ydCB7IERvY3VtZW50VHlwZSB9IGZyb20gXCIuLi8uLi9saWIvdHlwZXMvZG9jdW1lbnRcIjtcbmltcG9ydCB7IEludGVnZXJUeXBlIH0gZnJvbSBcIi4uLy4uL2xpYi90eXBlcy9pbnRlZ2VyXCI7XG5pbXBvcnQgeyBMaXRlcmFsVHlwZSB9IGZyb20gXCIuLi8uLi9saWIvdHlwZXMvbGl0ZXJhbFwiO1xuaW1wb3J0IHsgVGFnZ2VkVW5pb25UeXBlIH0gZnJvbSBcIi4uLy4uL2xpYi90eXBlcy90YWdnZWQtdW5pb25cIjtcbmltcG9ydCB7IFRzRW51bVR5cGUgfSBmcm9tIFwiLi4vLi4vbGliL3R5cGVzL3RzLWVudW1cIjtcbmltcG9ydCB7IHJ1blRlc3RzLCBUeXBlZFZhbHVlIH0gZnJvbSBcIi4uL2hlbHBlcnMvdGVzdFwiO1xuXG5jb25zdCBic29uU2VyaWFsaXplcjogYnNvbi5CU09OID0gbmV3IGJzb24uQlNPTigpO1xuXG5kZXNjcmliZShcIlRhZ2dlZFVuaW9uXCIsIGZ1bmN0aW9uICgpIHtcbiAgZGVzY3JpYmUoXCJUYWdnZWRVbmlvbjxTaGFwZT5cIiwgZnVuY3Rpb24gKCkge1xuICAgIGVudW0gU2hhcGVUeXBlIHtcbiAgICAgIFJlY3RhbmdsZSxcbiAgICAgIENpcmNsZSxcbiAgICB9XG5cbiAgICBjb25zdCBzaGFwZVR5cGVUeXBlOiBUc0VudW1UeXBlPFNoYXBlVHlwZT4gPSBuZXcgVHNFbnVtVHlwZSh7XG4gICAgICBlbnVtOiBTaGFwZVR5cGUsXG4gICAgICBjaGFuZ2VDYXNlOiBDYXNlU3R5bGUuS2ViYWJDYXNlLFxuICAgIH0pO1xuXG4gICAgaW50ZXJmYWNlIFJlY3RhbmdsZSB7XG4gICAgICB0eXBlOiBTaGFwZVR5cGUuUmVjdGFuZ2xlO1xuICAgICAgd2lkdGg6IG51bWJlcjtcbiAgICAgIGhlaWdodDogbnVtYmVyO1xuICAgIH1cblxuICAgIGNvbnN0IHJlY3RhbmdsZVR5cGU6IERvY3VtZW50VHlwZTxSZWN0YW5nbGU+ID0gbmV3IERvY3VtZW50VHlwZTxSZWN0YW5nbGU+KHtcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdHlwZToge1xuICAgICAgICAgIHR5cGU6IG5ldyBMaXRlcmFsVHlwZTxTaGFwZVR5cGUuUmVjdGFuZ2xlPih7XG4gICAgICAgICAgICB0eXBlOiBzaGFwZVR5cGVUeXBlLFxuICAgICAgICAgICAgdmFsdWU6IFNoYXBlVHlwZS5SZWN0YW5nbGUsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0sXG4gICAgICAgIHdpZHRoOiB7dHlwZTogbmV3IEludGVnZXJUeXBlKCl9LFxuICAgICAgICBoZWlnaHQ6IHt0eXBlOiBuZXcgSW50ZWdlclR5cGUoKX0sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgaW50ZXJmYWNlIENpcmNsZSB7XG4gICAgICB0eXBlOiBTaGFwZVR5cGUuQ2lyY2xlO1xuICAgICAgcmFkaXVzOiBudW1iZXI7XG4gICAgfVxuXG4gICAgY29uc3QgY2lyY2xlVHlwZTogRG9jdW1lbnRUeXBlPENpcmNsZT4gPSBuZXcgRG9jdW1lbnRUeXBlPENpcmNsZT4oe1xuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgdHlwZTogbmV3IExpdGVyYWxUeXBlPFNoYXBlVHlwZS5DaXJjbGU+KHtcbiAgICAgICAgICAgIHR5cGU6IHNoYXBlVHlwZVR5cGUsXG4gICAgICAgICAgICB2YWx1ZTogU2hhcGVUeXBlLkNpcmNsZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgICAgcmFkaXVzOiB7dHlwZTogbmV3IEludGVnZXJUeXBlKCl9LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHR5cGUgU2hhcGUgPSBSZWN0YW5nbGUgfCBDaXJjbGU7XG4gICAgY29uc3Qgc2hhcGVUeXBlOiBUYWdnZWRVbmlvblR5cGU8U2hhcGU+ID0gbmV3IFRhZ2dlZFVuaW9uVHlwZTxTaGFwZT4oKCkgPT4gKHtcbiAgICAgIHZhcmlhbnRzOiBbcmVjdGFuZ2xlVHlwZSwgY2lyY2xlVHlwZV0sXG4gICAgICB0YWc6IFwidHlwZVwiLFxuICAgIH0pKTtcblxuICAgIGNvbnN0IGl0ZW1zOiBUeXBlZFZhbHVlW10gPSBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwiUmVjdGFuZ2xlIHt0eXBlOiBTaGFwZVR5cGUuUmVjdGFuZ2xlLCB3aWR0aDogMTAsIGhlaWdodDogMjB9XCIsXG4gICAgICAgIHZhbHVlOiA8UmVjdGFuZ2xlPiB7XG4gICAgICAgICAgdHlwZTogU2hhcGVUeXBlLlJlY3RhbmdsZSxcbiAgICAgICAgICB3aWR0aDogMTAsXG4gICAgICAgICAgaGVpZ2h0OiAyMCxcbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGJzb246IGJzb25TZXJpYWxpemVyLnNlcmlhbGl6ZSh7dHlwZTogXCJyZWN0YW5nbGVcIiwgd2lkdGg6IDEwLCBoZWlnaHQ6IDIwfSksXG4gICAgICAgICAganNvbjogXCJ7XFxcInR5cGVcXFwiOlxcXCJyZWN0YW5nbGVcXFwiLFxcXCJ3aWR0aFxcXCI6MTAsXFxcImhlaWdodFxcXCI6MjB9XCIsXG4gICAgICAgICAgcXM6IFwidHlwZT1yZWN0YW5nbGUmd2lkdGg9MTAmaGVpZ2h0PTIwXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiBcIkNpcmNsZSB7dHlwZTogU2hhcGVUeXBlLkNpcmNsZSwgcmFkaXVzOiAxNX1cIixcbiAgICAgICAgdmFsdWU6IDxDaXJjbGU+IHtcbiAgICAgICAgICB0eXBlOiBTaGFwZVR5cGUuQ2lyY2xlLFxuICAgICAgICAgIHJhZGl1czogMTUsXG4gICAgICAgIH0sXG4gICAgICAgIHZhbGlkOiB0cnVlLFxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBic29uOiBic29uU2VyaWFsaXplci5zZXJpYWxpemUoe3R5cGU6IFwiY2lyY2xlXCIsIHJhZGl1czogMTV9KSxcbiAgICAgICAgICBqc29uOiBcIntcXFwidHlwZVxcXCI6XFxcImNpcmNsZVxcXCIsXFxcInJhZGl1c1xcXCI6MTV9XCIsXG4gICAgICAgICAgcXM6IFwidHlwZT1jaXJjbGUmcmFkaXVzPTE1XCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwie3R5cGU6IFNoYXBlVHlwZS5DaXJjbGV9XCIsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgdHlwZTogU2hhcGVUeXBlLkNpcmNsZSxcbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJ7cmFkaXVzOiAxNX1cIixcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICByYWRpdXM6IDE1LFxuICAgICAgICB9LFxuICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiBcInt0eXBlOiBTaGFwZVR5cGUuQ2lyY2xlLCByYWRpdXM6IHRydWV9XCIsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgdHlwZTogU2hhcGVUeXBlLkNpcmNsZSxcbiAgICAgICAgICByYWRpdXM6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB7bmFtZTogXCJcXFwiZm9vXFxcIlwiLCB2YWx1ZTogXCJiYXJcIiwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIjBcIiwgdmFsdWU6IDAsIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCIxXCIsIHZhbHVlOiAxLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiXFxcIlxcXCJcIiwgdmFsdWU6IFwiXCIsIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJcXFwiMFxcXCJcIiwgdmFsdWU6IFwiMFwiLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwidHJ1ZVwiLCB2YWx1ZTogdHJ1ZSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcImZhbHNlXCIsIHZhbHVlOiBmYWxzZSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIkluZmluaXR5XCIsIHZhbHVlOiBJbmZpbml0eSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIi1JbmZpbml0eVwiLCB2YWx1ZTogLUluZmluaXR5LCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwibmV3IERhdGUoXFxcIjEyNDctMDUtMThUMTk6NDA6MDguNDE4WlxcXCIpXCIsIHZhbHVlOiBuZXcgRGF0ZShcIjEyNDctMDUtMThUMTk6NDA6MDguNDE4WlwiKSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIk5hTlwiLCB2YWx1ZTogTmFOLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwidW5kZWZpbmVkXCIsIHZhbHVlOiB1bmRlZmluZWQsIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJudWxsXCIsIHZhbHVlOiBudWxsLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiW11cIiwgdmFsdWU6IFtdLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwie31cIiwgdmFsdWU6IHt9LCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiL3JlZ2V4L1wiLCB2YWx1ZTogL3JlZ2V4LywgdmFsaWQ6IGZhbHNlfSxcbiAgICBdO1xuXG4gICAgcnVuVGVzdHMoc2hhcGVUeXBlLCBpdGVtcyk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
