"use strict";
// import { CaseStyle } from "../../lib/case-style";
// import { Serializer } from "../../lib/types";
// import { DocumentType } from "../../lib/types/document";
// import { IntegerType } from "../../lib/types/integer";
// import { LiteralType } from "../../lib/types/literal";
// import { SimpleEnumType } from "../../lib/types/simple-enum";
// import { UnionType } from "../../lib/types/union";
// import { runTests, TypedValue } from "../helpers/test";
//
// describe("Union", function () {
//   describe("Union<Shape>", function () {
//     enum ShapeType {
//       Rectangle,
//       Circle,
//     }
//
//     const shapeTypeType: SimpleEnumType<ShapeType> = new SimpleEnumType({
//       enum: ShapeType,
//       rename: CaseStyle.KebabCase,
//     });
//
//     interface Rectangle {
//       type: ShapeType.Rectangle;
//       width: number;
//       height: number;
//     }
//
//     const rectangleType: DocumentType<Rectangle> = new DocumentType<Rectangle>({
//       properties: {
//         type: {
//           type: new LiteralType<ShapeType.Rectangle>({
//             type: shapeTypeType,
//             value: ShapeType.Rectangle,
//           }),
//         },
//         width: {type: new IntegerType()},
//         height: {type: new IntegerType()},
//       },
//       rename: CaseStyle.KebabCase,
//     });
//
//     interface Circle {
//       type: ShapeType.Circle;
//       radius: number;
//     }
//
//     const circleType: DocumentType<Circle> = new DocumentType<Circle>({
//       properties: {
//         type: {
//           type: new LiteralType<ShapeType.Circle>({
//             type: shapeTypeType,
//             value: ShapeType.Circle,
//           }),
//         },
//         radius: {type: new IntegerType()},
//       },
//       rename: CaseStyle.KebabCase,
//     });
//
//     type Shape = Rectangle | Circle;
//     const shapeType: UnionType<Shape> = new UnionType<Shape>({
//       variants: [rectangleType, circleType],
//       readMatcher: (input: any, serializer: Serializer) => {
//         if (typeof input !== "object" || input === null) {
//           return undefined;
//         }
//         switch (input.type) {
//           case "circle":
//             return circleType;
//           case "rectangle":
//             return rectangleType;
//           default:
//             return undefined;
//         }
//       },
//       matcher: (val: Shape) => {
//         if (typeof val !== "object" || val === null) {
//           return undefined;
//         }
//         switch (val.type) {
//           case ShapeType.Circle:
//             return circleType;
//           case ShapeType.Rectangle:
//             return rectangleType;
//           default:
//             return undefined;
//         }
//       },
//       trustedMatcher: (val: Shape) => {
//         switch (val.type) {
//           case ShapeType.Circle:
//             return circleType;
//           case ShapeType.Rectangle:
//             return rectangleType;
//           default:
//             return undefined as never;
//         }
//       },
//     });
//
//     const items: TypedValue[] = [
//       {
//         name: "Rectangle {type: ShapeType.Rectangle, width: 10, height: 20}",
//         value: <Rectangle> {
//           type: ShapeType.Rectangle,
//           width: 10,
//           height: 20,
//         },
//         valid: true,
//         output: {
//           bson: {
//             type: "rectangle",
//             width: 10,
//             height: 20,
//           },
//           json: {
//             type: "rectangle",
//             width: 10,
//             height: 20,
//           },
//           qs: {
//             type: "rectangle",
//             width: "10",
//             height: "20",
//           },
//         },
//       },
//       {
//         name: "Circle {type: ShapeType.Circle, radius: 15}",
//         value: <Circle> {
//           type: ShapeType.Circle,
//           radius: 15,
//         },
//         valid: true,
//         output: {
//           bson: {
//             type: "circle",
//             radius: 15,
//           },
//           json: {
//             type: "circle",
//             radius: 15,
//           },
//           qs: {
//             type: "circle",
//             radius: "15",
//           },
//         },
//       },
//
//       {
//         name: "{type: ShapeType.Circle}",
//         value: {
//           type: ShapeType.Circle,
//         },
//         valid: false,
//       },
//       {
//         name: "{radius: 15}",
//         value: {
//           radius: 15,
//         },
//         valid: false,
//       },
//       {
//         name: "{type: ShapeType.Circle, radius: true}",
//         value: {
//           type: ShapeType.Circle,
//           radius: true,
//         },
//         valid: false,
//       },
//       {name: '"foo"', value: "bar", valid: false},
//       {name: "0", value: 0, valid: false},
//       {name: "1", value: 1, valid: false},
//       {name: '""', value: "", valid: false},
//       {name: '"0"', value: "0", valid: false},
//       {name: "true", value: true, valid: false},
//       {name: "false", value: false, valid: false},
//       {name: "Infinity", value: Infinity, valid: false},
//       {name: "-Infinity", value: -Infinity, valid: false},
//       {name: 'new Date("1247-05-18T19:40:08.418Z")', value: new Date("1247-05-18T19:40:08.418Z"), valid: false},
//       {name: "NaN", value: NaN, valid: false},
//       {name: "undefined", value: undefined, valid: false},
//       {name: "null", value: null, valid: false},
//       {name: "[]", value: [], valid: false},
//       {name: "{}", value: {}, valid: false},
//       {name: "/regex/", value: /regex/, valid: false},
//     ];
//
//     runTests(shapeType, items);
//   });
// });

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L3R5cGVzL3VuaW9uLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9EQUFvRDtBQUNwRCxnREFBZ0Q7QUFDaEQsMkRBQTJEO0FBQzNELHlEQUF5RDtBQUN6RCx5REFBeUQ7QUFDekQsZ0VBQWdFO0FBQ2hFLHFEQUFxRDtBQUNyRCwwREFBMEQ7QUFDMUQsRUFBRTtBQUNGLGtDQUFrQztBQUNsQywyQ0FBMkM7QUFDM0MsdUJBQXVCO0FBQ3ZCLG1CQUFtQjtBQUNuQixnQkFBZ0I7QUFDaEIsUUFBUTtBQUNSLEVBQUU7QUFDRiw0RUFBNEU7QUFDNUUseUJBQXlCO0FBQ3pCLHFDQUFxQztBQUNyQyxVQUFVO0FBQ1YsRUFBRTtBQUNGLDRCQUE0QjtBQUM1QixtQ0FBbUM7QUFDbkMsdUJBQXVCO0FBQ3ZCLHdCQUF3QjtBQUN4QixRQUFRO0FBQ1IsRUFBRTtBQUNGLG1GQUFtRjtBQUNuRixzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCLHlEQUF5RDtBQUN6RCxtQ0FBbUM7QUFDbkMsMENBQTBDO0FBQzFDLGdCQUFnQjtBQUNoQixhQUFhO0FBQ2IsNENBQTRDO0FBQzVDLDZDQUE2QztBQUM3QyxXQUFXO0FBQ1gscUNBQXFDO0FBQ3JDLFVBQVU7QUFDVixFQUFFO0FBQ0YseUJBQXlCO0FBQ3pCLGdDQUFnQztBQUNoQyx3QkFBd0I7QUFDeEIsUUFBUTtBQUNSLEVBQUU7QUFDRiwwRUFBMEU7QUFDMUUsc0JBQXNCO0FBQ3RCLGtCQUFrQjtBQUNsQixzREFBc0Q7QUFDdEQsbUNBQW1DO0FBQ25DLHVDQUF1QztBQUN2QyxnQkFBZ0I7QUFDaEIsYUFBYTtBQUNiLDZDQUE2QztBQUM3QyxXQUFXO0FBQ1gscUNBQXFDO0FBQ3JDLFVBQVU7QUFDVixFQUFFO0FBQ0YsdUNBQXVDO0FBQ3ZDLGlFQUFpRTtBQUNqRSwrQ0FBK0M7QUFDL0MsK0RBQStEO0FBQy9ELDZEQUE2RDtBQUM3RCw4QkFBOEI7QUFDOUIsWUFBWTtBQUNaLGdDQUFnQztBQUNoQywyQkFBMkI7QUFDM0IsaUNBQWlDO0FBQ2pDLDhCQUE4QjtBQUM5QixvQ0FBb0M7QUFDcEMscUJBQXFCO0FBQ3JCLGdDQUFnQztBQUNoQyxZQUFZO0FBQ1osV0FBVztBQUNYLG1DQUFtQztBQUNuQyx5REFBeUQ7QUFDekQsOEJBQThCO0FBQzlCLFlBQVk7QUFDWiw4QkFBOEI7QUFDOUIsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQyxzQ0FBc0M7QUFDdEMsb0NBQW9DO0FBQ3BDLHFCQUFxQjtBQUNyQixnQ0FBZ0M7QUFDaEMsWUFBWTtBQUNaLFdBQVc7QUFDWCwwQ0FBMEM7QUFDMUMsOEJBQThCO0FBQzlCLG1DQUFtQztBQUNuQyxpQ0FBaUM7QUFDakMsc0NBQXNDO0FBQ3RDLG9DQUFvQztBQUNwQyxxQkFBcUI7QUFDckIseUNBQXlDO0FBQ3pDLFlBQVk7QUFDWixXQUFXO0FBQ1gsVUFBVTtBQUNWLEVBQUU7QUFDRixvQ0FBb0M7QUFDcEMsVUFBVTtBQUNWLGdGQUFnRjtBQUNoRiwrQkFBK0I7QUFDL0IsdUNBQXVDO0FBQ3ZDLHVCQUF1QjtBQUN2Qix3QkFBd0I7QUFDeEIsYUFBYTtBQUNiLHVCQUF1QjtBQUN2QixvQkFBb0I7QUFDcEIsb0JBQW9CO0FBQ3BCLGlDQUFpQztBQUNqQyx5QkFBeUI7QUFDekIsMEJBQTBCO0FBQzFCLGVBQWU7QUFDZixvQkFBb0I7QUFDcEIsaUNBQWlDO0FBQ2pDLHlCQUF5QjtBQUN6QiwwQkFBMEI7QUFDMUIsZUFBZTtBQUNmLGtCQUFrQjtBQUNsQixpQ0FBaUM7QUFDakMsMkJBQTJCO0FBQzNCLDRCQUE0QjtBQUM1QixlQUFlO0FBQ2YsYUFBYTtBQUNiLFdBQVc7QUFDWCxVQUFVO0FBQ1YsK0RBQStEO0FBQy9ELDRCQUE0QjtBQUM1QixvQ0FBb0M7QUFDcEMsd0JBQXdCO0FBQ3hCLGFBQWE7QUFDYix1QkFBdUI7QUFDdkIsb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQiw4QkFBOEI7QUFDOUIsMEJBQTBCO0FBQzFCLGVBQWU7QUFDZixvQkFBb0I7QUFDcEIsOEJBQThCO0FBQzlCLDBCQUEwQjtBQUMxQixlQUFlO0FBQ2Ysa0JBQWtCO0FBQ2xCLDhCQUE4QjtBQUM5Qiw0QkFBNEI7QUFDNUIsZUFBZTtBQUNmLGFBQWE7QUFDYixXQUFXO0FBQ1gsRUFBRTtBQUNGLFVBQVU7QUFDViw0Q0FBNEM7QUFDNUMsbUJBQW1CO0FBQ25CLG9DQUFvQztBQUNwQyxhQUFhO0FBQ2Isd0JBQXdCO0FBQ3hCLFdBQVc7QUFDWCxVQUFVO0FBQ1YsZ0NBQWdDO0FBQ2hDLG1CQUFtQjtBQUNuQix3QkFBd0I7QUFDeEIsYUFBYTtBQUNiLHdCQUF3QjtBQUN4QixXQUFXO0FBQ1gsVUFBVTtBQUNWLDBEQUEwRDtBQUMxRCxtQkFBbUI7QUFDbkIsb0NBQW9DO0FBQ3BDLDBCQUEwQjtBQUMxQixhQUFhO0FBQ2Isd0JBQXdCO0FBQ3hCLFdBQVc7QUFDWCxxREFBcUQ7QUFDckQsNkNBQTZDO0FBQzdDLDZDQUE2QztBQUM3QywrQ0FBK0M7QUFDL0MsaURBQWlEO0FBQ2pELG1EQUFtRDtBQUNuRCxxREFBcUQ7QUFDckQsMkRBQTJEO0FBQzNELDZEQUE2RDtBQUM3RCxtSEFBbUg7QUFDbkgsaURBQWlEO0FBQ2pELDZEQUE2RDtBQUM3RCxtREFBbUQ7QUFDbkQsK0NBQStDO0FBQy9DLCtDQUErQztBQUMvQyx5REFBeUQ7QUFDekQsU0FBUztBQUNULEVBQUU7QUFDRixrQ0FBa0M7QUFDbEMsUUFBUTtBQUNSLE1BQU0iLCJmaWxlIjoidGVzdC90eXBlcy91bmlvbi5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgQ2FzZVN0eWxlIH0gZnJvbSBcIi4uLy4uL2xpYi9jYXNlLXN0eWxlXCI7XG4vLyBpbXBvcnQgeyBTZXJpYWxpemVyIH0gZnJvbSBcIi4uLy4uL2xpYi90eXBlc1wiO1xuLy8gaW1wb3J0IHsgRG9jdW1lbnRUeXBlIH0gZnJvbSBcIi4uLy4uL2xpYi90eXBlcy9kb2N1bWVudFwiO1xuLy8gaW1wb3J0IHsgSW50ZWdlclR5cGUgfSBmcm9tIFwiLi4vLi4vbGliL3R5cGVzL2ludGVnZXJcIjtcbi8vIGltcG9ydCB7IExpdGVyYWxUeXBlIH0gZnJvbSBcIi4uLy4uL2xpYi90eXBlcy9saXRlcmFsXCI7XG4vLyBpbXBvcnQgeyBTaW1wbGVFbnVtVHlwZSB9IGZyb20gXCIuLi8uLi9saWIvdHlwZXMvc2ltcGxlLWVudW1cIjtcbi8vIGltcG9ydCB7IFVuaW9uVHlwZSB9IGZyb20gXCIuLi8uLi9saWIvdHlwZXMvdW5pb25cIjtcbi8vIGltcG9ydCB7IHJ1blRlc3RzLCBUeXBlZFZhbHVlIH0gZnJvbSBcIi4uL2hlbHBlcnMvdGVzdFwiO1xuLy9cbi8vIGRlc2NyaWJlKFwiVW5pb25cIiwgZnVuY3Rpb24gKCkge1xuLy8gICBkZXNjcmliZShcIlVuaW9uPFNoYXBlPlwiLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgZW51bSBTaGFwZVR5cGUge1xuLy8gICAgICAgUmVjdGFuZ2xlLFxuLy8gICAgICAgQ2lyY2xlLFxuLy8gICAgIH1cbi8vXG4vLyAgICAgY29uc3Qgc2hhcGVUeXBlVHlwZTogU2ltcGxlRW51bVR5cGU8U2hhcGVUeXBlPiA9IG5ldyBTaW1wbGVFbnVtVHlwZSh7XG4vLyAgICAgICBlbnVtOiBTaGFwZVR5cGUsXG4vLyAgICAgICByZW5hbWU6IENhc2VTdHlsZS5LZWJhYkNhc2UsXG4vLyAgICAgfSk7XG4vL1xuLy8gICAgIGludGVyZmFjZSBSZWN0YW5nbGUge1xuLy8gICAgICAgdHlwZTogU2hhcGVUeXBlLlJlY3RhbmdsZTtcbi8vICAgICAgIHdpZHRoOiBudW1iZXI7XG4vLyAgICAgICBoZWlnaHQ6IG51bWJlcjtcbi8vICAgICB9XG4vL1xuLy8gICAgIGNvbnN0IHJlY3RhbmdsZVR5cGU6IERvY3VtZW50VHlwZTxSZWN0YW5nbGU+ID0gbmV3IERvY3VtZW50VHlwZTxSZWN0YW5nbGU+KHtcbi8vICAgICAgIHByb3BlcnRpZXM6IHtcbi8vICAgICAgICAgdHlwZToge1xuLy8gICAgICAgICAgIHR5cGU6IG5ldyBMaXRlcmFsVHlwZTxTaGFwZVR5cGUuUmVjdGFuZ2xlPih7XG4vLyAgICAgICAgICAgICB0eXBlOiBzaGFwZVR5cGVUeXBlLFxuLy8gICAgICAgICAgICAgdmFsdWU6IFNoYXBlVHlwZS5SZWN0YW5nbGUsXG4vLyAgICAgICAgICAgfSksXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIHdpZHRoOiB7dHlwZTogbmV3IEludGVnZXJUeXBlKCl9LFxuLy8gICAgICAgICBoZWlnaHQ6IHt0eXBlOiBuZXcgSW50ZWdlclR5cGUoKX0sXG4vLyAgICAgICB9LFxuLy8gICAgICAgcmVuYW1lOiBDYXNlU3R5bGUuS2ViYWJDYXNlLFxuLy8gICAgIH0pO1xuLy9cbi8vICAgICBpbnRlcmZhY2UgQ2lyY2xlIHtcbi8vICAgICAgIHR5cGU6IFNoYXBlVHlwZS5DaXJjbGU7XG4vLyAgICAgICByYWRpdXM6IG51bWJlcjtcbi8vICAgICB9XG4vL1xuLy8gICAgIGNvbnN0IGNpcmNsZVR5cGU6IERvY3VtZW50VHlwZTxDaXJjbGU+ID0gbmV3IERvY3VtZW50VHlwZTxDaXJjbGU+KHtcbi8vICAgICAgIHByb3BlcnRpZXM6IHtcbi8vICAgICAgICAgdHlwZToge1xuLy8gICAgICAgICAgIHR5cGU6IG5ldyBMaXRlcmFsVHlwZTxTaGFwZVR5cGUuQ2lyY2xlPih7XG4vLyAgICAgICAgICAgICB0eXBlOiBzaGFwZVR5cGVUeXBlLFxuLy8gICAgICAgICAgICAgdmFsdWU6IFNoYXBlVHlwZS5DaXJjbGUsXG4vLyAgICAgICAgICAgfSksXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIHJhZGl1czoge3R5cGU6IG5ldyBJbnRlZ2VyVHlwZSgpfSxcbi8vICAgICAgIH0sXG4vLyAgICAgICByZW5hbWU6IENhc2VTdHlsZS5LZWJhYkNhc2UsXG4vLyAgICAgfSk7XG4vL1xuLy8gICAgIHR5cGUgU2hhcGUgPSBSZWN0YW5nbGUgfCBDaXJjbGU7XG4vLyAgICAgY29uc3Qgc2hhcGVUeXBlOiBVbmlvblR5cGU8U2hhcGU+ID0gbmV3IFVuaW9uVHlwZTxTaGFwZT4oe1xuLy8gICAgICAgdmFyaWFudHM6IFtyZWN0YW5nbGVUeXBlLCBjaXJjbGVUeXBlXSxcbi8vICAgICAgIHJlYWRNYXRjaGVyOiAoaW5wdXQ6IGFueSwgc2VyaWFsaXplcjogU2VyaWFsaXplcikgPT4ge1xuLy8gICAgICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSBcIm9iamVjdFwiIHx8IGlucHV0ID09PSBudWxsKSB7XG4vLyAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBzd2l0Y2ggKGlucHV0LnR5cGUpIHtcbi8vICAgICAgICAgICBjYXNlIFwiY2lyY2xlXCI6XG4vLyAgICAgICAgICAgICByZXR1cm4gY2lyY2xlVHlwZTtcbi8vICAgICAgICAgICBjYXNlIFwicmVjdGFuZ2xlXCI6XG4vLyAgICAgICAgICAgICByZXR1cm4gcmVjdGFuZ2xlVHlwZTtcbi8vICAgICAgICAgICBkZWZhdWx0OlxuLy8gICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSxcbi8vICAgICAgIG1hdGNoZXI6ICh2YWw6IFNoYXBlKSA9PiB7XG4vLyAgICAgICAgIGlmICh0eXBlb2YgdmFsICE9PSBcIm9iamVjdFwiIHx8IHZhbCA9PT0gbnVsbCkge1xuLy8gICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgc3dpdGNoICh2YWwudHlwZSkge1xuLy8gICAgICAgICAgIGNhc2UgU2hhcGVUeXBlLkNpcmNsZTpcbi8vICAgICAgICAgICAgIHJldHVybiBjaXJjbGVUeXBlO1xuLy8gICAgICAgICAgIGNhc2UgU2hhcGVUeXBlLlJlY3RhbmdsZTpcbi8vICAgICAgICAgICAgIHJldHVybiByZWN0YW5nbGVUeXBlO1xuLy8gICAgICAgICAgIGRlZmF1bHQ6XG4vLyAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9LFxuLy8gICAgICAgdHJ1c3RlZE1hdGNoZXI6ICh2YWw6IFNoYXBlKSA9PiB7XG4vLyAgICAgICAgIHN3aXRjaCAodmFsLnR5cGUpIHtcbi8vICAgICAgICAgICBjYXNlIFNoYXBlVHlwZS5DaXJjbGU6XG4vLyAgICAgICAgICAgICByZXR1cm4gY2lyY2xlVHlwZTtcbi8vICAgICAgICAgICBjYXNlIFNoYXBlVHlwZS5SZWN0YW5nbGU6XG4vLyAgICAgICAgICAgICByZXR1cm4gcmVjdGFuZ2xlVHlwZTtcbi8vICAgICAgICAgICBkZWZhdWx0OlxuLy8gICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZCBhcyBuZXZlcjtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSxcbi8vICAgICB9KTtcbi8vXG4vLyAgICAgY29uc3QgaXRlbXM6IFR5cGVkVmFsdWVbXSA9IFtcbi8vICAgICAgIHtcbi8vICAgICAgICAgbmFtZTogXCJSZWN0YW5nbGUge3R5cGU6IFNoYXBlVHlwZS5SZWN0YW5nbGUsIHdpZHRoOiAxMCwgaGVpZ2h0OiAyMH1cIixcbi8vICAgICAgICAgdmFsdWU6IDxSZWN0YW5nbGU+IHtcbi8vICAgICAgICAgICB0eXBlOiBTaGFwZVR5cGUuUmVjdGFuZ2xlLFxuLy8gICAgICAgICAgIHdpZHRoOiAxMCxcbi8vICAgICAgICAgICBoZWlnaHQ6IDIwLFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICB2YWxpZDogdHJ1ZSxcbi8vICAgICAgICAgb3V0cHV0OiB7XG4vLyAgICAgICAgICAgYnNvbjoge1xuLy8gICAgICAgICAgICAgdHlwZTogXCJyZWN0YW5nbGVcIixcbi8vICAgICAgICAgICAgIHdpZHRoOiAxMCxcbi8vICAgICAgICAgICAgIGhlaWdodDogMjAsXG4vLyAgICAgICAgICAgfSxcbi8vICAgICAgICAgICBqc29uOiB7XG4vLyAgICAgICAgICAgICB0eXBlOiBcInJlY3RhbmdsZVwiLFxuLy8gICAgICAgICAgICAgd2lkdGg6IDEwLFxuLy8gICAgICAgICAgICAgaGVpZ2h0OiAyMCxcbi8vICAgICAgICAgICB9LFxuLy8gICAgICAgICAgIHFzOiB7XG4vLyAgICAgICAgICAgICB0eXBlOiBcInJlY3RhbmdsZVwiLFxuLy8gICAgICAgICAgICAgd2lkdGg6IFwiMTBcIixcbi8vICAgICAgICAgICAgIGhlaWdodDogXCIyMFwiLFxuLy8gICAgICAgICAgIH0sXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICB9LFxuLy8gICAgICAge1xuLy8gICAgICAgICBuYW1lOiBcIkNpcmNsZSB7dHlwZTogU2hhcGVUeXBlLkNpcmNsZSwgcmFkaXVzOiAxNX1cIixcbi8vICAgICAgICAgdmFsdWU6IDxDaXJjbGU+IHtcbi8vICAgICAgICAgICB0eXBlOiBTaGFwZVR5cGUuQ2lyY2xlLFxuLy8gICAgICAgICAgIHJhZGl1czogMTUsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIHZhbGlkOiB0cnVlLFxuLy8gICAgICAgICBvdXRwdXQ6IHtcbi8vICAgICAgICAgICBic29uOiB7XG4vLyAgICAgICAgICAgICB0eXBlOiBcImNpcmNsZVwiLFxuLy8gICAgICAgICAgICAgcmFkaXVzOiAxNSxcbi8vICAgICAgICAgICB9LFxuLy8gICAgICAgICAgIGpzb246IHtcbi8vICAgICAgICAgICAgIHR5cGU6IFwiY2lyY2xlXCIsXG4vLyAgICAgICAgICAgICByYWRpdXM6IDE1LFxuLy8gICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgcXM6IHtcbi8vICAgICAgICAgICAgIHR5cGU6IFwiY2lyY2xlXCIsXG4vLyAgICAgICAgICAgICByYWRpdXM6IFwiMTVcIixcbi8vICAgICAgICAgICB9LFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgfSxcbi8vXG4vLyAgICAgICB7XG4vLyAgICAgICAgIG5hbWU6IFwie3R5cGU6IFNoYXBlVHlwZS5DaXJjbGV9XCIsXG4vLyAgICAgICAgIHZhbHVlOiB7XG4vLyAgICAgICAgICAgdHlwZTogU2hhcGVUeXBlLkNpcmNsZSxcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuLy8gICAgICAgfSxcbi8vICAgICAgIHtcbi8vICAgICAgICAgbmFtZTogXCJ7cmFkaXVzOiAxNX1cIixcbi8vICAgICAgICAgdmFsdWU6IHtcbi8vICAgICAgICAgICByYWRpdXM6IDE1LFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICB2YWxpZDogZmFsc2UsXG4vLyAgICAgICB9LFxuLy8gICAgICAge1xuLy8gICAgICAgICBuYW1lOiBcInt0eXBlOiBTaGFwZVR5cGUuQ2lyY2xlLCByYWRpdXM6IHRydWV9XCIsXG4vLyAgICAgICAgIHZhbHVlOiB7XG4vLyAgICAgICAgICAgdHlwZTogU2hhcGVUeXBlLkNpcmNsZSxcbi8vICAgICAgICAgICByYWRpdXM6IHRydWUsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIHZhbGlkOiBmYWxzZSxcbi8vICAgICAgIH0sXG4vLyAgICAgICB7bmFtZTogJ1wiZm9vXCInLCB2YWx1ZTogXCJiYXJcIiwgdmFsaWQ6IGZhbHNlfSxcbi8vICAgICAgIHtuYW1lOiBcIjBcIiwgdmFsdWU6IDAsIHZhbGlkOiBmYWxzZX0sXG4vLyAgICAgICB7bmFtZTogXCIxXCIsIHZhbHVlOiAxLCB2YWxpZDogZmFsc2V9LFxuLy8gICAgICAge25hbWU6ICdcIlwiJywgdmFsdWU6IFwiXCIsIHZhbGlkOiBmYWxzZX0sXG4vLyAgICAgICB7bmFtZTogJ1wiMFwiJywgdmFsdWU6IFwiMFwiLCB2YWxpZDogZmFsc2V9LFxuLy8gICAgICAge25hbWU6IFwidHJ1ZVwiLCB2YWx1ZTogdHJ1ZSwgdmFsaWQ6IGZhbHNlfSxcbi8vICAgICAgIHtuYW1lOiBcImZhbHNlXCIsIHZhbHVlOiBmYWxzZSwgdmFsaWQ6IGZhbHNlfSxcbi8vICAgICAgIHtuYW1lOiBcIkluZmluaXR5XCIsIHZhbHVlOiBJbmZpbml0eSwgdmFsaWQ6IGZhbHNlfSxcbi8vICAgICAgIHtuYW1lOiBcIi1JbmZpbml0eVwiLCB2YWx1ZTogLUluZmluaXR5LCB2YWxpZDogZmFsc2V9LFxuLy8gICAgICAge25hbWU6ICduZXcgRGF0ZShcIjEyNDctMDUtMThUMTk6NDA6MDguNDE4WlwiKScsIHZhbHVlOiBuZXcgRGF0ZShcIjEyNDctMDUtMThUMTk6NDA6MDguNDE4WlwiKSwgdmFsaWQ6IGZhbHNlfSxcbi8vICAgICAgIHtuYW1lOiBcIk5hTlwiLCB2YWx1ZTogTmFOLCB2YWxpZDogZmFsc2V9LFxuLy8gICAgICAge25hbWU6IFwidW5kZWZpbmVkXCIsIHZhbHVlOiB1bmRlZmluZWQsIHZhbGlkOiBmYWxzZX0sXG4vLyAgICAgICB7bmFtZTogXCJudWxsXCIsIHZhbHVlOiBudWxsLCB2YWxpZDogZmFsc2V9LFxuLy8gICAgICAge25hbWU6IFwiW11cIiwgdmFsdWU6IFtdLCB2YWxpZDogZmFsc2V9LFxuLy8gICAgICAge25hbWU6IFwie31cIiwgdmFsdWU6IHt9LCB2YWxpZDogZmFsc2V9LFxuLy8gICAgICAge25hbWU6IFwiL3JlZ2V4L1wiLCB2YWx1ZTogL3JlZ2V4LywgdmFsaWQ6IGZhbHNlfSxcbi8vICAgICBdO1xuLy9cbi8vICAgICBydW5UZXN0cyhzaGFwZVR5cGUsIGl0ZW1zKTtcbi8vICAgfSk7XG4vLyB9KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
