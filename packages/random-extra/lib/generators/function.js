Object.defineProperty(exports, "__esModule", {
    value: !0
});

const rng_1 = require("../rng"), util_1 = require("../util");

class RNGFunction extends rng_1.default {
    constructor(e, t, ...n) {
        super(), this._seedable = null, this._init(e, t, ...n);
    }
    _init(e, t, ...n) {
        this.seed(e, t, ...n);
    }
    get name() {
        return "function";
    }
    get seedable() {
        return this._seedable;
    }
    next() {
        return this._rng();
    }
    seed(e, t, ...n) {
        "function" == typeof e && (this._rng = e || this._rng);
    }
    clone(e, t, ...n) {
        return util_1.cloneClass(RNGFunction, this, e, t, ...n);
    }
}

exports.RNGFunction = RNGFunction, exports.default = RNGFunction, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJybmdfMSIsInJlcXVpcmUiLCJ1dGlsXzEiLCJSTkdGdW5jdGlvbiIsImRlZmF1bHQiLCJbb2JqZWN0IE9iamVjdF0iLCJzZWVkIiwib3B0cyIsImFyZ3YiLCJzdXBlciIsInRoaXMiLCJfc2VlZGFibGUiLCJfaW5pdCIsIm5hbWUiLCJzZWVkYWJsZSIsIl9ybmciLCJjbG9uZUNsYXNzIiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiQUFBQUEsT0FBT0MsZUFBZUMsU0FBUztJQUFnQkMsUUFBTzs7O0FBQ3RELE1BQU1DLFFBQVFDLFFBQVEsV0FDaEJDLFNBQVNELFFBQVE7O01BQ2pCRSxvQkFBb0JILE1BQU1JO0lBQzVCQyxZQUFZQyxHQUFNQyxNQUFTQztRQUN2QkMsU0FDQUMsS0FBS0MsWUFBWSxNQUNqQkQsS0FBS0UsTUFBTU4sR0FBTUMsTUFBU0M7O0lBRTlCSCxNQUFNQyxHQUFNQyxNQUFTQztRQUNqQkUsS0FBS0osS0FBS0EsR0FBTUMsTUFBU0M7O0lBRTdCSztRQUNJLE9BQU87O0lBRVhDO1FBQ0ksT0FBT0osS0FBS0M7O0lBRWhCTjtRQUNJLE9BQU9LLEtBQUtLOztJQUVoQlYsS0FBS0MsR0FBTUMsTUFBU0M7UUFDSSxxQkFBVEYsTUFDUEksS0FBS0ssT0FBT1QsS0FBUUksS0FBS0s7O0lBS2pDVixNQUFNQyxHQUFNQyxNQUFTQztRQUNqQixPQUFPTixPQUFPYyxXQUFXYixhQUFhTyxNQUFNSixHQUFNQyxNQUFTQzs7OztBQUduRVYsUUFBUUssY0FBY0EsYUFDdEJMLFFBQVFNLFVBQVVELGFBRWxCUCxPQUFPcUIsT0FBT25CIn0=