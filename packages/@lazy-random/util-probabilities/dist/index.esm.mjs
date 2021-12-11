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

export { get_prob, get_prob_float };
//# sourceMappingURL=index.esm.mjs.map
