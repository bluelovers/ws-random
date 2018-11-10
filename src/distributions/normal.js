Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = require("../util/ow");
exports.default = (random, mu = 0, sigma = 1) => {
    ow_1.default(mu, ow_1.default.number);
    ow_1.default(sigma, ow_1.default.number);
    return () => {
        let x, y, r;
        do {
            x = random.next() * 2 - 1;
            y = random.next() * 2 - 1;
            r = x * x + y * y;
        } while (!r || r > 1);
        return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
    };
};
// @ts-ignore
Object.freeze(exports);
