function assertFractionDigits(t) {
  if (!Number.isFinite(t) || !Number.isInteger(t) || 0 === t) throw new TypeError(`Invalid fractionDigits: ${t}`);
}

function splitFloatNumberToString(t) {
  return String(t).split(".");
}

function getFractionDigitsString(t) {
  return splitFloatNumberToString(t)[1];
}

function splitFloatNumber(t) {
  let i = Math.floor(t);
  return [ i, t - i ];
}

function joinFloatNumber(t, i) {
  return String(t) + (null != i && i.length ? "." + i : "");
}

function floatToString(t, i) {
  let r, n;
  if ("number" == typeof i) assertFractionDigits(i), [r, n] = splitFloatNumberToString(t.toFixed(i)); else {
    let i;
    [r, i] = splitFloatNumber(t), n = getFractionDigitsString(i);
  }
  return joinFloatNumber(r, n);
}

export { assertFractionDigits, floatToString as default, floatToString, getFractionDigitsString, joinFloatNumber, splitFloatNumber, splitFloatNumberToString };
//# sourceMappingURL=index.esm.mjs.map
