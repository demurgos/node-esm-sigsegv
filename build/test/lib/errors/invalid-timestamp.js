"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
exports.name = "InvalidTimestamp";
function format({ date }) {
    return `Invalid timestamp for the date: ${JSON.stringify(date)}`;
}
exports.format = format;
function createInvalidTimestampError(date) {
    return incident_1.Incident(exports.name, { date }, format);
}
exports.createInvalidTimestampError = createInvalidTimestampError;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZXJyb3JzL2ludmFsaWQtdGltZXN0YW1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQW9DO0FBR3ZCLFFBQUEsSUFBSSxHQUFTLGtCQUFrQixDQUFDO0FBUzdDLFNBQWdCLE1BQU0sQ0FBQyxFQUFDLElBQUksRUFBTztJQUNqQyxPQUFPLG1DQUFtQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDbkUsQ0FBQztBQUZELHdCQUVDO0FBRUQsU0FBZ0IsMkJBQTJCLENBQUMsSUFBVTtJQUNwRCxPQUFPLG1CQUFRLENBQUMsWUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUZELGtFQUVDIiwiZmlsZSI6ImxpYi9lcnJvcnMvaW52YWxpZC10aW1lc3RhbXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmNpZGVudCB9IGZyb20gXCJpbmNpZGVudFwiO1xuXG5leHBvcnQgdHlwZSBOYW1lID0gXCJJbnZhbGlkVGltZXN0YW1wXCI7XG5leHBvcnQgY29uc3QgbmFtZTogTmFtZSA9IFwiSW52YWxpZFRpbWVzdGFtcFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIERhdGEge1xuICBkYXRlOiBEYXRlO1xufVxuXG5leHBvcnQgdHlwZSBDYXVzZSA9IHVuZGVmaW5lZDtcbmV4cG9ydCB0eXBlIEludmFsaWRUaW1lc3RhbXBFcnJvciA9IEluY2lkZW50PERhdGEsIE5hbWUsIENhdXNlPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdCh7ZGF0ZX06IERhdGEpOiBzdHJpbmcge1xuICByZXR1cm4gYEludmFsaWQgdGltZXN0YW1wIGZvciB0aGUgZGF0ZTogJHtKU09OLnN0cmluZ2lmeShkYXRlKX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW52YWxpZFRpbWVzdGFtcEVycm9yKGRhdGU6IERhdGUpOiBJbnZhbGlkVGltZXN0YW1wRXJyb3Ige1xuICByZXR1cm4gSW5jaWRlbnQobmFtZSwge2RhdGV9LCBmb3JtYXQpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
