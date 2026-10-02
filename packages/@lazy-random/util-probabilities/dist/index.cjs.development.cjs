'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 以整數 (Integer) 將總和 `sum` 拆成 `size` 份的簡單機率 (Probability) 陣列。
 * Split `sum` into `size` integer shares with a simple probability scheme.
 *
 * 迴圈內以 `Math.round(score / size)` 依序取出前 `size - 1` 份，第 `size` 份改用差額
 * (Remainder) `sum - randomTotal` 補齊並 `unshift()` 到開頭，確保所有元素加總恆等於 `sum`。
 * Each of the first `size - 1` shares is `Math.round(score / size)` inside the loop; the
 * final share is the remainder `sum - randomTotal`, `unshift()`ed to the front, which
 * guarantees the array sums exactly to `sum`.
 *
 * @param size 拆分份數，須為正整數 (Positive Integer)；傳入 `<= 0` 會造成無窮迴圈 (Infinite Loop)
 *             Number of shares, must be a positive integer; `<= 0` causes an infinite loop
 * @param sum 待拆分的總和 / The total to split
 * @returns 加總等於 `sum` 的整數陣列 / An integer array summing to `sum`
 *
 * TODO: 疑似 bug — 迴圈除數固定為 `size` 而 `score` 逐次遞減，各份並非等分 (Equal Split) 而是前大後小；僅記錄不修改邏輯。
 * TODO: suspected bug — the divisor stays `size` while `score` shrinks each round, so shares are decreasing rather than equal; logged only, logic untouched.
 * TODO: 疑似 bug — `size <= 0` 時 `while (i--)` 的條件永為真，會進入無窮迴圈 (Infinite Loop)；僅記錄不修改邏輯。
 * TODO: suspected bug — with `size <= 0` the `while (i--)` condition stays truthy forever, causing an infinite loop; logged only, logic untouched.
 */
function get_prob(size, sum) {
  let score = sum;
  let resultArray = [];
  let randomTotal = 0;
  let i = size - 1;
  while (i--) {
    let random = Math.round(score / size);
    resultArray.push(random);
    randomTotal += random;
    score = score - random;
  }
  let result = sum - randomTotal;
  resultArray.unshift(result);
  return resultArray;
}
/**
 * 以浮點數 (Float) 將總和 `sum` 拆成 `size` 份的簡單機率 (Probability) 陣列。
 * Split `sum` into `size` float shares with a simple probability scheme.
 *
 * 與 `get_prob()` 流程相同，差別在於不做四捨五入 (Round)；第 `size` 份同樣以差額
 * (Remainder) 補齊並放到開頭，確保加總恆等於 `sum`。
 * Same flow as `get_prob()` but without rounding; the final share is still the remainder
 * placed at the front, so the array always sums to `sum`.
 *
 * @param size 拆分份數，須為正整數 (Positive Integer)；傳入 `<= 0` 會造成無窮迴圈 (Infinite Loop)
 *             Number of shares, must be a positive integer; `<= 0` causes an infinite loop
 * @param sum 待拆分的總和 / The total to split
 * @returns 加總等於 `sum` 的浮點陣列 / A float array summing to `sum`
 *
 * TODO: 疑似 bug — 與 `get_prob()` 相同，除數固定為 `size` 導致各份遞減而非等分；僅記錄不修改邏輯。
 * TODO: suspected bug — like `get_prob()`, the fixed `size` divisor makes shares decrease instead of being equal; logged only, logic untouched.
 * TODO: 疑似 bug — `size <= 0` 時 `while (i--)` 的條件永為真，會進入無窮迴圈 (Infinite Loop)；僅記錄不修改邏輯。
 * TODO: suspected bug — with `size <= 0` the `while (i--)` condition stays truthy forever, causing an infinite loop; logged only, logic untouched.
 */
function get_prob_float(size, sum) {
  let score = sum;
  let resultArray = [];
  let randomTotal = 0;
  let i = size - 1;
  while (i--) {
    let random = score / size;
    resultArray.push(random);
    randomTotal += random;
    score = score - random;
  }
  let result = sum - randomTotal;
  resultArray.unshift(result);
  return resultArray;
}

exports.get_prob = get_prob;
exports.get_prob_float = get_prob_float;
//# sourceMappingURL=index.cjs.development.cjs.map
