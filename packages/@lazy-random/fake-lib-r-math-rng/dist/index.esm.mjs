function fakeLibRMathRng(n) {
  return {
    unif_rand(t) {
      if (t > 1) {
        let a = [];
        for (;t--; ) a[t] = n();
        return a;
      }
      return n();
    }
  };
}

export { fakeLibRMathRng as default, fakeLibRMathRng };
//# sourceMappingURL=index.esm.mjs.map
