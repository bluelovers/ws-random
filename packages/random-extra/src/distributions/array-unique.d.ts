import { Random } from '../random';
export interface IRandIndex {
    (len: number): number;
    (len: number, ...argv: any[]): number;
    (...argv: any[]): number;
}
export interface IArrayUniqueOutOfLimitCallback<T extends unknown> {
    (arr: T[], limit: number, loop: boolean, fn: IRandIndex): T[] | boolean | void;
}
declare const _default: <T extends unknown>(random: Random, arr: T[], limit?: number, loop?: boolean, fnRandIndex?: IRandIndex, fnOutOfLimit?: IArrayUniqueOutOfLimitCallback<T>) => () => T;
export default _default;
