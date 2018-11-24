Object.defineProperty(exports, "__esModule", {
    value: !0
});

const ow_1 = require("../util/ow"), rng_1 = require("../rng"), util_1 = require("../util");

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
        this._rng = e || this._rng, ow_1.default(this._rng).function();
    }
    clone(e, t, ...n) {
        return util_1.cloneClass(RNGFunction, this, e, t, ...n);
    }
}

exports.RNGFunction = RNGFunction, exports.default = RNGFunction, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJvd18xIiwicmVxdWlyZSIsInJuZ18xIiwidXRpbF8xIiwiUk5HRnVuY3Rpb24iLCJkZWZhdWx0IiwiW29iamVjdCBPYmplY3RdIiwic2VlZCIsIm9wdHMiLCJhcmd2Iiwic3VwZXIiLCJ0aGlzIiwiX3NlZWRhYmxlIiwiX2luaXQiLCJuYW1lIiwic2VlZGFibGUiLCJfcm5nIiwiZnVuY3Rpb24iLCJjbG9uZUNsYXNzIiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiQUFBQUEsT0FBT0MsZUFBZUMsU0FBUztJQUFnQkMsUUFBTzs7O0FBQ3RELE1BQU1DLE9BQU9DLFFBQVEsZUFDZkMsUUFBUUQsUUFBUSxXQUNoQkUsU0FBU0YsUUFBUTs7TUFDakJHLG9CQUFvQkYsTUFBTUc7SUFDNUJDLFlBQVlDLEdBQU1DLE1BQVNDO1FBQ3ZCQyxTQUNBQyxLQUFLQyxZQUFZLE1BQ2pCRCxLQUFLRSxNQUFNTixHQUFNQyxNQUFTQzs7SUFFOUJILE1BQU1DLEdBQU1DLE1BQVNDO1FBQ2pCRSxLQUFLSixLQUFLQSxHQUFNQyxNQUFTQzs7SUFFN0JLO1FBQ0ksT0FBTzs7SUFFWEM7UUFDSSxPQUFPSixLQUFLQzs7SUFFaEJOO1FBQ0ksT0FBT0ssS0FBS0s7O0lBRWhCVixLQUFLQyxHQUFNQyxNQUFTQztRQUNoQkUsS0FBS0ssT0FBT1QsS0FBUUksS0FBS0ssTUFFekJoQixLQUFLSyxRQUFRTSxLQUFLSyxNQUFNQzs7SUFFNUJYLE1BQU1DLEdBQU1DLE1BQVNDO1FBQ2pCLE9BQU9OLE9BQU9lLFdBQVdkLGFBQWFPLE1BQU1KLEdBQU1DLE1BQVNDOzs7O0FBR25FWCxRQUFRTSxjQUFjQSxhQUN0Qk4sUUFBUU8sVUFBVUQsYUFFbEJSLE9BQU91QixPQUFPckIifQ==