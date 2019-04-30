"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tagged_union_1 = require("../../../lib/types/tagged-union");
const directory_1 = require("./directory");
const file_1 = require("./file");
exports.$FsNode = new tagged_union_1.TaggedUnionType(() => ({
    variants: [
        directory_1.$Directory,
        file_1.$File,
    ],
    tag: "tag",
}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L2NpcmN1bGFyLXR5cGVzL2ZzLXRyZWUvZnMtbm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtFQUFrRTtBQUNsRSwyQ0FBb0Q7QUFDcEQsaUNBQXFDO0FBTXhCLFFBQUEsT0FBTyxHQUE0QixJQUFJLDhCQUFlLENBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNqRixRQUFRLEVBQUU7UUFDUixzQkFBVTtRQUNWLFlBQUs7S0FDTjtJQUNELEdBQUcsRUFBRSxLQUFLO0NBQ1gsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9jaXJjdWxhci10eXBlcy9mcy10cmVlL2ZzLW5vZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYWdnZWRVbmlvblR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vbGliL3R5cGVzL3RhZ2dlZC11bmlvblwiO1xuaW1wb3J0IHsgJERpcmVjdG9yeSwgRGlyZWN0b3J5IH0gZnJvbSBcIi4vZGlyZWN0b3J5XCI7XG5pbXBvcnQgeyAkRmlsZSwgRmlsZSB9IGZyb20gXCIuL2ZpbGVcIjtcblxuZXhwb3J0IHR5cGUgRnNOb2RlID1cbiAgRGlyZWN0b3J5XG4gIHwgRmlsZTtcblxuZXhwb3J0IGNvbnN0ICRGc05vZGU6IFRhZ2dlZFVuaW9uVHlwZTxGc05vZGU+ID0gbmV3IFRhZ2dlZFVuaW9uVHlwZTxGc05vZGU+KCgpID0+ICh7XG4gIHZhcmlhbnRzOiBbXG4gICAgJERpcmVjdG9yeSxcbiAgICAkRmlsZSxcbiAgXSxcbiAgdGFnOiBcInRhZ1wiLFxufSkpO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
