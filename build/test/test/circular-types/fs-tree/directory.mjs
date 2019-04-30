import { CaseStyle } from "../../../lib/case-style";
import { ArrayType } from "../../../lib/types/array";
import { DocumentType } from "../../../lib/types/document";
import { LiteralType } from "../../../lib/types/literal";
import { $FsNode } from "./fs-node";
import { $FsNodeBase } from "./fs-node-base";
import { $FsNodeType, FsNodeType } from "./fs-node-type";
export const $Directory = new DocumentType(() => ({
    properties: Object.assign({}, $FsNodeBase.properties, { tag: { type: new LiteralType({ type: $FsNodeType, value: FsNodeType.Directory }) }, children: { type: new ArrayType({ itemType: $FsNode, maxLength: Infinity }), optional: true } }),
    changeCase: CaseStyle.SnakeCase,
}));
