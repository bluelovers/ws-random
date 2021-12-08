"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniform_int_1 = __importDefault(require("./uniform-int"));
const expect_1 = require("@lazy-random/expect");
const byte_1 = __importDefault(require("./byte"));
const uniform_1 = __importDefault(require("./uniform"));
const assers_1 = require("../util/assers");
function arrayFill(random, min, max, float) {
    let fn;
    {
        let min_unset = (0, assers_1.isUnset)(min);
        let max_unset = (0, assers_1.isUnset)(max);
        if (max_unset && min_unset) {
            fn = (0, byte_1.default)(random);
        }
        else if (float) {
            fn = (0, uniform_1.default)(random, min, max);
        }
        else {
            fn = (0, uniform_int_1.default)(random, min, max);
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