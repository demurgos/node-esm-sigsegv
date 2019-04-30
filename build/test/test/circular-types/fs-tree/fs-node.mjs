import { TaggedUnionType } from "../../../lib/types/tagged-union";
import { $Directory } from "./directory";
import { $File } from "./file";
export const $FsNode = new TaggedUnionType(() => ({
    variants: [
        $Directory,
        $File,
    ],
    tag: "tag",
}));
