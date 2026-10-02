import n from "big.js";

function subAbs(e, u) {
  return new n(u).sub(e).abs().valueOf();
}

function numberInDeltaUnsafe002(n, e, u = .05) {
  return Math.abs(e - n) <= u;
}

function numberInDeltaUnsafe001(n, e, u = .05) {
  return e - u <= n && n <= e + u;
}

let e = /*#__PURE__*/ function(n) {
  return n[n.GT = 1] = "GT", n[n.EQ = 0] = "EQ", n[n.LT = -1] = "LT", n;
}({});

function numberInDelta(u, t, r = .05) {
  return new n(t).sub(u).abs().cmp(r) !== e.GT;
}

export { e as EnumBigComparison, numberInDelta as default, numberInDelta, numberInDeltaUnsafe001, numberInDeltaUnsafe002, subAbs };
//# sourceMappingURL=index.esm.mjs.map
