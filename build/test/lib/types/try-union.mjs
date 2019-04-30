import { Incident } from "incident";
import { lazyProperties } from "../_helpers/lazy-properties";
import { createLazyOptionsError } from "../errors/lazy-options";
import { testError } from "../test-error";
export const name = "union";
export class TryUnionType {
    constructor(options) {
        this.name = name;
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazyProperties(this, this._applyOptions, ["variants"]);
        }
    }
    match(value) {
        for (const variant of this.variants) {
            if (variant.test(value)) {
                return variant;
            }
        }
        return undefined;
    }
    matchTrusted(value) {
        return this.match(value);
    }
    write(writer, value) {
        const variant = this.match(value);
        if (variant === undefined) {
            throw new Incident("UnknownUnionVariant", "Unknown union variant");
        }
        if (variant.write === undefined) {
            throw new Incident("NotWritable", { type: variant });
        }
        return variant.write(writer, value);
    }
    read(reader, raw) {
        return this.variantRead(reader, raw).value;
    }
    variantRead(reader, raw) {
        for (const variant of this.variants) {
            try {
                const value = variant.read(reader, raw);
                return { value, variant };
            }
            catch (err) {
                // TODO: Do not swallow all errors
            }
        }
        throw new Incident("InputVariantNotFound", { union: this, raw });
    }
    testError(value) {
        const variant = this.match(value);
        if (variant === undefined) {
            return new Incident("UnknownUnionVariant", "Unknown union variant");
        }
        return testError(variant, value);
    }
    test(val) {
        const type = this.match(val);
        if (type === undefined) {
            return false;
        }
        return type.test(val);
    }
    // TODO: Always return true?
    equals(val1, val2) {
        const type1 = this.matchTrusted(val1);
        const type2 = this.matchTrusted(val2);
        return type1 === type2 && type1.equals(val1, val2);
    }
    clone(val) {
        return this.matchTrusted(val).clone(val);
    }
    _applyOptions() {
        if (this._options === undefined) {
            throw createLazyOptionsError(this);
        }
        const options = typeof this._options === "function"
            ? this._options()
            : this._options;
        delete this._options;
        const variants = options.variants;
        Object.assign(this, { variants });
    }
}
