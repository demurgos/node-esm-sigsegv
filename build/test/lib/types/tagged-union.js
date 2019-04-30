"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
const lazy_properties_1 = require("../_helpers/lazy-properties");
const invalid_type_1 = require("../errors/invalid-type");
const lazy_options_1 = require("../errors/lazy-options");
const read_visitor_1 = require("../readers/read-visitor");
const test_error_1 = require("../test-error");
exports.name = "union";
class TaggedUnionType {
    constructor(options) {
        this.name = exports.name;
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazy_properties_1.lazyProperties(this, this._applyOptions, ["variants", "tag"]);
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
            throw new incident_1.Incident("VariantNotFound", { union: this, value });
        }
        if (variant.write === undefined) {
            throw new incident_1.Incident("NotWritable", { type: variant });
        }
        return variant.write(writer, value);
    }
    read(reader, raw) {
        return this.variantRead(reader, raw)[1];
    }
    variantRead(reader, raw) {
        return reader.readDocument(raw, read_visitor_1.readVisitor({
            fromMap: (input, keyReader, valueReader) => {
                const outTag = this.getOutTag();
                for (const [rawKey, rawValue] of input) {
                    const outKey = keyReader.readString(rawKey, read_visitor_1.readVisitor({ fromString: (input) => input }));
                    if (outKey !== outTag) {
                        continue;
                    }
                    const tagValue = this.getTagType().read(valueReader, rawValue);
                    const variant = this.getValueToVariantMap().get(tagValue); // tagToVariant
                    if (variant === undefined) {
                        throw new incident_1.Incident("VariantNotFound", { union: this, tagValue });
                    }
                    return [variant, variant.read(reader, raw)];
                }
                throw new incident_1.Incident("MissingOutTag");
            },
        }));
    }
    testError(value) {
        if (typeof value !== "object" || value === null) {
            return invalid_type_1.createInvalidTypeError("object", value);
        }
        const variant = this.match(value);
        if (variant === undefined) {
            return new incident_1.Incident("UnknownUnionVariant", "Unknown union variant");
        }
        return test_error_1.testError(variant, value);
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
            throw lazy_options_1.createLazyOptionsError(this);
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
                    throw new incident_1.Incident("MixedOutTag", { tag, out: [cur, outTag] });
                }
            }
            if (outTag === undefined) {
                throw new incident_1.Incident("AssertionFailed", "Expected outTag to be defined");
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
                    throw new incident_1.Incident("MixedTagType", { tag, type: [cur, tagType] });
                }
            }
            if (tagType === undefined) {
                throw new incident_1.Incident("AssertionFailed", "Expected tagType to be defined");
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
                    throw new incident_1.Incident("DuplicateTagValue", { value: lit.value });
                }
                valueToVariantMap.set(lit.value, variant);
            }
            if (valueToVariantMap === undefined) {
                throw new incident_1.Incident("AssertionFailed", "Expected valueToVariantMap to be defined");
            }
            this._valueToVariantMap = valueToVariantMap;
        }
        return this._valueToVariantMap;
    }
}
exports.TaggedUnionType = TaggedUnionType;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdHlwZXMvdGFnZ2VkLXVuaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQW9DO0FBQ3BDLGlFQUE2RDtBQUU3RCx5REFBZ0U7QUFDaEUseURBQWdFO0FBQ2hFLDBEQUFzRDtBQUN0RCw4Q0FBMEM7QUFNN0IsUUFBQSxJQUFJLEdBQVMsT0FBTyxDQUFDO0FBWWxDLE1BQWEsZUFBZTtJQWMxQixZQUFZLE9BQTJDO1FBWjlDLFNBQUksR0FBUyxZQUFJLENBQUM7UUFhekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxPQUFPLE9BQU8sS0FBSyxVQUFVLEVBQUU7WUFDakMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO2FBQU07WUFDTCxnQ0FBYyxDQUNaLElBQUksRUFDSixJQUFJLENBQUMsYUFBYSxFQUNsQixDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FDcEIsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFRO1FBQ1osTUFBTSxHQUFHLEdBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUM5QixNQUFNLFFBQVEsR0FBUSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQzFCLE9BQU8sU0FBUyxDQUFDO1lBQ2pCLDBEQUEwRDtTQUMzRDtRQUNELE1BQU0sT0FBTyxHQUFrQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxlQUFlO1FBQ3pGLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUN6QixPQUFPLFNBQVMsQ0FBQztZQUNqQiwrREFBK0Q7U0FDaEU7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQVE7UUFDbkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBRSxDQUFDO0lBQzVC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QUFHLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztpQkFDN0Q7Z0JBQ0QsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDM0M7WUFDRCxJQUFJLGlCQUFpQixLQUFLLFNBQVMsRUFBRTtnQkFDbkMsTUFBTSxJQUFJLG1CQUFRLENBQUMsaUJBQWlCLEVBQUUsMENBQTBDLENBQUMsQ0FBQzthQUNuRjtZQUNELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztTQUM3QztRQUNELE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ2pDLENBQUM7Q0FDRjtBQXpNRCwwQ0F5TUMiLCJmaWxlIjoibGliL3R5cGVzL3RhZ2dlZC11bmlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluY2lkZW50IH0gZnJvbSBcImluY2lkZW50XCI7XG5pbXBvcnQgeyBsYXp5UHJvcGVydGllcyB9IGZyb20gXCIuLi9faGVscGVycy9sYXp5LXByb3BlcnRpZXNcIjtcbmltcG9ydCB7IElvVHlwZSwgTGF6eSwgUmVhZGVyLCBWZXJzaW9uZWRUeXBlLCBXcml0ZXIgfSBmcm9tIFwiLi4vY29yZVwiO1xuaW1wb3J0IHsgY3JlYXRlSW52YWxpZFR5cGVFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvaW52YWxpZC10eXBlXCI7XG5pbXBvcnQgeyBjcmVhdGVMYXp5T3B0aW9uc0Vycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9sYXp5LW9wdGlvbnNcIjtcbmltcG9ydCB7IHJlYWRWaXNpdG9yIH0gZnJvbSBcIi4uL3JlYWRlcnMvcmVhZC12aXNpdG9yXCI7XG5pbXBvcnQgeyB0ZXN0RXJyb3IgfSBmcm9tIFwiLi4vdGVzdC1lcnJvclwiO1xuaW1wb3J0IHsgRG9jdW1lbnRUeXBlIH0gZnJvbSBcIi4vZG9jdW1lbnRcIjtcbmltcG9ydCB7IExpdGVyYWxUeXBlIH0gZnJvbSBcIi4vbGl0ZXJhbFwiO1xuaW1wb3J0IHsgVHNFbnVtVHlwZSB9IGZyb20gXCIuL3RzLWVudW1cIjtcblxuZXhwb3J0IHR5cGUgTmFtZSA9IFwidW5pb25cIjtcbmV4cG9ydCBjb25zdCBuYW1lOiBOYW1lID0gXCJ1bmlvblwiO1xuZXhwb3J0IHR5cGUgRGlmZiA9IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBUYWdnZWRVbmlvblR5cGVPcHRpb25zPFQsIEsgZXh0ZW5kcyBEb2N1bWVudFR5cGU8VD4gPSBEb2N1bWVudFR5cGU8VD4+IHtcbiAgdmFyaWFudHM6IFJlYWRvbmx5QXJyYXk8Sz47XG4gIHRhZzoga2V5b2YgVDtcbn1cblxuZXhwb3J0IHR5cGUgVGVzdFdpdGhWYXJpYW50UmVzdWx0PFQ+ID1cbiAgW3RydWUsIFZlcnNpb25lZFR5cGU8VCwgYW55Pl1cbiAgfCBbZmFsc2UsIFZlcnNpb25lZFR5cGU8VCwgYW55PiB8IHVuZGVmaW5lZF07XG5cbmV4cG9ydCBjbGFzcyBUYWdnZWRVbmlvblR5cGU8VCwgSyBleHRlbmRzIERvY3VtZW50VHlwZTxUPiA9IERvY3VtZW50VHlwZTxUPj4gaW1wbGVtZW50cyBJb1R5cGU8VD4sXG4gIFRhZ2dlZFVuaW9uVHlwZU9wdGlvbnM8VCwgSz4ge1xuICByZWFkb25seSBuYW1lOiBOYW1lID0gbmFtZTtcbiAgcmVhZG9ubHkgdmFyaWFudHMhOiBSZWFkb25seUFycmF5PEs+O1xuICByZWFkb25seSB0YWchOiBrZXlvZiBUO1xuXG4gIHByaXZhdGUgX29wdGlvbnM/OiBMYXp5PFRhZ2dlZFVuaW9uVHlwZU9wdGlvbnM8VCwgSz4+O1xuXG4gIHByaXZhdGUgX291dFRhZzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgX3RhZ1R5cGU6IFRzRW51bVR5cGU8YW55PiB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIF92YWx1ZVRvVmFyaWFudE1hcDogTWFwPGFueSwgSz4gfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogTGF6eTxUYWdnZWRVbmlvblR5cGVPcHRpb25zPFQsIEs+Pikge1xuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aGlzLl9hcHBseU9wdGlvbnMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGF6eVByb3BlcnRpZXMoXG4gICAgICAgIHRoaXMsXG4gICAgICAgIHRoaXMuX2FwcGx5T3B0aW9ucyxcbiAgICAgICAgW1widmFyaWFudHNcIiwgXCJ0YWdcIl0sXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG1hdGNoKHZhbHVlOiBUKTogSyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgdGFnOiBrZXlvZiBUID0gdGhpcy50YWc7XG4gICAgY29uc3QgdGFnVmFsdWU6IGFueSA9IHZhbHVlW3RhZ107XG4gICAgaWYgKHRhZ1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAvLyB0aHJvdyBuZXcgSW5jaWRlbnQoXCJNaXNzaW5nVGFnXCIsIHt1bmlvbjogdGhpcywgdmFsdWV9KTtcbiAgICB9XG4gICAgY29uc3QgdmFyaWFudDogSyB8IHVuZGVmaW5lZCA9IHRoaXMuZ2V0VmFsdWVUb1ZhcmlhbnRNYXAoKS5nZXQodGFnVmFsdWUpOyAvLyB0YWdUb1ZhcmlhbnRcbiAgICBpZiAodmFyaWFudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgLy8gdGhyb3cgbmV3IEluY2lkZW50KFwiVmFyaWFudE5vdEZvdW5kXCIsIHt1bmlvbjogdGhpcywgdmFsdWV9KTtcbiAgICB9XG4gICAgcmV0dXJuIHZhcmlhbnQ7XG4gIH1cblxuICBtYXRjaFRydXN0ZWQodmFsdWU6IFQpOiBLIHtcbiAgICByZXR1cm4gdGhpcy5tYXRjaCh2YWx1ZSkhO1xuICB9XG5cbiAgd3JpdGU8Vz4od3JpdGVyOiBXcml0ZXI8Vz4sIHZhbHVlOiBUKTogVyB7XG4gICAgY29uc3QgdmFyaWFudDogSyB8IHVuZGVmaW5lZCA9IHRoaXMubWF0Y2godmFsdWUpO1xuICAgIGlmICh2YXJpYW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBJbmNpZGVudChcIlZhcmlhbnROb3RGb3VuZFwiLCB7dW5pb246IHRoaXMsIHZhbHVlfSk7XG4gICAgfVxuICAgIGlmICh2YXJpYW50LndyaXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBJbmNpZGVudChcIk5vdFdyaXRhYmxlXCIsIHt0eXBlOiB2YXJpYW50fSk7XG4gICAgfVxuICAgIHJldHVybiB2YXJpYW50LndyaXRlKHdyaXRlciwgdmFsdWUpO1xuICB9XG5cbiAgcmVhZDxSPihyZWFkZXI6IFJlYWRlcjxSPiwgcmF3OiBSKTogVCB7XG4gICAgcmV0dXJuIHRoaXMudmFyaWFudFJlYWQocmVhZGVyLCByYXcpWzFdO1xuICB9XG5cbiAgdmFyaWFudFJlYWQ8Uj4ocmVhZGVyOiBSZWFkZXI8Uj4sIHJhdzogUik6IFtLLCBUXSB7XG4gICAgcmV0dXJuIHJlYWRlci5yZWFkRG9jdW1lbnQocmF3LCByZWFkVmlzaXRvcih7XG4gICAgICBmcm9tTWFwOiA8UkssIFJWPihpbnB1dDogTWFwPFJLLCBSVj4sIGtleVJlYWRlcjogUmVhZGVyPFJLPiwgdmFsdWVSZWFkZXI6IFJlYWRlcjxSVj4pOiBbSywgVF0gPT4ge1xuICAgICAgICBjb25zdCBvdXRUYWc6IHN0cmluZyA9IHRoaXMuZ2V0T3V0VGFnKCk7XG4gICAgICAgIGZvciAoY29uc3QgW3Jhd0tleSwgcmF3VmFsdWVdIG9mIGlucHV0KSB7XG4gICAgICAgICAgY29uc3Qgb3V0S2V5OiBzdHJpbmcgPSBrZXlSZWFkZXIucmVhZFN0cmluZyhcbiAgICAgICAgICAgIHJhd0tleSxcbiAgICAgICAgICAgIHJlYWRWaXNpdG9yKHtmcm9tU3RyaW5nOiAoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyAgPT4gaW5wdXR9KSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChvdXRLZXkgIT09IG91dFRhZykge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHRhZ1ZhbHVlOiBhbnkgPSB0aGlzLmdldFRhZ1R5cGUoKS5yZWFkKHZhbHVlUmVhZGVyLCByYXdWYWx1ZSk7XG4gICAgICAgICAgY29uc3QgdmFyaWFudDogSyB8IHVuZGVmaW5lZCA9IHRoaXMuZ2V0VmFsdWVUb1ZhcmlhbnRNYXAoKS5nZXQodGFnVmFsdWUpOyAvLyB0YWdUb1ZhcmlhbnRcbiAgICAgICAgICBpZiAodmFyaWFudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW5jaWRlbnQoXCJWYXJpYW50Tm90Rm91bmRcIiwge3VuaW9uOiB0aGlzLCB0YWdWYWx1ZX0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gW3ZhcmlhbnQsIHZhcmlhbnQucmVhZCEocmVhZGVyLCByYXcpXTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgSW5jaWRlbnQoXCJNaXNzaW5nT3V0VGFnXCIpO1xuICAgICAgfSxcbiAgICB9KSk7XG4gIH1cblxuICB0ZXN0RXJyb3IodmFsdWU6IFQpOiBFcnJvciB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUludmFsaWRUeXBlRXJyb3IoXCJvYmplY3RcIiwgdmFsdWUpO1xuICAgIH1cbiAgICBjb25zdCB2YXJpYW50OiBLIHwgdW5kZWZpbmVkID0gdGhpcy5tYXRjaCh2YWx1ZSk7XG4gICAgaWYgKHZhcmlhbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG5ldyBJbmNpZGVudChcIlVua25vd25VbmlvblZhcmlhbnRcIiwgXCJVbmtub3duIHVuaW9uIHZhcmlhbnRcIik7XG4gICAgfVxuICAgIHJldHVybiB0ZXN0RXJyb3IodmFyaWFudCwgdmFsdWUpO1xuICB9XG5cbiAgLy8gdGVzdFdpdGhWYXJpYW50KHZhbDogVCk6IFRlc3RXaXRoVmFyaWFudFJlc3VsdDxUPiB7XG4gIC8vICAgY29uc3QgdmFyaWFudDogSyB8IHVuZGVmaW5lZCA9IHRoaXMubWF0Y2godmFsKTtcbiAgLy8gICBpZiAodmFyaWFudCA9PT0gdW5kZWZpbmVkKSB7XG4gIC8vICAgICByZXR1cm4gW2ZhbHNlIGFzIGZhbHNlLCB1bmRlZmluZWRdO1xuICAvLyAgIH1cbiAgLy8gICByZXR1cm4gW3ZhcmlhbnQudGVzdCh2YWwpLCB2YXJpYW50XSBhcyBUZXN0V2l0aFZhcmlhbnRSZXN1bHQ8VD47XG4gIC8vIH1cblxuICB0ZXN0KHZhbHVlOiBUKTogYm9vbGVhbiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB0eXBlOiBLIHwgdW5kZWZpbmVkID0gdGhpcy5tYXRjaCh2YWx1ZSk7XG4gICAgaWYgKHR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZS50ZXN0KHZhbHVlKTtcbiAgfVxuXG4gIC8vIFRPRE86IEFsd2F5cyByZXR1cm4gdHJ1ZT9cbiAgZXF1YWxzKHZhbDE6IFQsIHZhbDI6IFQpOiBib29sZWFuIHtcbiAgICBjb25zdCB0eXBlMTogSyA9IHRoaXMubWF0Y2hUcnVzdGVkKHZhbDEpO1xuICAgIGNvbnN0IHR5cGUyOiBLID0gdGhpcy5tYXRjaFRydXN0ZWQodmFsMik7XG4gICAgcmV0dXJuIHR5cGUxID09PSB0eXBlMiAmJiB0eXBlMS5lcXVhbHModmFsMSwgdmFsMik7XG4gIH1cblxuICBjbG9uZSh2YWw6IFQpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5tYXRjaFRydXN0ZWQodmFsKS5jbG9uZSh2YWwpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlPcHRpb25zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vcHRpb25zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IGNyZWF0ZUxhenlPcHRpb25zRXJyb3IodGhpcyk7XG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbnM6IFRhZ2dlZFVuaW9uVHlwZU9wdGlvbnM8VCwgSz4gPSB0eXBlb2YgdGhpcy5fb3B0aW9ucyA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IHRoaXMuX29wdGlvbnMoKVxuICAgICAgOiB0aGlzLl9vcHRpb25zO1xuICAgIGRlbGV0ZSB0aGlzLl9vcHRpb25zO1xuICAgIGNvbnN0IHZhcmlhbnRzOiBSZWFkb25seUFycmF5PEs+ID0gb3B0aW9ucy52YXJpYW50cztcbiAgICBjb25zdCB0YWc6IGtleW9mIFQgPSBvcHRpb25zLnRhZztcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHt2YXJpYW50cywgdGFnfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc2VyaWFsaXplZCBuYW1lIG9mIHRoZSB0YWcgcHJvcGVydHlcbiAgICovXG4gIHByaXZhdGUgZ2V0T3V0VGFnKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuX291dFRhZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB0YWc6IGtleW9mIFQgPSB0aGlzLnRhZztcbiAgICAgIGxldCBvdXRUYWc6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICAgIGZvciAoY29uc3QgdmFyaWFudCBvZiB0aGlzLnZhcmlhbnRzKSB7XG4gICAgICAgIGNvbnN0IGN1cjogc3RyaW5nID0gdmFyaWFudC5nZXRPdXRLZXkodGFnIGFzIGFueSk7XG4gICAgICAgIGlmIChvdXRUYWcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG91dFRhZyA9IGN1cjtcbiAgICAgICAgfSBlbHNlIGlmIChjdXIgIT09IG91dFRhZykge1xuICAgICAgICAgIHRocm93IG5ldyBJbmNpZGVudChcIk1peGVkT3V0VGFnXCIsIHt0YWcsIG91dDogW2N1ciwgb3V0VGFnXX0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAob3V0VGFnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEluY2lkZW50KFwiQXNzZXJ0aW9uRmFpbGVkXCIsIFwiRXhwZWN0ZWQgb3V0VGFnIHRvIGJlIGRlZmluZWRcIik7XG4gICAgICB9XG4gICAgICB0aGlzLl9vdXRUYWcgPSBvdXRUYWc7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9vdXRUYWc7XG4gIH1cblxuICBwcml2YXRlIGdldFRhZ1R5cGUoKTogVHNFbnVtVHlwZTxhbnk+IHtcbiAgICBpZiAodGhpcy5fdGFnVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB0YWc6IGtleW9mIFQgPSB0aGlzLnRhZztcbiAgICAgIGxldCB0YWdUeXBlOiBUc0VudW1UeXBlPGFueT4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgICBmb3IgKGNvbnN0IHZhcmlhbnQgb2YgdGhpcy52YXJpYW50cykge1xuICAgICAgICBjb25zdCBsaXQ6IExpdGVyYWxUeXBlPGFueT4gPSB2YXJpYW50LnByb3BlcnRpZXNbdGFnXS50eXBlIGFzIGFueTtcbiAgICAgICAgY29uc3QgY3VyOiBUc0VudW1UeXBlPGFueT4gPSBsaXQudHlwZSBhcyBhbnk7XG4gICAgICAgIGlmICh0YWdUeXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0YWdUeXBlID0gY3VyO1xuICAgICAgICB9IGVsc2UgaWYgKGN1ciAhPT0gdGFnVHlwZSkge1xuICAgICAgICAgIHRocm93IG5ldyBJbmNpZGVudChcIk1peGVkVGFnVHlwZVwiLCB7dGFnLCB0eXBlOiBbY3VyLCB0YWdUeXBlXX0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGFnVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBJbmNpZGVudChcIkFzc2VydGlvbkZhaWxlZFwiLCBcIkV4cGVjdGVkIHRhZ1R5cGUgdG8gYmUgZGVmaW5lZFwiKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3RhZ1R5cGUgPSB0YWdUeXBlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdGFnVHlwZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VmFsdWVUb1ZhcmlhbnRNYXAoKTogTWFwPGFueSwgSz4ge1xuICAgIGlmICh0aGlzLl92YWx1ZVRvVmFyaWFudE1hcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB0YWc6IGtleW9mIFQgPSB0aGlzLnRhZztcbiAgICAgIGNvbnN0IHZhbHVlVG9WYXJpYW50TWFwOiBNYXA8YW55LCBLPiA9IG5ldyBNYXAoKTtcbiAgICAgIGZvciAoY29uc3QgdmFyaWFudCBvZiB0aGlzLnZhcmlhbnRzKSB7XG4gICAgICAgIGNvbnN0IGxpdDogTGl0ZXJhbFR5cGU8YW55PiA9IHZhcmlhbnQucHJvcGVydGllc1t0YWddLnR5cGUgYXMgYW55O1xuICAgICAgICBpZiAodmFsdWVUb1ZhcmlhbnRNYXAuaGFzKGxpdC52YWx1ZSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgSW5jaWRlbnQoXCJEdXBsaWNhdGVUYWdWYWx1ZVwiLCB7dmFsdWU6IGxpdC52YWx1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlVG9WYXJpYW50TWFwLnNldChsaXQudmFsdWUsIHZhcmlhbnQpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlVG9WYXJpYW50TWFwID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEluY2lkZW50KFwiQXNzZXJ0aW9uRmFpbGVkXCIsIFwiRXhwZWN0ZWQgdmFsdWVUb1ZhcmlhbnRNYXAgdG8gYmUgZGVmaW5lZFwiKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3ZhbHVlVG9WYXJpYW50TWFwID0gdmFsdWVUb1ZhcmlhbnRNYXA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl92YWx1ZVRvVmFyaWFudE1hcDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
