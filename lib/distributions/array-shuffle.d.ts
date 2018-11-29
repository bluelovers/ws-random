/// <reference types="node" />
import { ITSArrayLikeWriteable } from 'ts-type';
import { Random } from '../random';
import { TypedArray } from '../type';
declare function arrayShuffle<T extends ITSArrayLikeWriteable<any> | TypedArray | Buffer>(random: Random, arr: T, overwrite?: boolean): () => T;
declare namespace arrayShuffle {
    var memoizable: boolean;
}
export default arrayShuffle;
