Object.defineProperty(exports, "__esModule", { value: true });
function randIndex(random, len) {
    return Math.floor(random.next() * len);
}
exports.randIndex = randIndex;
// @ts-ignore
Object.freeze(exports);
