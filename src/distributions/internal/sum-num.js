Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("../../util/math");
const UtilMath = require("../../util/math");
const ow_1 = require("../../util/ow");
exports.default = coreFn2;
function coreFn2({ random, size, min, max, fnFirst, fnNext, chk_sum, noUnique, sum, chkSize, intMode, }) {
    ow_1.expect(size).integer.gt(1);
    let abs2 = math_1.sum_1_to_n(size);
    if (typeof sum === 'undefined' || sum === null) {
        sum = abs2;
    }
    ow_1.expect(sum).number();
    //let abs1 = Math.abs(sum);
    if (typeof min === 'undefined' || min === null) {
        if (sum > 0) {
            min = 0;
        }
        else {
            min = Math.min(sum - Math.floor(abs2 / 2), 0);
        }
    }
    if (typeof max === 'undefined' || max === null) {
        if (sum > 0) {
            max = sum;
        }
        else {
            max = Math.max(sum + Math.floor(abs2 / 2), 0);
        }
    }
    ow_1.expect(min).number();
    ow_1.expect(max).number.gt(min);
    if (min >= 0) {
        ow_1.expect(sum).gt(min);
    }
    if (sum < 0) {
        ow_1.expect(min).lt(sum);
    }
    chk_sum = !!chk_sum;
    noUnique = !!noUnique;
    const doUnique = !noUnique;
    if (!fnFirst) {
        fnFirst = (min, max) => fnNext(random, min, max);
    }
    if (chkSize) {
        chkSize({
            random,
            size,
            min,
            max,
            fnFirst,
            fnNext,
            chk_sum,
            noUnique,
            sum,
            chkSize,
        });
    }
    return () => {
        let ret = [];
        let bool;
        LABEL_TOP: do {
            let total = sum;
            let i = size - 1;
            let n;
            let prev;
            prev = ret[i] = fnFirst(min, max);
            LABEL_SUB: while (i > 1) {
                let j = i;
                n = total - ret[j];
                if (n <= min) {
                    bool = true;
                    //console.log(ret);
                    continue LABEL_TOP;
                }
                else if (n > max) {
                    n = max;
                }
                let cur = fnNext(random, min, n);
                if (doUnique && prev === cur) {
                    bool = true;
                    //console.log(ret);
                    continue LABEL_SUB;
                }
                total -= ret[j--];
                prev = ret[j] = cur;
                i = j;
            }
            let cur = total - ret[i];
            if (cur > max
                || cur < min
                || doUnique && prev === cur) {
                bool = true;
                //console.log(ret);
                continue LABEL_TOP;
            }
            ret[0] = cur;
            //console.log(ret);
            bool = chk(ret, size, sum, min, max, noUnique);
        } while (bool);
        return ret;
    };
}
exports.coreFn2 = coreFn2;
/**
 * @deprecated
 */
function coreFn1({ random, size, min, max, fnFirst, fnNext, chk_sum, noUnique, }) {
    chk_sum = !!chk_sum;
    noUnique = !!noUnique;
    return () => {
        let ret = [];
        let bool;
        LABEL_TOP: do {
            let sum = max;
            let i = size - 1;
            let n;
            ret[i] = fnFirst();
            LABEL_SUB: while (i > 1) {
                n = sum - ret[i];
                if (n < min || chk_sum && n < (UtilMath.sum_1_to_n(i) + min)) {
                    bool = true;
                    continue LABEL_TOP;
                }
                sum -= ret[i--];
                ret[i] = fnNext(random, min, n);
            }
            ret[0] = sum - ret[i];
            bool = chk(ret, size, sum, min, max, noUnique);
        } while (bool);
        return ret;
    };
}
exports.coreFn1 = coreFn1;
function chk(ret, size, sum, min, max, noUnique) {
    let total = 0;
    return ret
        .filter(function (n, idx) {
        total += n;
        return n >= min
            && n <= max
            && (noUnique || idx === ret.indexOf(n));
    })
        .length !== size && total === sum;
}
exports.chk = chk;
