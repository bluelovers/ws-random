import { ITSArrayLikeWriteable } from 'ts-type';
import { Random } from '../random';
declare const _default: <T extends ITSArrayLikeWriteable<any>>(random: Random<import("../rng").RNG>, arr: T, overwrite?: boolean) => <T extends ITSArrayLikeWriteable<any>>(arr: T) => T;
export default _default;
