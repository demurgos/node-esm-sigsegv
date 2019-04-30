import { Incident } from "incident";
export const name = "UnknownFormat";
export function format({ format }) {
    return `Unknown format ${JSON.stringify(format)}, supported formats: bson, json or qs`;
}
export function createUnknownFormatError(unknownFormat) {
    return new Incident(name, { format: unknownFormat }, format);
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZXJyb3JzL3Vua25vd24tZm9ybWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFHcEMsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFTLGVBQWUsQ0FBQztBQWtCMUMsTUFBTSxVQUFVLE1BQU0sQ0FBQyxFQUFDLE1BQU0sRUFBTztJQUNuQyxPQUFPLGtCQUFrQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx1Q0FBdUMsQ0FBQztBQUN6RixDQUFDO0FBRUQsTUFBTSxVQUFVLHdCQUF3QixDQUFDLGFBQXFCO0lBQzVELE9BQU8sSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUMsTUFBTSxFQUFFLGFBQWEsRUFBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzdELENBQUMiLCJmaWxlIjoibGliL2Vycm9ycy91bmtub3duLWZvcm1hdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluY2lkZW50IH0gZnJvbSBcImluY2lkZW50XCI7XG5cbmV4cG9ydCB0eXBlIE5hbWUgPSBcIlVua25vd25Gb3JtYXRcIjtcbmV4cG9ydCBjb25zdCBuYW1lOiBOYW1lID0gXCJVbmtub3duRm9ybWF0XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoZSB1bmtub3duIGZvcm1hdC5cbiAgICovXG4gIGZvcm1hdDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDYXVzZSA9IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGlzIGVycm9yIGlzIHRocm93biB3aGVuIHRoZSBwcm92aWRlZCBmb3JtYXQgZm9yIHNlcmlhbGl6YXRpb24gb3IgZGVzZXJpYWxpemF0aW9uIGlzIHVuc3VwcG9ydGVkLlxuICpcbiAqIEN1cnJlbnRseSwgb25seSB0aGUgdHdvIGZvcm1hdCBcImpzb24tZG9jXCIgYW5kIFwiYnNvbi1kb2NcIiBhcmUgc3VwcG9ydGVkLlxuICovXG5leHBvcnQgdHlwZSBVbmtub3duRm9ybWF0RXJyb3IgPSBJbmNpZGVudDxEYXRhLCBOYW1lLCBDYXVzZT47XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQoe2Zvcm1hdH06IERhdGEpOiBzdHJpbmcge1xuICByZXR1cm4gYFVua25vd24gZm9ybWF0ICR7SlNPTi5zdHJpbmdpZnkoZm9ybWF0KX0sIHN1cHBvcnRlZCBmb3JtYXRzOiBic29uLCBqc29uIG9yIHFzYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVVua25vd25Gb3JtYXRFcnJvcih1bmtub3duRm9ybWF0OiBzdHJpbmcpOiBVbmtub3duRm9ybWF0RXJyb3Ige1xuICByZXR1cm4gbmV3IEluY2lkZW50KG5hbWUsIHtmb3JtYXQ6IHVua25vd25Gb3JtYXR9LCBmb3JtYXQpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9