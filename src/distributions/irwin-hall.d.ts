import { Random } from '../random';
import RNG from '../rng';
declare const _default: (random: Random<RNG>, n: number) => () => number;
/**
 * Generates a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution).
 *
 * @param random
 * @param {number} n - Number of uniform samples to average (n >= 1)
 * @return {function}
 */
export default _default;
