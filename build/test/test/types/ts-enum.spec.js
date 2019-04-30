"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = __importDefault(require("bson"));
const case_style_1 = require("../../lib/case-style");
const ts_enum_1 = require("../../lib/types/ts-enum");
const test_1 = require("../helpers/test");
const bsonSerializer = new bson_1.default.BSON();
describe("TsEnum", function () {
    let Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Green"] = 1] = "Green";
        Color[Color["Blue"] = 2] = "Blue";
    })(Color || (Color = {}));
    const $Color = new ts_enum_1.TsEnumType({ enum: Color });
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
    test_1.runTests($Color, items);
});
describe("SimpleEnum: rename KebabCase", function () {
    let Node;
    (function (Node) {
        Node[Node["Expression"] = 0] = "Expression";
        Node[Node["BinaryOperator"] = 1] = "BinaryOperator";
        Node[Node["BlockStatement"] = 2] = "BlockStatement";
    })(Node || (Node = {}));
    const $Node = new ts_enum_1.TsEnumType(() => ({ enum: Node, changeCase: case_style_1.CaseStyle.KebabCase }));
    const items = [
        {
            name: "Node.Expression",
            value: Node.Expression,
            valid: true,
            output: {
                bson: bsonSerializer.serialize({ _: "expression" }),
                json: "\"expression\"",
                qs: "_=expression",
            },
        },
        {
            name: "Node.BinaryOperator",
            value: Node.BinaryOperator,
            valid: true,
            output: {
                bson: bsonSerializer.serialize({ _: "binary-operator" }),
                json: "\"binary-operator\"",
                qs: "_=binary-operator",
            },
        },
        {
            name: "Node.BlockStatement",
            value: Node.BlockStatement,
            valid: true,
            output: {
                bson: bsonSerializer.serialize({ _: "block-statement" }),
                json: "\"block-statement\"",
                qs: "_=block-statement",
            },
        },
        {
            name: "0",
            value: 0,
            valid: true,
            output: {
                bson: bsonSerializer.serialize({ _: "expression" }),
                json: "\"expression\"",
                qs: "_=expression",
            },
        },
        {
            name: "1",
            value: 1,
            valid: true,
            output: {
                bson: bsonSerializer.serialize({ _: "binary-operator" }),
                json: "\"binary-operator\"",
                qs: "_=binary-operator",
            },
        },
        {
            name: "2",
            value: 2,
            valid: true,
            output: {
                bson: bsonSerializer.serialize({ _: "block-statement" }),
                json: "\"block-statement\"",
                qs: "_=block-statement",
            },
        },
    ];
    test_1.runTests($Node, items);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L3R5cGVzL3RzLWVudW0uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUF3QjtBQUN4QixxREFBaUQ7QUFDakQscURBQXFEO0FBQ3JELDBDQUF1RDtBQUV2RCxNQUFNLGNBQWMsR0FBYyxJQUFJLGNBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUVsRCxRQUFRLENBQUMsUUFBUSxFQUFFO0lBQ2pCLElBQUssS0FJSjtJQUpELFdBQUssS0FBSztRQUNSLCtCQUFHLENBQUE7UUFDSCxtQ0FBSyxDQUFBO1FBQ0wsaUNBQUksQ0FBQTtJQUNOLENBQUMsRUFKSSxLQUFLLEtBQUwsS0FBSyxRQUlUO0lBRUQsTUFBTSxNQUFNLEdBQXNCLElBQUksb0JBQVUsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBRWhFLE1BQU0sS0FBSyxHQUFpQjtRQUMxQjtZQUNFLElBQUksRUFBRSxXQUFXO1lBQ2pCLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRztZQUNoQixLQUFLLEVBQUUsSUFBSTtZQUNYLE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsU0FBUzthQUNoQjtTQUNGO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsYUFBYTtZQUNuQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7WUFDbEIsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFdBQVc7YUFDbEI7U0FDRjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFlBQVk7WUFDbEIsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJO1lBQ2pCLEtBQUssRUFBRSxJQUFJO1lBQ1gsTUFBTSxFQUFFO2dCQUNOLElBQUksRUFBRSxVQUFVO2FBQ2pCO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSxHQUFHO1lBQ1QsS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLEVBQUUsSUFBSTtZQUNYLE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsU0FB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dEQsSUFBSSxFQUFFLHFCQUFxQjtnQkFDM0IsRUFBRSxFQUFFLG1CQUFtQjthQUN4QjtTQUNGO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsR0FBRztZQUNULEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUUsaUJBQWlCLEVBQUMsQ0FBQztnQkFDdEQsSUFBSSxFQUFFLHFCQUFxQjtnQkFDM0IsRUFBRSxFQUFFLG1CQUFtQjthQUN4QjtTQUNGO0tBQ0YsQ0FBQztJQUVGLGVBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC90eXBlcy90cy1lbnVtLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYnNvbiBmcm9tIFwiYnNvblwiO1xuaW1wb3J0IHsgQ2FzZVN0eWxlIH0gZnJvbSBcIi4uLy4uL2xpYi9jYXNlLXN0eWxlXCI7XG5pbXBvcnQgeyBUc0VudW1UeXBlIH0gZnJvbSBcIi4uLy4uL2xpYi90eXBlcy90cy1lbnVtXCI7XG5pbXBvcnQgeyBydW5UZXN0cywgVHlwZWRWYWx1ZSB9IGZyb20gXCIuLi9oZWxwZXJzL3Rlc3RcIjtcblxuY29uc3QgYnNvblNlcmlhbGl6ZXI6IGJzb24uQlNPTiA9IG5ldyBic29uLkJTT04oKTtcblxuZGVzY3JpYmUoXCJUc0VudW1cIiwgZnVuY3Rpb24gKCkge1xuICBlbnVtIENvbG9yIHtcbiAgICBSZWQsXG4gICAgR3JlZW4sXG4gICAgQmx1ZSxcbiAgfVxuXG4gIGNvbnN0ICRDb2xvcjogVHNFbnVtVHlwZTxDb2xvcj4gPSBuZXcgVHNFbnVtVHlwZSh7ZW51bTogQ29sb3J9KTtcblxuICBjb25zdCBpdGVtczogVHlwZWRWYWx1ZVtdID0gW1xuICAgIHtcbiAgICAgIG5hbWU6IFwiQ29sb3IuUmVkXCIsXG4gICAgICB2YWx1ZTogQ29sb3IuUmVkLFxuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAganNvbjogXCJcXFwiUmVkXFxcIlwiLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IFwiQ29sb3IuR3JlZW5cIixcbiAgICAgIHZhbHVlOiBDb2xvci5HcmVlbixcbiAgICAgIHZhbGlkOiB0cnVlLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGpzb246IFwiXFxcIkdyZWVuXFxcIlwiLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IFwiQ29sb3IuQmx1ZVwiLFxuICAgICAgdmFsdWU6IENvbG9yLkJsdWUsXG4gICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBqc29uOiBcIlxcXCJCbHVlXFxcIlwiLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IFwiMFwiLFxuICAgICAgdmFsdWU6IDAsXG4gICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBqc29uOiBcIlxcXCJSZWRcXFwiXCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogXCIxXCIsXG4gICAgICB2YWx1ZTogMSxcbiAgICAgIHZhbGlkOiB0cnVlLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGpzb246IFwiXFxcIkdyZWVuXFxcIlwiLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IFwiMlwiLFxuICAgICAgdmFsdWU6IDIsXG4gICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBqc29uOiBcIlxcXCJCbHVlXFxcIlwiLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAge25hbWU6IFwibmV3IERhdGUoKVwiLCB2YWx1ZTogbmV3IERhdGUoKSwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCIzXCIsIHZhbHVlOiAzLCB2YWxpZDogZmFsc2V9LFxuICAgIHtuYW1lOiBcIi0xXCIsIHZhbHVlOiAtMSwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCJcXFwiXFxcIlwiLCB2YWx1ZTogXCJcIiwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCJcXFwiMFxcXCJcIiwgdmFsdWU6IFwiMFwiLCB2YWxpZDogZmFsc2V9LFxuICAgIHtuYW1lOiBcIlxcXCJ0cnVlXFxcIlwiLCB2YWx1ZTogXCJ0cnVlXCIsIHZhbGlkOiBmYWxzZX0sXG4gICAge25hbWU6IFwiXFxcImZhbHNlXFxcIlwiLCB2YWx1ZTogXCJmYWxzZVwiLCB2YWxpZDogZmFsc2V9LFxuICAgIHtuYW1lOiBcIkluZmluaXR5XCIsIHZhbHVlOiBJbmZpbml0eSwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCItSW5maW5pdHlcIiwgdmFsdWU6IC1JbmZpbml0eSwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCJOYU5cIiwgdmFsdWU6IE5hTiwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCJ1bmRlZmluZWRcIiwgdmFsdWU6IHVuZGVmaW5lZCwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCJudWxsXCIsIHZhbHVlOiBudWxsLCB2YWxpZDogZmFsc2V9LFxuICAgIHtuYW1lOiBcIltdXCIsIHZhbHVlOiBbXSwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCJ7fVwiLCB2YWx1ZToge30sIHZhbGlkOiBmYWxzZX0sXG4gICAge25hbWU6IFwiL3JlZ2V4L1wiLCB2YWx1ZTogL3JlZ2V4LywgdmFsaWQ6IGZhbHNlfSxcbiAgXTtcblxuICBydW5UZXN0cygkQ29sb3IsIGl0ZW1zKTtcbn0pO1xuXG5kZXNjcmliZShcIlNpbXBsZUVudW06IHJlbmFtZSBLZWJhYkNhc2VcIiwgZnVuY3Rpb24gKCkge1xuICBlbnVtIE5vZGUge1xuICAgIEV4cHJlc3Npb24sXG4gICAgQmluYXJ5T3BlcmF0b3IsXG4gICAgQmxvY2tTdGF0ZW1lbnQsXG4gIH1cblxuICBjb25zdCAkTm9kZTogVHNFbnVtVHlwZTxOb2RlPiA9IG5ldyBUc0VudW1UeXBlKCgpID0+ICh7ZW51bTogTm9kZSwgY2hhbmdlQ2FzZTogQ2FzZVN0eWxlLktlYmFiQ2FzZX0pKTtcblxuICBjb25zdCBpdGVtczogVHlwZWRWYWx1ZVtdID0gW1xuICAgIHtcbiAgICAgIG5hbWU6IFwiTm9kZS5FeHByZXNzaW9uXCIsXG4gICAgICB2YWx1ZTogTm9kZS5FeHByZXNzaW9uLFxuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgYnNvbjogYnNvblNlcmlhbGl6ZXIuc2VyaWFsaXplKHtfOiBcImV4cHJlc3Npb25cIn0pLFxuICAgICAgICBqc29uOiBcIlxcXCJleHByZXNzaW9uXFxcIlwiLFxuICAgICAgICBxczogXCJfPWV4cHJlc3Npb25cIixcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBcIk5vZGUuQmluYXJ5T3BlcmF0b3JcIixcbiAgICAgIHZhbHVlOiBOb2RlLkJpbmFyeU9wZXJhdG9yLFxuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgYnNvbjogYnNvblNlcmlhbGl6ZXIuc2VyaWFsaXplKHtfOiBcImJpbmFyeS1vcGVyYXRvclwifSksXG4gICAgICAgIGpzb246IFwiXFxcImJpbmFyeS1vcGVyYXRvclxcXCJcIixcbiAgICAgICAgcXM6IFwiXz1iaW5hcnktb3BlcmF0b3JcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBcIk5vZGUuQmxvY2tTdGF0ZW1lbnRcIixcbiAgICAgIHZhbHVlOiBOb2RlLkJsb2NrU3RhdGVtZW50LFxuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgYnNvbjogYnNvblNlcmlhbGl6ZXIuc2VyaWFsaXplKHtfOiBcImJsb2NrLXN0YXRlbWVudFwifSksXG4gICAgICAgIGpzb246IFwiXFxcImJsb2NrLXN0YXRlbWVudFxcXCJcIixcbiAgICAgICAgcXM6IFwiXz1ibG9jay1zdGF0ZW1lbnRcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBcIjBcIixcbiAgICAgIHZhbHVlOiAwLFxuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgYnNvbjogYnNvblNlcmlhbGl6ZXIuc2VyaWFsaXplKHtfOiBcImV4cHJlc3Npb25cIn0pLFxuICAgICAgICBqc29uOiBcIlxcXCJleHByZXNzaW9uXFxcIlwiLFxuICAgICAgICBxczogXCJfPWV4cHJlc3Npb25cIixcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBcIjFcIixcbiAgICAgIHZhbHVlOiAxLFxuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgYnNvbjogYnNvblNlcmlhbGl6ZXIuc2VyaWFsaXplKHtfOiBcImJpbmFyeS1vcGVyYXRvclwifSksXG4gICAgICAgIGpzb246IFwiXFxcImJpbmFyeS1vcGVyYXRvclxcXCJcIixcbiAgICAgICAgcXM6IFwiXz1iaW5hcnktb3BlcmF0b3JcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBcIjJcIixcbiAgICAgIHZhbHVlOiAyLFxuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgYnNvbjogYnNvblNlcmlhbGl6ZXIuc2VyaWFsaXplKHtfOiBcImJsb2NrLXN0YXRlbWVudFwifSksXG4gICAgICAgIGpzb246IFwiXFxcImJsb2NrLXN0YXRlbWVudFxcXCJcIixcbiAgICAgICAgcXM6IFwiXz1ibG9jay1zdGF0ZW1lbnRcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgXTtcblxuICBydW5UZXN0cygkTm9kZSwgaXRlbXMpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
