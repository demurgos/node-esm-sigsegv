export class AnyType {
    constructor() {
    }
    read(_reader, raw) {
        return raw;
    }
    // TODO: Dynamically add with prototype?
    write(writer, value) {
        return writer.writeAny(value);
    }
    testError(value) {
        try {
            JSON.parse(JSON.stringify(value));
            return undefined;
        }
        catch (err) {
            return err;
        }
    }
    test(_value) {
        return true;
    }
    equals(val1, val2) {
        // TODO: From arg
        return val1 === val2;
    }
    clone(val) {
        return JSON.parse(JSON.stringify(val));
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdHlwZXMvYW55LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE1BQU0sT0FBTyxPQUFPO0lBQ2xCO0lBQ0EsQ0FBQztJQUVELElBQUksQ0FBSSxPQUFrQixFQUFFLEdBQU07UUFDaEMsT0FBYSxHQUFRLENBQUM7SUFDeEIsQ0FBQztJQUVELHdDQUF3QztJQUN4QyxLQUFLLENBQUksTUFBaUIsRUFBRSxLQUFRO1FBQ2xDLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQVE7UUFDaEIsSUFBSTtZQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLEdBQUcsQ0FBQztTQUNaO0lBQ0gsQ0FBQztJQUVELElBQUksQ0FBQyxNQUFTO1FBQ1osT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQU8sRUFBRSxJQUFPO1FBQ3JCLGlCQUFpQjtRQUNqQixPQUFPLElBQUksS0FBSyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFNO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQ0YiLCJmaWxlIjoibGliL3R5cGVzL2FueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElvVHlwZSwgUmVhZGVyLCBXcml0ZXIgfSBmcm9tIFwiLi4vY29yZVwiO1xuXG5leHBvcnQgdHlwZSBEaWZmID0gYW55O1xuXG5leHBvcnQgY2xhc3MgQW55VHlwZTxUID0gYW55PiBpbXBsZW1lbnRzIElvVHlwZTxUPiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgcmVhZDxSPihfcmVhZGVyOiBSZWFkZXI8Uj4sIHJhdzogUik6IFQge1xuICAgIHJldHVybiA8YW55PiByYXcgYXMgVDtcbiAgfVxuXG4gIC8vIFRPRE86IER5bmFtaWNhbGx5IGFkZCB3aXRoIHByb3RvdHlwZT9cbiAgd3JpdGU8Vz4od3JpdGVyOiBXcml0ZXI8Vz4sIHZhbHVlOiBUKTogVyB7XG4gICAgcmV0dXJuIHdyaXRlci53cml0ZUFueSh2YWx1ZSk7XG4gIH1cblxuICB0ZXN0RXJyb3IodmFsdWU6IFQpOiBFcnJvciB8IHVuZGVmaW5lZCB7XG4gICAgdHJ5IHtcbiAgICAgIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gZXJyO1xuICAgIH1cbiAgfVxuXG4gIHRlc3QoX3ZhbHVlOiBUKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBlcXVhbHModmFsMTogVCwgdmFsMjogVCk6IGJvb2xlYW4ge1xuICAgIC8vIFRPRE86IEZyb20gYXJnXG4gICAgcmV0dXJuIHZhbDEgPT09IHZhbDI7XG4gIH1cblxuICBjbG9uZSh2YWw6IFQpOiBUIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh2YWwpKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9