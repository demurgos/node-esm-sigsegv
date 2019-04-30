import { LiteralType } from "../../lib/types/literal";
import { TsEnumType } from "../../lib/types/ts-enum";
import { Ucs2StringType } from "../../lib/types/ucs2-string";
import { runTests } from "../helpers/test";
describe("Literal", function () {
    describe("Literal<\"foo\">", function () {
        const type = new LiteralType(() => ({
            type: new Ucs2StringType({ maxLength: Infinity }),
            value: "foo",
        }));
        const items = [
            {
                name: "\"foo\"",
                value: "foo",
                valid: true,
                output: {
                    json: "\"foo\"",
                },
            },
            { name: "\"bar\"", value: "bar", valid: false },
            { name: "0", value: 0, valid: false },
            { name: "1", value: 1, valid: false },
            { name: "\"\"", value: "", valid: false },
            { name: "\"0\"", value: "0", valid: false },
            { name: "\"true\"", value: "true", valid: false },
            { name: "\"false\"", value: "false", valid: false },
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
        runTests(type, items);
    });
    describe("Literal<Color.Red>", function () {
        let Color;
        (function (Color) {
            Color[Color["Red"] = 0] = "Red";
            Color[Color["Green"] = 1] = "Green";
            Color[Color["Blue"] = 2] = "Blue";
        })(Color || (Color = {}));
        const $ColorRed = new LiteralType({
            type: new TsEnumType({ enum: Color }),
            value: Color.Red,
        });
        const items = [
            {
                name: "Color.Red",
                value: Color.Red,
                valid: true,
                output: {
                    json: "\"Red\"",
                },
            },
            {
                name: "0",
                value: 0,
                valid: true,
                output: {
                    json: "\"Red\"",
                },
            },
            { name: "Color.Green", value: Color.Green, valid: false },
            { name: "undefined", value: undefined, valid: false },
        ];
        runTests($ColorRed, items);
    });
});
