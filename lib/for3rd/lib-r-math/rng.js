Object.defineProperty(exports, "__esModule", {
    value: !0
});

const libRMath = require("lib-r-math.js"), random_1 = require("../../random"), rng_1 = require("../../rng"), isExtendsOf = require("is-extends-of");

class LibRMathRngWithRandom extends libRMath.IRNG {
    constructor(e, n) {
        super(e), this.use(n, e);
    }
    get _name() {
        return "Random<" + this.__random.rng.name + ">";
    }
    get seed() {
        return this.__seed;
    }
    set seed(e) {
        this.__random.seed && this.__random.seed(this.__seed = e);
    }
    use(e, n) {
        e && (e instanceof rng_1.default || "function" == typeof e.next || ("seedrandom" === e ? e = random_1.random.newUse("seedrandom", n, {
            entropy: !1
        }) : e instanceof random_1.Random || (e = random_1.random.newUse(e)))), this.__random = e || this.__random || random_1.random, 
        void 0 !== n && (this.seed = n);
    }
    _setup() {}
    internal_unif_rand() {
        return this.__random.next();
    }
}

exports.LibRMathRngWithRandom = LibRMathRngWithRandom;

class RandomRngWithLibRMath extends rng_1.default {
    constructor(e, n, ...t) {
        super(), this._seedable = !0, this._init(e, n, ...t);
    }
    _init(e, n, ...t) {
        if (e instanceof libRMath.IRNG) this._rng = e; else if (n instanceof libRMath.IRNG) this._rng = n; else if (e && isExtendsOf(e, libRMath.IRNG)) this._rng = new e(this._seedNum(n)); else if (n && isExtendsOf(n, libRMath.IRNG)) this._rng = new n(this._seedNum(e)); else if (e && "function" == typeof e.unif_rand) this._rng = e; else if (n && "function" == typeof n.unif_rand) this._rng = n; else if (n && libRMath[n]) {
            let t = libRMath[n];
            this._rng = new t(this._seedNum(e));
        } else this._rng = new libRMath.rng.MersenneTwister(this._seedNum(e));
        this._fn = (this._rng.internal_unif_rand || this._rng.unif_rand).bind(this._rng);
    }
    get name() {
        return "libRMath" + (this._rng.name ? `<${this._rng.name}>` : "");
    }
    get options() {
        return this._rng.seed;
    }
    next() {
        return this._fn();
    }
    seed(e, n, ...t) {
        this._rng.seed = [ this._seedNum(e) ];
    }
}

exports.RandomRngWithLibRMath = RandomRngWithLibRMath;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJsaWJSTWF0aCIsInJlcXVpcmUiLCJyYW5kb21fMSIsInJuZ18xIiwiaXNFeHRlbmRzT2YiLCJMaWJSTWF0aFJuZ1dpdGhSYW5kb20iLCJJUk5HIiwiW29iamVjdCBPYmplY3RdIiwiX3NlZWQiLCJybmciLCJzdXBlciIsInRoaXMiLCJ1c2UiLCJfbmFtZSIsIl9fcmFuZG9tIiwibmFtZSIsInNlZWQiLCJfX3NlZWQiLCJkZWZhdWx0IiwibmV4dCIsInJhbmRvbSIsIm5ld1VzZSIsImVudHJvcHkiLCJSYW5kb20iLCJSYW5kb21SbmdXaXRoTGliUk1hdGgiLCJvcHRzIiwiYXJndiIsIl9zZWVkYWJsZSIsIl9pbml0IiwiX3JuZyIsIl9zZWVkTnVtIiwidW5pZl9yYW5kIiwiciIsIk1lcnNlbm5lVHdpc3RlciIsIl9mbiIsImludGVybmFsX3VuaWZfcmFuZCIsImJpbmQiLCJvcHRpb25zIl0sIm1hcHBpbmdzIjoiQUFBQUEsT0FBT0MsZUFBZUMsU0FBUztJQUFnQkMsUUFBTzs7O0FBQ3RELE1BQU1DLFdBQVdDLFFBQVEsa0JBQ25CQyxXQUFXRCxRQUFRLGlCQUNuQkUsUUFBUUYsUUFBUSxjQUNoQkcsY0FBY0gsUUFBUTs7TUFDdEJJLDhCQUE4QkwsU0FBU007SUFDekNDLFlBQVlDLEdBQU9DO1FBQ2ZDLE1BQU1GLElBQ05HLEtBQUtDLElBQUlILEdBQUtEOztJQUVsQks7UUFDSSxPQUFPLFlBQVlGLEtBQUtHLFNBQVNMLElBQUlNLE9BQU87O0lBRWhEQztRQUNJLE9BQU9MLEtBQUtNOztJQUVoQkQsU0FBU1I7UUFDTEcsS0FBS0csU0FBU0UsUUFBUUwsS0FBS0csU0FBU0UsS0FBS0wsS0FBS00sU0FBU1Q7O0lBRTNERCxJQUFJRSxHQUFLRDtRQUNEQyxNQUNJQSxhQUFlTixNQUFNZSxXQUErQixxQkFBYlQsRUFBSVUsU0FHOUIsaUJBQVJWLElBQ0xBLElBQU1QLFNBQVNrQixPQUFPQyxPQUFPLGNBQWNiO1lBQ3ZDYyxVQUFTO2FBR05iLGFBQWVQLFNBQVNxQixXQUMvQmQsSUFBTVAsU0FBU2tCLE9BQU9DLE9BQU9aLE9BR3JDRSxLQUFLRyxXQUFXTCxLQUFPRSxLQUFLRyxZQUFZWixTQUFTa0I7YUFDNUIsTUFBVlosTUFDUEcsS0FBS0ssT0FBT1I7O0lBR3BCRDtJQUNBQTtRQUNJLE9BQU9JLEtBQUtHLFNBQVNLOzs7O0FBRzdCckIsUUFBUU8sd0JBQXdCQTs7TUFDMUJtQiw4QkFBOEJyQixNQUFNZTtJQUN0Q1gsWUFBWVMsR0FBTVMsTUFBU0M7UUFDdkJoQixTQUNBQyxLQUFLZ0IsYUFBWSxHQUNqQmhCLEtBQUtpQixNQUFNWixHQUFNUyxNQUFTQzs7SUFFOUJuQixNQUFNUyxHQUFNUyxNQUFTQztRQUNqQixJQUFJVixhQUFnQmhCLFNBQVNNLE1BRXpCSyxLQUFLa0IsT0FBT2IsUUFFWCxJQUFJUyxhQUFnQnpCLFNBQVNNLE1BRTlCSyxLQUFLa0IsT0FBT0osUUFFWCxJQUFJVCxLQUFRWixZQUFZWSxHQUFNaEIsU0FBU00sT0FFeENLLEtBQUtrQixPQUFPLElBQUliLEVBQUtMLEtBQUttQixTQUFTTCxVQUVsQyxJQUFJQSxLQUFRckIsWUFBWXFCLEdBQU16QixTQUFTTSxPQUV4Q0ssS0FBS2tCLE9BQU8sSUFBSUosRUFBS2QsS0FBS21CLFNBQVNkLFVBR2xDLElBQUlBLEtBQWtDLHFCQUFuQkEsRUFBS2UsV0FDekJwQixLQUFLa0IsT0FBT2IsUUFHWCxJQUFJUyxLQUFrQyxxQkFBbkJBLEVBQUtNLFdBQ3pCcEIsS0FBS2tCLE9BQU9KLFFBRVgsSUFBSUEsS0FBUXpCLFNBQVN5QixJQUFPO1lBQzdCLElBQUlPLElBQUloQyxTQUFTeUI7WUFFakJkLEtBQUtrQixPQUFPLElBQUlHLEVBQUVyQixLQUFLbUIsU0FBU2Q7ZUFJaENMLEtBQUtrQixPQUFPLElBQUk3QixTQUFTUyxJQUFJd0IsZ0JBQWdCdEIsS0FBS21CLFNBQVNkO1FBRy9ETCxLQUFLdUIsT0FBT3ZCLEtBQUtrQixLQUFLTSxzQkFBc0J4QixLQUFLa0IsS0FBS0UsV0FBV0ssS0FBS3pCLEtBQUtrQjs7SUFFL0VkO1FBQ0ksT0FBTyxjQUNBSixLQUFLa0IsS0FBS2QsV0FBV0osS0FBS2tCLEtBQUtkLFVBQVU7O0lBRXBEc0I7UUFDSSxPQUFPMUIsS0FBS2tCLEtBQUtiOztJQUVyQlQ7UUFDSSxPQUFPSSxLQUFLdUI7O0lBRWhCM0IsS0FBS1MsR0FBTVMsTUFBU0M7UUFDaEJmLEtBQUtrQixLQUFLYixTQUFRTCxLQUFLbUIsU0FBU2Q7Ozs7QUFHeENsQixRQUFRMEIsd0JBQXdCQSJ9