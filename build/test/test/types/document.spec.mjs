import bson from "bson";
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
                qs: "dateProp=1970-01-01T00%3A00%3A00.000Z&optIntProp=50&nestedDoc%5Bid%5D=10",
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
    const bsonSerializer = new bson.BSON();
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
                bson: bsonSerializer.serialize({ "xmin": 0, "X_MAX": 10, "__yMin": 20, "y-max": 30 }),
                json: JSON.stringify({ "xmin": 0, "X_MAX": 10, "__yMin": 20, "y-max": 30 }),
                qs: "xmin=0&X_MAX=10&__yMin=20&y-max=30",
            },
        },
    ];
    runTests(type, items);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L3R5cGVzL2RvY3VtZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsUUFBUSxFQUFjLE1BQU0saUJBQWlCLENBQUM7QUFFdkQsUUFBUSxDQUFDLFVBQVUsRUFBRTtJQUNuQixNQUFNLFlBQVksR0FBc0IsSUFBSSxZQUFZLENBQUM7UUFDdkQsV0FBVyxFQUFFLEtBQUs7UUFDbEIsVUFBVSxFQUFFO1lBQ1YsUUFBUSxFQUFFO2dCQUNSLFFBQVEsRUFBRSxLQUFLO2dCQUNmLElBQUksRUFBRSxJQUFJLFFBQVEsRUFBRTthQUNyQjtZQUNELFVBQVUsRUFBRTtnQkFDVixRQUFRLEVBQUUsSUFBSTtnQkFDZCxJQUFJLEVBQUUsSUFBSSxXQUFXLEVBQUU7YUFDeEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsSUFBSSxFQUFFLElBQUksWUFBWSxDQUFDO29CQUNyQixXQUFXLEVBQUUsS0FBSztvQkFDbEIsVUFBVSxFQUFFO3dCQUNWLEVBQUUsRUFBRTs0QkFDRixRQUFRLEVBQUUsSUFBSTs0QkFDZCxJQUFJLEVBQUUsSUFBSSxXQUFXLEVBQUU7eUJBQ3hCO3FCQUNGO2lCQUNGLENBQUM7YUFDSDtTQUNGO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsTUFBTSxLQUFLLEdBQWlCO1FBQzFCO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLFVBQVUsRUFB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Q0FBQyIsImZpbGUiOiJ0ZXN0L3R5cGVzL2RvY3VtZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYnNvbiBmcm9tIFwiYnNvblwiO1xuaW1wb3J0IHsgQ2FzZVN0eWxlIH0gZnJvbSBcIi4uLy4uL2xpYi9jYXNlLXN0eWxlXCI7XG5pbXBvcnQgeyBEYXRlVHlwZSB9IGZyb20gXCIuLi8uLi9saWIvdHlwZXMvZGF0ZVwiO1xuaW1wb3J0IHsgRG9jdW1lbnRUeXBlIH0gZnJvbSBcIi4uLy4uL2xpYi90eXBlcy9kb2N1bWVudFwiO1xuaW1wb3J0IHsgSW50ZWdlclR5cGUgfSBmcm9tIFwiLi4vLi4vbGliL3R5cGVzL2ludGVnZXJcIjtcbmltcG9ydCB7IHJ1blRlc3RzLCBUeXBlZFZhbHVlIH0gZnJvbSBcIi4uL2hlbHBlcnMvdGVzdFwiO1xuXG5kZXNjcmliZShcIkRvY3VtZW50XCIsIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgZG9jdW1lbnRUeXBlOiBEb2N1bWVudFR5cGU8YW55PiA9IG5ldyBEb2N1bWVudFR5cGUoe1xuICAgIG5vRXh0cmFLZXlzOiBmYWxzZSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBkYXRlUHJvcDoge1xuICAgICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICAgIHR5cGU6IG5ldyBEYXRlVHlwZSgpLFxuICAgICAgfSxcbiAgICAgIG9wdEludFByb3A6IHtcbiAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICAgIHR5cGU6IG5ldyBJbnRlZ2VyVHlwZSgpLFxuICAgICAgfSxcbiAgICAgIG5lc3RlZERvYzoge1xuICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgdHlwZTogbmV3IERvY3VtZW50VHlwZSh7XG4gICAgICAgICAgbm9FeHRyYUtleXM6IGZhbHNlLFxuICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIGlkOiB7XG4gICAgICAgICAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiBuZXcgSW50ZWdlclR5cGUoKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuXG4gIGNvbnN0IGl0ZW1zOiBUeXBlZFZhbHVlW10gPSBbXG4gICAge1xuICAgICAgdmFsdWU6IHtcbiAgICAgICAgZGF0ZVByb3A6IG5ldyBEYXRlKDApLFxuICAgICAgICBvcHRJbnRQcm9wOiA1MCxcbiAgICAgICAgbmVzdGVkRG9jOiB7XG4gICAgICAgICAgaWQ6IDEwLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHZhbGlkOiB0cnVlLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGpzb246IEpTT04uc3RyaW5naWZ5KHtkYXRlUHJvcDogXCIxOTcwLTAxLTAxVDAwOjAwOjAwLjAwMFpcIiwgb3B0SW50UHJvcDogNTAsIG5lc3RlZERvYzoge2lkOiAxMH19KSxcbiAgICAgICAgcXM6IFwiZGF0ZVByb3A9MTk3MC0wMS0wMVQwMCUzQTAwJTNBMDAuMDAwWiZvcHRJbnRQcm9wPTUwJm5lc3RlZERvYyU1QmlkJTVEPTEwXCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgdmFsdWU6IHtcbiAgICAgICAgZGF0ZVByb3A6IG5ldyBEYXRlKDApLFxuICAgICAgICBuZXN0ZWREb2M6IHtcbiAgICAgICAgICBpZDogMTAsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAganNvbjogSlNPTi5zdHJpbmdpZnkoe2RhdGVQcm9wOiBcIjE5NzAtMDEtMDFUMDA6MDA6MDAuMDAwWlwiLCBuZXN0ZWREb2M6IHtpZDogMTB9fSksXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICB7bmFtZTogXCJuZXcgRGF0ZSgwKVwiLCB2YWx1ZTogbmV3IERhdGUoMCksIHZhbGlkOiBmYWxzZX0sXG4gICAge25hbWU6IFwiMFwiLCB2YWx1ZTogMCwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCIxXCIsIHZhbHVlOiAxLCB2YWxpZDogZmFsc2V9LFxuICAgIHtuYW1lOiBcIlxcXCJcXFwiXCIsIHZhbHVlOiBcIlwiLCB2YWxpZDogZmFsc2V9LFxuICAgIHtuYW1lOiBcIlxcXCIwXFxcIlwiLCB2YWx1ZTogXCIwXCIsIHZhbGlkOiBmYWxzZX0sXG4gICAge25hbWU6IFwiXFxcInRydWVcXFwiXCIsIHZhbHVlOiBcInRydWVcIiwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCJcXFwiZmFsc2VcXFwiXCIsIHZhbHVlOiBcImZhbHNlXCIsIHZhbGlkOiBmYWxzZX0sXG4gICAge25hbWU6IFwiSW5maW5pdHlcIiwgdmFsdWU6IEluZmluaXR5LCB2YWxpZDogZmFsc2V9LFxuICAgIHtuYW1lOiBcIi1JbmZpbml0eVwiLCB2YWx1ZTogLUluZmluaXR5LCB2YWxpZDogZmFsc2V9LFxuICAgIHtuYW1lOiBcIk5hTlwiLCB2YWx1ZTogTmFOLCB2YWxpZDogZmFsc2V9LFxuICAgIHtuYW1lOiBcInVuZGVmaW5lZFwiLCB2YWx1ZTogdW5kZWZpbmVkLCB2YWxpZDogZmFsc2V9LFxuICAgIHtuYW1lOiBcIm51bGxcIiwgdmFsdWU6IG51bGwsIHZhbGlkOiBmYWxzZX0sXG4gICAge25hbWU6IFwiW11cIiwgdmFsdWU6IFtdLCB2YWxpZDogZmFsc2V9LFxuICAgIHtuYW1lOiBcInt9XCIsIHZhbHVlOiB7fSwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCIvcmVnZXgvXCIsIHZhbHVlOiAvcmVnZXgvLCB2YWxpZDogZmFsc2V9LFxuICBdO1xuXG4gIHJ1blRlc3RzKGRvY3VtZW50VHlwZSwgaXRlbXMpO1xufSk7XG5cbmRlc2NyaWJlKFwiRG9jdW1lbnQ6IHJlbmFtZVwiLCBmdW5jdGlvbiAoKSB7XG4gIGludGVyZmFjZSBSZWN0IHtcbiAgICB4TWluOiBudW1iZXI7XG4gICAgeE1heDogbnVtYmVyO1xuICAgIHlNaW46IG51bWJlcjtcbiAgICB5TWF4OiBudW1iZXI7XG4gIH1cblxuICBjb25zdCB0eXBlOiBEb2N1bWVudFR5cGU8UmVjdD4gPSBuZXcgRG9jdW1lbnRUeXBlPFJlY3Q+KHtcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB4TWluOiB7dHlwZTogbmV3IEludGVnZXJUeXBlKCl9LFxuICAgICAgeE1heDoge3R5cGU6IG5ldyBJbnRlZ2VyVHlwZSgpLCBjaGFuZ2VDYXNlOiBDYXNlU3R5bGUuU2NyZWFtaW5nU25ha2VDYXNlfSxcbiAgICAgIHlNaW46IHt0eXBlOiBuZXcgSW50ZWdlclR5cGUoKSwgcmVuYW1lOiBcIl9feU1pblwifSxcbiAgICAgIHlNYXg6IHt0eXBlOiBuZXcgSW50ZWdlclR5cGUoKX0sXG4gICAgfSxcbiAgICByZW5hbWU6IHt4TWluOiBcInhtaW5cIn0sXG4gICAgY2hhbmdlQ2FzZTogQ2FzZVN0eWxlLktlYmFiQ2FzZSxcbiAgfSk7XG5cbiAgY29uc3QgYnNvblNlcmlhbGl6ZXI6IGJzb24uQlNPTiA9IG5ldyBic29uLkJTT04oKTtcblxuICBjb25zdCBpdGVtczogVHlwZWRWYWx1ZVtdID0gW1xuICAgIHtcbiAgICAgIG5hbWU6IFwiUmVjdCB7eE1pbjogMCwgeE1heDogMTAsIHlNaW46IDIwLCB5TWF4OiAzMH1cIixcbiAgICAgIHZhbHVlOiA8UmVjdD4ge1xuICAgICAgICB4TWluOiAwLFxuICAgICAgICB4TWF4OiAxMCxcbiAgICAgICAgeU1pbjogMjAsXG4gICAgICAgIHlNYXg6IDMwLFxuICAgICAgfSxcbiAgICAgIHZhbGlkOiB0cnVlLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGJzb246IGJzb25TZXJpYWxpemVyLnNlcmlhbGl6ZSh7XCJ4bWluXCI6IDAsIFwiWF9NQVhcIjogMTAsIFwiX195TWluXCI6IDIwLCBcInktbWF4XCI6IDMwfSksXG4gICAgICAgIGpzb246IEpTT04uc3RyaW5naWZ5KHtcInhtaW5cIjogMCwgXCJYX01BWFwiOiAxMCwgXCJfX3lNaW5cIjogMjAsIFwieS1tYXhcIjogMzB9KSxcbiAgICAgICAgcXM6IFwieG1pbj0wJlhfTUFYPTEwJl9feU1pbj0yMCZ5LW1heD0zMFwiLFxuICAgICAgfSxcbiAgICB9LFxuICBdO1xuXG4gIHJ1blRlc3RzKHR5cGUsIGl0ZW1zKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9