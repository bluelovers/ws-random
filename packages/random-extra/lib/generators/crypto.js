Object.defineProperty(exports, "__esModule", {
    value: !0
});

const array_1 = require("../util/array"), const_1 = require("../util/const"), crypto_1 = require("../util/crypto"), math_1 = require("../util/math"), ow_1 = require("../util/ow"), rng_1 = require("../rng");

class RNGCrypto extends rng_1.default {
    constructor(e, t, ...r) {
        super(), this._seedable = !1, this._randIndex = array_1.randIndex, this._seed_size = const_1.UINT32_BYTES, 
        this._seed_size_min = const_1.UINT32_BYTES, this._init(e, t, ...r);
    }
    _init(e, t, ...r) {
        e = e || crypto_1.crossCrypto(), this._crypto = e, this._randIndex = this._randIndex || array_1.randIndex, 
        ow_1.default(e.randomBytes).is.a.function(), this._seed_size = Math.min(Math.max(this._seed_size, const_1.UINT32_BYTES), 255), 
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJhcnJheV8xIiwicmVxdWlyZSIsImNvbnN0XzEiLCJjcnlwdG9fMSIsIm1hdGhfMSIsIm93XzEiLCJybmdfMSIsIlJOR0NyeXB0byIsImRlZmF1bHQiLCJbb2JqZWN0IE9iamVjdF0iLCJzZWVkIiwib3B0cyIsImFyZ3YiLCJzdXBlciIsInRoaXMiLCJfc2VlZGFibGUiLCJfcmFuZEluZGV4IiwicmFuZEluZGV4IiwiX3NlZWRfc2l6ZSIsIlVJTlQzMl9CWVRFUyIsIl9zZWVkX3NpemVfbWluIiwiX2luaXQiLCJjcnlwdG8iLCJjcm9zc0NyeXB0byIsIl9jcnlwdG8iLCJyYW5kb21CeXRlcyIsImlzIiwiYSIsImZ1bmN0aW9uIiwiTWF0aCIsIm1pbiIsIm1heCIsIl9mbiIsIl9mbG9hdEZyb21CdWZmZXIyIiwic2l6ZSIsInNpemVfbWluIiwiYnVmIiwiaSIsInNsaWNlIiwibmFtZSIsIl9idWZmZXIiXSwibWFwcGluZ3MiOiJBQUFBQSxPQUFPQyxlQUFlQyxTQUFTO0lBQWdCQyxRQUFPOzs7QUFDdEQsTUFBTUMsVUFBVUMsUUFBUSxrQkFDbEJDLFVBQVVELFFBQVEsa0JBQ2xCRSxXQUFXRixRQUFRLG1CQUNuQkcsU0FBU0gsUUFBUSxpQkFDakJJLE9BQU9KLFFBQVEsZUFDZkssUUFBUUwsUUFBUTs7TUFDaEJNLGtCQUFrQkQsTUFBTUU7SUFDMUJDLFlBQVlDLEdBQU1DLE1BQVNDO1FBQ3ZCQyxTQUNBQyxLQUFLQyxhQUFZLEdBQ2pCRCxLQUFLRSxhQUFhaEIsUUFBUWlCLFdBQzFCSCxLQUFLSSxhQUFhaEIsUUFBUWlCO1FBQzFCTCxLQUFLTSxpQkFBaUJsQixRQUFRaUIsY0FDOUJMLEtBQUtPLE1BQU1YLEdBQU1DLE1BQVNDOztJQUU5QkgsTUFBTWEsR0FBUVgsTUFBU0M7UUFDbkJVLElBQVNBLEtBQVVuQixTQUFTb0IsZUFDNUJULEtBQUtVLFVBQVVGLEdBQ2ZSLEtBQUtFLGFBQWFGLEtBQUtFLGNBQWNoQixRQUFRaUI7UUFDN0NaLEtBQUtHLFFBQVFjLEVBQU9HLGFBQWFDLEdBQUdDLEVBQUVDLFlBRWxDZCxLQUFLSSxhQUFhVyxLQUFLQyxJQUFJRCxLQUFLRSxJQUFJakIsS0FBS0ksWUFBWWhCLFFBQVFpQixlQUFlO1FBQzVFTCxLQUFLTSxpQkFBaUJTLEtBQUtDLElBQUlELEtBQUtFLElBQUlqQixLQUFLTSxnQkFBZ0JsQixRQUFRaUIsZUFBZTtRQUNwRkwsS0FBS2tCLE1BQU01QixPQUFPNkI7O0lBUTFCeEIsUUFBUXlCLEdBQU1DLElBQVdyQixLQUFLTTtTQUMxQmMsSUFBbUMsS0FBM0JBLEtBQVFwQixLQUFLSSxlQUNWaUIsSUFDUEQsSUFBT0MsSUFFRkQsSUFBTyxRQUNaQSxJQUFPO1FBRVgsSUFBSUUsSUFBTXRCLEtBQUtVLFFBQVFDLFlBQVlTO1FBQ25DLElBQUlBLElBQU9DLEdBQVU7WUFDakIsSUFBSUUsSUFBSXZCLEtBQUtFLFdBQVdrQixJQUFPQztZQUUvQkMsSUFBTUEsRUFBSUUsTUFBTUQsR0FBR0EsSUFBSUY7O1FBRTNCLE9BQU9DOztJQUVYRztRQUNJLE9BQU87O0lBRVg5QjtRQUNJLE9BQU9LLEtBQUtrQixJQUFJbEIsS0FBSzBCOztJQUV6Qi9CLEtBQUtDLEdBQU1DLE1BQVNDOzs7QUFHeEJkLFFBQVFTLFlBQVlBLFdBQ3BCVCxRQUFRVSxVQUFVRCJ9