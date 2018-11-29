Object.defineProperty(exports, "__esModule", { value: true });
const uniform_int_1 = require("./uniform-int");
const util_1 = require("../util");
const ow_1 = require("../util/ow");
const byte_1 = require("./byte");
const uniform_1 = require("./uniform");
function arrayFill(random, min, max, float) {
    let fn;
    {
        let min_unset = util_1.isUnset(min);
        let max_unset = util_1.isUnset(max);
        if (max_unset && min_unset) {
            fn = byte_1.default(random);
        }
        else if (float) {
            fn = uniform_1.default(random, min, max);
        }
        else {
            fn = uniform_int_1.default(random, min, max);
        }
        min = void 0;
        max = void 0;
    }
    ow_1.default(fn).is.function();
    return (arr) => {
        let i = arr.length;
        while (i--) {
            arr[i] = fn();
        }
        return arr;
    };
}
exports.default = arrayFill;
// @ts-ignore
Object.freeze(exports);
