import { Incident } from "incident";
export const name = "UnknownFormat";
export function format({ format }) {
    return `Unknown format ${JSON.stringify(format)}, supported formats: json`;
}
export function createUnknownFormatError(unknownFormat) {
    return new Incident(name, { format: unknownFormat }, format);
}
