import { IntegerType } from "../../lib/types/integer";
import { MapType } from "../../lib/types/map";
import { Ucs2StringType } from "../../lib/types/ucs2-string";
import { runTests } from "../helpers/test";
describe("Map", function () {
    const mapType = new MapType({
        keyType: new IntegerType(),
        valueType: new IntegerType(),
        maxSize: 5,
    });
    const items = [
        {
            name: "new Map([[1, 100], [2, 200]])",
            value: new Map([[1, 100], [2, 200]]),
            valid: true,
            output: {
                json: "{\"1\":100,\"2\":200}",
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
    runTests(mapType, items);
});
describe("Map (assumeStringKey)", function () {
    const mapType = new MapType({
        keyType: new Ucs2StringType({ pattern: /^a+$/, maxLength: 10 }),
        valueType: new IntegerType(),
        maxSize: 5,
        assumeStringKey: true,
    });
    const items = [
        {
            name: "new Map([[a, 100], [aa, 200]])",
            value: new Map([["a", 100], ["aa", 200]]),
            valid: true,
            output: {
                json: "{\"a\":100,\"aa\":200}",
            },
        },
    ];
    runTests(mapType, items);
});
