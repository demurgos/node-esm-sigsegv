import { $UuidHex } from "../../lib/builtins/uuid-hex";
import { runTests } from "../helpers/test";
describe("$UuidHex", function () {
    const items = [
        // Valid values
        { value: "bbb823fc-f020-4e96-97b4-5d08907a463f", valid: true },
        { value: "7343ddeb-bc62-40bf-beb5-13f885c22852", valid: true },
        // Invalid values
        { value: "bbb823fcf0204e9697b45d08907a463f", valid: false },
        { value: "7343DDEB-BC62-40BF-BEB5-13F885C22852", valid: false },
        { value: "7343ddeb-bc62-40bf-beb5-13f885c2285", valid: false },
        { value: "7343ddeb-bc62-40bf-beb5-13f885c228522", valid: false },
        { value: "7343zzzz-zz62-40zz-zzz5-13z885z22852", valid: false },
    ];
    runTests($UuidHex, items);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L2J1aWx0aW5zL3V1aWQtaGV4LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxRQUFRLEVBQWMsTUFBTSxpQkFBaUIsQ0FBQztBQUV2RCxRQUFRLENBQUMsVUFBVSxFQUFFO0lBQ25CLE1BQU0sS0FBSyxHQUFpQjtRQUMxQixlQUFlO1FBQ2YsRUFBQyxLQUFLLEVBQUUsc0NBQXNDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztRQUM1RCxFQUFDLEtBQUssRUFBRSxzQ0FBc0MsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO1FBQzVELGlCQUFpQjtRQUNqQixFQUFDLEtBQUssRUFBRSxrQ0FBa0MsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1FBQ3pELEVBQUMsS0FBSyxFQUFFLHNDQUFzQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7UUFDN0QsRUFBQyxLQUFLLEVBQUUscUNBQXFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztRQUM1RCxFQUFDLEtBQUssRUFBRSx1Q0FBdUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1FBQzlELEVBQUMsS0FBSyxFQUFFLHNDQUFzQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7S0FDOUQsQ0FBQztJQUVGLFFBQVEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDNUIsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9idWlsdGlucy91dWlkLWhleC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgJFV1aWRIZXggfSBmcm9tIFwiLi4vLi4vbGliL2J1aWx0aW5zL3V1aWQtaGV4XCI7XG5pbXBvcnQgeyBydW5UZXN0cywgVHlwZWRWYWx1ZSB9IGZyb20gXCIuLi9oZWxwZXJzL3Rlc3RcIjtcblxuZGVzY3JpYmUoXCIkVXVpZEhleFwiLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGl0ZW1zOiBUeXBlZFZhbHVlW10gPSBbXG4gICAgLy8gVmFsaWQgdmFsdWVzXG4gICAge3ZhbHVlOiBcImJiYjgyM2ZjLWYwMjAtNGU5Ni05N2I0LTVkMDg5MDdhNDYzZlwiLCB2YWxpZDogdHJ1ZX0sXG4gICAge3ZhbHVlOiBcIjczNDNkZGViLWJjNjItNDBiZi1iZWI1LTEzZjg4NWMyMjg1MlwiLCB2YWxpZDogdHJ1ZX0sXG4gICAgLy8gSW52YWxpZCB2YWx1ZXNcbiAgICB7dmFsdWU6IFwiYmJiODIzZmNmMDIwNGU5Njk3YjQ1ZDA4OTA3YTQ2M2ZcIiwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7dmFsdWU6IFwiNzM0M0RERUItQkM2Mi00MEJGLUJFQjUtMTNGODg1QzIyODUyXCIsIHZhbGlkOiBmYWxzZX0sXG4gICAge3ZhbHVlOiBcIjczNDNkZGViLWJjNjItNDBiZi1iZWI1LTEzZjg4NWMyMjg1XCIsIHZhbGlkOiBmYWxzZX0sXG4gICAge3ZhbHVlOiBcIjczNDNkZGViLWJjNjItNDBiZi1iZWI1LTEzZjg4NWMyMjg1MjJcIiwgdmFsaWQ6IGZhbHNlfSxcbiAgICB7dmFsdWU6IFwiNzM0M3p6enoteno2Mi00MHp6LXp6ejUtMTN6ODg1ejIyODUyXCIsIHZhbGlkOiBmYWxzZX0sXG4gIF07XG5cbiAgcnVuVGVzdHMoJFV1aWRIZXgsIGl0ZW1zKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9