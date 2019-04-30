"use strict";
/**
 * @module kryo/builtins/uuid-hex
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ucs2_string_1 = require("../types/ucs2-string");
/**
 * Type for UUID hex string standard representation.
 */
exports.$UuidHex = new ucs2_string_1.Ucs2StringType({
    lowerCase: true,
    trimmed: true,
    minLength: 36,
    maxLength: 36,
    pattern: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvYnVpbHRpbnMvdXVpZC1oZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUVILHNEQUFzRDtBQU90RDs7R0FFRztBQUNVLFFBQUEsUUFBUSxHQUFtQixJQUFJLDRCQUFjLENBQUM7SUFDekQsU0FBUyxFQUFFLElBQUk7SUFDZixPQUFPLEVBQUUsSUFBSTtJQUNiLFNBQVMsRUFBRSxFQUFFO0lBQ2IsU0FBUyxFQUFFLEVBQUU7SUFDYixPQUFPLEVBQUUsOERBQThEO0NBQ3hFLENBQUMsQ0FBQyIsImZpbGUiOiJsaWIvYnVpbHRpbnMvdXVpZC1oZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBtb2R1bGUga3J5by9idWlsdGlucy91dWlkLWhleFxuICovXG5cbmltcG9ydCB7IFVjczJTdHJpbmdUeXBlIH0gZnJvbSBcIi4uL3R5cGVzL3VjczItc3RyaW5nXCI7XG5cbi8qKlxuICogU2VtYW50aWMgYWxpYXMgZm9yIHN0cmluZ3MgcmVwcmVzZW50aW5nIFVVSUQuXG4gKi9cbmV4cG9ydCB0eXBlIFV1aWRIZXggPSBzdHJpbmc7XG5cbi8qKlxuICogVHlwZSBmb3IgVVVJRCBoZXggc3RyaW5nIHN0YW5kYXJkIHJlcHJlc2VudGF0aW9uLlxuICovXG5leHBvcnQgY29uc3QgJFV1aWRIZXg6IFVjczJTdHJpbmdUeXBlID0gbmV3IFVjczJTdHJpbmdUeXBlKHtcbiAgbG93ZXJDYXNlOiB0cnVlLFxuICB0cmltbWVkOiB0cnVlLFxuICBtaW5MZW5ndGg6IDM2LFxuICBtYXhMZW5ndGg6IDM2LFxuICBwYXR0ZXJuOiAvWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzAtOWEtZl17NH0tWzAtOWEtZl17NH0tWzAtOWEtZl17MTJ9Lyxcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
