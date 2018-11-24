var __decorate = this && this.__decorate || function(t, r, e, i) {
    var n = arguments.length, s = n < 3 ? r : null === i ? i = Object.getOwnPropertyDescriptor(r, e) : i, o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, r, e, i); else for (var u = t.length - 1; u >= 0; u--) (o = t[u]) && (s = (n < 3 ? o(s) : n > 3 ? o(r, e, s) : o(r, e)) || s);
    return n > 3 && s && Object.defineProperty(r, e, s), s;
}, Random_1;

Object.defineProperty(exports, "__esModule", {
    value: !0
});

const ow_1 = require("./util/ow"), distributions_1 = require("./distributions"), rng_1 = require("./rng"), rng_factory_1 = require("./rng-factory"), util_1 = require("./util"), core_decorators_1 = require("core-decorators");

let Random = Random_1 = class Random {
    constructor(t) {
        this._cache = {}, t && ow_1.expect(t).instanceof(rng_1.default), this.use(t);
    }
    get rng() {
        return this._rng;
    }
    get seedable() {
        return this._rng.seedable;
    }
    get random() {
        return this.next;
    }
    get rand() {
        return this.next;
    }
    seed(...t) {
        return this._rng.seed(...t), this;
    }
    get srandom() {
        return this.srand;
    }
    srand(...t) {
        return this.seed(...t).next();
    }
    clone(t, ...r) {
        let e;
        return new (e = this instanceof Random_1 ? this.__proto__.constructor : Random_1)(this.rng.clone(t, ...r));
    }
    use(t, ...r) {
        return this._rng = rng_factory_1.default(t, ...r), this;
    }
    newUse(t, ...r) {
        let e;
        return new (util_1.getClass(Random_1, this))(rng_factory_1.default(t, ...r));
    }
    cloneUse(t, ...r) {
        let e = this.clone();
        return e.use(t, ...r), e;
    }
    patch() {
        if (this._patch) throw new Error("Math.random already patched");
        this._patch = Math.random, Math.random = this.dfUniform();
    }
    unpatch() {
        this._patch && (Math.random = this._patch, delete this._patch);
    }
    next() {
        return this._rng.next();
    }
    float(t, r, e) {
        return this.dfUniform(t, r, e)();
    }
    int(t = 100, r) {
        return this.dfUniformInt(t, r)();
    }
    integer(t, r) {
        return this.int(t, r);
    }
    bool(t) {
        return this.boolean(t);
    }
    boolean(t) {
        return this.dfUniformBoolean(t)();
    }
    byte(t) {
        return this.dfByte(t)();
    }
    dfByte(t) {
        return this._memoize("byte", distributions_1.Distributions.byte, t);
    }
    bytes(t = 1, r) {
        return this.dfBytes(t, r)();
    }
    dfBytes(t = 1, r) {
        return this._memoize("bytes", distributions_1.Distributions.bytes, t, r);
    }
    randomBytes(t) {
        return Buffer.from(this.bytes(t));
    }
    dfRandomBytes(t) {
        let r = this.dfBytes(t), e = () => () => Buffer.from(r());
        return this._memoize("dfRandomBytes", e, t);
    }
    charID(t, r) {
        return distributions_1.Distributions.charID(this, t, r)();
    }
    dfCharID(t, r) {
        return this._memoize("dfCharID", distributions_1.Distributions.charID, t, r);
    }
    uuidv4(t) {
        return this.dfUuidv4(t)();
    }
    dfUuidv4(t) {
        return this._memoize("uuidv4", distributions_1.Distributions.uuidv4, t);
    }
    arrayIndex(t, r = 1, e = 0, i) {
        return this.dfArrayIndex(t, r, e, i)();
    }
    dfArrayIndex(t, r = 1, e = 0, i) {
        return this._memoizeFake("dfArrayIndex", distributions_1.Distributions.arrayIndex, t, r, e, i);
    }
    arrayItem(t, r = 1, e = 0, i) {
        let n;
        return this.arrayIndex(t, r, e, i).reduce(function(r, e) {
            return r.push(t[e]), r;
        }, []);
    }
    arrayShuffle(t, r, e) {
        return this._memoizeFake("dfArrayShuffle", distributions_1.Distributions.arrayShuffle)(t, r, e);
    }
    arrayUnique(t, r, e, i, n) {
        return this.dfArrayUnique(t, r, e, i, n)();
    }
    dfArrayUnique(t, r, e, i, n) {
        return distributions_1.Distributions.arrayUnique(this, t, r, e, i, n);
    }
    dfUniform(t, r, e) {
        return this._memoize("dfUniform", distributions_1.Distributions.uniform, t, r, e);
    }
    dfUniformInt(t, r) {
        return this._memoize("dfUniformInt", distributions_1.Distributions.uniformInt, t, r);
    }
    dfUniformBoolean(t) {
        return this._memoize("dfUniformBoolean", distributions_1.Distributions.uniformBoolean, t);
    }
    dfNormal(t, r) {
        return distributions_1.Distributions.normal(this, t, r);
    }
    dfLogNormal(t, r) {
        return distributions_1.Distributions.logNormal(this, t, r);
    }
    dfBernoulli(t) {
        return distributions_1.Distributions.bernoulli(this, t);
    }
    dfBinomial(t, r) {
        return distributions_1.Distributions.binomial(this, t, r);
    }
    dfGeometric(t) {
        return distributions_1.Distributions.geometric(this, t);
    }
    dfPoisson(t) {
        return distributions_1.Distributions.poisson(this, t);
    }
    dfExponential(t) {
        return distributions_1.Distributions.exponential(this, t);
    }
    dfIrwinHall(t = 1) {
        return distributions_1.Distributions.irwinHall(this, t);
    }
    dfBates(t = 1) {
        return distributions_1.Distributions.bates(this, t);
    }
    dfPareto(t = 1) {
        return distributions_1.Distributions.pareto(this, t);
    }
    itemByWeight(t, r, e, i, ...n) {
        return this.dfItemByWeight(t, r, e, i, ...n)();
    }
    dfItemByWeight(t, r, e, i, ...n) {
        return this._callDistributions(distributions_1.Distributions.itemByWeight, t, r, e, i, ...n);
    }
    sumInt(t, r, e, i, n) {
        return this.dfSumInt(t, r, e, i, n)();
    }
    dfSumInt(t, r, e, i, n) {
        return this._memoize("sumInt", distributions_1.Distributions.sumInt, t, r, e, i, n);
    }
    sumFloat(t, r, e, i, n) {
        return this.dfSumFloat(t, r, e, i, n)();
    }
    dfSumFloat(t, r, e, i, n) {
        return this._memoize("sumFloat", distributions_1.Distributions.sumFloat, t, r, e, i, n);
    }
    _memoize(t, r, ...e) {
        const i = util_1.hashArgv(e);
        let n = this._cache[t];
        return void 0 !== n && n.key === i || (n = {
            key: i,
            distribution: r(this, ...e)
        }, this._cache[t] = n), n.distribution;
    }
    _memoizeFake(t, r, ...e) {
        return r(this, ...e);
    }
    _callDistributions(t, ...r) {
        return t(this, ...r);
    }
    reset() {
        return this._cache = {}, this;
    }
    get [Symbol.toStringTag]() {
        return this._rng.name;
    }
};

__decorate([ core_decorators_1.deprecate("not recommended use") ], Random.prototype, "patch", null), 
__decorate([ core_decorators_1.deprecate("not recommended use") ], Random.prototype, "unpatch", null), 
Random = Random_1 = __decorate([ core_decorators_1.autobind ], Random), exports.Random = Random, 
exports.random = new Random(), Object.defineProperty(exports.random, "default", {
    configurable: !1,
    enumerable: !1,
    get: () => exports.random
}), Object.defineProperty(Random, "default", {
    configurable: !1,
    enumerable: !1,
    get: () => exports.random
}), exports.default = exports.random, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiX19kZWNvcmF0ZSIsInRoaXMiLCJkZWNvcmF0b3JzIiwidGFyZ2V0Iiwia2V5IiwiZGVzYyIsImMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJyIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZCIsIlJlZmxlY3QiLCJkZWNvcmF0ZSIsImkiLCJkZWZpbmVQcm9wZXJ0eSIsIlJhbmRvbV8xIiwiZXhwb3J0cyIsInZhbHVlIiwib3dfMSIsInJlcXVpcmUiLCJkaXN0cmlidXRpb25zXzEiLCJybmdfMSIsInJuZ19mYWN0b3J5XzEiLCJ1dGlsXzEiLCJjb3JlX2RlY29yYXRvcnNfMSIsIlJhbmRvbSIsIltvYmplY3QgT2JqZWN0XSIsInJuZyIsIl9jYWNoZSIsImV4cGVjdCIsImluc3RhbmNlb2YiLCJkZWZhdWx0IiwidXNlIiwiX3JuZyIsInNlZWRhYmxlIiwicmFuZG9tIiwibmV4dCIsInJhbmQiLCJhcmd2Iiwic2VlZCIsInNyYW5kb20iLCJzcmFuZCIsImFyZ3MiLCJvIiwiX19wcm90b19fIiwiY2xvbmUiLCJhcmcwIiwiZ2V0Q2xhc3MiLCJfcGF0Y2giLCJFcnJvciIsIk1hdGgiLCJkZlVuaWZvcm0iLCJtaW4iLCJtYXgiLCJmcmFjdGlvbkRpZ2l0cyIsImRmVW5pZm9ybUludCIsImludCIsImxpa2VsaWhvb2QiLCJib29sZWFuIiwiZGZVbmlmb3JtQm9vbGVhbiIsInRvU3RyIiwiZGZCeXRlIiwiX21lbW9pemUiLCJEaXN0cmlidXRpb25zIiwiYnl0ZSIsInNpemUiLCJkZkJ5dGVzIiwiYnl0ZXMiLCJCdWZmZXIiLCJmcm9tIiwiZm4iLCJ3YXJwIiwiY2hhciIsImNoYXJJRCIsInRvVXBwZXJDYXNlIiwiZGZVdWlkdjQiLCJ1dWlkdjQiLCJhcnIiLCJzdGFydCIsImVuZCIsImRmQXJyYXlJbmRleCIsIl9tZW1vaXplRmFrZSIsImFycmF5SW5kZXgiLCJpZHMiLCJyZWR1Y2UiLCJhIiwiaWR4IiwicHVzaCIsIm92ZXJ3cml0ZSIsInJhbmRJbmRleCIsImFycmF5U2h1ZmZsZSIsImxpbWl0IiwibG9vcCIsImZuUmFuZEluZGV4IiwiZm5PdXRPZkxpbWl0IiwiZGZBcnJheVVuaXF1ZSIsImFycmF5VW5pcXVlIiwidW5pZm9ybSIsInVuaWZvcm1JbnQiLCJ1bmlmb3JtQm9vbGVhbiIsIm11Iiwic2lnbWEiLCJub3JtYWwiLCJsb2dOb3JtYWwiLCJwIiwiYmVybm91bGxpIiwibiIsImJpbm9taWFsIiwiZ2VvbWV0cmljIiwibGFtYmRhIiwicG9pc3NvbiIsImV4cG9uZW50aWFsIiwiaXJ3aW5IYWxsIiwiYmF0ZXMiLCJhbHBoYSIsInBhcmV0byIsImdldFdlaWdodCIsInNodWZmbGUiLCJkaXNhYmxlU29ydCIsImRmSXRlbUJ5V2VpZ2h0IiwiX2NhbGxEaXN0cmlidXRpb25zIiwiaXRlbUJ5V2VpZ2h0Iiwic3VtIiwiZGZTdW1JbnQiLCJzdW1JbnQiLCJkZlN1bUZsb2F0Iiwic3VtRmxvYXQiLCJsYWJlbCIsImdldHRlciIsImhhc2hBcmd2IiwidW5kZWZpbmVkIiwiZGlzdHJpYnV0aW9uIiwiZ2V0IiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJuYW1lIiwiZGVwcmVjYXRlIiwicHJvdG90eXBlIiwiYXV0b2JpbmQiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFJQSxhQUFjQyxRQUFRQSxLQUFLRCxjQUFlLFNBQVVFLEdBQVlDLEdBQVFDLEdBQUtDO0lBQzdFLElBQUlDLElBQUlDLFVBQVVDLFFBQVFDLElBQUlILElBQUksSUFBSUgsSUFBa0IsU0FBVEUsSUFBZ0JBLElBQU9LLE9BQU9DLHlCQUF5QlIsR0FBUUMsS0FBT0MsR0FBTU87SUFDM0gsSUFBdUIsbUJBQVpDLFdBQW9ELHFCQUFyQkEsUUFBUUMsVUFBeUJMLElBQUlJLFFBQVFDLFNBQVNaLEdBQVlDLEdBQVFDLEdBQUtDLFNBQ3BILEtBQUssSUFBSVUsSUFBSWIsRUFBV00sU0FBUyxHQUFHTyxL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