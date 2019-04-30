export const name = "InvalidDocument";
export function createInvalidDocumentError(data) {
    if (data.extra === undefined) {
        Reflect.deleteProperty(data, "extra");
    }
    return new Error(name);
}
