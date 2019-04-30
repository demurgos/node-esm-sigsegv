import { Incident } from "incident";
export const name = "NotImplemented";
export function createNotImplementedError(message) {
    return Incident(name, message);
}
