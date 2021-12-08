"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = __importDefault(require("../util/ow"));
exports.default = (random, n = 1) => {
    //ow(n, ow.number.integer.positive)
    (0, ow_1.default)(n).integer.gt(0);
    const irwinHall = random.dfIrwinHall(n);
    return () => {
        return irwinHall() / n;
    };
};
//# sourceMappingURL=bates.js.map