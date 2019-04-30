import { TsEnumType } from "../../../lib/types/ts-enum";
export var FsNodeType;
(function (FsNodeType) {
    FsNodeType[FsNodeType["File"] = 0] = "File";
    FsNodeType[FsNodeType["Directory"] = 1] = "Directory";
})(FsNodeType || (FsNodeType = {}));
export const $FsNodeType = new TsEnumType({
    enum: FsNodeType,
    rename: {
        File: "Node/File",
        Directory: "Node/Directory",
    },
});
