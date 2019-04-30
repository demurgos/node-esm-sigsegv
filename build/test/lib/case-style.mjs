/**
 * This module defines utility functions to detect and change case styles.
 *
 * @module kryo/case-style
 */
import { Incident } from "incident";
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
            throw new Incident(`IncompleteSwitch: Received unexpected variant for caseStyle: ${caseStyle}`);
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
            throw new Incident(`IncompleteSwitch: Received unexpected variant for caseStyle: ${caseStyle}`);
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
            throw new Incident("NonBijectiveKeyRename", "Some keys are the same after renaming");
        }
        outKeys.add(renamed);
    }
    return result;
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY2FzZS1zdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVwQyxNQUFNLENBQU4sSUFBWSxTQU1YO0FBTkQsV0FBWSxTQUFTO0lBQ25CLG1EQUFTLENBQUE7SUFDVCxxREFBVSxDQUFBO0lBQ1YsbURBQVMsQ0FBQTtJQUNULHFFQUFrQixDQUFBO0lBQ2xCLG1EQUFTLENBQUE7QUFDWCxDQUFDLEVBTlcsU0FBUyxLQUFULFNBQVMsUUFNcEI7QUFFRCxNQUFNLFVBQVUsZUFBZSxDQUFDLFVBQWtCO0lBQ2hELElBQUksa0NBQWtDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3ZELE9BQU8sU0FBUyxDQUFDLGtCQUFrQixDQUFDO0tBQ3JDO1NBQU0sSUFBSSxrQ0FBa0MsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDOUQsT0FBTyxTQUFTLENBQUMsU0FBUyxDQUFDO0tBQzVCO1NBQU0sSUFBSSxrQ0FBa0MsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDOUQsT0FBTyxTQUFTLENBQUMsU0FBUyxDQUFDO0tBQzVCO1NBQU0sSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3BDLE9BQU8sU0FBUyxDQUFDLFVBQVUsQ0FBQztLQUM3QjtTQUFNO1FBQ0wsT0FBTyxTQUFTLENBQUMsU0FBUyxDQUFDO0tBQzVCO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxLQUFLLENBQUMsU0FBb0IsRUFBRSxVQUFrQjtJQUM1RCxRQUFRLFNBQVMsRUFBRTtRQUNqQixLQUFLLFNBQVMsQ0FBQyxrQkFBa0I7WUFDL0IsT0FBTyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLEtBQUssU0FBUyxDQUFDLFNBQVM7WUFDdEIsT0FBTyxV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QWdCLElBQUksR0FBRyxFQUFFLENBQUM7SUFDdkMsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7UUFDdEIsTUFBTSxPQUFPLEdBQVcsRUFBRSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN4QixNQUFNLElBQUksUUFBUSxDQUFDLHVCQUF1QixFQUFFLHVDQUF1QyxDQUFDLENBQUM7U0FDdEY7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3RCO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyIsImZpbGUiOiJsaWIvY2FzZS1zdHlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhpcyBtb2R1bGUgZGVmaW5lcyB1dGlsaXR5IGZ1bmN0aW9ucyB0byBkZXRlY3QgYW5kIGNoYW5nZSBjYXNlIHN0eWxlcy5cbiAqXG4gKiBAbW9kdWxlIGtyeW8vY2FzZS1zdHlsZVxuICovXG5cbmltcG9ydCB7IEluY2lkZW50IH0gZnJvbSBcImluY2lkZW50XCI7XG5cbmV4cG9ydCBlbnVtIENhc2VTdHlsZSB7XG4gIENhbWVsQ2FzZSxcbiAgUGFzY2FsQ2FzZSxcbiAgU25ha2VDYXNlLFxuICBTY3JlYW1pbmdTbmFrZUNhc2UsXG4gIEtlYmFiQ2FzZSxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdENhc2VTdHlsZShpZGVudGlmaWVyOiBzdHJpbmcpOiBDYXNlU3R5bGUge1xuICBpZiAoL15bQS1aXStbMC05XSooPzpfW0EtWl0rWzAtOV0qKSokLy50ZXN0KGlkZW50aWZpZXIpKSB7XG4gICAgcmV0dXJuIENhc2VTdHlsZS5TY3JlYW1pbmdTbmFrZUNhc2U7XG4gIH0gZWxzZSBpZiAoL15bYS16XStbMC05XSooPzpfW2Etel0rWzAtOV0qKSskLy50ZXN0KGlkZW50aWZpZXIpKSB7XG4gICAgcmV0dXJuIENhc2VTdHlsZS5TbmFrZUNhc2U7XG4gIH0gZWxzZSBpZiAoL15bYS16XStbMC05XSooPzotW2Etel0rWzAtOV0qKSskLy50ZXN0KGlkZW50aWZpZXIpKSB7XG4gICAgcmV0dXJuIENhc2VTdHlsZS5LZWJhYkNhc2U7XG4gIH0gZWxzZSBpZiAoL15bQS1aXS8udGVzdChpZGVudGlmaWVyKSkge1xuICAgIHJldHVybiBDYXNlU3R5bGUuUGFzY2FsQ2FzZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gQ2FzZVN0eWxlLkNhbWVsQ2FzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BsaXQoY2FzZVN0eWxlOiBDYXNlU3R5bGUsIGlkZW50aWZpZXI6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgc3dpdGNoIChjYXNlU3R5bGUpIHtcbiAgICBjYXNlIENhc2VTdHlsZS5TY3JlYW1pbmdTbmFrZUNhc2U6XG4gICAgICByZXR1cm4gaWRlbnRpZmllci50b0xvd2VyQ2FzZSgpLnNwbGl0KFwiX1wiKTtcbiAgICBjYXNlIENhc2VTdHlsZS5TbmFrZUNhc2U6XG4gICAgICByZXR1cm4gaWRlbnRpZmllci50b0xvd2VyQ2FzZSgpLnNwbGl0KFwiX1wiKTtcbiAgICBjYXNlIENhc2VTdHlsZS5LZWJhYkNhc2U6XG4gICAgICByZXR1cm4gaWRlbnRpZmllci50b0xvd2VyQ2FzZSgpLnNwbGl0KFwiLVwiKTtcbiAgICBjYXNlIENhc2VTdHlsZS5DYW1lbENhc2U6XG4gICAgICByZXR1cm4gaWRlbnRpZmllci5zcGxpdCgvKD89W0EtWl0pLykubWFwKChwYXJ0OiBzdHJpbmcpOiBzdHJpbmcgPT4gcGFydC50b0xvd2VyQ2FzZSgpKTtcbiAgICBjYXNlIENhc2VTdHlsZS5QYXNjYWxDYXNlOlxuICAgICAgcmV0dXJuIGlkZW50aWZpZXIuc3BsaXQoLyg/PVtBLVpdKS8pLm1hcCgocGFydDogc3RyaW5nKTogc3RyaW5nID0+IHBhcnQudG9Mb3dlckNhc2UoKSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBJbmNpZGVudChgSW5jb21wbGV0ZVN3aXRjaDogUmVjZWl2ZWQgdW5leHBlY3RlZCB2YXJpYW50IGZvciBjYXNlU3R5bGU6ICR7Y2FzZVN0eWxlfWApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqb2luKGNhc2VTdHlsZTogQ2FzZVN0eWxlLCBwYXJ0czogc3RyaW5nW10pOiBzdHJpbmcge1xuICBzd2l0Y2ggKGNhc2VTdHlsZSkge1xuICAgIGNhc2UgQ2FzZVN0eWxlLlNjcmVhbWluZ1NuYWtlQ2FzZTpcbiAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiX1wiKS50b1VwcGVyQ2FzZSgpO1xuICAgIGNhc2UgQ2FzZVN0eWxlLlNuYWtlQ2FzZTpcbiAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiX1wiKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNhc2UgQ2FzZVN0eWxlLktlYmFiQ2FzZTpcbiAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNhc2UgQ2FzZVN0eWxlLkNhbWVsQ2FzZTpcbiAgICAgIHJldHVybiBwYXJ0cy5tYXAoKHBhcnQ6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgICAgIGNvbnN0IHVwcGVyTGVuZ3RoOiBudW1iZXIgPSBpbmRleCA9PT0gMCA/IDAgOiAxO1xuICAgICAgICByZXR1cm4gcGFydC5zdWJzdHIoMCwgdXBwZXJMZW5ndGgpLnRvVXBwZXJDYXNlKCkgKyBwYXJ0LnN1YnN0cmluZyh1cHBlckxlbmd0aCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIH0pLmpvaW4oXCJcIik7XG4gICAgY2FzZSBDYXNlU3R5bGUuUGFzY2FsQ2FzZTpcbiAgICAgIHJldHVybiBwYXJ0cy5tYXAoKHBhcnQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICAgIHJldHVybiBwYXJ0LnN1YnN0cigwLCAxKS50b1VwcGVyQ2FzZSgpICsgcGFydC5zdWJzdHJpbmcoMSkudG9Mb3dlckNhc2UoKTtcbiAgICAgIH0pLmpvaW4oXCJcIik7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBJbmNpZGVudChgSW5jb21wbGV0ZVN3aXRjaDogUmVjZWl2ZWQgdW5leHBlY3RlZCB2YXJpYW50IGZvciBjYXNlU3R5bGU6ICR7Y2FzZVN0eWxlfWApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5hbWUoaWRlbnRpZmllcjogc3RyaW5nLCB0bzogQ2FzZVN0eWxlKTogc3RyaW5nO1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnVuaWZpZWQtc2lnbmF0dXJlc1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmFtZShpZGVudGlmaWVyOiBzdHJpbmcsIGZyb206IENhc2VTdHlsZSwgdG86IENhc2VTdHlsZSk6IHN0cmluZztcbmV4cG9ydCBmdW5jdGlvbiByZW5hbWUoaWRlbnRpZmllcjogc3RyaW5nLCBmcm9tOiBDYXNlU3R5bGUsIHRvPzogQ2FzZVN0eWxlKTogc3RyaW5nIHtcbiAgaWYgKHRvID09PSB1bmRlZmluZWQpIHtcbiAgICB0byA9IGZyb207XG4gICAgZnJvbSA9IGRldGVjdENhc2VTdHlsZShpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gam9pbih0bywgc3BsaXQoZnJvbSwgaWRlbnRpZmllcikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuYW1lTWFwPEsgZXh0ZW5kcyBzdHJpbmc+KGtleXM6IEl0ZXJhYmxlPEs+LCB0bz86IENhc2VTdHlsZSk6IE1hcDxzdHJpbmcsIEs+IHtcbiAgY29uc3QgcmVzdWx0OiBNYXA8c3RyaW5nLCBLPiA9IG5ldyBNYXAoKTtcbiAgY29uc3Qgb3V0S2V5czogU2V0PHN0cmluZz4gPSBuZXcgU2V0KCk7XG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBjb25zdCByZW5hbWVkOiBzdHJpbmcgPSB0byA9PT0gdW5kZWZpbmVkID8ga2V5IDogcmVuYW1lKGtleSwgdG8pO1xuICAgIHJlc3VsdC5zZXQocmVuYW1lZCwga2V5KTtcbiAgICBpZiAob3V0S2V5cy5oYXMocmVuYW1lZCkpIHtcbiAgICAgIHRocm93IG5ldyBJbmNpZGVudChcIk5vbkJpamVjdGl2ZUtleVJlbmFtZVwiLCBcIlNvbWUga2V5cyBhcmUgdGhlIHNhbWUgYWZ0ZXIgcmVuYW1pbmdcIik7XG4gICAgfVxuICAgIG91dEtleXMuYWRkKHJlbmFtZWQpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG4iXSwic291cmNlUm9vdCI6Ii4uIn0=
