function randIndex(n, t) {
  return Math.floor(n.next() * t);
}

function randIndexWithRange(n, t, a) {
  return Math.floor(float(n, t, a));
}

function float(n, t, a) {
  return n.next() * (a - t) + t;
}

function int(n, t, a) {
  return randIndexWithRange(n, t, a + 1);
}

const n = {
  randIndex,
  float,
  int
};

export { n as default, float, int, randIndex, randIndexWithRange };
//# sourceMappingURL=index.esm.mjs.map
