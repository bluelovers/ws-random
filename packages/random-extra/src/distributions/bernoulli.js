"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = __importDefault(require("../util/ow"));
exports.default = (random, p = 0.5) => {
    //ow(p, ow.number.gte(0).lte(1))
    ow_1.default(p).number.gte(0).lte(1);
    return () => {
        return (random.next() + p) | 0;
    };
};
//# sourceMappingURL=bernoulli.js.map