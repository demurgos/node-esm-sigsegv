"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lazy_properties_1 = require("../_helpers/lazy-properties");
const lazy_options_1 = require("../errors/lazy-options");
exports.name = "custom";
class CustomType {
    constructor(options) {
        this.name = exports.name;
        this._options = options;
        if (typeof options !== "function") {
            this._applyOptions();
        }
        else {
            lazy_properties_1.lazyProperties(this, this._applyOptions, ["read", "write", "testError", "equals", "clone"]);
        }
    }
    test(val) {
        return this.testError(val) === undefined;
    }
    _applyOptions() {
        if (this._options === undefined) {
            throw lazy_options_1.createLazyOptionsError(this);
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
exports.CustomType = CustomType;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdHlwZXMvY3VzdG9tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUVBQTZEO0FBRTdELHlEQUFnRTtBQUduRCxRQUFBLElBQUksR0FBUyxRQUFRLENBQUM7QUFnQm5DLE1BQWEsVUFBVTtJQVVyQixZQUFZLE9BQW1DO1FBVHRDLFNBQUksR0FBUyxZQUFJLENBQUM7UUFVekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxPQUFPLE9BQU8sS0FBSyxVQUFVLEVBQUU7WUFDakMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO2FBQU07WUFDTCxnQ0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDN0Y7SUFDSCxDQUFDO0lBRUQsSUFBSSxDQUFDLEdBQU07UUFDVCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFDO0lBQzNDLENBQUM7SUFFTyxhQUFhO1FBQ25CLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDL0IsTUFBTSxxQ0FBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQztRQUNELE1BQU0sT0FBTyxHQUF5QixPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDNUcsTUFBTSxDQUFDLE1BQU0sQ0FDWCxJQUFJLEVBQ0o7WUFDRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7WUFDbEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1lBQ3BCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztZQUM1QixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDdEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1NBQ3JCLENBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXZDRCxnQ0F1Q0MiLCJmaWxlIjoibGliL3R5cGVzL2N1c3RvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxhenlQcm9wZXJ0aWVzIH0gZnJvbSBcIi4uL19oZWxwZXJzL2xhenktcHJvcGVydGllc1wiO1xuaW1wb3J0IHsgTGF6eSwgUmVhZGVyLCBUeXBlLCBXcml0ZXIgfSBmcm9tIFwiLi4vY29yZVwiO1xuaW1wb3J0IHsgY3JlYXRlTGF6eU9wdGlvbnNFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvbGF6eS1vcHRpb25zXCI7XG5cbmV4cG9ydCB0eXBlIE5hbWUgPSBcImN1c3RvbVwiO1xuZXhwb3J0IGNvbnN0IG5hbWU6IE5hbWUgPSBcImN1c3RvbVwiO1xuXG5leHBvcnQgdHlwZSBSZWFkPFQ+ID0gPFI+KHJlYWRlcjogUmVhZGVyPFI+LCByYXc6IFIpID0+IFQ7XG5leHBvcnQgdHlwZSBXcml0ZTxUPiA9IDxXPih3cml0ZXI6IFdyaXRlcjxXPiwgdmFsdWU6IFQpID0+IFc7XG5leHBvcnQgdHlwZSBUZXN0RXJyb3I8VD4gPSAodmFsOiBUKSA9PiBFcnJvciB8IHVuZGVmaW5lZDtcbmV4cG9ydCB0eXBlIEVxdWFsczxUPiA9ICh2YWwxOiBULCB2YWwyOiBUKSA9PiBib29sZWFuO1xuZXhwb3J0IHR5cGUgQ2xvbmU8VD4gPSAodmFsOiBUKSA9PiBUO1xuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVR5cGVPcHRpb25zPFQ+IHtcbiAgcmVhZDogUmVhZDxUPjtcbiAgd3JpdGU6IFdyaXRlPFQ+O1xuICB0ZXN0RXJyb3I6IFRlc3RFcnJvcjxUPjtcbiAgZXF1YWxzOiBFcXVhbHM8VD47XG4gIGNsb25lOiBDbG9uZTxUPjtcbn1cblxuZXhwb3J0IGNsYXNzIEN1c3RvbVR5cGU8VD4gaW1wbGVtZW50cyBUeXBlPFQ+IHtcbiAgcmVhZG9ubHkgbmFtZTogTmFtZSA9IG5hbWU7XG4gIHJlYWRvbmx5IHJlYWQhOiBSZWFkPFQ+O1xuICByZWFkb25seSB3cml0ZSE6IFdyaXRlPFQ+O1xuICByZWFkb25seSB0ZXN0RXJyb3IhOiBUZXN0RXJyb3I8VD47XG4gIHJlYWRvbmx5IGVxdWFscyE6IEVxdWFsczxUPjtcbiAgcmVhZG9ubHkgY2xvbmUhOiBDbG9uZTxUPjtcblxuICBwcml2YXRlIF9vcHRpb25zPzogTGF6eTxDdXN0b21UeXBlT3B0aW9uczxUPj47XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogTGF6eTxDdXN0b21UeXBlT3B0aW9uczxUPj4pIHtcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5fYXBwbHlPcHRpb25zKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhenlQcm9wZXJ0aWVzKHRoaXMsIHRoaXMuX2FwcGx5T3B0aW9ucywgW1wicmVhZFwiLCBcIndyaXRlXCIsIFwidGVzdEVycm9yXCIsIFwiZXF1YWxzXCIsIFwiY2xvbmVcIl0pO1xuICAgIH1cbiAgfVxuXG4gIHRlc3QodmFsOiBUKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudGVzdEVycm9yKHZhbCkgPT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgX2FwcGx5T3B0aW9ucygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBjcmVhdGVMYXp5T3B0aW9uc0Vycm9yKHRoaXMpO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zOiBDdXN0b21UeXBlT3B0aW9uczxUPiA9IHR5cGVvZiB0aGlzLl9vcHRpb25zID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzLl9vcHRpb25zKCkgOiB0aGlzLl9vcHRpb25zO1xuICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICB0aGlzLFxuICAgICAge1xuICAgICAgICByZWFkOiBvcHRpb25zLnJlYWQsXG4gICAgICAgIHdyaXRlOiBvcHRpb25zLndyaXRlLFxuICAgICAgICB0ZXN0RXJyb3I6IG9wdGlvbnMudGVzdEVycm9yLFxuICAgICAgICBlcXVhbHM6IG9wdGlvbnMuZXF1YWxzLFxuICAgICAgICBjbG9uZTogb3B0aW9ucy5jbG9uZSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
