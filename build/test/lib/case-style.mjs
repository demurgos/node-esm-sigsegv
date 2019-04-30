/**
 * This module defines utility functions to detect and change case styles.
 *
 * @module kryo/case-style
 */
export var CaseStyle;
(function (CaseStyle) {
    CaseStyle[CaseStyle["CamelCase"] = 0] = "CamelCase";
    CaseStyle[CaseStyle["PascalCase"] = 1] = "PascalCase";
    CaseStyle[CaseStyle["SnakeCase"] = 2] = "SnakeCase";
    CaseStyle[CaseStyle["ScreamingSnakeCase"] = 3] = "ScreamingSnakeCase";
    CaseStyle[CaseStyle["KebabCase"] = 4] = "KebabCase";
})(CaseStyle || (CaseStyle = {}));
export function detectCaseStyle(identifier) {
    if (/^[A-Z]+[0-9]*(?:_[A-Z]+[0-9]*)*$/.test(identifier)) {
        return CaseStyle.ScreamingSnakeCase;
    }
    else if (/^[a-z]+[0-9]*(?:_[a-z]+[0-9]*)+$/.test(identifier)) {
        return CaseStyle.SnakeCase;
    }
    else if (/^[a-z]+[0-9]*(?:-[a-z]+[0-9]*)+$/.test(identifier)) {
        return CaseStyle.KebabCase;
    }
    else if (/^[A-Z]/.test(identifier)) {
        return CaseStyle.PascalCase;
    }
    else {
        return CaseStyle.CamelCase;
    }
}
export function split(caseStyle, identifier) {
    switch (caseStyle) {
        case CaseStyle.ScreamingSnakeCase:
            return identifier.toLowerCase().split("_");
        case CaseStyle.SnakeCase:
            return identifier.toLowerCase().split("_");
        case CaseStyle.KebabCase:
            return identifier.toLowerCase().split("-");
        case CaseStyle.CamelCase:
            return identifier.split(/(?=[A-Z])/).map((part) => part.toLowerCase());
        case CaseStyle.PascalCase:
            return identifier.split(/(?=[A-Z])/).map((part) => part.toLowerCase());
        default:
            throw new new Error(`IncompleteSwitch: Received unexpected variant for caseStyle: ${caseStyle}`);
    }
}
export function join(caseStyle, parts) {
    switch (caseStyle) {
        case CaseStyle.ScreamingSnakeCase:
            return parts.join("_").toUpperCase();
        case CaseStyle.SnakeCase:
            return parts.join("_").toLowerCase();
        case CaseStyle.KebabCase:
            return parts.join("-").toLowerCase();
        case CaseStyle.CamelCase:
            return parts.map((part, index) => {
                const upperLength = index === 0 ? 0 : 1;
                return part.substr(0, upperLength).toUpperCase() + part.substring(upperLength).toLowerCase();
            }).join("");
        case CaseStyle.PascalCase:
            return parts.map((part) => {
                return part.substr(0, 1).toUpperCase() + part.substring(1).toLowerCase();
            }).join("");
        default:
            throw new Error(`IncompleteSwitch: Received unexpected variant for caseStyle: ${caseStyle}`);
    }
}
export function rename(identifier, from, to) {
    if (to === undefined) {
        to = from;
        from = detectCaseStyle(identifier);
    }
    return join(to, split(from, identifier));
}
export function renameMap(keys, to) {
    const result = new Map();
    const outKeys = new Set();
    for (const key of keys) {
        const renamed = to === undefined ? key : rename(key, to);
        result.set(renamed, key);
        if (outKeys.has(renamed)) {
            throw new Error("NonBijectiveKeyRename");
        }
        outKeys.add(renamed);
    }
    return result;
}
