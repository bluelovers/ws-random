"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array_unique_unsafe = array_unique_unsafe;
/**
 * for non-strict check, try get a little
 */
function array_unique_unsafe(arr) {
    /**
     * 以 indexOf 保留每個值「第一次出現」的位置來去重；
     * 屬於非嚴格 (Non-strict) 比較且為 O(n²)，僅求快速粗略結果，
     * 因此函式名稱帶有 unsafe，需要嚴格或高效去重時應改用 Set 等方式。
     *
     * Keeps the first occurrence of each value via indexOf; it is a non-strict,
     * O(n²) comparison meant for quick rough results, hence the unsafe name.
     */
    return arr.filter((v, i, arr) => arr.indexOf(v) === i);
}
//# sourceMappingURL=util.js.map