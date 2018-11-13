Object.defineProperty(exports, "__esModule", { value: true });
const uniform_int_1 = require("./uniform-int");
const ow_1 = require("../util/ow");
const distributions_1 = require("../util/distributions");
const UtilMath = require("../util/math");
const sum_num_1 = require("./internal/sum-num");
/**
 * @todo support max < 1
 * @fixme bug when min < 0
 */
exports.default = (random, size, min, max) => {
    if (max === undefined) {
        max = min;
        min = 0;
    }
    //ow(min, ow.number.integer, 'min');
    //ow(max, ow.number.integer.gt(min), 'max');
    //ow(size, ow.number.integer.gt(1), 'size');
    // @ts-ignore
    ow_1.expect(min).to.be.an.integer();
    // @ts-ignore
    ow_1.expect(max, 'current only support max > 1').to.be.an.integer.gt(min).gt(1);
    // @ts-ignore
    ow_1.expect(size).to.be.an.integer.gt(1);
    ow_1.expect(Math.abs(max - min), 'max - min').gte(Math.max(size, UtilMath.sum_1_to_n(size) - Math.abs(min)));
    ow_1.expect(max / size, 'max / size').gte(min);
    return sum_num_1.default(random, size, min, max, uniform_int_1.default(random, min, max), distributions_1.UtilDistributions.int, true);
};
// @ts-ignore
Object.freeze(exports);
