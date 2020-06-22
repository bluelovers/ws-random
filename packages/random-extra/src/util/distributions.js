Object.defineProperty(exports, "__esModule", { value: true });
function randIndex(random, len) {
    return Math.floor(random.next() * len);
}
exports.randIndex = randIndex;
function float(random, min, max) {
    return random.next() * (max - min) + min;
}
exports.float = float;
function int(random, min, max) {
    return Math.floor(float(random, min, max + 1));
}
exports.int = int;
const UtilDistributions = require("./distributions");
exports.UtilDistributions = UtilDistributions;
exports.default = UtilDistributions;
// @ts-ignore
Object.freeze(exports);
