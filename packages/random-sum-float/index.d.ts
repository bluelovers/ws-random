/**
 * Created by user on 2018/11/22/022.
 */
declare function randomSumFloat(size: number, sum?: number, min?: number, max?: number): number[];
declare namespace randomSumFloat {
    var create: (size: number, sum?: number, min?: number, max?: number, noUnique?: boolean, limit?: number) => () => number[];
    var randomSumFloat: typeof randomSumFloat;
    var default: typeof randomSumFloat;
}
export = randomSumFloat;
