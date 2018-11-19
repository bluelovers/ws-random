/**
 * Created by user on 2018/11/19/019.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const libRmath = require("lib-r-math.js");
exports.libRmath = libRmath;
function fakeLibRmathRng(fn) {
    return {
        unif_rand(n) {
            if (n > 1) {
                let a = [];
                while (n--) {
                    a[n] = fn();
                }
                return a;
            }
            return fn();
        },
    };
}
exports.fakeLibRmathRng = fakeLibRmathRng;
