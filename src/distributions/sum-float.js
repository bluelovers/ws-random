Object.defineProperty(exports, "__esModule", { value: true });
const sum_num_1 = require("./internal/sum-num");
const distributions_1 = require("../util/distributions");
/**
 * @todo support max <= 0
 * @fixme bug when min < 0
 */
exports.default = (random, size, sum, min, max, noUnique) => {
    // @ts-ignore
    //expect(min).number();
    //expect(max, 'current only support max > 0').gt(min).gt(0);
    // @ts-ignore
    //expect(size).integer.gt(1);
    //expect(max / size, 'max / size').gt(min);
    return sum_num_1.default({
        random,
        size,
        sum,
        min,
        max,
        //fn: uniformFloat(random, min, max / (max / size)),
        fn2: distributions_1.UtilDistributions.float,
        chk_sum: null,
        noUnique,
    });
};
// @ts-ignore
Object.freeze(exports);
