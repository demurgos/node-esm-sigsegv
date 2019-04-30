import { Incident } from "incident";
export const name = "MaxUcs2StringLength";
export function format({ string, max }) {
    return `Expected length of UCS2 string (${string.length}) to be less than or equal to ${max}`;
}
export function createMaxUcs2StringLengthError(string, max) {
    return Incident(name, { string, max }, format);
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZXJyb3JzL21heC11Y3MyLXN0cmluZy1sZW5ndGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUdwQyxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQVMscUJBQXFCLENBQUM7QUFVaEQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQU87SUFDeEMsT0FBTyxtQ0FBbUMsTUFBTSxDQUFDLE1BQU0saUNBQWlDLEdBQUcsRUFBRSxDQUFDO0FBQ2hHLENBQUM7QUFFRCxNQUFNLFVBQVUsOEJBQThCLENBQUMsTUFBYyxFQUFFLEdBQVc7SUFDeEUsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQy9DLENBQUMiLCJmaWxlIjoibGliL2Vycm9ycy9tYXgtdWNzMi1zdHJpbmctbGVuZ3RoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5jaWRlbnQgfSBmcm9tIFwiaW5jaWRlbnRcIjtcblxuZXhwb3J0IHR5cGUgTmFtZSA9IFwiTWF4VWNzMlN0cmluZ0xlbmd0aFwiO1xuZXhwb3J0IGNvbnN0IG5hbWU6IE5hbWUgPSBcIk1heFVjczJTdHJpbmdMZW5ndGhcIjtcblxuZXhwb3J0IGludGVyZmFjZSBEYXRhIHtcbiAgc3RyaW5nOiBzdHJpbmc7XG4gIG1heDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBDYXVzZSA9IHVuZGVmaW5lZDtcbmV4cG9ydCB0eXBlIE1heFVjczJTdHJpbmdMZW5ndGhFcnJvciA9IEluY2lkZW50PERhdGEsIE5hbWUsIENhdXNlPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdCh7c3RyaW5nLCBtYXh9OiBEYXRhKTogc3RyaW5nIHtcbiAgcmV0dXJuIGBFeHBlY3RlZCBsZW5ndGggb2YgVUNTMiBzdHJpbmcgKCR7c3RyaW5nLmxlbmd0aH0pIHRvIGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAke21heH1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWF4VWNzMlN0cmluZ0xlbmd0aEVycm9yKHN0cmluZzogc3RyaW5nLCBtYXg6IG51bWJlcik6IE1heFVjczJTdHJpbmdMZW5ndGhFcnJvciB7XG4gIHJldHVybiBJbmNpZGVudChuYW1lLCB7c3RyaW5nLCBtYXh9LCBmb3JtYXQpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9