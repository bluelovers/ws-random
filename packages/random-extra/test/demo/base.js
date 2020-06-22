/**
 * Created by user on 2018/10/19/019.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const seedrandom_1 = require("../../preset/seedrandom");
const xor128 = __1.default.newUse('xor128');
const mathRandom2 = __1.default.newUse('math-random2');
for (let i = 0; i < 200; i++) {
    //	console.log(random.int(0, 100));
}
[
    __1.default,
    xor128,
    seedrandom_1.default,
].forEach(function (rnd) {
    console.log(rnd.next(), rnd.random());
});
