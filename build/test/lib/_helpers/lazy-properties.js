"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function lazyProperties(target, apply, keys) {
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
exports.lazyProperties = lazyProperties;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvX2hlbHBlcnMvbGF6eS1wcm9wZXJ0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILFNBQWdCLGNBQWMsQ0FBSSxNQUFTLEVBQUUsS0FBaUIsRUFBRSxJQUF1QjtJQUNyRixTQUFTLGlCQUFpQjtRQUN4QixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtZQUN0QixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ2pDLFlBQVksRUFBRSxJQUFJO2dCQUNsQixLQUFLLEVBQUUsU0FBUztnQkFDaEIsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQUM7U0FDSjtRQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO1FBQ3RCLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUNqQyxHQUFHLEVBQUUsR0FBRyxFQUFFO2dCQUNSLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3BCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLENBQUM7WUFDRCxHQUFHLEVBQUUsU0FBUztZQUNkLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUMsQ0FBQztLQUNKO0FBQ0gsQ0FBQztBQXZCRCx3Q0F1QkMiLCJmaWxlIjoibGliL19oZWxwZXJzL2xhenktcHJvcGVydGllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSW50ZXJjZXB0cyByZWFkcyB0byB0aGUgcHJvdmlkZWQgYGtleXNgIG9mIGB0YXJnZXRgIHRvIHJ1biBgYXBwbHlgIGJlZm9yZSByZXR1cm5pbmdcbiAqIHRoZSB2YWx1ZS4gVGhpcyBhbGxvd3MgdG8gaW5pdGlhbGl6ZSB0aGVzZSBwcm9wZXJ0aWVzIGxhemlseS5cbiAqIFlvdSBzaG91bGQgZW5zdXJlIHRoYXQgYGFwcGx5YCBuZXZlciB0aHJvd3MuXG4gKiBPbmNlIG9uZSBvZiB0aGUgdHJhcHBlZCBwcm9wZXJ0aWVzIHdhcyByZWFkLCBhbGwgdGhlIHByb3BlcnRpZXMgYmVjb21lIG5vcm1hbCBwcm9wZXJ0aWVzLlxuICogQ2FsbCBgbGF6eVByb3BlcnRpZXNgIG9uIGRpZmZlcmVudCBzdWJzZXRzIG9mIGtleXMgdG8gaGF2ZSBpbmRlcGVuZGVudCBsYXp5IHByb3BlcnRpZXMuXG4gKlxuICogQ2FsbGluZyBgbGF6eVByb3BlcnRpZXNgIG11bHRpcGxlIHRpbWUgb24gdGhlIHNhbWUga2V5IGlzIHVuZGVmaW5lZCBiZWhhdmlvci5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IFRoZSBvYmplY3QgaG9sZGluZyB0aGUgcHJvcGVydGllcyB0byBpbnRlcmNlcHQuXG4gKiBAcGFyYW0gYXBwbHkgVGhlIGZ1bmN0aW9uIGNhbGxlZCBvbmNlIG9uZSBvZiB0aGUgbGF6eSBwcm9wZXJ0aWVzIGlzIGFjY2Vzc2VkLiBJdHMgYHRoaXNgIHZhbHVlXG4gKiAgICAgICAgICAgICAgd2lsbCBiZSBgdGFyZ2V0YC5cbiAqIEBwYXJhbSBrZXlzIFRoZSBuYW1lcyBvZiB0aGUgcHJvcGVydGllcyB0byBpbnRlcmNlcHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXp5UHJvcGVydGllczxUPih0YXJnZXQ6IFQsIGFwcGx5OiAoKSA9PiB2b2lkLCBrZXlzOiBJdGVyYWJsZTxrZXlvZiBUPik6IHZvaWQge1xuICBmdW5jdGlvbiByZXN0b3JlUHJvcGVydGllcygpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBhcHBseS5jYWxsKHRhcmdldCk7XG4gIH1cblxuICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XG4gICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgcmVzdG9yZVByb3BlcnRpZXMoKTtcbiAgICAgICAgcmV0dXJuIHRhcmdldFtrZXldO1xuICAgICAgfSxcbiAgICAgIHNldDogdW5kZWZpbmVkLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
