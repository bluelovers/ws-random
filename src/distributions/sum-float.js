Object.defineProperty(exports, "__esModule", { value: true });
const sum_num_1 = require("./internal/sum-num");
const uniform_1 = require("./uniform");
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
    if (sum > 0) {
        if (!max && !min) {
            max = sum;
            min = 0;
        }
    }
    else if (sum < 0) {
        if (!max && !min) {
            max = 0;
            min = sum;
        }
    }
    return sum_num_1.default({
        random,
        size,
        sum,
        min,
        max,
        //fnFirst: uniformFloat(random, min, max / (max / size)),
        fnNext: distributions_1.UtilDistributions.float,
        chk_sum: null,
        noUnique,
        verifyFn(argv) {
            if (!argv.fnFirst) {
                let n = (argv.max - argv.min);
                let n2 = (n / (n / argv.size));
                let n3 = Math.abs(n2) + argv.min;
                if (argv.sum < 0) {
                    n3 = argv.max - Math.abs(n2);
                }
                if (n3 > argv.max || n3 < argv.min) {
                    argv.fnFirst = uniform_1.default(random, argv.min, argv.max);
                }
                else {
                    let n5 = (argv.max + argv.min) / 2;
                    //console.log(n5, n3);
                    if (n3 > n5) {
                        argv.fnFirst = uniform_1.default(random, n5, argv.max);
                    }
                    else {
                        argv.fnFirst = uniform_1.default(random, argv.min, n5);
                    }
                }
            }
        },
    });
};
// @ts-ignore
Object.freeze(exports);
