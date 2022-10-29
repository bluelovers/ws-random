function get_prob(t, o) {
  let r = o, e = [], n = 0, u = t - 1;
  for (;u--; ) {
    let o = Math.round(r / t);
    e.push(o), n += o, r -= o;
  }
  return e.unshift(o - n), e;
}

function get_prob_float(t, o) {
  let r = o, e = [], n = 0, u = t - 1;
  for (;u--; ) {
    let o = r / t;
    e.push(o), n += o, r -= o;
  }
  return e.unshift(o - n), e;
}

export { get_prob, get_prob_float };
//# sourceMappingURL=index.esm.mjs.map
