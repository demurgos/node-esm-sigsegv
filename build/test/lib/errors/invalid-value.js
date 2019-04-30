"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
exports.name = "InvalidValue";
function createInvalidValueError(type, value) {
    return new incident_1.Incident(exports.name, { type, value });
}
exports.createInvalidValueError = createInvalidValueError;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZXJyb3JzL2ludmFsaWQtdmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBb0M7QUFJdkIsUUFBQSxJQUFJLEdBQVMsY0FBYyxDQUFDO0FBVXpDLFNBQWdCLHVCQUF1QixDQUFDLElBQWUsRUFBRSxLQUFVO0lBQ2pFLE9BQU8sSUFBSSxtQkFBUSxDQUFDLFlBQUksRUFBRSxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFGRCwwREFFQyIsImZpbGUiOiJsaWIvZXJyb3JzL2ludmFsaWQtdmFsdWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmNpZGVudCB9IGZyb20gXCJpbmNpZGVudFwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi9jb3JlXCI7XG5cbmV4cG9ydCB0eXBlIE5hbWUgPSBcIkludmFsaWRWYWx1ZVwiO1xuZXhwb3J0IGNvbnN0IG5hbWU6IE5hbWUgPSBcIkludmFsaWRWYWx1ZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIERhdGEge1xuICB0eXBlOiBUeXBlPGFueT47XG4gIHZhbHVlOiBhbnk7XG59XG5cbmV4cG9ydCB0eXBlIENhdXNlID0gdW5kZWZpbmVkO1xuZXhwb3J0IHR5cGUgSW52YWxpZFZhbHVlRXJyb3IgPSBJbmNpZGVudDxEYXRhLCBOYW1lLCBDYXVzZT47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbnZhbGlkVmFsdWVFcnJvcih0eXBlOiBUeXBlPGFueT4sIHZhbHVlOiBhbnkpOiBJbnZhbGlkVmFsdWVFcnJvciB7XG4gIHJldHVybiBuZXcgSW5jaWRlbnQobmFtZSwge3R5cGUsIHZhbHVlfSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=