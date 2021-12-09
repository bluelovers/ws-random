function isZero(val) {
  return val === 0 || val === -0;
}
function fixZero(val) {
  return val === -0 ? 0 : val;
}

export { isZero as default, fixZero, isZero };
//# sourceMappingURL=index.esm.mjs.map
