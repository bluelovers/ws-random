function toFixedStringNumber(n, fractionDigits) {
  return n.toFixed(fractionDigits);
}
function toFixedNumber(n, fractionDigits) {
  return parseFloat(n.toFixed(fractionDigits));
}

export { toFixedNumber as default, toFixedNumber, toFixedStringNumber };
//# sourceMappingURL=index.esm.mjs.map
