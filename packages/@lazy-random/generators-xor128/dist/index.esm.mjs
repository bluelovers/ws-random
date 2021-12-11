import { RNG } from '@lazy-random/rng-abstract';
import { randomSeedNum } from '@lazy-random/seed-token';
import { cloneClass } from '@lazy-random/clone-class';

class RNGXOR128 extends RNG {
  constructor(...argv) {
    super();

    this._init(...argv);

    this.seed(this.x);
  }

  get name() {
    return 'xor128';
  }

  get seedable() {
    return true;
  }

  next() {
    const t = this.x ^ this.x << 1;
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    this.w = this.w ^ (this.w >>> 19 ^ t ^ t >>> 8);
    return (this.w >>> 0) / 0x100000000;
  }

  seed(seed, opts, ...argv) {
    this._seed(seed, opts, ...argv);

    let i = 64;

    while (i--) {
      this.next();
    }
  }

  clone(seed, opts, ...argv) {
    return cloneClass(RNGXOR128, this, seed, opts, ...argv);
  }

  _init(...argv) {
    let [x = randomSeedNum(), y = randomSeedNum(), z = randomSeedNum(), w = randomSeedNum()] = argv;

    this._seed(x, y, z, w);
  }

  _seed(...argv) {
    let [x = this.x, y = this.y, z = this.z, w = this.w] = argv;

    if (typeof x !== 'number') {
      x = this._seedNum(x) || this.x;
    }

    if (typeof y !== 'number') {
      y = this.y;
    }

    if (typeof z !== 'number') {
      z = this.z;
    }

    if (typeof x !== 'number') {
      w = this.w;
    }

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

}

export { RNGXOR128, RNGXOR128 as default };
//# sourceMappingURL=index.esm.mjs.map
