"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = __importDefault(require("../util/ow"));
exports.default = (random, likelihood = 0.5) => {
    //ow(likelihood, ow.number.gt(0).lt(1))
    (0, ow_1.default)(likelihood).number
        .gt(0)
        .lt(1);
    return () => {
        return (random.next() >= likelihood);
    };
};
//# sourceMappingURL=uniform-boolean.js.map