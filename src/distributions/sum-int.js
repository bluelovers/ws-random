Object.defineProperty(exports, "__esModule", { value: true });
const uniform_int_1 = require("./uniform-int");
const ow_1 = require("../util/ow");
const distributions_1 = require("../util/distributions");
const UtilMath = require("../util/math");
const sum_num_1 = require("./internal/sum-num");
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
    ow_1.expect(max).to.be.an.integer.gt(min);
    // @ts-ignore
    ow_1.expect(size).to.be.an.integer.gt(1);
    ow_1.expect(max - min, 'max - min').gte(Math.max(size, UtilMath.sum_1_to_n(size)));
    ow_1.expect(max / size, 'max / size').gte(min);
    return sum_num_1.default(random, size, min, max, uniform_int_1.default(random, min, max), distributions_1.UtilDistributions.int, true);
};
// @ts-ignore
Object.freeze(exports);
