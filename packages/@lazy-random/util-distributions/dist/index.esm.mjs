function randIndex(random, len) {
  return Math.floor(random.next() * len);
}
function float(random, min, max) {
  return random.next() * (max - min) + min;
}
function int(random, min, max) {
  return Math.floor(float(random, min, max + 1));
}

const UtilDistributions = {
  randIndex,
  float,
  int
};

export { UtilDistributions as default, float, int, randIndex };
//# sourceMappingURL=index.esm.mjs.map
