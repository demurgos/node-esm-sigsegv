"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const boolean_1 = require("../../lib/builtins/boolean");
const uint8_1 = require("../../lib/builtins/uint8");
const json_1 = require("../../lib/readers/json");
const array_1 = require("../../lib/types/array");
const integer_1 = require("../../lib/types/integer");
const json_2 = require("../../lib/writers/json");
const test_1 = require("../helpers/test");
describe("ArrayType", function () {
    describe("General", function () {
        const $IntArray = new array_1.ArrayType({
            itemType: new integer_1.IntegerType(),
            maxLength: 2,
        });
        const items = [
            {
                value: [],
                valid: true,
                output: {
                    json: "[]",
                },
            },
            {
                value: [1],
                valid: true,
                output: {
                    json: "[1]",
                },
            },
            {
                value: [2, 3],
                valid: true,
                output: {
                    json: "[2,3]",
                },
            },
            {
                value: [4, 5, 6],
                valid: false,
            },
            {
                value: [0.5],
                valid: false,
            },
            {
                name: "[null]",
                value: [null],
                valid: false,
            },
            {
                name: "[undefined]",
                value: [undefined],
                valid: false,
            },
            {
                name: "new Array()",
                value: new Array(),
                valid: true,
            },
            {
                name: "new Array(0)",
                value: new Array(0),
                valid: true,
            },
            {
                name: "new Array(1)",
                value: new Array(1),
                valid: false,
            },
            { name: "new Date(0)", value: new Date(0), valid: false },
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
            { name: "{}", value: {}, valid: false },
            { name: "/regex/", value: /regex/, valid: false },
        ];
        test_1.runTests($IntArray, items);
    });
    describe("Min/max length", function () {
        const $IntArray = new array_1.ArrayType({
            itemType: uint8_1.$Uint8,
            minLength: 2,
            maxLength: 4,
        });
        const items = [
            {
                value: [],
                valid: false,
            },
            {
                value: [0],
                valid: false,
            },
            {
                value: [0, 1],
                valid: true,
                output: {
                    json: "[0,1]",
                },
            },
            {
                value: [0, 1, 2],
                valid: true,
                output: {
                    json: "[0,1,2]",
                },
            },
            {
                value: [0, 1, 2, 3],
                valid: true,
                output: {
                    json: "[0,1,2,3]",
                },
            },
            {
                value: [0, 1, 2, 3, 4],
                valid: false,
            },
        ];
        test_1.runTests($IntArray, items);
    });
    describe("NestedArray", function () {
        const jsonWriter = new json_2.JsonWriter();
        const jsonReader = new json_1.JsonReader();
        const $NestedBooleanArray = new array_1.ArrayType({
            itemType: new array_1.ArrayType({
                itemType: boolean_1.$Boolean,
                maxLength: Infinity,
            }),
            maxLength: Infinity,
        });
        it("should be possible to write nested arrays", function () {
            const input = [[true], [false, true]];
            const actual = $NestedBooleanArray.write(jsonWriter, input);
            const expected = "[[true],[false,true]]";
            chai_1.default.assert.deepEqual(actual, expected);
        });
        it("should be possible to read nested arrays", function () {
            const input = "[[true],[false,true]]";
            const actual = $NestedBooleanArray.read(jsonReader, input);
            const expected = [[true], [false, true]];
            chai_1.default.assert.deepEqual(actual, expected);
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L3R5cGVzL2FycmF5LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBd0I7QUFDeEIsd0RBQXNEO0FBQ3RELG9EQUFrRDtBQUNsRCxpREFBb0Q7QUFDcEQsaURBQStEO0FBQy9ELHFEQUFzRDtBQUN0RCxpREFBb0Q7QUFDcEQsMENBQXVEO0FBRXZELFFBQVEsQ0FBQyxXQUFXLEVBQUU7SUFDcEIsUUFBUSxDQUFDLFNBQVMsRUFBRTtRQUNsQixNQUFNLFNBQVMsR0FBc0IsSUFBSSxpQkFBUyxDQUFDO1lBQ2pELFFBQVEsRUFBRSxJQUFJLHFCQUFXLEVBQUU7WUFDM0IsU0FBUyxFQUFFLENBQUM7U0FDYixDQUFDLENBQUM7UUFFSCxNQUFNLEtBQUssR0FBaUI7WUFDMUI7Z0JBQ0UsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxJQUFJO2lCQUNYO2FBQ0Y7WUFDRDtnQkFDRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxLQUFLO2lCQUNaO2FBQ0Y7WUFDRDtnQkFDRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNiLEtBQUssRUFBRSxJQUFJO2dCQUNYLE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsT0FBTztpQkFDZDthQUNGO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hCLEtBQUssRUFBRSxLQUFLO2FBQ2I7WUFDRDtnQkFDRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQ1osS0FBSyxFQUFFLEtBQUs7YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDYixLQUFL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bUJBQW1CLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwRSxNQUFNLFFBQVEsR0FBVyx1QkFBdUIsQ0FBQztZQUNqRCxjQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsMENBQTBDLEVBQUU7WUFDN0MsTUFBTSxLQUFLLEdBQVcsdUJBQXVCLENBQUM7WUFDOUMsTUFBTSxNQUFNLEdBQWdCLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEUsTUFBTSxRQUFRLEdBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3RELGNBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC90eXBlcy9hcnJheS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSBcImNoYWlcIjtcbmltcG9ydCB7ICRCb29sZWFuIH0gZnJvbSBcIi4uLy4uL2xpYi9idWlsdGlucy9ib29sZWFuXCI7XG5pbXBvcnQgeyAkVWludDggfSBmcm9tIFwiLi4vLi4vbGliL2J1aWx0aW5zL3VpbnQ4XCI7XG5pbXBvcnQgeyBKc29uUmVhZGVyIH0gZnJvbSBcIi4uLy4uL2xpYi9yZWFkZXJzL2pzb25cIjtcbmltcG9ydCB7IEFycmF5SW9UeXBlLCBBcnJheVR5cGUgfSBmcm9tIFwiLi4vLi4vbGliL3R5cGVzL2FycmF5XCI7XG5pbXBvcnQgeyBJbnRlZ2VyVHlwZSB9IGZyb20gXCIuLi8uLi9saWIvdHlwZXMvaW50ZWdlclwiO1xuaW1wb3J0IHsgSnNvbldyaXRlciB9IGZyb20gXCIuLi8uLi9saWIvd3JpdGVycy9qc29uXCI7XG5pbXBvcnQgeyBydW5UZXN0cywgVHlwZWRWYWx1ZSB9IGZyb20gXCIuLi9oZWxwZXJzL3Rlc3RcIjtcblxuZGVzY3JpYmUoXCJBcnJheVR5cGVcIiwgZnVuY3Rpb24gKCkge1xuICBkZXNjcmliZShcIkdlbmVyYWxcIiwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0ICRJbnRBcnJheTogQXJyYXlUeXBlPG51bWJlcj4gPSBuZXcgQXJyYXlUeXBlKHtcbiAgICAgIGl0ZW1UeXBlOiBuZXcgSW50ZWdlclR5cGUoKSxcbiAgICAgIG1heExlbmd0aDogMixcbiAgICB9KTtcblxuICAgIGNvbnN0IGl0ZW1zOiBUeXBlZFZhbHVlW10gPSBbXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBbXSxcbiAgICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGpzb246IFwiW11cIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBbMV0sXG4gICAgICAgIHZhbGlkOiB0cnVlLFxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBqc29uOiBcIlsxXVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IFsyLCAzXSxcbiAgICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGpzb246IFwiWzIsM11cIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBbNCwgNSwgNl0sXG4gICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBbMC41XSxcbiAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJbbnVsbF1cIixcbiAgICAgICAgdmFsdWU6IFtudWxsXSxcbiAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJbdW5kZWZpbmVkXVwiLFxuICAgICAgICB2YWx1ZTogW3VuZGVmaW5lZF0sXG4gICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwibmV3IEFycmF5KClcIixcbiAgICAgICAgdmFsdWU6IG5ldyBBcnJheSgpLFxuICAgICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwibmV3IEFycmF5KDApXCIsXG4gICAgICAgIHZhbHVlOiBuZXcgQXJyYXkoMCksXG4gICAgICAgIHZhbGlkOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJuZXcgQXJyYXkoMSlcIixcbiAgICAgICAgdmFsdWU6IG5ldyBBcnJheSgxKSxcbiAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgfSxcblxuICAgICAge25hbWU6IFwibmV3IERhdGUoMClcIiwgdmFsdWU6IG5ldyBEYXRlKDApLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiMFwiLCB2YWx1ZTogMCwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIjFcIiwgdmFsdWU6IDEsIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJcXFwiXFxcIlwiLCB2YWx1ZTogXCJcIiwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIlxcXCIwXFxcIlwiLCB2YWx1ZTogXCIwXCIsIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJcXFwidHJ1ZVxcXCJcIiwgdmFsdWU6IFwidHJ1ZVwiLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiXFxcImZhbHNlXFxcIlwiLCB2YWx1ZTogXCJmYWxzZVwiLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiSW5maW5pdHlcIiwgdmFsdWU6IEluZmluaXR5LCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiLUluZmluaXR5XCIsIHZhbHVlOiAtSW5maW5pdHksIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJOYU5cIiwgdmFsdWU6IE5hTiwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcInVuZGVmaW5lZFwiLCB2YWx1ZTogdW5kZWZpbmVkLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwibnVsbFwiLCB2YWx1ZTogbnVsbCwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcInt9XCIsIHZhbHVlOiB7fSwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIi9yZWdleC9cIiwgdmFsdWU6IC9yZWdleC8sIHZhbGlkOiBmYWxzZX0sXG4gICAgXTtcblxuICAgIHJ1blRlc3RzKCRJbnRBcnJheSwgaXRlbXMpO1xuICB9KTtcblxuICBkZXNjcmliZShcIk1pbi9tYXggbGVuZ3RoXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCAkSW50QXJyYXk6IEFycmF5VHlwZTxudW1iZXI+ID0gbmV3IEFycmF5VHlwZSh7XG4gICAgICBpdGVtVHlwZTogJFVpbnQ4LFxuICAgICAgbWluTGVuZ3RoOiAyLFxuICAgICAgbWF4TGVuZ3RoOiA0LFxuICAgIH0pO1xuXG4gICAgY29uc3QgaXRlbXM6IFR5cGVkVmFsdWVbXSA9IFtcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IFtdLFxuICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YWx1ZTogWzBdLFxuICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YWx1ZTogWzAsIDFdLFxuICAgICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAganNvbjogXCJbMCwxXVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IFswLCAxLCAyXSxcbiAgICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGpzb246IFwiWzAsMSwyXVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IFswLCAxLCAyLCAzXSxcbiAgICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGpzb246IFwiWzAsMSwyLDNdXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YWx1ZTogWzAsIDEsIDIsIDMsIDRdLFxuICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICB9LFxuICAgIF07XG5cbiAgICBydW5UZXN0cygkSW50QXJyYXksIGl0ZW1zKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoXCJOZXN0ZWRBcnJheVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QganNvbldyaXRlcjogSnNvbldyaXRlciA9IG5ldyBKc29uV3JpdGVyKCk7XG4gICAgY29uc3QganNvblJlYWRlcjogSnNvblJlYWRlciA9IG5ldyBKc29uUmVhZGVyKCk7XG4gICAgY29uc3QgJE5lc3RlZEJvb2xlYW5BcnJheTogQXJyYXlJb1R5cGU8Ym9vbGVhbltdPiA9IG5ldyBBcnJheVR5cGUoe1xuICAgICAgaXRlbVR5cGU6IG5ldyBBcnJheVR5cGUoe1xuICAgICAgICBpdGVtVHlwZTogJEJvb2xlYW4sXG4gICAgICAgIG1heExlbmd0aDogSW5maW5pdHksXG4gICAgICB9KSxcbiAgICAgIG1heExlbmd0aDogSW5maW5pdHksXG4gICAgfSk7XG5cbiAgICBpdChcInNob3VsZCBiZSBwb3NzaWJsZSB0byB3cml0ZSBuZXN0ZWQgYXJyYXlzXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGlucHV0OiBib29sZWFuW11bXSA9IFtbdHJ1ZV0sIFtmYWxzZSwgdHJ1ZV1dO1xuICAgICAgY29uc3QgYWN0dWFsOiBzdHJpbmcgPSAkTmVzdGVkQm9vbGVhbkFycmF5LndyaXRlKGpzb25Xcml0ZXIsIGlucHV0KTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkOiBzdHJpbmcgPSBcIltbdHJ1ZV0sW2ZhbHNlLHRydWVdXVwiO1xuICAgICAgY2hhaS5hc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJzaG91bGQgYmUgcG9zc2libGUgdG8gcmVhZCBuZXN0ZWQgYXJyYXlzXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGlucHV0OiBzdHJpbmcgPSBcIltbdHJ1ZV0sW2ZhbHNlLHRydWVdXVwiO1xuICAgICAgY29uc3QgYWN0dWFsOiBib29sZWFuW11bXSA9ICROZXN0ZWRCb29sZWFuQXJyYXkucmVhZChqc29uUmVhZGVyLCBpbnB1dCk7XG4gICAgICBjb25zdCBleHBlY3RlZDogYm9vbGVhbltdW10gPSBbW3RydWVdLCBbZmFsc2UsIHRydWVdXTtcbiAgICAgIGNoYWkuYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
