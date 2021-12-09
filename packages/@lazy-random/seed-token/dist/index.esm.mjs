import { isIntFinite } from 'chai-asserttype-extra/lib/check';

function seedToken(seed, opts, ...argv) {
  if (isIntFinite(seed)) {
    return seed;
  } else {
    let strSeed = '' + seed;
    let s = 0;
    let len = strSeed.length;

    for (let k = 0; k < len; ++k) {
      s ^= strSeed.charCodeAt(k) | 0;
    }

    return s;
  }
}

export { seedToken as default, seedToken };
//# sourceMappingURL=index.esm.mjs.map
