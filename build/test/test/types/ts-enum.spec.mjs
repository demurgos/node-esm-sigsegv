import { CaseStyle } from "../../lib/case-style";
import { TsEnumType } from "../../lib/types/ts-enum";
import { runTests } from "../helpers/test";
describe("TsEnum", function () {
    let Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Green"] = 1] = "Green";
        Color[Color["Blue"] = 2] = "Blue";
    })(Color || (Color = {}));
    const $Color = new TsEnumType({ enum: Color });
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
            name: "Color.Green",
            value: Color.Green,
            valid: true,
            output: {
                json: "\"Green\"",
            },
        },
        {
            name: "Color.Blue",
            value: Color.Blue,
            valid: true,
            output: {
                json: "\"Blue\"",
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
        {
            name: "1",
            value: 1,
            valid: true,
            output: {
                json: "\"Green\"",
            },
        },
        {
            name: "2",
            value: 2,
            valid: true,
            output: {
                json: "\"Blue\"",
            },
        },
        { name: "new Date()", value: new Date(), valid: false },
        { name: "3", value: 3, valid: false },
        { name: "-1", value: -1, valid: false },
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
        { name: "/regex/", value: /regex/, valid: false },
    ];
    runTests($Color, items);
});
describe("SimpleEnum: rename KebabCase", function () {
    let Node;
    (function (Node) {
        Node[Node["Expression"] = 0] = "Expression";
        Node[Node["BinaryOperator"] = 1] = "BinaryOperator";
        Node[Node["BlockStatement"] = 2] = "BlockStatement";
    })(Node || (Node = {}));
    const $Node = new TsEnumType(() => ({ enum: Node, changeCase: CaseStyle.KebabCase }));
    const items = [
        {
            name: "Node.Expression",
            value: Node.Expression,
            valid: true,
            output: {
                json: "\"expression\"",
            },
        },
        {
            name: "Node.BinaryOperator",
            value: Node.BinaryOperator,
            valid: true,
            output: {
                json: "\"binary-operator\"",
            },
        },
        {
            name: "Node.BlockStatement",
            value: Node.BlockStatement,
            valid: true,
            output: {
                json: "\"block-statement\"",
            },
        },
        {
            name: "0",
            value: 0,
            valid: true,
            output: {
                json: "\"expression\"",
            },
        },
        {
            name: "1",
            value: 1,
            valid: true,
            output: {
                json: "\"binary-operator\"",
            },
        },
        {
            name: "2",
            value: 2,
            valid: true,
            output: {
                json: "\"block-statement\"",
            },
        },
    ];
    runTests($Node, items);
});
