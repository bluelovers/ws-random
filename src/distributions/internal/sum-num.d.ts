import { Random } from '../../random';
import { UtilDistributions } from '../../util/distributions';
export default function (random: Random, size: number, min: number, max: number, fn: () => number, fn2: (...args: Parameters<typeof UtilDistributions.int>) => number, chk_sum?: boolean, noUnique?: boolean): () => number[];
