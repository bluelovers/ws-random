const e = /*#__PURE__*/ Object.freeze({
  int: /*#__PURE__*/ Object.freeze([ 0, 100 ]),
  integer: /*#__PURE__*/ Object.freeze([ 0, 100 ]),
  boolean: /*#__PURE__*/ Object.freeze([ 0.5 ]),
  bytes: /*#__PURE__*/ Object.freeze([ 1 ])
});

function simpleWrap(e) {
  let t = {
    next: () => e(),
    random: () => e(),
    float: (t = 0, r = 1) => e() * (r - t + 1) + t,
    int: (t = 0, r = 100) => Math.floor(e() * (r - t + 1) + t),
    get integer() {
      return t.int;
    },
    boolean: (t = .5) => e() >= t,
    byte: () => t.int(0, 255),
    bytes(e = 1) {
      let r = [];
      for (let n = 0; n < e; n++) r.push(t.byte());
      return r;
    },
    seed: (...e) => t
  };
  return t;
}

export { simpleWrap as default, e as defaultArgv, simpleWrap };
//# sourceMappingURL=index.esm.mjs.map
