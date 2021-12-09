function fakeLibRMathRng(fn) {
  return {
    unif_rand(n) {
      if (n > 1) {
        let a = [];

        while (n--) {
          a[n] = fn();
        }

        return a;
      }

      return fn();
    }

  };
}

export { fakeLibRMathRng as default, fakeLibRMathRng };
//# sourceMappingURL=index.esm.mjs.map
