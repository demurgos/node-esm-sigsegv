/**
 * @module kryo/builtins/uuid-hex
 */
import { Ucs2StringType } from "../types/ucs2-string";
/**
 * Type for UUID hex string standard representation.
 */
export const $UuidHex = new Ucs2StringType({
    lowerCase: true,
    trimmed: true,
    minLength: 36,
    maxLength: 36,
    pattern: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvYnVpbHRpbnMvdXVpZC1oZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFPdEQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQW1CLElBQUksY0FBYyxDQUFDO0lBQ3pELFNBQVMsRUFBRSxJQUFJO0lBQ2YsT0FBTyxFQUFFLElBQUk7SUFDYixTQUFTLEVBQUUsRUFBRTtJQUNiLFNBQVMsRUFBRSxFQUFFO0lBQ2IsT0FBTyxFQUFFLDhEQUE4RDtDQUN4RSxDQUFDLENBQUMiLCJmaWxlIjoibGliL2J1aWx0aW5zL3V1aWQtaGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlIGtyeW8vYnVpbHRpbnMvdXVpZC1oZXhcbiAqL1xuXG5pbXBvcnQgeyBVY3MyU3RyaW5nVHlwZSB9IGZyb20gXCIuLi90eXBlcy91Y3MyLXN0cmluZ1wiO1xuXG4vKipcbiAqIFNlbWFudGljIGFsaWFzIGZvciBzdHJpbmdzIHJlcHJlc2VudGluZyBVVUlELlxuICovXG5leHBvcnQgdHlwZSBVdWlkSGV4ID0gc3RyaW5nO1xuXG4vKipcbiAqIFR5cGUgZm9yIFVVSUQgaGV4IHN0cmluZyBzdGFuZGFyZCByZXByZXNlbnRhdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0ICRVdWlkSGV4OiBVY3MyU3RyaW5nVHlwZSA9IG5ldyBVY3MyU3RyaW5nVHlwZSh7XG4gIGxvd2VyQ2FzZTogdHJ1ZSxcbiAgdHJpbW1lZDogdHJ1ZSxcbiAgbWluTGVuZ3RoOiAzNixcbiAgbWF4TGVuZ3RoOiAzNixcbiAgcGF0dGVybjogL1swLTlhLWZdezh9LVswLTlhLWZdezR9LVswLTlhLWZdezR9LVswLTlhLWZdezR9LVswLTlhLWZdezEyfS8sXG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
