import { Incident } from "incident";
import objectInspect from "object-inspect";
export const name = "InvalidType";
export function format({ typeName, value, variableName }) {
    if (typeof variableName === "string") {
        return `Variable \`${variableName}\` should have type \`${typeName}\`: ${objectInspect(value)}`;
    }
    else {
        return `Expected type \`${typeName}\`: ${objectInspect(value)}`;
    }
}
export function createInvalidTypeError(typeName, value, variableName) {
    return Incident(name, { typeName, value, variableName }, format);
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZXJyb3JzL2ludmFsaWQtdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sYUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBRzNDLE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBUyxhQUFhLENBQUM7QUF1QnhDLE1BQU0sVUFBVSxNQUFNLENBQUMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBTztJQUMxRCxJQUFJLE9BQU8sWUFBWSxLQUFLLFFBQVEsRUFBRTtRQUNwQyxPQUFPLGNBQWMsWUFBWSx5QkFBeUIsUUFBUSxPQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0tBQ2pHO1NBQU07UUFDTCxPQUFPLG1CQUFtQixRQUFRLE9BQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7S0FDakU7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLHNCQUFzQixDQUFDLFFBQWdCLEVBQUUsS0FBVSxFQUFFLFlBQXFCO0lBQ3hGLE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDakUsQ0FBQyIsImZpbGUiOiJsaWIvZXJyb3JzL2ludmFsaWQtdHlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluY2lkZW50IH0gZnJvbSBcImluY2lkZW50XCI7XG5pbXBvcnQgb2JqZWN0SW5zcGVjdCBmcm9tIFwib2JqZWN0LWluc3BlY3RcIjtcblxuZXhwb3J0IHR5cGUgTmFtZSA9IFwiSW52YWxpZFR5cGVcIjtcbmV4cG9ydCBjb25zdCBuYW1lOiBOYW1lID0gXCJJbnZhbGlkVHlwZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIERhdGEge1xuICAvKipcbiAgICogVGhlIGV4cGVjdGVkIEphdmFzY3JpcHQgdHlwZS4gVGhpcyBpcyBvbmUgb2YgdGhlIHBvc3NpYmxlIHJlc3VsdHMgb2ZcbiAgICogdGhlIGB0eXBlb2ZgIG9wZXJhdG9yLlxuICAgKi9cbiAgdHlwZU5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHZhbHVlIHRoYXQgaGFzIGEgcHJvYmxlbSB3aXRoIGl0cyB0eXBlLlxuICAgKi9cbiAgdmFsdWU6IGFueTtcblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIHZhcmlhYmxlIHRoYXQgaGFzIGEgcHJvYmxlbSB3aXRoIGl0cyB0eXBlLlxuICAgKi9cbiAgdmFyaWFibGVOYW1lPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDYXVzZSA9IHVuZGVmaW5lZDtcbmV4cG9ydCB0eXBlIEludmFsaWRUeXBlRXJyb3IgPSBJbmNpZGVudDxEYXRhLCBOYW1lLCBDYXVzZT47XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQoe3R5cGVOYW1lLCB2YWx1ZSwgdmFyaWFibGVOYW1lfTogRGF0YSk6IHN0cmluZyB7XG4gIGlmICh0eXBlb2YgdmFyaWFibGVOYW1lID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGBWYXJpYWJsZSBcXGAke3ZhcmlhYmxlTmFtZX1cXGAgc2hvdWxkIGhhdmUgdHlwZSBcXGAke3R5cGVOYW1lfVxcYDogJHtvYmplY3RJbnNwZWN0KHZhbHVlKX1gO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBgRXhwZWN0ZWQgdHlwZSBcXGAke3R5cGVOYW1lfVxcYDogJHtvYmplY3RJbnNwZWN0KHZhbHVlKX1gO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbnZhbGlkVHlwZUVycm9yKHR5cGVOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnksIHZhcmlhYmxlTmFtZT86IHN0cmluZyk6IEludmFsaWRUeXBlRXJyb3Ige1xuICByZXR1cm4gSW5jaWRlbnQobmFtZSwge3R5cGVOYW1lLCB2YWx1ZSwgdmFyaWFibGVOYW1lfSwgZm9ybWF0KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
