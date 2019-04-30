import { Incident } from "incident";
import { lazyProperties } from "../_helpers/lazy-properties";
import { createInvalidTypeError } from "../errors/invalid-type";
import { createLazyOptionsError } from "../errors/lazy-options";
import { readVisitor } from "../readers/read-visitor";
import { testError } from "../test-error";
export const name = "union";
export class TaggedUnionType {
    constructor(options) {
        this.name = name;
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazyProperties(this, this._applyOptions, ["variants", "tag"]);
        }
    }
    match(value) {
        const tag = this.tag;
        const tagValue = value[tag];
        if (tagValue === undefined) {
            return undefined;
            // throw new Incident("MissingTag", {union: this, value});
        }
        const variant = this.getValueToVariantMap().get(tagValue); // tagToVariant
        if (variant === undefined) {
            return undefined;
            // throw new Incident("VariantNotFound", {union: this, value});
        }
        return variant;
    }
    matchTrusted(value) {
        return this.match(value);
    }
    write(writer, value) {
        const variant = this.match(value);
        if (variant === undefined) {
            throw new Incident("VariantNotFound", { union: this, value });
        }
        if (variant.write === undefined) {
            throw new Incident("NotWritable", { type: variant });
        }
        return variant.write(writer, value);
    }
    read(reader, raw) {
        return this.variantRead(reader, raw)[1];
    }
    variantRead(reader, raw) {
        return reader.readDocument(raw, readVisitor({
            fromMap: (input, keyReader, valueReader) => {
                const outTag = this.getOutTag();
                for (const [rawKey, rawValue] of input) {
                    const outKey = keyReader.readString(rawKey, readVisitor({ fromString: (input) => input }));
                    if (outKey !== outTag) {
                        continue;
                    }
                    const tagValue = this.getTagType().read(valueReader, rawValue);
                    const variant = this.getValueToVariantMap().get(tagValue); // tagToVariant
                    if (variant === undefined) {
                        throw new Incident("VariantNotFound", { union: this, tagValue });
                    }
                    return [variant, variant.read(reader, raw)];
                }
                throw new Incident("MissingOutTag");
            },
        }));
    }
    testError(value) {
        if (typeof value !== "object" || value === null) {
            return createInvalidTypeError("object", value);
        }
        const variant = this.match(value);
        if (variant === undefined) {
            return new Incident("UnknownUnionVariant", "Unknown union variant");
        }
        return testError(variant, value);
    }
    // testWithVariant(val: T): TestWithVariantResult<T> {
    //   const variant: K | undefined = this.match(val);
    //   if (variant === undefined) {
    //     return [false as false, undefined];
    //   }
    //   return [variant.test(val), variant] as TestWithVariantResult<T>;
    // }
    test(value) {
        if (typeof value !== "object" || value === null) {
            return false;
        }
        const type = this.match(value);
        if (type === undefined) {
            return false;
        }
        return type.test(value);
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
        const tag = options.tag;
        Object.assign(this, { variants, tag });
    }
    /**
     * Returns the serialized name of the tag property
     */
    getOutTag() {
        if (this._outTag === undefined) {
            const tag = this.tag;
            let outTag = undefined;
            for (const variant of this.variants) {
                const cur = variant.getOutKey(tag);
                if (outTag === undefined) {
                    outTag = cur;
                }
                else if (cur !== outTag) {
                    throw new Incident("MixedOutTag", { tag, out: [cur, outTag] });
                }
            }
            if (outTag === undefined) {
                throw new Incident("AssertionFailed", "Expected outTag to be defined");
            }
            this._outTag = outTag;
        }
        return this._outTag;
    }
    getTagType() {
        if (this._tagType === undefined) {
            const tag = this.tag;
            let tagType = undefined;
            for (const variant of this.variants) {
                const lit = variant.properties[tag].type;
                const cur = lit.type;
                if (tagType === undefined) {
                    tagType = cur;
                }
                else if (cur !== tagType) {
                    throw new Incident("MixedTagType", { tag, type: [cur, tagType] });
                }
            }
            if (tagType === undefined) {
                throw new Incident("AssertionFailed", "Expected tagType to be defined");
            }
            this._tagType = tagType;
        }
        return this._tagType;
    }
    getValueToVariantMap() {
        if (this._valueToVariantMap === undefined) {
            const tag = this.tag;
            const valueToVariantMap = new Map();
            for (const variant of this.variants) {
                const lit = variant.properties[tag].type;
                if (valueToVariantMap.has(lit.value)) {
                    throw new Incident("DuplicateTagValue", { value: lit.value });
                }
                valueToVariantMap.set(lit.value, variant);
            }
            if (valueToVariantMap === undefined) {
                throw new Incident("AssertionFailed", "Expected valueToVariantMap to be defined");
            }
            this._valueToVariantMap = valueToVariantMap;
        }
        return this._valueToVariantMap;
    }
}
