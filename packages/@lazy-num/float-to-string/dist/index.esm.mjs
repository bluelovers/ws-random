function assertFractionDigits(fractionDigits) {
  if (!Number.isFinite(fractionDigits) || !Number.isInteger(fractionDigits) || fractionDigits === 0) {
    throw new TypeError(`Invalid fractionDigits: ${fractionDigits}`);
  }
}
function splitFloatNumberToString(float) {
  return String(float).split('.');
}
function getFractionDigitsString(float) {
  return splitFloatNumberToString(float)[1];
}
function splitFloatNumber(n) {
  let int = Math.floor(n);
  let float = n - int;
  return [int, float];
}
function joinFloatNumber(int, float) {
  return String(int) + (float !== null && float !== void 0 && float.length ? '.' + float : '');
}
function floatToString(n, fractionDigits) {
  let int;
  let s;

  if (typeof fractionDigits === 'number') {
    assertFractionDigits(fractionDigits);
    [int, s] = splitFloatNumberToString(n.toFixed(fractionDigits));
  } else {
    let float;
    [int, float] = splitFloatNumber(n);
    s = getFractionDigitsString(float);
  }

  return joinFloatNumber(int, s);
}

export { assertFractionDigits, floatToString as default, floatToString, getFractionDigitsString, joinFloatNumber, splitFloatNumber, splitFloatNumberToString };
//# sourceMappingURL=index.esm.mjs.map
