import chai from "chai";
import { CaseStyle } from "../../lib/case-style";
import { JsonValueReader } from "../../lib/readers/json-value";
import { DocumentType } from "../../lib/types/document";
import { IntegerType } from "../../lib/types/integer";
import { TryUnionType } from "../../lib/types/try-union";
import { runTests } from "../helpers/test";
describe("TryUnion", function () {
    describe("TryUnion<Shape>", function () {
        const $Rectangle = new DocumentType({
            properties: {
                width: { type: new IntegerType() },
                height: { type: new IntegerType() },
            },
            changeCase: CaseStyle.KebabCase,
        });
        const $Circle = new DocumentType({
            properties: {
                radius: { type: new IntegerType() },
            },
            changeCase: CaseStyle.KebabCase,
        });
        const $Shape = new TryUnionType({
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
                    json: "{\"width\":10,\"height\":20}",
                },
            },
            {
                name: "Circle {radius: 15}",
                value: {
                    radius: 15,
                },
                valid: true,
                output: {
                    json: "{\"radius\":15}",
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
        runTests($Shape, items);
        const jsonValueReader = new JsonValueReader();
        it(".readTrustedWithVariant should return $Rectangle", () => {
            const { variant } = $Shape.variantRead(jsonValueReader, { width: 10, height: 20 });
            chai.assert.strictEqual(variant, $Rectangle);
        });
        it(".readTrustedWithVariant should return $Circle", () => {
            const { variant } = $Shape.variantRead(jsonValueReader, { radius: 15 });
            chai.assert.strictEqual(variant, $Circle);
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
