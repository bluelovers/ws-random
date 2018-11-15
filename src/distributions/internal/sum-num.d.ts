import { Random } from '../../random';
import { UtilDistributions } from '../../util/distributions';
export default function ({ random, size, min, max, fn, fn2, chk_sum, noUnique, }: {
    random: Random;
    size: number;
    min: number;
    max: number;
    fn: () => number;
    fn2: (...args: Parameters<typeof UtilDistributions.int>) => number;
    chk_sum?: boolean;
    noUnique?: boolean;
}): () => number[];
