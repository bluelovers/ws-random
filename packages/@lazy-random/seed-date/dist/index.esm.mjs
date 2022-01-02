import { _MathRandom } from '@lazy-random/original-math-random';
import { floatToString } from '@lazy-num/float-to-string';

function seedFloatByDate(date) {
  return date.valueOf() + _MathRandom();
}
function seedFloatByNow() {
  return seedFloatByDate(new Date());
}
function seedStringByDate(date) {
  return floatToString(seedFloatByDate(date));
}
function seedStringByNow() {
  return floatToString(seedFloatByDate(new Date()));
}

export { seedFloatByDate, seedFloatByNow, seedStringByDate, seedStringByNow };
//# sourceMappingURL=index.esm.mjs.map
