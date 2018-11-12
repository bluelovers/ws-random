Object.defineProperty(exports, "__esModule", { value: true });
const uniform_1 = require("./uniform");
const ow_1 = require("../util/ow");
const distributions_1 = require("../util/distributions");
exports.default = (random, size, min, max) => {
    if (max === undefined) {
        max = min;
        min = 1;
    }
    ow_1.default(min, ow_1.default.number);
    ow_1.default(max, ow_1.default.number.gt(min));
    ow_1.default(size, ow_1.default.number.gt(1));
    ow_1.default(max - min, ow_1.default.number.gt(size));
    ow_1.default(max / size, ow_1.default.number.gte(min));
    const fn = uniform_1.default(random, min, max);
    const fn2 = distributions_1.UtilDistributions.float;
    const chk = function (ret) {
        return ret
            .filter(function (n, idx) {
            return n >= min
                && n <= max
                && idx === ret.indexOf(n);
        })
            .length !== size;
    };
    return () => {
        let ret = [];
        let bool;
        do {
            ret[0] = fn();
            let n = max - ret[0];
            if (n < min) {
                bool = true;
                continue;
            }
            if (n === min) {
                ret[1] = n;
            }
            else {
                ret[1] = fn2(random, min, n);
            }
            ret[2] = max - ret[1] - ret[0];
            bool = chk(ret);
        } while (bool);
        return ret;
    };
};
// @ts-ignore
Object.freeze(exports);
