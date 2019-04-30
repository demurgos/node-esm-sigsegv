import { CaseStyle } from "../../../lib/case-style";
import { DocumentType } from "../../../lib/types/document";
import { Ucs2StringType } from "../../../lib/types/ucs2-string";
import { $FsNodeType } from "./fs-node-type";
export const $FsNodeBase = new DocumentType({
    properties: {
        tag: { type: $FsNodeType },
        name: { type: new Ucs2StringType({ maxLength: Infinity }) },
    },
    changeCase: CaseStyle.SnakeCase,
});
