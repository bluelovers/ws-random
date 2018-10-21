Object.defineProperty(exports, "__esModule", { value: true });
const ow = require("ow-lite");
exports.default = (random, likelihood = 0.5) => {
    ow(likelihood, ow.number.gt(0).lt(1));
    return () => {
        return (random.next() >= likelihood);
    };
};
// @ts-ignore
Object.freeze(exports);
