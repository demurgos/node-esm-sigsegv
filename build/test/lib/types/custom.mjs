import { lazyProperties } from "../_helpers/lazy-properties";
import { createLazyOptionsError } from "../errors/lazy-options";
export const name = "custom";
export class CustomType {
    constructor(options) {
        this.name = name;
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazyProperties(this, this._applyOptions, ["read", "write", "testError", "equals", "clone"]);
        }
    }
    test(val) {
        return this.testError(val) === undefined;
    }
    _applyOptions() {
        if (this._options === undefined) {
            throw createLazyOptionsError(this);
        }
        const options = typeof this._options === "function" ? this._options() : this._options;
        Object.assign(this, {
            read: options.read,
            write: options.write,
            testError: options.testError,
            equals: options.equals,
            clone: options.clone,
        });
    }
}
