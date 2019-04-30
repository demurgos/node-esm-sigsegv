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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvX2hlbHBlcnMvbGF6eS1wcm9wZXJ0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUFJLE1BQVMsRUFBRSxLQUFpQixFQUFFLElBQXVCO0lBQ3JGLFNBQVMsaUJBQWlCO1FBQ3hCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ3RCLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtnQkFDakMsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLEtBQUssRUFBRSxTQUFTO2dCQUNoQixRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztTQUNKO1FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7UUFDdEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO1lBQ2pDLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0JBQ1IsaUJBQWlCLEVBQUUsQ0FBQztnQkFDcEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsQ0FBQztZQUNELEdBQUcsRUFBRSxTQUFTO1lBQ2QsVUFBVSxFQUFFLElBQUk7WUFDaEIsWUFBWSxFQUFFLElBQUk7U0FDbkIsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDIiwiZmlsZSI6ImxpYi9faGVscGVycy9sYXp5LXByb3BlcnRpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEludGVyY2VwdHMgcmVhZHMgdG8gdGhlIHByb3ZpZGVkIGBrZXlzYCBvZiBgdGFyZ2V0YCB0byBydW4gYGFwcGx5YCBiZWZvcmUgcmV0dXJuaW5nXG4gKiB0aGUgdmFsdWUuIFRoaXMgYWxsb3dzIHRvIGluaXRpYWxpemUgdGhlc2UgcHJvcGVydGllcyBsYXppbHkuXG4gKiBZb3Ugc2hvdWxkIGVuc3VyZSB0aGF0IGBhcHBseWAgbmV2ZXIgdGhyb3dzLlxuICogT25jZSBvbmUgb2YgdGhlIHRyYXBwZWQgcHJvcGVydGllcyB3YXMgcmVhZCwgYWxsIHRoZSBwcm9wZXJ0aWVzIGJlY29tZSBub3JtYWwgcHJvcGVydGllcy5cbiAqIENhbGwgYGxhenlQcm9wZXJ0aWVzYCBvbiBkaWZmZXJlbnQgc3Vic2V0cyBvZiBrZXlzIHRvIGhhdmUgaW5kZXBlbmRlbnQgbGF6eSBwcm9wZXJ0aWVzLlxuICpcbiAqIENhbGxpbmcgYGxhenlQcm9wZXJ0aWVzYCBtdWx0aXBsZSB0aW1lIG9uIHRoZSBzYW1lIGtleSBpcyB1bmRlZmluZWQgYmVoYXZpb3IuXG4gKlxuICogQHBhcmFtIHRhcmdldCBUaGUgb2JqZWN0IGhvbGRpbmcgdGhlIHByb3BlcnRpZXMgdG8gaW50ZXJjZXB0LlxuICogQHBhcmFtIGFwcGx5IFRoZSBmdW5jdGlvbiBjYWxsZWQgb25jZSBvbmUgb2YgdGhlIGxhenkgcHJvcGVydGllcyBpcyBhY2Nlc3NlZC4gSXRzIGB0aGlzYCB2YWx1ZVxuICogICAgICAgICAgICAgIHdpbGwgYmUgYHRhcmdldGAuXG4gKiBAcGFyYW0ga2V5cyBUaGUgbmFtZXMgb2YgdGhlIHByb3BlcnRpZXMgdG8gaW50ZXJjZXB0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gbGF6eVByb3BlcnRpZXM8VD4odGFyZ2V0OiBULCBhcHBseTogKCkgPT4gdm9pZCwga2V5czogSXRlcmFibGU8a2V5b2YgVD4pOiB2b2lkIHtcbiAgZnVuY3Rpb24gcmVzdG9yZVByb3BlcnRpZXMoKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gICAgYXBwbHkuY2FsbCh0YXJnZXQpO1xuICB9XG5cbiAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwge1xuICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgIHJlc3RvcmVQcm9wZXJ0aWVzKCk7XG4gICAgICAgIHJldHVybiB0YXJnZXRba2V5XTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IHVuZGVmaW5lZCxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
