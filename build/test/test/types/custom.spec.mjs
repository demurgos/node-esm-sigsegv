import { Incident } from "incident";
import { createInvalidTypeError } from "../../lib/errors/invalid-type";
import { readVisitor } from "../../lib/readers/read-visitor";
import { CustomType } from "../../lib/types/custom";
import { runTests } from "../helpers/test";
describe("Custom", function () {
    /**
     * Represents a complex number.
     * It only deals with complex number with small unsigned integer cartesian components for
     * simplicity.
     */
    class Complex {
        constructor(real, imaginary) {
            this.real = real;
            this.imaginary = imaginary;
            Object.freeze(this);
        }
        static fromString(input) {
            const realMatch = /^(\d+)(?:\s*\+\s*\d+j)?$/.exec(input);
            const imaginaryMatch = /^(?:\d+\s*\+\s*)?(\d+)j$/.exec(input);
            if (realMatch === null && imaginaryMatch === null) {
                throw new Incident("InvalidInput", { input });
            }
            const real = realMatch !== null ? parseInt(realMatch[1], 10) : 0;
            const imaginary = imaginaryMatch !== null ? parseInt(imaginaryMatch[1], 10) : 0;
            return new Complex(real, imaginary);
        }
        toString() {
            const parts = [];
            if (this.real !== 0) {
                parts.push(this.real.toString(10));
            }
            if (this.imaginary !== 0) {
                parts.push(`${this.imaginary.toString(10)}j`);
            }
            // tslint:disable-next-line:strict-boolean-expressions
            return parts.join(" + ") || "0";
        }
    }
    const complexType = new CustomType({
        read(reader, raw) {
            return reader.readString(raw, readVisitor({
                fromString: (input) => {
                    return Complex.fromString(input);
                },
                fromFloat64: (input) => {
                    return new Complex(input, 0);
                },
            }));
        },
        write(writer, value) {
            return writer.writeString(value.toString());
        },
        testError(value) {
            if (!(value instanceof Complex)) {
                return createInvalidTypeError("Complex", value);
            }
            return undefined;
        },
        equals(value1, value2) {
            return value1.real === value2.real && value1.imaginary === value2.imaginary;
        },
        clone(value) {
            return new Complex(value.real, value.imaginary);
        },
    });
    const items = [
        {
            name: "Complex {real: 0, imaginary: 0}",
            value: new Complex(0, 0),
            valid: true,
            output: {
                json: "\"0\"",
            },
        },
        {
            name: "Complex {real: 1, imaginary: 0}",
            value: new Complex(1, 0),
            valid: true,
            output: {
                json: "\"1\"",
            },
        },
        {
            name: "Complex {real: 0, imaginary: 2}",
            value: new Complex(0, 2),
            valid: true,
            output: {
                json: "\"2j\"",
            },
        },
        {
            name: "Complex {real: 3, imaginary: 4}",
            value: new Complex(3, 4),
            valid: true,
            output: {
                json: "\"3 + 4j\"",
            },
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
    runTests(complexType, items);
});
