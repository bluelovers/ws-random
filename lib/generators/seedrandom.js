Object.defineProperty(exports, "__esModule", {
    value: !0
});

const util_1 = require("../util"), req_1 = require("../util/req"), function_1 = require("./function");

exports.defaultOptions = Object.freeze({
    entropy: !0
});

class RNGSeedRandom extends function_1.default {
    constructor(e, t, ...s) {
        super(e, t, ...s), this._seedable = !0, this._NAME = "seedrandom", this._TYPE = null;
    }
    static createLib(...e) {
        return new this(e[1], e[2], e[0], ...e.slice(3));
    }
    static create(...e) {
        return new this(...e);
    }
    _init(e, t, ...s) {
        this._opts = this._opts || Object.assign({}, exports.defaultOptions), this._seedrandom = this.__generator(...s), 
        super._init(e, t, ...s);
    }
    get name() {
        return `${this._NAME}${this._TYPE ? ":" + this._TYPE : ""}`;
    }
    __generator(e) {
        if (e && "string" == typeof e) switch (this._TYPE = null, e) {
          case "alea":
          case "tychei":
          case "xor128":
          case "xor4096":
          case "xorshift7":
          case "xorwow":
            e = req_1.tryRequire("seedrandom")[e], this._TYPE = e;
            break;

          default:
            if (-1 === e.indexOf("..") && /^[a-z\-\.]+$/i.test(e)) {
                this._TYPE = e, e = require(`seedrandom/lib/${e}`);
                break;
            }
            throw new RangeError(`unknow seedrandom lib name: ${e}`);
        } else this._TYPE = e ? e.name : null;
        return e = e || req_1.tryRequire("seedrandom");
    }
    get options() {
        return this._opts;
    }
    get state() {
        let e = this._rng.state;
        if ("function" == typeof e) return e();
    }
    seed(e, t, ...s) {
        this._opts = null === t ? void 0 : t || this._opts, this._rng = this._seedrandom(this._seedAuto(e), this._opts, ...s);
    }
    clone(e, t, ...s) {
        return util_1.cloneClass(RNGSeedRandom, this, e, t, ...s);
    }
}

exports.RNGSeedRandom = RNGSeedRandom, exports.default = RNGSeedRandom, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJ1dGlsXzEiLCJyZXF1aXJlIiwicmVxXzEiLCJmdW5jdGlvbl8xIiwiZGVmYXVsdE9wdGlvbnMiLCJmcmVlemUiLCJlbnRyb3B5IiwiUk5HU2VlZFJhbmRvbSIsImRlZmF1bHQiLCJbb2JqZWN0IE9iamVjdF0iLCJzZWVkIiwib3B0cyIsImFyZ3YiLCJzdXBlciIsInRoaXMiLCJfc2VlZGFibGUiLCJfTkFNRSIsIl9UWVBFIiwic2xpY2UiLCJfb3B0cyIsImFzc2lnbiIsIl9zZWVkcmFuZG9tIiwiX19nZW5lcmF0b3IiLCJfaW5pdCIsIm5hbWUiLCJmbiIsInRyeVJlcXVpcmUiLCJpbmRleE9mIiwidGVzdCIsIlJhbmdlRXJyb3IiLCJvcHRpb25zIiwic3RhdGUiLCJfcm5nIiwidW5kZWZpbmVkIiwiX3NlZWRBdXRvIiwiY2xvbmVDbGFzcyJdLCJtYXBwaW5ncyI6IkFBQUFBLE9BQU9DLGVBQWVDLFNBQVM7SUFBZ0JDLFFBQU87OztBQUN0RCxNQUFNQyxTQUFTQyxRQUFRLFlBQ2pCQyxRQUFRRCxRQUFRLGdCQUNoQkUsYUFBYUYsUUFBUTs7QUFDM0JILFFBQVFNLGlCQUFpQlIsT0FBT1M7SUFDNUJDLFVBQVM7OztNQUVQQyxzQkFBc0JKLFdBQVdLO0lBQ25DQyxZQUFZQyxHQUFNQyxNQUFTQztRQUN2QkMsTUFBTUgsR0FBTUMsTUFBU0MsSUFDckJFLEtBQUtDLGFBQVksR0FDakJELEtBQUtFLFFBQVEsY0FDYkYsS0FBS0csUUFBUTs7SUFFakJSLG9CQUFvQkc7UUFDaEIsT0FBTyxJQUFJRSxLQUFLRixFQUFLLElBQUlBLEVBQUssSUFBSUEsRUFBSyxPQUFPQSxFQUFLTSxNQUFNOztJQUU3RFQsaUJBQWlCRztRQUNiLE9BQU8sSUFBSUUsUUFBUUY7O0lBRXZCSCxNQUFNQyxHQUFNQyxNQUFTQztRQUNqQkUsS0FBS0ssUUFBUUwsS0FBS0ssU0FBU3ZCLE9BQU93QixXQUFXdEIsUUFBUU0saUJBQ3JEVSxLQUFLTyxjQUFjUCxLQUFLUSxlQUFlVjtRQUN2Q0MsTUFBTVUsTUFBTWIsR0FBTUMsTUFBU0M7O0lBRS9CWTtRQUNJLFVBQVVWLEtBQUtFLFFBQVFGLEtBQUtHLFFBQVEsTUFBTUgsS0FBS0csUUFBUTs7SUFFM0RSLFlBQVlnQjtRQUNSLElBQUlBLEtBQW9CLG1CQUFQQSxHQUViLFFBREFYLEtBQUtHLFFBQVEsTUFDTFE7VUFDSixLQUFLO1VBQ0wsS0FBSztVQUNMLEtBQUs7VUFDTCxLQUFLO1VBQ0wsS0FBSztVQUNMLEtBQUs7WUFDREEsSUFBS3ZCLE1BQU13QixXQUFXLGNBQWNELElBRXBDWCxLQUFLRyxRQUFRUTtZQUNiOztVQUNKO1lBQ0ksS0FBMEIsTUFBdEJBLEVBQUdFLFFBQVEsU0FBZ0IsZ0JBQWdCQyxLQUFLSCxJQUFLO2dCQUNyRFgsS0FBS0csUUFBUVEsR0FDYkEsSUFBS3hCLDBCQUEwQndCO2dCQUMvQjs7WUFHQSxNQUFNLElBQUlJLDBDQUEwQ0o7ZUFNaEVYLEtBQUtHLFFBRkFRLElBRVFBLEVBQUdELE9BR0g7UUFHakIsT0FEQUMsSUFBS0EsS0FBTXZCLE1BQU13QixXQUFXOztJQVNoQ0k7UUFDSSxPQUFPaEIsS0FBS0s7O0lBS2hCWTtRQUNJLElBQUlOLElBQUtYLEtBQUtrQixLQUFLRDtRQUNuQixJQUFrQixxQkFBUE4sR0FFUCxPQUFPQTs7SUFNZmhCLEtBQUtDLEdBQU1DLE1BQVNDO1FBRVpFLEtBQUtLLFFBREksU0FBVFIsU0FDYXNCLElBR0F0QixLQUFRRyxLQUFLSyxPQUU5QkwsS0FBS2tCLE9BQU9sQixLQUFLTyxZQUFZUCxLQUFLb0IsVUFBVXhCLElBQU9JLEtBQUtLLFVBQVVQOztJQUd0RUgsTUFBTUMsR0FBTUMsTUFBU0M7UUFDakIsT0FBT1osT0FBT21DLFdBQVc1QixlQUFlTyxNQUFNSixHQUFNQyxNQUFTQzs7OztBQUdyRWQsUUFBUVMsZ0JBQWdCQSxlQUN4QlQsUUFBUVUsVUFBVUQsZUFFbEJYLE9BQU9TLE9BQU9QIn0=