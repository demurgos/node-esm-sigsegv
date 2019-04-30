"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
exports.name = "InvalidArrayItems";
function createInvalidArrayItemsError(invalid) {
    return incident_1.Incident(exports.name, { invalid });
}
exports.createInvalidArrayItemsError = createInvalidArrayItemsError;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZXJyb3JzL2ludmFsaWQtYXJyYXktaXRlbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBb0M7QUFHdkIsUUFBQSxJQUFJLEdBQVMsbUJBQW1CLENBQUM7QUFZOUMsU0FBZ0IsNEJBQTRCLENBQUMsT0FBMkI7SUFDdEUsT0FBTyxtQkFBUSxDQUFDLFlBQUksRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUZELG9FQUVDIiwiZmlsZSI6ImxpYi9lcnJvcnMvaW52YWxpZC1hcnJheS1pdGVtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluY2lkZW50IH0gZnJvbSBcImluY2lkZW50XCI7XG5cbmV4cG9ydCB0eXBlIE5hbWUgPSBcIkludmFsaWRBcnJheUl0ZW1zXCI7XG5leHBvcnQgY29uc3QgbmFtZTogTmFtZSA9IFwiSW52YWxpZEFycmF5SXRlbXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBEYXRhIHtcbiAgLyoqXG4gICAqIE1hcCBmcm9tIGl0ZW0gaW5kZXggdG8gZXJyb3IuXG4gICAqL1xuICBpbnZhbGlkOiBNYXA8bnVtYmVyLCBFcnJvcj47XG59XG5cbmV4cG9ydCB0eXBlIENhdXNlID0gdW5kZWZpbmVkO1xuZXhwb3J0IHR5cGUgSW52YWxpZEFycmF5SXRlbXNFcnJvciA9IEluY2lkZW50PERhdGEsIE5hbWUsIENhdXNlPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUludmFsaWRBcnJheUl0ZW1zRXJyb3IoaW52YWxpZDogTWFwPG51bWJlciwgRXJyb3I+KTogSW52YWxpZEFycmF5SXRlbXNFcnJvciB7XG4gIHJldHVybiBJbmNpZGVudChuYW1lLCB7aW52YWxpZH0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
