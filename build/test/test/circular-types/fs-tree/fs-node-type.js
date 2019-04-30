"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_enum_1 = require("../../../lib/types/ts-enum");
var FsNodeType;
(function (FsNodeType) {
    FsNodeType[FsNodeType["File"] = 0] = "File";
    FsNodeType[FsNodeType["Directory"] = 1] = "Directory";
})(FsNodeType = exports.FsNodeType || (exports.FsNodeType = {}));
exports.$FsNodeType = new ts_enum_1.TsEnumType({
    enum: FsNodeType,
    rename: {
        File: "Node/File",
        Directory: "Node/Directory",
    },
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L2NpcmN1bGFyLXR5cGVzL2ZzLXRyZWUvZnMtbm9kZS10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0RBQXdEO0FBRXhELElBQVksVUFHWDtBQUhELFdBQVksVUFBVTtJQUNwQiwyQ0FBSSxDQUFBO0lBQ0oscURBQVMsQ0FBQTtBQUNYLENBQUMsRUFIVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUdyQjtBQUVZLFFBQUEsV0FBVyxHQUEyQixJQUFJLG9CQUFVLENBQWE7SUFDNUUsSUFBSSxFQUFFLFVBQVU7SUFDaEIsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFdBQVc7UUFDakIsU0FBUyxFQUFFLGdCQUFnQjtLQUM1QjtDQUNGLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2NpcmN1bGFyLXR5cGVzL2ZzLXRyZWUvZnMtbm9kZS10eXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHNFbnVtVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9saWIvdHlwZXMvdHMtZW51bVwiO1xuXG5leHBvcnQgZW51bSBGc05vZGVUeXBlIHtcbiAgRmlsZSxcbiAgRGlyZWN0b3J5LFxufVxuXG5leHBvcnQgY29uc3QgJEZzTm9kZVR5cGU6IFRzRW51bVR5cGU8RnNOb2RlVHlwZT4gPSBuZXcgVHNFbnVtVHlwZTxGc05vZGVUeXBlPih7XG4gIGVudW06IEZzTm9kZVR5cGUsXG4gIHJlbmFtZToge1xuICAgIEZpbGU6IFwiTm9kZS9GaWxlXCIsXG4gICAgRGlyZWN0b3J5OiBcIk5vZGUvRGlyZWN0b3J5XCIsXG4gIH0sXG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
