Object.defineProperty(exports, "__esModule", { value: true });
const libRmath = require("lib-r-math.js");
const random_1 = require("../../random");
const rng_1 = require("../../rng");
class LibRmathRngWithRandom extends libRmath.IRNG {
    constructor(_seed, rng) {
        super(_seed);
        this.use(rng, _seed);
    }
    get _name() {
        return 'Random<' + this.__random.rng.name + '>';
    }
    get seed() {
        return this.__seed;
    }
    set seed(_seed) {
        this.__random.seed(this.__seed = _seed);
    }
    use(rng, _seed) {
        if (rng) {
            if (rng instanceof rng_1.default) {
                rng = new random_1.Random(rng);
            }
            else if (rng === 'seedrandom') {
                rng = random_1.random.newUse('seedrandom', _seed, {
                    entropy: false,
                });
            }
            else if (!(rng instanceof random_1.Random)) {
                rng = random_1.random.newUse(rng);
            }
        }
        this.__random = rng || this.__random || random_1.random;
        if (typeof _seed !== 'undefined') {
            this.seed = _seed;
        }
    }
    _setup() { }
    internal_unif_rand() {
        return this.__random.next();
    }
}
exports.LibRmathRngWithRandom = LibRmathRngWithRandom;
/*

let b;

b = randsum(2, 5)

console.log(b, array_sum(b));

console.log('----------');

b = randsum(6, 13, -8, 15)

console.log(b, array_sum(b));

console.log('----------');

b = randsum(6, -13, -8, 15)

console.log(b, array_sum(b));

b = randsum(6, 0, -8, 15)

console.log(b, array_sum(b));

b = randsum(6, -14, -13, 15)

console.log(b, array_sum(b));

//b = randsum(6, 13, 14, 15)
//
//console.log(b, array_sum(b));

b = randsum(6, -12, -13, -1)

console.log(b, array_sum(b));

export function _array_rebase(ret_b: number[], n_diff: number, min: number, max: number, indexOf?: boolean)
{
    let bool: boolean;
    for (let i = ret_b.length - 1; i >= 0; i--)
    {
        let v = ret_b[i];

        if (!indexOf || ret_b.indexOf(v) !== i)
        {
            let n = v + n_diff;

            if (n >= min && n <= max)
            {
                bool = true;
                ret_b[i] = n;
            }
            else
            {
                bool = false;
                break;
            }
        }
    }
    return bool;
}

*/
