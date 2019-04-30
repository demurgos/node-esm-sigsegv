"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const json_1 = require("../../lib/readers/json");
const json_value_1 = require("../../lib/readers/json-value");
const any_1 = require("../../lib/types/any");
const document_1 = require("../../lib/types/document");
describe("AnyType", function () {
    describe("with JsonReader", function () {
        it("should read the expected top-level values", function () {
            const reader = new json_1.JsonReader();
            const $Any = new any_1.AnyType();
            chai_1.default.assert.deepEqual($Any.read(reader, "0"), "0");
            chai_1.default.assert.deepEqual($Any.read(reader, "{\"foo\": \"bar\""), "{\"foo\": \"bar\"");
        });
        it("should read the expected nested values", function () {
            const reader = new json_1.JsonReader();
            const $Any = new any_1.AnyType();
            const $FooBarQuz = new document_1.DocumentType({
                properties: { foo: { type: $Any } },
            });
            chai_1.default.assert.deepEqual($FooBarQuz.read(reader, "{\"foo\": {\"bar\": \"quz\"}}"), { foo: { bar: "quz" } });
        });
    });
    describe("with JsonValueReader", function () {
        it("should read the expected values", function () {
            const reader = new json_value_1.JsonValueReader();
            const $Any = new any_1.AnyType();
            chai_1.default.assert.deepEqual($Any.read(reader, 0), 0);
            chai_1.default.assert.deepEqual($Any.read(reader, { foo: "bar" }), { foo: "bar" });
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L3R5cGVzL2FueS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLGlEQUFvRDtBQUNwRCw2REFBK0Q7QUFDL0QsNkNBQThDO0FBQzlDLHVEQUF3RTtBQUV4RSxRQUFRLENBQUMsU0FBUyxFQUFFO0lBQ2xCLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixFQUFFLENBQUMsMkNBQTJDLEVBQUU7WUFDOUMsTUFBTSxNQUFNLEdBQWUsSUFBSSxpQkFBVSxFQUFFLENBQUM7WUFDNUMsTUFBTSxJQUFJLEdBQVksSUFBSSxhQUFPLEVBQUUsQ0FBQztZQUNwQyxjQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNuRCxjQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDckYsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsd0NBQXdDLEVBQUU7WUFDM0MsTUFBTSxNQUFNLEdBQWUsSUFBSSxpQkFBVSxFQUFFLENBQUM7WUFDNUMsTUFBTSxJQUFJLEdBQVksSUFBSSxhQUFPLEVBQUUsQ0FBQztZQU1wQyxNQUFNLFVBQVUsR0FBOEIsSUFBSSx1QkFBWSxDQUFDO2dCQUM3RCxVQUFVLEVBQUUsRUFBQyxHQUFHLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUM7YUFDaEMsQ0FBQyxDQUFDO1lBRUgsY0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsK0JBQStCLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBRSxFQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUMsRUFBQyxDQUFDLENBQUM7UUFDdkcsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUMvQixFQUFFLENBQUMsaUNBQWlDLEVBQUU7WUFDcEMsTUFBTSxNQUFNLEdBQW9CLElBQUksNEJBQWUsRUFBRSxDQUFDO1lBQ3RELE1BQU0sSUFBSSxHQUFZLElBQUksYUFBTyxFQUFFLENBQUM7WUFDcEMsY0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0MsY0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFDLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3R5cGVzL2FueS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSBcImNoYWlcIjtcbmltcG9ydCB7IEpzb25SZWFkZXIgfSBmcm9tIFwiLi4vLi4vbGliL3JlYWRlcnMvanNvblwiO1xuaW1wb3J0IHsgSnNvblZhbHVlUmVhZGVyIH0gZnJvbSBcIi4uLy4uL2xpYi9yZWFkZXJzL2pzb24tdmFsdWVcIjtcbmltcG9ydCB7IEFueVR5cGUgfSBmcm9tIFwiLi4vLi4vbGliL3R5cGVzL2FueVwiO1xuaW1wb3J0IHsgRG9jdW1lbnRJb1R5cGUsIERvY3VtZW50VHlwZSB9IGZyb20gXCIuLi8uLi9saWIvdHlwZXMvZG9jdW1lbnRcIjtcblxuZGVzY3JpYmUoXCJBbnlUeXBlXCIsIGZ1bmN0aW9uICgpIHtcbiAgZGVzY3JpYmUoXCJ3aXRoIEpzb25SZWFkZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgIGl0KFwic2hvdWxkIHJlYWQgdGhlIGV4cGVjdGVkIHRvcC1sZXZlbCB2YWx1ZXNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgcmVhZGVyOiBKc29uUmVhZGVyID0gbmV3IEpzb25SZWFkZXIoKTtcbiAgICAgIGNvbnN0ICRBbnk6IEFueVR5cGUgPSBuZXcgQW55VHlwZSgpO1xuICAgICAgY2hhaS5hc3NlcnQuZGVlcEVxdWFsKCRBbnkucmVhZChyZWFkZXIsIFwiMFwiKSwgXCIwXCIpO1xuICAgICAgY2hhaS5hc3NlcnQuZGVlcEVxdWFsKCRBbnkucmVhZChyZWFkZXIsIFwie1xcXCJmb29cXFwiOiBcXFwiYmFyXFxcIlwiKSwgXCJ7XFxcImZvb1xcXCI6IFxcXCJiYXJcXFwiXCIpO1xuICAgIH0pO1xuICAgIGl0KFwic2hvdWxkIHJlYWQgdGhlIGV4cGVjdGVkIG5lc3RlZCB2YWx1ZXNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgcmVhZGVyOiBKc29uUmVhZGVyID0gbmV3IEpzb25SZWFkZXIoKTtcbiAgICAgIGNvbnN0ICRBbnk6IEFueVR5cGUgPSBuZXcgQW55VHlwZSgpO1xuXG4gICAgICBpbnRlcmZhY2UgRm9vQmFyUXV6IHtcbiAgICAgICAgZm9vOiBhbnk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0ICRGb29CYXJRdXo6IERvY3VtZW50SW9UeXBlPEZvb0JhclF1ej4gPSBuZXcgRG9jdW1lbnRUeXBlKHtcbiAgICAgICAgcHJvcGVydGllczoge2Zvbzoge3R5cGU6ICRBbnl9fSxcbiAgICAgIH0pO1xuXG4gICAgICBjaGFpLmFzc2VydC5kZWVwRXF1YWwoJEZvb0JhclF1ei5yZWFkKHJlYWRlciwgXCJ7XFxcImZvb1xcXCI6IHtcXFwiYmFyXFxcIjogXFxcInF1elxcXCJ9fVwiKSwge2Zvbzoge2JhcjogXCJxdXpcIn19KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoXCJ3aXRoIEpzb25WYWx1ZVJlYWRlclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoXCJzaG91bGQgcmVhZCB0aGUgZXhwZWN0ZWQgdmFsdWVzXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHJlYWRlcjogSnNvblZhbHVlUmVhZGVyID0gbmV3IEpzb25WYWx1ZVJlYWRlcigpO1xuICAgICAgY29uc3QgJEFueTogQW55VHlwZSA9IG5ldyBBbnlUeXBlKCk7XG4gICAgICBjaGFpLmFzc2VydC5kZWVwRXF1YWwoJEFueS5yZWFkKHJlYWRlciwgMCksIDApO1xuICAgICAgY2hhaS5hc3NlcnQuZGVlcEVxdWFsKCRBbnkucmVhZChyZWFkZXIsIHtmb286IFwiYmFyXCJ9KSwge2ZvbzogXCJiYXJcIn0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
