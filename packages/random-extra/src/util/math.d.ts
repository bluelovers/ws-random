import { fixZero } from 'num-is-zero';
export { fixZero };
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
export declare function get_range_by_size_sum(size: number, sum?: number): {
    min: number;
    max: number;
    sum: number;
    resultArray: number[];
};
