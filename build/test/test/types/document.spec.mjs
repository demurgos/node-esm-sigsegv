import { CaseStyle } from "../../lib/case-style";
import { DateType } from "../../lib/types/date";
import { DocumentType } from "../../lib/types/document";
import { IntegerType } from "../../lib/types/integer";
import { runTests } from "../helpers/test";
describe("Document", function () {
    const documentType = new DocumentType({
        noExtraKeys: false,
        properties: {
            dateProp: {
                optional: false,
                type: new DateType(),
            },
            optIntProp: {
                optional: true,
                type: new IntegerType(),
            },
            nestedDoc: {
                optional: true,
                type: new DocumentType({
                    noExtraKeys: false,
                    properties: {
                        id: {
                            optional: true,
                            type: new IntegerType(),
                        },
                    },
                }),
            },
        },
    });
    const items = [
        {
            value: {
                dateProp: new Date(0),
                optIntProp: 50,
                nestedDoc: {
                    id: 10,
                },
            },
            valid: true,
            output: {
                json: JSON.stringify({ dateProp: "1970-01-01T00:00:00.000Z", optIntProp: 50, nestedDoc: { id: 10 } }),
            },
        },
        {
            value: {
                dateProp: new Date(0),
                nestedDoc: {
                    id: 10,
                },
            },
            valid: true,
            output: {
                json: JSON.stringify({ dateProp: "1970-01-01T00:00:00.000Z", nestedDoc: { id: 10 } }),
            },
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
        { name: "[]", value: [], valid: false },
        { name: "{}", value: {}, valid: false },
        { name: "/regex/", value: /regex/, valid: false },
    ];
    runTests(documentType, items);
});
describe("Document: rename", function () {
    const type = new DocumentType({
        properties: {
            xMin: { type: new IntegerType() },
            xMax: { type: new IntegerType(), changeCase: CaseStyle.ScreamingSnakeCase },
            yMin: { type: new IntegerType(), rename: "__yMin" },
            yMax: { type: new IntegerType() },
        },
        rename: { xMin: "xmin" },
        changeCase: CaseStyle.KebabCase,
    });
    const items = [
        {
            name: "Rect {xMin: 0, xMax: 10, yMin: 20, yMax: 30}",
            value: {
                xMin: 0,
                xMax: 10,
                yMin: 20,
                yMax: 30,
            },
            valid: true,
            output: {
                json: JSON.stringify({ "xmin": 0, "X_MAX": 10, "__yMin": 20, "y-max": 30 }),
            },
        },
    ];
    runTests(type, items);
});
