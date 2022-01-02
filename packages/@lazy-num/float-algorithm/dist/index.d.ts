export declare function df_mulberry32(n: number): () => number;
export declare function df_splitmix32(n: number): () => number;
/**
 * Yet another chaotic PRNG, the sfc stands for "Small Fast Counter". It is part of the PracRand PRNG test suite. It passes PractRand, as well as Crush/BigCrush (TestU01). Also one of the fastest.
 */
export declare function df_sfc32(a: number, b: number, c: number, d: number): () => number;
/**
 * Tyche is based on ChaCha's quarter-round. It's a bit slow but should be good quality. tychei, the inverted version, is 20% faster.
 */
export declare function df_tychei(a: number, b: number, c: number, d: number): () => number;
/**
 * Tyche is based on ChaCha's quarter-round. It's a bit slow but should be good quality. tychei, the inverted version, is 20% faster.
 */
export declare function df_tyche(a: number, b: number, c: number, d: number): () => number;

export {};
