import { CaseStyle } from "../../../lib/case-style";
import { DocumentType } from "../../../lib/types/document";
import { IntegerType } from "../../../lib/types/integer";
import { LiteralType } from "../../../lib/types/literal";
import { $FsNodeBase } from "./fs-node-base";
import { $FsNodeType, FsNodeType } from "./fs-node-type";
export const $File = new DocumentType(() => ({
    properties: Object.assign({}, $FsNodeBase.properties, { tag: { type: new LiteralType({ type: $FsNodeType, value: FsNodeType.File }) }, size: { type: new IntegerType() } }),
    changeCase: CaseStyle.SnakeCase,
}));
