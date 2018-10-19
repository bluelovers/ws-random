"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (random, ...args) => {
    const normal = random.normal(...args);
    return () => {
        return Math.exp(normal());
    };
};
