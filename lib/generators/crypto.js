Object.defineProperty(exports, "__esModule", {
    value: !0
});

const array_1 = require("../util/array"), const_1 = require("../util/const"), math_1 = require("../util/math"), ow_1 = require("../util/ow"), rng_1 = require("../rng"), req_1 = require("../util/req");

class RNGCrypto extends rng_1.default {
    constructor(e, t, ...r) {
        super(), this._seedable = !1, this._randIndex = array_1.randIndex, this._seed_size = const_1.UINT32_BYTES, 
        this._seed_size_min = const_1.UINT32_BYTES, this._init(e, t, ...r);
    }
    _init(e, t, ...r) {
        e = e || req_1.tryRequire("crypto"), this._crypto = e, this._randIndex = this._randIndex || array_1.randIndex, 
        ow_1.default(e.randomBytes).is.function(), this._seed_size = Math.min(Math.max(this._seed_size, const_1.UINT32_BYTES), 255), 
        this._seed_size_min = Math.min(Math.max(this._seed_size_min, const_1.UINT32_BYTES), 255), 
        this._fn = math_1._floatFromBuffer2;
    }
    _buffer(e, t = this._seed_size_min) {
        (e = 0 | (e || this._seed_size)) < t ? e = t : e > 255 && (e = 255);
        let r = this._crypto.randomBytes(e);
        if (e > t) {
            let s = this._randIndex(e - t);
            r = r.slice(s, s + t);
        }
        return r;
    }
    get name() {
        return "crypto";
    }
    next() {
        return this._fn(this._buffer());
    }
    seed(e, t, ...r) {}
}

exports.RNGCrypto = RNGCrypto, exports.default = RNGCrypto;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJhcnJheV8xIiwicmVxdWlyZSIsImNvbnN0XzEiLCJtYXRoXzEiLCJvd18xIiwicm5nXzEiLCJyZXFfMSIsIlJOR0NyeXB0byIsImRlZmF1bHQiLCJbb2JqZWN0IE9iamVjdF0iLCJzZWVkIiwib3B0cyIsImFyZ3YiLCJzdXBlciIsInRoaXMiLCJfc2VlZGFibGUiLCJfcmFuZEluZGV4IiwicmFuZEluZGV4IiwiX3NlZWRfc2l6ZSIsIlVJTlQzMl9CWVRFUyIsIl9zZWVkX3NpemVfbWluIiwiX2luaXQiLCJjcnlwdG8iLCJ0cnlSZXF1aXJlIiwiX2NyeXB0byIsInJhbmRvbUJ5dGVzIiwiaXMiLCJmdW5jdGlvbiIsIk1hdGgiLCJtaW4iLCJtYXgiLCJfZm4iLCJfZmxvYXRGcm9tQnVmZmVyMiIsInNpemUiLCJzaXplX21pbiIsImJ1ZiIsImkiLCJzbGljZSIsIm5hbWUiLCJfYnVmZmVyIl0sIm1hcHBpbmdzIjoiQUFBQUEsT0FBT0MsZUFBZUMsU0FBUztJQUFnQkMsUUFBTzs7O0FBQ3RELE1BQU1DLFVBQVVDLFFBQVEsa0JBQ2xCQyxVQUFVRCxRQUFRLGtCQUNsQkUsU0FBU0YsUUFBUSxpQkFDakJHLE9BQU9ILFFBQVEsZUFDZkksUUFBUUosUUFBUSxXQUNoQkssUUFBUUwsUUFBUTs7TUFDaEJNLGtCQUFrQkYsTUFBTUc7SUFDMUJDLFlBQVlDLEdBQU1DLE1BQVNDO1FBQ3ZCQyxTQUNBQyxLQUFLQyxhQUFZLEdBQ2pCRCxLQUFLRSxhQUFhaEIsUUFBUWlCLFdBQzFCSCxLQUFLSSxhQUFhaEIsUUFBUWlCO1FBQzFCTCxLQUFLTSxpQkFBaUJsQixRQUFRaUIsY0FDOUJMLEtBQUtPLE1BQU1YLEdBQU1DLE1BQVNDOztJQUU5QkgsTUFBTWEsR0FBUVgsTUFBU0M7UUFDbkJVLElBQVNBLEtBQVVoQixNQUFNaUIsV0FBVyxXQUNwQ1QsS0FBS1UsVUFBVUYsR0FDZlIsS0FBS0UsYUFBYUYsS0FBS0UsY0FBY2hCLFFBQVFpQjtRQUM3Q2IsS0FBS0ksUUFBUWMsRUFBT0csYUFBYUMsR0FBR0MsWUFFaENiLEtBQUtJLGFBQWFVLEtBQUtDLElBQUlELEtBQUtFLElBQUloQixLQUFLSSxZQUFZaEIsUUFBUWlCLGVBQWU7UUFDNUVMLEtBQUtNLGlCQUFpQlEsS0FBS0MsSUFBSUQsS0FBS0UsSUFBSWhCLEtBQUtNLGdCQUFnQmxCLFFBQVFpQixlQUFlO1FBQ3BGTCxLQUFLaUIsTUFBTTVCLE9BQU82Qjs7SUFRMUJ2QixRQUFRd0IsR0FBTUMsSUFBV3BCLEtBQUtNO1NBQzFCYSxJQUFtQyxLQUEzQkEsS0FBUW5CLEtBQUtJLGVBQ1ZnQixJQUNQRCxJQUFPQyxJQUVGRCxJQUFPLFFBQ1pBLElBQU87UUFFWCxJQUFJRSxJQUFNckIsS0FBS1UsUUFBUUMsWUFBWVE7UUFDbkMsSUFBSUEsSUFBT0MsR0FBVTtZQUNqQixJQUFJRSxJQUFJdEIsS0FBS0UsV0FBV2lCLElBQU9DO1lBRS9CQyxJQUFNQSxFQUFJRSxNQUFNRCxHQUFHQSxJQUFJRjs7UUFFM0IsT0FBT0M7O0lBRVhHO1FBQ0ksT0FBTzs7SUFFWDdCO1FBQ0ksT0FBT0ssS0FBS2lCLElBQUlqQixLQUFLeUI7O0lBRXpCOUIsS0FBS0MsR0FBTUMsTUFBU0M7OztBQUd4QmQsUUFBUVMsWUFBWUEsV0FDcEJULFFBQVFVLFVBQVVEIn0=