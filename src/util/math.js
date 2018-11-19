Object.defineProperty(exports, "__esModule", { value: true });
/**
 * (1 + 2 + 3 +...+N)
 *
 * @see http://emn178.pixnet.net/blog/post/92132837-%E8%A8%88%E7%AE%971%E5%88%B0n%E7%B8%BD%E5%92%8C%281-%2B-2-%2B-3-%2B...%2Bn%29
 */
function sum_1_to_n(n) {
    return n * (n + 1) / 2;
}
exports.sum_1_to_n = sum_1_to_n;
/**
 * simple probabilities
 */
function get_prob(size, sum) {
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
    return resultArray;
}
exports.get_prob = get_prob;
function get_range_by_size_sum(size, sum) {
    sum = sum || sum_1_to_n(size);
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
    };
}
exports.get_range_by_size_sum = get_range_by_size_sum;
function array_sum(na) {
    return na.reduce((a, b) => a + b);
}
exports.array_sum = array_sum;
