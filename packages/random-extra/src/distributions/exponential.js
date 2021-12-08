"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = __importDefault(require("../util/ow"));
exports.default = (random, lambda = 1) => {
    //ow(lambda, ow.number.positive)
    (0, ow_1.default)(lambda).number.gt(0);
    return () => {
        return -Math.log(1 - random.next()) / lambda;
    };
};
//# sourceMappingURL=exponential.js.map