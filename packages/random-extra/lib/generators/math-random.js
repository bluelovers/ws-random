Object.defineProperty(exports, "__esModule", {
    value: !0
});

const rng_1 = require("../rng"), util_1 = require("../util");

class RNGMathRandom extends rng_1.default {
    get name() {
        return "math-random";
    }
    get seedable() {
        return !1;
    }
    next() {
        return util_1._MathRandom();
    }
    seed(e, t, ...r) {}
    clone(e, t, ...r) {
        return util_1.cloneClass(RNGMathRandom, this, e, t, ...r);
    }
}

exports.RNGMathRandom = RNGMathRandom, exports.default = RNGMathRandom, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJybmdfMSIsInJlcXVpcmUiLCJ1dGlsXzEiLCJSTkdNYXRoUmFuZG9tIiwiZGVmYXVsdCIsIm5hbWUiLCJzZWVkYWJsZSIsIltvYmplY3QgT2JqZWN0XSIsIl9NYXRoUmFuZG9tIiwic2VlZCIsIm9wdHMiLCJhcmd2IiwiY2xvbmVDbGFzcyIsInRoaXMiLCJmcmVlemUiXSwibWFwcGluZ3MiOiJBQUFBQSxPQUFPQyxlQUFlQyxTQUFTO0lBQWdCQyxRQUFPOzs7QUFDdEQsTUFBTUMsUUFBUUMsUUFBUSxXQUNoQkMsU0FBU0QsUUFBUTs7TUFDakJFLHNCQUFzQkgsTUFBTUk7SUFDOUJDO1FBQ0ksT0FBTzs7SUFFWEM7UUFDSSxRQUFPOztJQUVYQztRQUNJLE9BQU9MLE9BQU9NOztJQUVsQkQsS0FBS0UsR0FBTUMsTUFBU0M7SUFHcEJKLE1BQU1FLEdBQU1DLE1BQVNDO1FBQ2pCLE9BQU9ULE9BQU9VLFdBQVdULGVBQWVVLE1BQU1KLEdBQU1DLE1BQVNDOzs7O0FBR3JFYixRQUFRSyxnQkFBZ0JBLGVBQ3hCTCxRQUFRTSxVQUFVRCxlQUVsQlAsT0FBT2tCLE9BQU9oQiJ9