"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = __importDefault(require("../util/ow"));
const distributions_1 = require("../util/distributions");
exports.default = (random, arr, size = 1, start = 0, end) => {
    let len = arr.length - 1;
    (0, ow_1.default)(size).integer.gt(0);
    start = Math.max(Math.floor(start), 0);
    end = Math.max(0, Math.floor(end)) || len;
    (0, ow_1.default)(end).integer.gt(0).lte(len);
    (0, ow_1.default)(start).integer.gte(0).lt(end);
    const fn = distributions_1.int;
    let size_runtime = Math.max(Math.min(end - start, len, size), 0);
    (0, ow_1.default)(size_runtime).gte(size).gt(0);
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