Object.defineProperty(exports, "__esModule", { value: true });
const ow_lite_1 = require("ow-lite");
exports.default = (random, size = 1, start = 0, end) => {
    ow_lite_1.default(size, ow_lite_1.default.number.integer.gt(0));
    start = Math.max(start | 0, 0);
    end = Math.max(0, end | 0);
    ow_lite_1.default(start, ow_lite_1.default.number.integer.gte(0));
    ow_lite_1.default(end, ow_lite_1.default.number.integer.gte(0));
    return (arr) => {
        let ids = [];
        let len = arr.length - 1;
        let end_runtime = end || len;
        ow_lite_1.default(start, ow_lite_1.default.number.integer.lt(end_runtime));
        ow_lite_1.default(end_runtime, ow_lite_1.default.number.integer.lte(len));
        let size_runtime = Math.max(Math.min(end_runtime - start, len, size), 0);
        do {
            let i = random.int(start, end_runtime);
            while (ids.includes(i)) {
                i = random.int(start, end_runtime);
            }
            ids.push(i);
        } while (--size_runtime > 0);
        return ids;
    };
};
// @ts-ignore
Object.freeze(exports);
