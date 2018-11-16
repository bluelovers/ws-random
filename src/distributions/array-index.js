Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = require("../util/ow");
exports.default = (random, size = 1, start = 0, end) => {
    //ow(size, ow.number.integer.gt(0))
    ow_1.default(size).integer.gt(0);
    start = Math.max(start | 0, 0);
    end = Math.max(0, end | 0);
    //ow(start, ow.number.integer.gte(0))
    //ow(end, ow.number.integer.gte(0))
    ow_1.default(start).integer.gte(0);
    ow_1.default(end).integer.gte(0);
    return (arr) => {
        let ids = [];
        let len = arr.length - 1;
        let end_runtime = end || len;
        //ow(start, ow.number.integer.lt(end_runtime))
        //ow(end_runtime, ow.number.integer.lte(len))
        ow_1.default(start).integer.lt(end_runtime);
        ow_1.default(end_runtime).integer.lte(len);
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
