import chai from "chai";
import { JsonReader } from "../../lib/readers/json";
import { JsonValueReader } from "../../lib/readers/json-value";
import { AnyType } from "../../lib/types/any";
import { DocumentType } from "../../lib/types/document";
describe("AnyType", function () {
    describe("with JsonReader", function () {
        it("should read the expected top-level values", function () {
            const reader = new JsonReader();
            const $Any = new AnyType();
            chai.assert.deepEqual($Any.read(reader, "0"), "0");
            chai.assert.deepEqual($Any.read(reader, "{\"foo\": \"bar\""), "{\"foo\": \"bar\"");
        });
        it("should read the expected nested values", function () {
            const reader = new JsonReader();
            const $Any = new AnyType();
            const $FooBarQuz = new DocumentType({
                properties: { foo: { type: $Any } },
            });
            chai.assert.deepEqual($FooBarQuz.read(reader, "{\"foo\": {\"bar\": \"quz\"}}"), { foo: { bar: "quz" } });
        });
    });
    describe("with JsonValueReader", function () {
        it("should read the expected values", function () {
            const reader = new JsonValueReader();
            const $Any = new AnyType();
            chai.assert.deepEqual($Any.read(reader, 0), 0);
            chai.assert.deepEqual($Any.read(reader, { foo: "bar" }), { foo: "bar" });
        });
    });
});
