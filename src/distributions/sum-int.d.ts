import { Random } from '../random';
declare const _default: (random: Random<import("../rng").RNG>, size: number, min: number, max?: number, noUnique?: boolean) => () => number[];
/**
 * @todo support max < 1
 * @fixme bug when min < 0
 */
export default _default;
