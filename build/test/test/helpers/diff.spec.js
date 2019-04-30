"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const diff_1 = require("../../lib/_helpers/diff");
describe("Diff", function () {
    it("\"rosettacode\" -> \"raisethysword\"", function () {
        const actual = diff_1.diffSync("rosettacode", "raisethysword");
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
        chai_1.default.assert.deepEqual(actual, expected);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L2hlbHBlcnMvZGlmZi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLGtEQUErRDtBQUUvRCxRQUFRLENBQUMsTUFBTSxFQUFFO0lBQ2YsRUFBRSxDQUFDLHNDQUFzQyxFQUFFO1FBQ3pDLE1BQU0sTUFBTSxHQUFpQixlQUFRLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sUUFBUSxHQUFpQjtZQUM3QixFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQztZQUN6QixFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQztZQUMxQixFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQztZQUMxQixFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQztZQUN6QixFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQztZQUMxQixFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQztZQUMxQixFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQztZQUN6QixFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQztZQUMxQixFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQztZQUN6QixFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQztTQUMzQixDQUFDO1FBQ0YsY0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9oZWxwZXJzL2RpZmYuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gXCJjaGFpXCI7XG5pbXBvcnQgeyBEaWZmQWN0aW9uLCBkaWZmU3luYyB9IGZyb20gXCIuLi8uLi9saWIvX2hlbHBlcnMvZGlmZlwiO1xuXG5kZXNjcmliZShcIkRpZmZcIiwgZnVuY3Rpb24gKCkge1xuICBpdChcIlxcXCJyb3NldHRhY29kZVxcXCIgLT4gXFxcInJhaXNldGh5c3dvcmRcXFwiXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBhY3R1YWw6IERpZmZBY3Rpb25bXSA9IGRpZmZTeW5jKFwicm9zZXR0YWNvZGVcIiwgXCJyYWlzZXRoeXN3b3JkXCIpO1xuICAgIGNvbnN0IGV4cGVjdGVkOiBEaWZmQWN0aW9uW10gPSBbXG4gICAgICB7dHlwZTogXCJtYXRjaFwiLCB2YWx1ZTogMX0sICAgLy8gciAgICByXG4gICAgICB7dHlwZTogXCJzb3VyY2VcIiwgdmFsdWU6IDF9LCAgLy8gb1xuICAgICAge3R5cGU6IFwidGFyZ2V0XCIsIHZhbHVlOiAyfSwgIC8vICAgICAgYWlcbiAgICAgIHt0eXBlOiBcIm1hdGNoXCIsIHZhbHVlOiAzfSwgICAvLyBzZXQgIHNldFxuICAgICAge3R5cGU6IFwic291cmNlXCIsIHZhbHVlOiAzfSwgIC8vIHRhY1xuICAgICAge3R5cGU6IFwidGFyZ2V0XCIsIHZhbHVlOiA0fSwgIC8vICAgICAgaHlzd1xuICAgICAge3R5cGU6IFwibWF0Y2hcIiwgdmFsdWU6IDF9LCAgIC8vIG8gICAgb1xuICAgICAge3R5cGU6IFwidGFyZ2V0XCIsIHZhbHVlOiAxfSwgIC8vICAgICAgclxuICAgICAge3R5cGU6IFwibWF0Y2hcIiwgdmFsdWU6IDF9LCAgIC8vIGQgICAgZFxuICAgICAge3R5cGU6IFwic291cmNlXCIsIHZhbHVlOiAxfSwgIC8vIGVcbiAgICBdO1xuICAgIGNoYWkuYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
