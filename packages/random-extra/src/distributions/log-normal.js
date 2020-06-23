"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
exports.default = (random, ...args) => {
    const normal = random.dfNormal(...args);
    return () => {
        return Math.exp(normal());
    };
};
//# sourceMappingURL=log-normal.js.map