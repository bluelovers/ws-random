"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = __importDefault(require("../util/ow"));
exports.default = (random, p = 0.5) => {
    //ow(p, ow.number.gt(0).lte(1))
    ow_1.default(p).number.gt(0).lte(1);
    const invLogP = 1.0 / Math.log(1.0 - p);
    return () => {
        return Math.floor(1 + Math.log(random.next()) * invLogP);
    };
};
//# sourceMappingURL=geometric.js.map