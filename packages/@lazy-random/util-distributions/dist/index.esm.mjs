function randIndex(n, t) {
  return Math.floor(n.next() * t);
}

function float(n, t, o) {
  return n.next() * (o - t) + t;
}

function int(n, t, o) {
  return Math.floor(float(n, t, o + 1));
}

const n = {
  randIndex,
  float,
  int
};

export { n as default, float, int, randIndex };
//# sourceMappingURL=index.esm.mjs.map
