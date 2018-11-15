Object.defineProperty(exports, "__esModule", { value: true });
const UtilMath = require("../../util/math");
exports.default = coreFn1;
function coreFn2({ random, size, min, max, fn, fn2, chk_sum, noUnique, }) {
}
exports.coreFn2 = coreFn2;
function coreFn1({ random, size, min, max, fn, fn2, chk_sum, noUnique, }) {
    chk_sum = !!chk_sum;
    noUnique = !!noUnique;
    return () => {
        let ret = [];
        let bool;
        LABEL_TOP: do {
            let sum = max;
            let i = size - 1;
            let n;
            ret[i] = fn();
            LABEL_SUB: while (i > 1) {
                n = sum - ret[i];
                if (n < min || chk_sum && n < (UtilMath.sum_1_to_n(i) + min)) {
                    bool = true;
                    continue LABEL_TOP;
                }
                sum -= ret[i--];
                ret[i] = fn2(random, min, n);
            }
            ret[0] = sum - ret[i];
            bool = chk(ret, size, min, max, noUnique);
        } while (bool);
        return ret;
    };
}
exports.coreFn1 = coreFn1;
function chk(ret, size, min, max, noUnique) {
    return ret
        .filter(function (n, idx) {
        return n >= min
            && n <= max
            && (noUnique || idx === ret.indexOf(n));
    })
        .length !== size;
}
exports.chk = chk;
