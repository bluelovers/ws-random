function isZero(r) {
  return 0 === r || -0 === r;
}

function fixZero(r) {
  return -0 === r ? 0 : r;
}

export { isZero as default, fixZero, isZero };
//# sourceMappingURL=index.esm.mjs.map
