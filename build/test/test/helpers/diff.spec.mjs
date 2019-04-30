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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L2hlbHBlcnMvZGlmZi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QixPQUFPLEVBQWMsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFL0QsUUFBUSxDQUFDLE1BQU0sRUFBRTtJQUNmLEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRTtRQUN6QyxNQUFNLE1BQU0sR0FBaUIsUUFBUSxDQUFDLGFBQWEsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN0RSxNQUFNLFFBQVEsR0FBaUI7WUFDN0IsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUM7WUFDekIsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUM7WUFDMUIsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUM7WUFDMUIsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUM7WUFDekIsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUM7WUFDMUIsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUM7WUFDMUIsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUM7WUFDekIsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUM7WUFDMUIsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUM7WUFDekIsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUM7U0FDM0IsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvaGVscGVycy9kaWZmLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tIFwiY2hhaVwiO1xuaW1wb3J0IHsgRGlmZkFjdGlvbiwgZGlmZlN5bmMgfSBmcm9tIFwiLi4vLi4vbGliL19oZWxwZXJzL2RpZmZcIjtcblxuZGVzY3JpYmUoXCJEaWZmXCIsIGZ1bmN0aW9uICgpIHtcbiAgaXQoXCJcXFwicm9zZXR0YWNvZGVcXFwiIC0+IFxcXCJyYWlzZXRoeXN3b3JkXFxcIlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYWN0dWFsOiBEaWZmQWN0aW9uW10gPSBkaWZmU3luYyhcInJvc2V0dGFjb2RlXCIsIFwicmFpc2V0aHlzd29yZFwiKTtcbiAgICBjb25zdCBleHBlY3RlZDogRGlmZkFjdGlvbltdID0gW1xuICAgICAge3R5cGU6IFwibWF0Y2hcIiwgdmFsdWU6IDF9LCAgIC8vIHIgICAgclxuICAgICAge3R5cGU6IFwic291cmNlXCIsIHZhbHVlOiAxfSwgIC8vIG9cbiAgICAgIHt0eXBlOiBcInRhcmdldFwiLCB2YWx1ZTogMn0sICAvLyAgICAgIGFpXG4gICAgICB7dHlwZTogXCJtYXRjaFwiLCB2YWx1ZTogM30sICAgLy8gc2V0ICBzZXRcbiAgICAgIHt0eXBlOiBcInNvdXJjZVwiLCB2YWx1ZTogM30sICAvLyB0YWNcbiAgICAgIHt0eXBlOiBcInRhcmdldFwiLCB2YWx1ZTogNH0sICAvLyAgICAgIGh5c3dcbiAgICAgIHt0eXBlOiBcIm1hdGNoXCIsIHZhbHVlOiAxfSwgICAvLyBvICAgIG9cbiAgICAgIHt0eXBlOiBcInRhcmdldFwiLCB2YWx1ZTogMX0sICAvLyAgICAgIHJcbiAgICAgIHt0eXBlOiBcIm1hdGNoXCIsIHZhbHVlOiAxfSwgICAvLyBkICAgIGRcbiAgICAgIHt0eXBlOiBcInNvdXJjZVwiLCB2YWx1ZTogMX0sICAvLyBlXG4gICAgXTtcbiAgICBjaGFpLmFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=