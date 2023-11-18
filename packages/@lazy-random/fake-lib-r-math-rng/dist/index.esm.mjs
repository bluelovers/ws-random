function fakeLibRMathRng(n) {
  function unif_rand(a) {
    if (a > 1) {
      let r = [];
      for (;a--; ) r[a] = n();
      return r;
    }
    return n();
  }
  return {
    unif_rand,
    internal_unif_rand: unif_rand
  };
}

export { fakeLibRMathRng as default, fakeLibRMathRng };
//# sourceMappingURL=index.esm.mjs.map
