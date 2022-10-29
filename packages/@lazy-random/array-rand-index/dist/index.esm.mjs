import { _MathRandom as a } from "@lazy-random/original-math-random";

function arrayRandIndexByLength(n, ...r) {
  return Math.floor(a() * n);
}

function arrayRandIndex(a, ...n) {
  return arrayRandIndexByLength(a.length);
}

export { arrayRandIndex, arrayRandIndexByLength, arrayRandIndex as default };
//# sourceMappingURL=index.esm.mjs.map
