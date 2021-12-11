"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_range_by_size_sum = exports.fixZero = void 0;
const num_is_zero_1 = require("num-is-zero");
Object.defineProperty(exports, "fixZero", { enumerable: true, get: function () { return num_is_zero_1.fixZero; } });
const sum_1 = require("@lazy-num/sum");
function get_range_by_size_sum(size, sum) {
    sum = sum || (0, sum_1.sum_1_to_n)(size);
    let score = sum;
    let resultArray = [];
    let randomTotal = 0;
    let i;
    for (i = 0; i < size - 1; i++) {
        let res = Math.round(score / size);
        let random = res;
        resultArray[i] = random;
        randomTotal += resultArray[i];
        score = score - random;
    }
    let result = sum - randomTotal;
    resultArray[i] = result;
    resultArray.sort((a, b) => a - b);
    resultArray.push(score);
    if (sum < 0) {
        resultArray.push(sum - resultArray[0]);
    }
    resultArray.push(sum - resultArray[resultArray.length - 1]);
    resultArray.push(score < 0 ? sum + size : sum - size);
    for (i = 0; i < size; i++) {
        resultArray.push(score < 0 ? 0 - i : i);
    }
    resultArray.push((score < 0 ? sum + size - 1 : sum - size + 1));
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
exports.get_range_by_size_sum = get_range_by_size_sum;
//# sourceMappingURL=math.js.map