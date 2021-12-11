"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("@lazy-random/expect");
const util_distributions_1 = require("@lazy-random/util-distributions");
exports.default = (random, arr, size = 1, start = 0, end) => {
    let len = arr.length - 1;
    (0, expect_1.expect)(size).integer.gt(0);
    start = Math.max(Math.floor(start), 0);
    end = Math.max(0, Math.floor(end)) || len;
    (0, expect_1.expect)(end).integer.gt(0).lte(len);
    (0, expect_1.expect)(start).integer.gte(0).lt(end);
    const fn = util_distributions_1.int;
    let size_runtime = Math.max(Math.min(end - start, len, size), 0);
    (0, expect_1.expect)(size_runtime).gte(size).gt(0);
    return () => {
        let ids = [];
        let prev;
        LABEL_TOP: do {
            let i = fn(random, start, end);
            if (prev === i || ids.includes(i)) {
                continue LABEL_TOP;
            }
            ids.push(prev = i);
            --size_runtime;
        } while (size_runtime > 0);
        return ids;
    };
};
//# sourceMappingURL=array-index.js.map