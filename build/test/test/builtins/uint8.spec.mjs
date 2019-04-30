import { $Uint8 } from "../../lib/builtins/uint8";
import { runTests } from "../helpers/test";
describe("$Uint8", function () {
    const items = [
        // Valid values
        { name: "0", value: 0, valid: true },
        { name: "-0", value: -0, valid: true },
        { name: "1", value: 1, valid: true },
        { name: "3", value: 3, valid: true },
        { name: "7", value: 7, valid: true },
        { name: "15", value: 15, valid: true },
        { name: "31", value: 31, valid: true },
        { name: "63", value: 63, valid: true },
        { name: "127", value: 127, valid: true },
        { name: "255", value: 255, valid: true },
        // Invalid values
        { name: "-1", value: -1, valid: false },
        { name: "-128", value: -128, valid: false },
        { name: "-255", value: -255, valid: false },
        { name: "-256", value: -256, valid: false },
        { name: "-129", value: -129, valid: false },
        { name: "256", value: 256, valid: false },
    ];
    runTests($Uint8, items);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L2J1aWx0aW5zL3VpbnQ4LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxRQUFRLEVBQWMsTUFBTSxpQkFBaUIsQ0FBQztBQUV2RCxRQUFRLENBQUMsUUFBUSxFQUFFO0lBQ2pCLE1BQU0sS0FBSyxHQUFpQjtRQUMxQixlQUFlO1FBQ2YsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztRQUNsQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7UUFDcEMsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztRQUNsQyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO1FBQ2xDLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7UUFDbEMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztRQUNwQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO1FBQ3BDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7UUFDcEMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztRQUN0QyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO1FBQ3RDLGlCQUFpQjtRQUNqQixFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7UUFDckMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1FBQ3pDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztRQUN6QyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7UUFDekMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1FBQ3pDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7S0FDeEMsQ0FBQztJQUVGLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDMUIsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9idWlsdGlucy91aW50OC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgJFVpbnQ4IH0gZnJvbSBcIi4uLy4uL2xpYi9idWlsdGlucy91aW50OFwiO1xuaW1wb3J0IHsgcnVuVGVzdHMsIFR5cGVkVmFsdWUgfSBmcm9tIFwiLi4vaGVscGVycy90ZXN0XCI7XG5cbmRlc2NyaWJlKFwiJFVpbnQ4XCIsIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgaXRlbXM6IFR5cGVkVmFsdWVbXSA9IFtcbiAgICAvLyBWYWxpZCB2YWx1ZXNcbiAgICB7bmFtZTogXCIwXCIsIHZhbHVlOiAwLCB2YWxpZDogdHJ1ZX0sXG4gICAge25hbWU6IFwiLTBcIiwgdmFsdWU6IC0wLCB2YWxpZDogdHJ1ZX0sXG4gICAge25hbWU6IFwiMVwiLCB2YWx1ZTogMSwgdmFsaWQ6IHRydWV9LFxuICAgIHtuYW1lOiBcIjNcIiwgdmFsdWU6IDMsIHZhbGlkOiB0cnVlfSxcbiAgICB7bmFtZTogXCI3XCIsIHZhbHVlOiA3LCB2YWxpZDogdHJ1ZX0sXG4gICAge25hbWU6IFwiMTVcIiwgdmFsdWU6IDE1LCB2YWxpZDogdHJ1ZX0sXG4gICAge25hbWU6IFwiMzFcIiwgdmFsdWU6IDMxLCB2YWxpZDogdHJ1ZX0sXG4gICAge25hbWU6IFwiNjNcIiwgdmFsdWU6IDYzLCB2YWxpZDogdHJ1ZX0sXG4gICAge25hbWU6IFwiMTI3XCIsIHZhbHVlOiAxMjcsIHZhbGlkOiB0cnVlfSxcbiAgICB7bmFtZTogXCIyNTVcIiwgdmFsdWU6IDI1NSwgdmFsaWQ6IHRydWV9LFxuICAgIC8vIEludmFsaWQgdmFsdWVzXG4gICAge25hbWU6IFwiLTFcIiwgdmFsdWU6IC0xLCB2YWxpZDogZmFsc2V9LFxuICAgIHtuYW1lOiBcIi0xMjhcIiwgdmFsdWU6IC0xMjgsIHZhbGlkOiBmYWxzZX0sXG4gICAge25hbWU6IFwiLTI1NVwiLCB2YWx1ZTogLTI1NSwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7bmFtZTogXCItMjU2XCIsIHZhbHVlOiAtMjU2LCB2YWxpZDogZmFsc2V9LFxuICAgIHtuYW1lOiBcIi0xMjlcIiwgdmFsdWU6IC0xMjksIHZhbGlkOiBmYWxzZX0sXG4gICAge25hbWU6IFwiMjU2XCIsIHZhbHVlOiAyNTYsIHZhbGlkOiBmYWxzZX0sXG4gIF07XG5cbiAgcnVuVGVzdHMoJFVpbnQ4LCBpdGVtcyk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
