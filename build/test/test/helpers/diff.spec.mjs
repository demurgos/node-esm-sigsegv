import chai from "chai";
import { diffSync } from "../../lib/_helpers/diff";
describe("Diff", function () {
    it("\"rosettacode\" -> \"raisethysword\"", function () {
        const actual = diffSync("rosettacode", "raisethysword");
        const expected = [
            { type: "match", value: 1 },
            { type: "source", value: 1 },
            { type: "target", value: 2 },
            { type: "match", value: 3 },
            { type: "source", value: 3 },
            { type: "target", value: 4 },
            { type: "match", value: 1 },
            { type: "target", value: 1 },
            { type: "match", value: 1 },
            { type: "source", value: 1 },
        ];
        chai.assert.deepEqual(actual, expected);
    });
});
