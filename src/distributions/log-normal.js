Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (random, ...args) => {
    const normal = random.dfNormal(...args);
    return () => {
        return Math.exp(normal());
    };
};
// @ts-ignore
Object.freeze(exports);
