import { fixZero as r } from "num-is-zero";

function sum_1_to_n(r) {
  return r * (r + 1) / 2;
}

function num_array_sum(u) {
  return r(u.reduce(((r, u) => r + u)));
}

export { num_array_sum, sum_1_to_n };
//# sourceMappingURL=index.esm.mjs.map
