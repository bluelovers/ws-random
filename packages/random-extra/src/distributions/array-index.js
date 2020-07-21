"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UtilDistributions = __importStar(require("../util/distributions"));
const ow_1 = __importDefault(require("../util/ow"));
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
//# sourceMappingURL=array-index.js.map