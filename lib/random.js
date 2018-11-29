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
        this._cache = {}, t && ow_1.expect(t).instanceof(rng_1.default), Object.defineProperty(this, "Random", {
            configurable: !1,
            enumerable: !1,
            get: () => Random_1
        }), this.use(t);
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
    arrayFill(t, r, e, i) {
        return this.dfArrayFill(r, e, i)(t);
    }
    dfArrayFill(t, r, e) {
        return this._memoize("dfArrayFill", distributions_1.Distributions.arrayFill, t, r, e);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiX19kZWNvcmF0ZSIsInRoaXMiLCJkZWNvcmF0b3JzIiwidGFyZ2V0Iiwia2V5IiwiZGVzYyIsImMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJyIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZCIsIlJlZmxlY3QiLCJkZWNvcmF0ZSIsImkiLCJkZWZpbmVQcm9wZXJ0eSIsIlJhbmRvbV8xIiwiZXhwb3J0cyIsInZhbHVlIiwib3dfMSIsInJlcXVpcmUiLCJkaXN0cmlidXRpb25zXzEiLCJybmdfMSIsInJuZ19mYWN0b3J5XzEiLCJ1dGlsXzEiLCJjb3JlX2RlY29yYXRvcnNfMSIsIlJhbmRvbSIsIltvYmplY3QgT2JqZWN0XSIsInJuZyIsIl9jYWNoZSIsImV4cGVjdCIsImluc3RhbmNlb2YiLCJkZWZhdWx0IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImdldCIsInVzZSIsIl9ybmciLCJzZWVkYWJsZSIsInJhbmRvbSIsIm5leHQiLCJyYW5kIiwiYXJndiIsInNlZWQiLCJzcmFuZG9tIiwic3JhbmQiLCJhcmdzIiwibyIsIl9fcHJvdG9fXyIsImNsb25lIiwiYXJnMCIsImdldENsYXNzIiwiX3BhdGNoIiwiRXJyb3IiLCJNYXRoIiwiZGZVbmlmb3JtIiwibWluIiwibWF4IiwiZnJhY3Rpb25EaWdpdHMiLCJkZlVuaWZvcm1JbnQiLCJpbnQiLCJsaWtlbGlob29kIiwiYm9vbGVhbiIsImRmVW5pZm9ybUJvb2xlYW4iLCJ0b1N0ciIsImRmQnl0ZSIsIl9tZW1vaXplIiwiRGlzdHJpYnV0aW9ucyIsImJ5dGUiLCJzaXplIiwiZGZCeXRlcyIsImJ5dGVzIiwiQnVmZmVyIiwiZnJvbSIsImZuIiwid2FycCIsImNoYXIiLCJjaGFySUQiLCJ0b1VwcGVyQ2FzZSIsImRmVXVpZHY0IiwidXVpZHY0IiwiYXJyIiwic3RhcnQiLCJlbmQiLCJkZkFycmF5SW5kZXgiLCJfbWVtb2l6ZUZha2UiLCJhcnJheUluZGV4IiwiaWRzIiwicmVkdWNlIiwiYSIsImlkeCIsInB1c2giLCJvdmVyd3JpdGUiLCJyYW5kSW5kZXgiLCJhcnJheVNodWZmbGUiLCJsaW1pdCIsImxvb3AiLCJmblJhbmRJbmRleCIsImZuT3V0T2ZMaW1pdCIsImRmQXJyYXlVbmlxdWUiLCJhcnJheVVuaXF1ZSIsImZsb2F0IiwiZGZBcnJheUZpbGwiLCJhcnJheUZpbGwiLCJ1bmlmb3JtIiwidW5pZm9ybUludCIsInVuaWZvcm1Cb29sZWFuIiwibXUiLCJzaWdtYSIsIm5vcm1hbCIsImxvZ05vcm1hbCIsInAiLCJiZXJub3VsbGkiLCJuIiwiYmlub21pYWwiLCJnZW9tZXRyaWMiLCJsYW1iZGEiLCJwb2lzc29uIiwiZXhwb25lbnRpYWwiLCJpcndpbkhhbGwiLCJiYXRlcyIsImFscGhhIiwicGFyZXRvIiwiZ2V0V2VpZ2h0Iiwic2h1ZmZsZSIsImRpc2FibGVTb3J0IiwiZGZJdGVtQnlXZWlnaHQiLCJfY2FsbERpc3RyaWJ1dGlvbnMiLCJpdGVtQnlXZWlnaHQiLCJzdW0iLCJkZlN1bUludCIsInN1bUludCIsImRmU3VtRmxvYXQiLCJzdW1GbG9hdCIsImxhYmVsIiwiZ2V0dGVyIiwiaGFzaEFyZ3YiLCJ1bmRlZmluZWQiLCJkaXN0cmlidXRpb24iLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsIm5hbWUiLCJkZXByZWNhdGUiLCJwcm90b3R5cGUiLCJhdXRvYmluZCIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSUEsYUFBY0MsUUFBUUEsS0FBS0QsY0FBZSxTQUFVRSxHQUFZQyxHQUFRQyxHQUFLQztJQUM3RSxJQUFJQyxJQUFJQyxVQUFVQyxRQUFRQyxJQUFJSCxJQUFJLElBQUlILElBQWtCLFNBQVRFLElBQWdCQSxJQUFPSyxPQUFPQyx5QkFBeUJSLEdBQVFDLEtBQU9DLEdBQU1PO0lBQzNILElBQXVCLG1CQUFaQyxXQUFvRCxxQkFBckJBLFFBQVFDLFVBQXlCTCxJQUFJSSxRQUFRQyxTQUFTWixHQUFZQyxHQUFRQyxHQUFLQyxTQUNwSCxL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