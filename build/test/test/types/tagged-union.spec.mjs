import { CaseStyle } from "../../lib/case-style";
import { DocumentType } from "../../lib/types/document";
import { IntegerType } from "../../lib/types/integer";
import { LiteralType } from "../../lib/types/literal";
import { TaggedUnionType } from "../../lib/types/tagged-union";
import { TsEnumType } from "../../lib/types/ts-enum";
import { runTests } from "../helpers/test";
describe("TaggedUnion", function () {
    describe("TaggedUnion<Shape>", function () {
        let ShapeType;
        (function (ShapeType) {
            ShapeType[ShapeType["Rectangle"] = 0] = "Rectangle";
            ShapeType[ShapeType["Circle"] = 1] = "Circle";
        })(ShapeType || (ShapeType = {}));
        const shapeTypeType = new TsEnumType({
            enum: ShapeType,
            changeCase: CaseStyle.KebabCase,
        });
        const rectangleType = new DocumentType({
            properties: {
                type: {
                    type: new LiteralType({
                        type: shapeTypeType,
                        value: ShapeType.Rectangle,
                    }),
                },
                width: { type: new IntegerType() },
                height: { type: new IntegerType() },
            },
        });
        const circleType = new DocumentType({
            properties: {
                type: {
                    type: new LiteralType({
                        type: shapeTypeType,
                        value: ShapeType.Circle,
                    }),
                },
                radius: { type: new IntegerType() },
            },
        });
        const shapeType = new TaggedUnionType(() => ({
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
                    json: "{\"type\":\"rectangle\",\"width\":10,\"height\":20}",
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
                    json: "{\"type\":\"circle\",\"radius\":15}",
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
        runTests(shapeType, items);
    });
});
