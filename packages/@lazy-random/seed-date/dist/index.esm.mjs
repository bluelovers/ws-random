import { _MathRandom as e } from "@lazy-random/original-math-random";

import { floatToString as t } from "@lazy-num/float-to-string";

function seedFloatByDate(t, o) {
  return t.valueOf() + (null != o ? o : e)();
}

function seedFloatByNow(e) {
  return seedFloatByDate(new Date, e);
}

function seedStringByDate(e, o) {
  return t(seedFloatByDate(e, o));
}

function seedStringByNow(e) {
  return t(seedFloatByDate(new Date, e));
}

export { seedFloatByDate, seedFloatByNow, seedStringByDate, seedStringByNow };
//# sourceMappingURL=index.esm.mjs.map
