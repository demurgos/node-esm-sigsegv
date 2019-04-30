/**
 * Intercepts reads to the provided `keys` of `target` to run `apply` before returning
 * the value. This allows to initialize these properties lazily.
 * You should ensure that `apply` never throws.
 * Once one of the trapped properties was read, all the properties become normal properties.
 * Call `lazyProperties` on different subsets of keys to have independent lazy properties.
 *
 * Calling `lazyProperties` multiple time on the same key is undefined behavior.
 *
 * @param target The object holding the properties to intercept.
 * @param apply The function called once one of the lazy properties is accessed. Its `this` value
 *              will be `target`.
 * @param keys The names of the properties to intercept.
 */
export function lazyProperties(target, apply, keys) {
    function restoreProperties() {
        for (const key of keys) {
            Object.defineProperty(target, key, {
                configurable: true,
                value: undefined,
                writable: true,
            });
        }
        apply.call(target);
    }
    for (const key of keys) {
        Object.defineProperty(target, key, {
            get: () => {
                restoreProperties();
                return target[key];
            },
            set: undefined,
            enumerable: true,
            configurable: true,
        });
    }
}
