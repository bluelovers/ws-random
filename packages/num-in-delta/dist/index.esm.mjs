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

var e;

function numberInDelta(e, u, t = .05) {
  return 1 !== new n(u).sub(e).abs().cmp(t);
}

!function(n) {
  n[n.GT = 1] = "GT", n[n.EQ = 0] = "EQ", n[n.LT = -1] = "LT";
}(e || (e = {}));

export { e as EnumBigComparison, numberInDelta as default, numberInDelta, numberInDeltaUnsafe001, numberInDeltaUnsafe002, subAbs };
//# sourceMappingURL=index.esm.mjs.map
