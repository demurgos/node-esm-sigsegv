import { Incident } from "incident";
import objectInspect from "object-inspect";
export const name = "LazyOptions";
export function createLazyOptionsError(target) {
    return new Incident(name, { target }, ({ target }) => `Cannot resolve lazy options in target: ${objectInspect(target)}`);
}
