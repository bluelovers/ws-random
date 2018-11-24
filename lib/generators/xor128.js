Object.defineProperty(exports, "__esModule", {
    value: !0
});

const rng_1 = require("../rng"), util_1 = require("../util");

class RNGXOR128 extends rng_1.default {
    constructor(...t) {
        super(), this._init(...t), this.seed(this.x);
    }
    get name() {
        return "xor128";
    }
    get seedable() {
        return !0;
    }
    next() {
        const t = this.x ^ this.x << 1;
        return this.x = this.y, this.y = this.z, this.z = this.w, this.w = this.w ^ this.w >>> 19 ^ t ^ t >>> 8, 
        (this.w >>> 0) / 4294967296;
    }
    seed(t, e, ...s) {
        this._seed(t, e, ...s);
        for (let t = 0; t < 64; ++t) this.next();
    }
    clone(t, e, ...s) {
        return util_1.cloneClass(RNGXOR128, this, t, e, ...s);
    }
    _init(...t) {
        let [e = util_1.randomSeedNum(), s = util_1.randomSeedNum(), i = util_1.randomSeedNum(), r = util_1.randomSeedNum()] = t;
        this._seed(e, s, i, r);
    }
    _seed(...t) {
        let [e = this.x, s = this.y, i = this.z, r = this.w] = t;
        "number" != typeof e && (e = this._seedNum(e) || this.x), "number" != typeof s && (s = this.y), 
        "number" != typeof i && (i = this.z), "number" != typeof e && (r = this.w), this.x = e, 
        this.y = s, this.z = i, this.w = r;
    }
}

exports.RNGXOR128 = RNGXOR128, exports.default = RNGXOR128, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJybmdfMSIsInJlcXVpcmUiLCJ1dGlsXzEiLCJSTkdYT1IxMjgiLCJkZWZhdWx0IiwiW29iamVjdCBPYmplY3RdIiwiYXJndiIsInN1cGVyIiwidGhpcyIsIl9pbml0Iiwic2VlZCIsIngiLCJuYW1lIiwic2VlZGFibGUiLCJ0IiwieSIsInoiLCJ3Iiwib3B0cyIsIl9zZWVkIiwiaSIsIm5leHQiLCJjbG9uZUNsYXNzIiwicmFuZG9tU2VlZE51bSIsIl9zZWVkTnVtIiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiQUFBQUEsT0FBT0MsZUFBZUMsU0FBUztJQUFnQkMsUUFBTzs7O0FBQ3RELE1BQU1DLFFBQVFDLFFBQVEsV0FDaEJDLFNBQVNELFFBQVE7O01BQ2pCRSxrQkFBa0JILE1BQU1JO0lBQzFCQyxlQUFlQztRQUNYQyxTQUNBQyxLQUFLQyxTQUFTSCxJQUNkRSxLQUFLRSxLQUFLRixLQUFLRzs7SUFFbkJDO1FBQ0ksT0FBTzs7SUFFWEM7UUFDSSxRQUFPOztJQUVYUjtRQUNJLE1BQU1TLElBQUlOLEtBQUtHLElBQUtILEtBQUtHLEtBQUs7UUFLOUIsT0FKQUgsS0FBS0csSUFBSUgsS0FBS08sR0FDZFAsS0FBS08sSUFBSVAsS0FBS1EsR0FDZFIsS0FBS1EsSUFBSVIsS0FBS1MsR0FDZFQsS0FBS1MsSUFBSVQsS0FBS1MsSUFBTVQsS0FBS1MsTUFBTSxLQUFNSCxJQUFLQSxNQUFNO1NBQ3hDTixLQUFLUyxNQUFNLEtBQUs7O0lBRTVCWixLQUFLSyxHQUFNUSxNQUFTWjtRQUVoQkUsS0FBS1csTUFBTVQsR0FBTVEsTUFBU1o7UUFFMUIsS0FBSyxJQUFJYyxJQUFJLEdBQUdBLElBQUksTUFBTUEsR0FDdEJaLEtBQUthOztJQUdiaEIsTUFBTUssR0FBTVEsTUFBU1o7UUFDakIsT0FBT0osT0FBT29CLFdBQVduQixXQUFXSyxNQUFNRSxHQUFNUSxNQUFTWjs7SUFFN0RELFNBQVNDO1FBQ0wsS0FBS0ssSUFBSVQsT0FBT3FCLGlCQUFpQlIsSUFBSWIsT0FBT3FCLGlCQUFpQlAsSUFBSWQsT0FBT3FCLGlCQUFpQk4sSUFBSWYsT0FBT3FCLG1CQUFvQmpCO1FBQ3hIRSxLQUFLVyxNQUFNUixHQUFHSSxHQUFHQyxHQUFHQzs7SUFFeEJaLFNBQVNDO1FBQ0wsS0FBS0ssSUFBSUgsS0FBS0csR0FBR0ksSUFBSVAsS0FBS08sR0FBR0MsSUFBSVIsS0FBS1EsR0FBR0MsSUFBSVQsS0FBS1MsS0FBTVg7UUFDdkMsbUJBQU5LLE1BQ1BBLElBQUlILEtBQUtnQixTQUFTYixNQUFNSCxLQUFLRyxJQUVoQixtQkFBTkksTUFDUEEsSUFBSVAsS0FBS087UUFFSSxtQkFBTkMsTUFDUEEsSUFBSVIsS0FBS1EsSUFFSSxtQkFBTkwsTUFDUE0sSUFBSVQsS0FBS1MsSUFFYlQsS0FBS0csSUFBSUE7UUFDVEgsS0FBS08sSUFBSUEsR0FDVFAsS0FBS1EsSUFBSUEsR0FDVFIsS0FBS1MsSUFBSUE7Ozs7QUFHakJuQixRQUFRSyxZQUFZQSxXQUNwQkwsUUFBUU0sVUFBVUQsV0FFbEJQLE9BQU82QixPQUFPM0IifQ==