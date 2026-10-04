"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixZero = void 0;
exports.get_range_by_size_sum = get_range_by_size_sum;
const num_is_zero_1 = require("num-is-zero");
Object.defineProperty(exports, "fixZero", { enumerable: true, get: function () { return num_is_zero_1.fixZero; } });
const sum_1 = require("@lazy-num/sum");
/**
 * 依數量 (Size) 與總和 (Sum) 估算一組可切分值的範圍，回傳推估的最小值、最大值與候選陣列。
 * Estimate the range of splittable values from a size and a total sum, returning
 * the derived min, max and a candidate array.
 *
 * @param size 要切分的數量 the number of parts to split into
 * @param sum 總和；省略時以 1..size 的和取代 total sum; defaults to the sum of 1..size
 * @returns 包含 min、max、sum 與 resultArray 的物件 an object with min, max, sum and resultArray
 *
 * TODO: 當 size <= 0 時迴圈不會執行，i 未經賦值即被 resultArray[i] 使用，
 * 會寫入索引 "undefined" 並使 min/max 取得非預期值；此處僅記錄，未修改邏輯。
 * TODO: when size <= 0 the loop never runs, so the unassigned i is used as an
 * index ("undefined") and min/max become unexpected; recorded only, logic unchanged.
 */
function get_range_by_size_sum(size, sum) {
    /**
     * 以 || 取代 ??，因此 sum 傳入 0 時會被視為未提供而改用 1..size 的預設總和；
     * 這是刻意保留的行為，調整前請先確認呼叫端。
     *
     * Uses || instead of ??, so sum = 0 falls back to the default 1..size total;
     * kept intentionally, check callers before changing.
     */
    sum = sum || (0, sum_1.sum_1_to_n)(size);
    let score = sum;
    let resultArray = [];
    let randomTotal = 0;
    let i;
    /**
     * 依序以 Math.round(score / size) 估算每一項，並逐步從剩餘的 score 扣除，
     * 讓每次的估算都基於「尚未分配的餘額」而非固定值，避免各項加總後偏離 sum。
     *
     * Estimates each entry with Math.round(score / size) and deducts it from the
     * remaining score, so every step is based on the leftover amount rather than a
     * fixed value, keeping the total close to sum.
     */
    for (i = 0; i < size - 1; i++) {
        //TODO: 變數 random 實際只是 Math.round 的固定結果，並無隨機性，名稱疑似保留自舊版實作
        //TODO: the local random is just the rounded result with no randomness, name likely kept from an older implementation
        let res = Math.round(score / size);
        let random = res;
        resultArray[i] = random;
        randomTotal += resultArray[i];
        score = score - random;
    }
    /**
     * 迴圈只分配前 size - 1 項，最後一項以總和扣掉已分配總額補齊，
     * 確保所有項目的總和恰好等於 sum。
     *
     * The loop only allocates the first size - 1 entries; the last entry absorbs
     * the remainder so the entries add up exactly to sum.
     */
    let result = sum - randomTotal;
    resultArray[i] = result;
    resultArray.sort((a, b) => a - b);
    /**
     * 以下數個邊界候選值各自對應一種極端情況（含負總和、加上／減去數量的上下界），
     * 用途是把 min/max 的推估範圍稍微放大，讓實際抽樣值不易超出範圍。
     *
     * The following boundary candidates each cover an extreme case (negative sums,
     * bounds offset by size); they widen the estimated min/max so sampled values
     * are unlikely to fall outside the range.
     */
    resultArray.push(score);
    if (sum < 0) {
        resultArray.push(sum - resultArray[0]);
    }
    resultArray.push(sum - resultArray[resultArray.length - 1]);
    resultArray.push(score < 0 ? sum + size : sum - size);
    /**
     * 依 score 的正負決定由 0 遞增或遞減的基準序列，
     * 讓正負總和都能取得對稱的候選邊界。
     *
     * Pushes an ascending or descending baseline depending on the sign of score,
     * giving symmetric candidate bounds for positive and negative sums alike.
     */
    for (i = 0; i < size; i++) {
        resultArray.push(score < 0 ? 0 - i : i);
    }
    resultArray.push((score < 0 ? sum + size - 1 : sum - size + 1));
    /**
     * 再排序一次是因為先前 push 的候選值打亂了順序，
     * 排序後首尾元素才能直接作為可靠的 min / max。
     *
     * Sorting again is required because the pushed candidates broke the order;
     * after sorting, the first and last elements are the reliable min / max.
     */
    resultArray.sort((a, b) => a - b);
    let min = resultArray[0];
    let max = resultArray[resultArray.length - 1];
    return {
        min,
        max,
        sum,
        resultArray,
    };
}
//# sourceMappingURL=math.js.map