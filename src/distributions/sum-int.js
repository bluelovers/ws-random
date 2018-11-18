Object.defineProperty(exports, "__esModule", { value: true });
const sum_num_1 = require("./internal/sum-num");
const ow_1 = require("../util/ow");
const distributions_1 = require("../util/distributions");
const UtilMath = require("../util/math");
/**
 * @todo support max < 1
 * @fixme bug when min < 0
 */
exports.default = (random, size, sum, min, max, noUnique) => {
    if (typeof min !== 'undefined' && min !== null) {
        ow_1.expect(min).to.be.an.integer();
    }
    if (typeof max !== 'undefined' && max !== null) {
        ow_1.expect(max).to.be.an.integer();
    }
    //expect(Math.abs(max - min), 'max - min').gte(Math.max(size, UtilMath.sum_1_to_n(size) - Math.abs(min)));
    //expect(max / size, 'max / size').gte(min);
    return sum_num_1.default({
        random,
        size,
        sum,
        min,
        max,
        //fnFirst: uniformInt(random, min, max),
        fnNext: distributions_1.UtilDistributions.int,
        chk_sum: true,
        noUnique,
        verifyFn(data) {
            if (!data.noUnique) {
                let n1 = Math.abs(data.max - data.min);
                let n2 = UtilMath.sum_1_to_n(data.size);
                let n3 = Math.max(data.size, n2 - Math.abs(data.min));
                let n4 = data.max / data.size;
                /*
                console.dir({
                    n1,
                    n2,
                    n3,
                    n4,
                    size: data.size,
                    sum: data.sum,
                    max: data.max,
                    min: data.min,
                });
                */
                ow_1.expect(n1, 'max - min').gte(n3);
                ow_1.expect(n4, 'max / size').gte(data.min);
            }
        },
        intMode: true,
    });
};
// @ts-ignore
Object.freeze(exports);
