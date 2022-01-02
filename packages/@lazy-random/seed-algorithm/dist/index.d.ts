/**
 * @see https://github.com/michaeldzjap/rand-seed/blob/939181cf160e929cac8397f702cced6acb0e95d5/src/Algorithms/Base.ts#L13
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md
 */
export declare function df_xfnv1a(str: string): () => number;
export declare function df_xfnv1a_2(str: string): () => number;
export declare function df_xmur3(str: string): () => number;
export declare function df_xmur3a(str: string): () => number;
/**
 * @example
 * doubleToIEEE(0.732821894576773)
 */
export declare function doubleToIEEE(floatNumber: number): [
	number,
	number
];
/**
 * @example
 * var seed = 0; // any unsigned 32-bit integer
 * var next = v3b(seed, 2654435769, 1013904242, 3668340011);
 */
export declare function df_v3b(a: number, b?: number, c?: number, d?: number): () => number;

export {};
