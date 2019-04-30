export const name = "InvalidArrayItems";
export function createInvalidArrayItemsError(invalid) {
    return new Error(name);
}
