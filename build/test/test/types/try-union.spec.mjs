import bson from "bson";
import chai from "chai";
import { CaseStyle } from "../../lib/case-style";
import { JsonValueReader } from "../../lib/readers/json-value";
import { DocumentType } from "../../lib/types/document";
import { IntegerType } from "../../lib/types/integer";
import { TryUnionType } from "../../lib/types/try-union";
import { runTests } from "../helpers/test";
const bsonSerializer = new bson.BSON();
describe("TryUnion", function () {
    describe("TryUnion<Shape>", function () {
        const $Rectangle = new DocumentType({
            properties: {
                width: { type: new IntegerType() },
                height: { type: new IntegerType() },
            },
            changeCase: CaseStyle.KebabCase,
        });
        const $Circle = new DocumentType({
            properties: {
                radius: { type: new IntegerType() },
            },
            changeCase: CaseStyle.KebabCase,
        });
        const $Shape = new TryUnionType({
            variants: [$Rectangle, $Circle],
        });
        const items = [
            {
                name: "Rectangle {width: 10, height: 20}",
                value: {
                    width: 10,
                    height: 20,
                },
                valid: true,
                output: {
                    bson: bsonSerializer.serialize({ width: 10, height: 20 }),
                    json: "{\"width\":10,\"height\":20}",
                    qs: "width=10&height=20",
                },
            },
            {
                name: "Circle {radius: 15}",
                value: {
                    radius: 15,
                },
                valid: true,
                output: {
                    bson: bsonSerializer.serialize({ radius: 15 }),
                    json: "{\"radius\":15}",
                    qs: "radius=15",
                },
            },
            {
                name: "{}",
                value: {},
                valid: false,
            },
            {
                name: "{type: \"circle\", radius: true}",
                value: {
                    type: "circle",
                    radius: true,
                },
                valid: false,
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
        runTests($Shape, items);
        const jsonValueReader = new JsonValueReader();
        it(".readTrustedWithVariant should return $Rectangle", () => {
            const { variant } = $Shape.variantRead(jsonValueReader, { width: 10, height: 20 });
            chai.assert.strictEqual(variant, $Rectangle);
        });
        it(".readTrustedWithVariant should return $Circle", () => {
            const { variant } = $Shape.variantRead(jsonValueReader, { radius: 15 });
            chai.assert.strictEqual(variant, $Circle);
        });
        // it(".testWithVariant should return [true, $Rectangle]", () => {
        //   const [test, variant] = $Shape.testWithVariant({width: 10, height: 20});
        //   assert.strictEqual(test, true);
        //   assert.strictEqual(variant, $Rectangle);
        // });
        //
        // it(".testWithVariant should return [true, $Circle]", () => {
        //   const [test, variant] = $Shape.testWithVariant({radius: 15});
        //   assert.strictEqual(test, true);
        //   assert.strictEqual(variant, $Circle);
        // });
        // it(".testWithVariant should return [false, undefined]", () => {
        //   const [test, variant] = $Shape.testWithVariant({length: 25} as any);
        //   assert.strictEqual(test, false);
        //   assert.strictEqual(variant, undefined);
        // });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L3R5cGVzL3RyeS11bmlvbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QixPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFjLE1BQU0saUJBQWlCLENBQUM7QUFFdkQsTUFBTSxjQUFjLEdBQWMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7QUFFbEQsUUFBUSxDQUFDLFVBQVUsRUFBRTtJQUNuQixRQUFRLENBQUMsaUJBQWlCLEVBQUU7UUFNMUIsTUFBTSxVQUFVLEdBQTRCLElBQUksWUFBWSxDQUFZO1lBQ3RFLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxXQUFXLEVBQUUsRUFBQztnQkFDaEMsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksV0FBVyxFQUFFLEVBQUM7YUFDbEM7WUFDRCxVQUFVLEVBQUUsU0FBUyxDQUFDLFNBQVM7U0FDaEMsQ0FBQyxDQUFDO1FBTUgsTUFBTSxPQUFPLEdBQXlCLElBQUksWUFBWSxDQUFTO1lBQzdELFVBQVUsRUFBRTtnQkFDVixNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxXQUFXLEVBQUUsRUFBQzthQUNsQztZQUNELFVBQVUsRUFBRSxTQUFTLENBQUMsU0FBUztTQUNoQyxDQUFDLENBQUM7UUFHSCxNQUFNLE1BQU0sR0FBd0IsSUFBSSxZQUFZLENBQVE7WUFDMUQsUUFBUSxFQUFFLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQztTQUNoQyxDQUFDLENBQUM7UUFFSCxNQUFNLEtBQUssR0FBaUI7WUFDMUI7Z0JBQ0UsSUFBSSxFQUFFLG1DQUFtQztnQkFDekMsS0FBSyxFQUFjO29CQUNqQixLQUFLLEVBQUUsRUFBRTtvQkFDVCxNQUFNLEVBQUUsRUFBRTtpQkFDWDtnQkFDRCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUMsQ0FBQztvQkFDdkQsSUFBSSxFQUFFLDhCQUE4QjtvQkFDcEMsRUFBRSxFQUFFLG9CQUFvQjtpQkFDekI7YUFDRjtZQUNEO2dCQUNFLElBQUksRUFBRSxxQkFBcUI7Z0JBQzNCLEtBQUssRUFBVztvQkFDZCxNQUFNLEVBQUUsRUFBRTtpQkFDWDtnQkFDRCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBQyxNQUFNLEVBQUUsRUFBRSxFQUFDLENBQUM7b0JBQzVDLElBQUksRUFBRSxpQkFBaUI7b0JBQ3ZCLEVBQUUsRUFBRSxXQUFXO2lCQUNoQjthQUNGO1lBRUQ7Z0JBQ0UsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLEtBQUs7YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxrQ0FBa0M7Z0JBQ3hDLEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxNQUFNLEVBQUUsSUFBSTtpQkFDYjtnQkFDRCxLQUFLLEVBQUUsS0FBSzthQUNiO1lBQ0QsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztZQUM3QyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1lBQ25DLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7WUFDbkMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztZQUN2QyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1lBQ3pDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7WUFDekMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztZQUMzQyxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1lBQ2pELEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztZQUNuRCxFQUFDLElBQUksRUFBRSx3Q0FBd0MsRUFBRSxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsMEJBQTBCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1lBQzNHLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7WUFDdkMsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztZQUNuRCxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1lBQ3pDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7WUFDckMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztZQUNyQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1NBQ2hELENBQUM7UUFFRixRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sZUFBZSxHQUFvQixJQUFJLGVBQWUsRUFBRSxDQUFDO1FBRS9ELEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxHQUFHLEVBQUU7WUFDMUQsTUFBTSxFQUFDLE9BQU8sRUFBQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztZQUMvRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsK0NBQStDLEVBQUUsR0FBRyxFQUFFO1lBQ3ZELE1BQU0sRUFBQyxPQUFPLEVBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxFQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztRQUVILGtFQUFrRTtRQUNsRSw2RUFBNkU7UUFDN0Usb0NBQW9DO1FBQ3BDLDZDQUE2QztRQUM3QyxNQUFNO1FBQ04sRUFBRTtRQUNGLCtEQUErRDtRQUMvRCxrRUFBa0U7UUFDbEUsb0NBQW9DO1FBQ3BDLDBDQUEwQztRQUMxQyxNQUFNO1FBRU4sa0VBQWtFO1FBQ2xFLHlFQUF5RTtRQUN6RSxxQ0FBcUM7UUFDckMsNENBQTRDO1FBQzVDLE1BQU07SUFDUixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdHlwZXMvdHJ5LXVuaW9uLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYnNvbiBmcm9tIFwiYnNvblwiO1xuaW1wb3J0IGNoYWkgZnJvbSBcImNoYWlcIjtcbmltcG9ydCB7IENhc2VTdHlsZSB9IGZyb20gXCIuLi8uLi9saWIvY2FzZS1zdHlsZVwiO1xuaW1wb3J0IHsgSnNvblZhbHVlUmVhZGVyIH0gZnJvbSBcIi4uLy4uL2xpYi9yZWFkZXJzL2pzb24tdmFsdWVcIjtcbmltcG9ydCB7IERvY3VtZW50VHlwZSB9IGZyb20gXCIuLi8uLi9saWIvdHlwZXMvZG9jdW1lbnRcIjtcbmltcG9ydCB7IEludGVnZXJUeXBlIH0gZnJvbSBcIi4uLy4uL2xpYi90eXBlcy9pbnRlZ2VyXCI7XG5pbXBvcnQgeyBUcnlVbmlvblR5cGUgfSBmcm9tIFwiLi4vLi4vbGliL3R5cGVzL3RyeS11bmlvblwiO1xuaW1wb3J0IHsgcnVuVGVzdHMsIFR5cGVkVmFsdWUgfSBmcm9tIFwiLi4vaGVscGVycy90ZXN0XCI7XG5cbmNvbnN0IGJzb25TZXJpYWxpemVyOiBic29uLkJTT04gPSBuZXcgYnNvbi5CU09OKCk7XG5cbmRlc2NyaWJlKFwiVHJ5VW5pb25cIiwgZnVuY3Rpb24gKCkge1xuICBkZXNjcmliZShcIlRyeVVuaW9uPFNoYXBlPlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgaW50ZXJmYWNlIFJlY3RhbmdsZSB7XG4gICAgICB3aWR0aDogbnVtYmVyO1xuICAgICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgfVxuXG4gICAgY29uc3QgJFJlY3RhbmdsZTogRG9jdW1lbnRUeXBlPFJlY3RhbmdsZT4gPSBuZXcgRG9jdW1lbnRUeXBlPFJlY3RhbmdsZT4oe1xuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB3aWR0aDoge3R5cGU6IG5ldyBJbnRlZ2VyVHlwZSgpfSxcbiAgICAgICAgaGVpZ2h0OiB7dHlwZTogbmV3IEludGVnZXJUeXBlKCl9LFxuICAgICAgfSxcbiAgICAgIGNoYW5nZUNhc2U6IENhc2VTdHlsZS5LZWJhYkNhc2UsXG4gICAgfSk7XG5cbiAgICBpbnRlcmZhY2UgQ2lyY2xlIHtcbiAgICAgIHJhZGl1czogbnVtYmVyO1xuICAgIH1cblxuICAgIGNvbnN0ICRDaXJjbGU6IERvY3VtZW50VHlwZTxDaXJjbGU+ID0gbmV3IERvY3VtZW50VHlwZTxDaXJjbGU+KHtcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcmFkaXVzOiB7dHlwZTogbmV3IEludGVnZXJUeXBlKCl9LFxuICAgICAgfSxcbiAgICAgIGNoYW5nZUNhc2U6IENhc2VTdHlsZS5LZWJhYkNhc2UsXG4gICAgfSk7XG5cbiAgICB0eXBlIFNoYXBlID0gUmVjdGFuZ2xlIHwgQ2lyY2xlO1xuICAgIGNvbnN0ICRTaGFwZTogVHJ5VW5pb25UeXBlPFNoYXBlPiA9IG5ldyBUcnlVbmlvblR5cGU8U2hhcGU+KHtcbiAgICAgIHZhcmlhbnRzOiBbJFJlY3RhbmdsZSwgJENpcmNsZV0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBpdGVtczogVHlwZWRWYWx1ZVtdID0gW1xuICAgICAge1xuICAgICAgICBuYW1lOiBcIlJlY3RhbmdsZSB7d2lkdGg6IDEwLCBoZWlnaHQ6IDIwfVwiLFxuICAgICAgICB2YWx1ZTogPFJlY3RhbmdsZT4ge1xuICAgICAgICAgIHdpZHRoOiAxMCxcbiAgICAgICAgICBoZWlnaHQ6IDIwLFxuICAgICAgICB9LFxuICAgICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgYnNvbjogYnNvblNlcmlhbGl6ZXIuc2VyaWFsaXplKHt3aWR0aDogMTAsIGhlaWdodDogMjB9KSxcbiAgICAgICAgICBqc29uOiBcIntcXFwid2lkdGhcXFwiOjEwLFxcXCJoZWlnaHRcXFwiOjIwfVwiLFxuICAgICAgICAgIHFzOiBcIndpZHRoPTEwJmhlaWdodD0yMFwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJDaXJjbGUge3JhZGl1czogMTV9XCIsXG4gICAgICAgIHZhbHVlOiA8Q2lyY2xlPiB7XG4gICAgICAgICAgcmFkaXVzOiAxNSxcbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGJzb246IGJzb25TZXJpYWxpemVyLnNlcmlhbGl6ZSh7cmFkaXVzOiAxNX0pLFxuICAgICAgICAgIGpzb246IFwie1xcXCJyYWRpdXNcXFwiOjE1fVwiLFxuICAgICAgICAgIHFzOiBcInJhZGl1cz0xNVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcblxuICAgICAge1xuICAgICAgICBuYW1lOiBcInt9XCIsXG4gICAgICAgIHZhbHVlOiB7fSxcbiAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJ7dHlwZTogXFxcImNpcmNsZVxcXCIsIHJhZGl1czogdHJ1ZX1cIixcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICB0eXBlOiBcImNpcmNsZVwiLFxuICAgICAgICAgIHJhZGl1czogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHtuYW1lOiBcIlxcXCJmb29cXFwiXCIsIHZhbHVlOiBcImJhclwiLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiMFwiLCB2YWx1ZTogMCwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIjFcIiwgdmFsdWU6IDEsIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJcXFwiXFxcIlwiLCB2YWx1ZTogXCJcIiwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIlxcXCIwXFxcIlwiLCB2YWx1ZTogXCIwXCIsIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJ0cnVlXCIsIHZhbHVlOiB0cnVlLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiZmFsc2VcIiwgdmFsdWU6IGZhbHNlLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiSW5maW5pdHlcIiwgdmFsdWU6IEluZmluaXR5LCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiLUluZmluaXR5XCIsIHZhbHVlOiAtSW5maW5pdHksIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJuZXcgRGF0ZShcXFwiMTI0Ny0wNS0xOFQxOTo0MDowOC40MThaXFxcIilcIiwgdmFsdWU6IG5ldyBEYXRlKFwiMTI0Ny0wNS0xOFQxOTo0MDowOC40MThaXCIpLCB2YWxpZDogZmFsc2V9LFxuICAgICAge25hbWU6IFwiTmFOXCIsIHZhbHVlOiBOYU4sIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJ1bmRlZmluZWRcIiwgdmFsdWU6IHVuZGVmaW5lZCwgdmFsaWQ6IGZhbHNlfSxcbiAgICAgIHtuYW1lOiBcIm51bGxcIiwgdmFsdWU6IG51bGwsIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJbXVwiLCB2YWx1ZTogW10sIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCJ7fVwiLCB2YWx1ZToge30sIHZhbGlkOiBmYWxzZX0sXG4gICAgICB7bmFtZTogXCIvcmVnZXgvXCIsIHZhbHVlOiAvcmVnZXgvLCB2YWxpZDogZmFsc2V9LFxuICAgIF07XG5cbiAgICBydW5UZXN0cygkU2hhcGUsIGl0ZW1zKTtcblxuICAgIGNvbnN0IGpzb25WYWx1ZVJlYWRlcjogSnNvblZhbHVlUmVhZGVyID0gbmV3IEpzb25WYWx1ZVJlYWRlcigpO1xuXG4gICAgaXQoXCIucmVhZFRydXN0ZWRXaXRoVmFyaWFudCBzaG91bGQgcmV0dXJuICRSZWN0YW5nbGVcIiwgKCkgPT4ge1xuICAgICAgY29uc3Qge3ZhcmlhbnR9ID0gJFNoYXBlLnZhcmlhbnRSZWFkKGpzb25WYWx1ZVJlYWRlciwge3dpZHRoOiAxMCwgaGVpZ2h0OiAyMH0pO1xuICAgICAgY2hhaS5hc3NlcnQuc3RyaWN0RXF1YWwodmFyaWFudCwgJFJlY3RhbmdsZSk7XG4gICAgfSk7XG5cbiAgICBpdChcIi5yZWFkVHJ1c3RlZFdpdGhWYXJpYW50IHNob3VsZCByZXR1cm4gJENpcmNsZVwiLCAoKSA9PiB7XG4gICAgICBjb25zdCB7dmFyaWFudH0gPSAkU2hhcGUudmFyaWFudFJlYWQoanNvblZhbHVlUmVhZGVyLCB7cmFkaXVzOiAxNX0pO1xuICAgICAgY2hhaS5hc3NlcnQuc3RyaWN0RXF1YWwodmFyaWFudCwgJENpcmNsZSk7XG4gICAgfSk7XG5cbiAgICAvLyBpdChcIi50ZXN0V2l0aFZhcmlhbnQgc2hvdWxkIHJldHVybiBbdHJ1ZSwgJFJlY3RhbmdsZV1cIiwgKCkgPT4ge1xuICAgIC8vICAgY29uc3QgW3Rlc3QsIHZhcmlhbnRdID0gJFNoYXBlLnRlc3RXaXRoVmFyaWFudCh7d2lkdGg6IDEwLCBoZWlnaHQ6IDIwfSk7XG4gICAgLy8gICBhc3NlcnQuc3RyaWN0RXF1YWwodGVzdCwgdHJ1ZSk7XG4gICAgLy8gICBhc3NlcnQuc3RyaWN0RXF1YWwodmFyaWFudCwgJFJlY3RhbmdsZSk7XG4gICAgLy8gfSk7XG4gICAgLy9cbiAgICAvLyBpdChcIi50ZXN0V2l0aFZhcmlhbnQgc2hvdWxkIHJldHVybiBbdHJ1ZSwgJENpcmNsZV1cIiwgKCkgPT4ge1xuICAgIC8vICAgY29uc3QgW3Rlc3QsIHZhcmlhbnRdID0gJFNoYXBlLnRlc3RXaXRoVmFyaWFudCh7cmFkaXVzOiAxNX0pO1xuICAgIC8vICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRlc3QsIHRydWUpO1xuICAgIC8vICAgYXNzZXJ0LnN0cmljdEVxdWFsKHZhcmlhbnQsICRDaXJjbGUpO1xuICAgIC8vIH0pO1xuXG4gICAgLy8gaXQoXCIudGVzdFdpdGhWYXJpYW50IHNob3VsZCByZXR1cm4gW2ZhbHNlLCB1bmRlZmluZWRdXCIsICgpID0+IHtcbiAgICAvLyAgIGNvbnN0IFt0ZXN0LCB2YXJpYW50XSA9ICRTaGFwZS50ZXN0V2l0aFZhcmlhbnQoe2xlbmd0aDogMjV9IGFzIGFueSk7XG4gICAgLy8gICBhc3NlcnQuc3RyaWN0RXF1YWwodGVzdCwgZmFsc2UpO1xuICAgIC8vICAgYXNzZXJ0LnN0cmljdEVxdWFsKHZhcmlhbnQsIHVuZGVmaW5lZCk7XG4gICAgLy8gfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=