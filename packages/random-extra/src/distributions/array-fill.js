"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const df_uniform_1 = require("@lazy-random/df-uniform");
const expect_1 = require("@lazy-random/expect");
const assers_1 = require("../util/assers");
function arrayFill(random, min, max, float) {
    let fn;
    {
        let min_unset = (0, assers_1.isUnset)(min);
        let max_unset = (0, assers_1.isUnset)(max);
        if (max_unset && min_unset) {
            fn = (0, df_uniform_1.uniformByte)(random);
        }
        else if (float) {
            fn = (0, df_uniform_1.uniformFloat)(random, min, max);
        }
        else {
            fn = (0, df_uniform_1.uniformInt)(random, min, max);
        }
        min = void 0;
        max = void 0;
    }
    (0, expect_1.expect)(fn).is.function();
    return (arr) => {
        let i = arr.length;
        while (i--) {
            arr[i] = fn();
        }
        return arr;
    };
}
exports.default = arrayFill;
;
//# sourceMappingURL=array-fill.js.map