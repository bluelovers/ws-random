Object.defineProperty(exports, "__esModule", { value: true });
const sum_num_1 = require("./internal/sum-num");
const uniform_1 = require("./uniform");
const distributions_1 = require("../util/distributions");
const ow_1 = require("../util/ow");
/**
 * @todo support max <= 0
 * @fixme bug when min < 0
 */
exports.default = (random, size, min, max) => {
    if (max === undefined) {
        max = min;
        min = 0;
    }
    // @ts-ignore
    ow_1.expect(min).number();
    ow_1.expect(max, 'current only support max > 0').gt(min).gt(0);
    // @ts-ignore
    ow_1.expect(size).integer.gt(1);
    ow_1.expect(max / size, 'max / size').gt(min);
    return sum_num_1.default(random, size, min, max, uniform_1.default(random, min, max / (max / size)), distributions_1.UtilDistributions.float);
};
// @ts-ignore
Object.freeze(exports);
