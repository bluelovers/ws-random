Object.defineProperty(exports, "__esModule", {
    value: !0
});

const crypto_1 = require("./generators/crypto"), math_random2_1 = require("./generators/math-random2"), seedrandom_1 = require("./generators/seedrandom"), rng_1 = require("./rng"), xor128_1 = require("./generators/xor128"), function_1 = require("./generators/function"), math_random_1 = require("./generators/math-random"), PRNG_BUILTINS = {
    xor128: xor128_1.default,
    function: function_1.default,
    default: math_random_1.default,
    "math-random": math_random_1.default,
    "math-random2": math_random2_1.default,
    seedrandom: seedrandom_1.default,
    crypto: crypto_1.default
};

function RNGFactory(...e) {
    const [r = "default", ...t] = e;
    switch (typeof r) {
      case "object":
        if (r instanceof rng_1.default) return r;
        break;

      case "function":
        return new function_1.default(r);

      case "string":
        const e = PRNG_BUILTINS[r];
        if (e) return new e(...t);
        break;
    }
    throw new TypeError(`invalid RNG "${r}"`);
}

exports.RNGFactory = RNGFactory, exports.default = RNGFactory, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJjcnlwdG9fMSIsInJlcXVpcmUiLCJtYXRoX3JhbmRvbTJfMSIsInNlZWRyYW5kb21fMSIsInJuZ18xIiwieG9yMTI4XzEiLCJmdW5jdGlvbl8xIiwibWF0aF9yYW5kb21fMSIsIlBSTkdfQlVJTFRJTlMiLCJ4b3IxMjgiLCJkZWZhdWx0IiwiZnVuY3Rpb24iLCJtYXRoLXJhbmRvbSIsIm1hdGgtcmFuZG9tMiIsInNlZWRyYW5kb20iLCJjcnlwdG8iLCJSTkdGYWN0b3J5IiwiYXJncyIsImFyZzAiLCJyZXN0IiwiUFJORyIsIlR5cGVFcnJvciIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6IkFBQUFBLE9BQU9DLGVBQWVDLFNBQVM7SUFBZ0JDLFFBQU87OztBQUN0RCxNQUFNQyxXQUFXQyxRQUFRLHdCQUNuQkMsaUJBQWlCRCxRQUFRLDhCQUN6QkUsZUFBZUYsUUFBUSw0QkFDdkJHLFFBQVFILFFBQVEsVUFDaEJJLFdBQVdKLFFBQVEsd0JBQ25CSyxhQUFhTCxRQUFRLDBCQUNyQk0sZ0JBQWdCTixRQUFRLDZCQUN4Qk87SUFFRkMsUUFBVUosU0FBU0s7SUFDbkJDLFVBQVlMLFdBQVdJO0lBQ3ZCQSxTQUFXSCxjQUFjRztJQUN6QkUsZUFBZUwsY0FBY0c7SUFDN0JHLGdCQUFnQlgsZUFBZVE7SUFDL0JJLFlBQWNYLGFBQWFPO0lBQzNCSyxRQUFVZixTQUFTVTs7O0FBRXZCLFNBQVNNLGNBQWNDO0lBQ25CLE9BQU9DLElBQU8sY0FBY0MsS0FBUUY7SUFDcEMsZUFBZUM7TUFDWCxLQUFLO1FBQ0QsSUFBSUEsYUFBZ0JkLE1BQU1NLFNBQ3RCLE9BQU9RO1FBRVg7O01BQ0osS0FBSztRQUNELE9BQU8sSUFBSVosV0FBV0ksUUFBUVE7O01BQ2xDLEtBQUs7UUFDRCxNQUFNRSxJQUFPWixjQUFjVTtRQUMzQixJQUFJRSxHQUNBLE9BQU8sSUFBSUEsS0FBUUQ7UUFFdkI7O0lBRVIsTUFBTSxJQUFJRSwwQkFBMEJIOzs7QUFFeENwQixRQUFRa0IsYUFBYUEsWUFDckJsQixRQUFRWSxVQUFVTSxZQUVsQnBCLE9BQU8wQixPQUFPeEIifQ==