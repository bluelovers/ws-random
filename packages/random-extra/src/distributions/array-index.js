Object.defineProperty(exports, "__esModule", { value: true });
const UtilDistributions = require("../util/distributions");
const ow_1 = require("../util/ow");
exports.default = (random, arr, size = 1, start = 0, end) => {
    let len = arr.length - 1;
    ow_1.default(size).integer.gt(0);
    start = Math.max(start | 0, 0);
    end = Math.max(0, end | 0) || len;
    ow_1.default(end).integer.gt(0).lte(len);
    ow_1.default(start).integer.gte(0).lt(end);
    const fn = UtilDistributions.int;
    let size_runtime = Math.max(Math.min(end - start, len, size), 0);
    ow_1.default(size_runtime).gte(size).gt(0);
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
// @ts-ignore
Object.freeze(exports);
