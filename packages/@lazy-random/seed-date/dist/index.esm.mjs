import { _MathRandom } from '@lazy-random/original-math-random';
import { floatToString } from '@lazy-num/float-to-string';

function seedFloatByDate(date, fnRandomFloat) {
  return date.valueOf() + (fnRandomFloat !== null && fnRandomFloat !== void 0 ? fnRandomFloat : _MathRandom)();
}
function seedFloatByNow(fnRandomFloat) {
  return seedFloatByDate(new Date(), fnRandomFloat);
}
function seedStringByDate(date, fnRandomFloat) {
  return floatToString(seedFloatByDate(date, fnRandomFloat));
}
function seedStringByNow(fnRandomFloat) {
  return floatToString(seedFloatByDate(new Date(), fnRandomFloat));
}

export { seedFloatByDate, seedFloatByNow, seedStringByDate, seedStringByNow };
//# sourceMappingURL=index.esm.mjs.map
