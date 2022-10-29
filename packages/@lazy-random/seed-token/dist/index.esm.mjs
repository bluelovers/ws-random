import n from "hash-sum";

import { nanoid as r } from "nanoid/non-secure";

import { name as o, version as t } from "@lazy-random/seed-data";

import { floatToString as e } from "@lazy-num/float-to-string";

import { _MathRandom as a } from "@lazy-random/original-math-random";

import { MATH_POW_2_32 as m } from "@lazy-random/shared-lib";

import { isFiniteInt as i } from "@lazy-assert/check-basic";

function hashSum(r, ...o) {
  return n(r, ...o);
}

function nanoid(n, ...o) {
  return r();
}

let d, u;

function randomSeedStr() {
  var r, m;
  return [ nanoid(), null !== (r = d) && void 0 !== r ? r : d = n(o), null !== (m = u) && void 0 !== m ? m : u = n(t), Date.now(), e(a()) ].join("_");
}

function hashAny(n, ...r) {
  return n ? "string" != typeof n && (n = hashSum(n)) : n = randomSeedStr(), String(n);
}

function randomSeedNum() {
  return a() * m + a();
}

function seedToken(n, r, ...o) {
  if (i(n)) return n;
  const t = String(n);
  let e = 0;
  const a = t.length;
  for (let n = 0; n < a; ++n) e ^= 0 | t.charCodeAt(n);
  return e;
}

export { seedToken as default, hashAny, hashSum, nanoid, randomSeedNum, randomSeedStr, seedToken };
//# sourceMappingURL=index.esm.mjs.map
