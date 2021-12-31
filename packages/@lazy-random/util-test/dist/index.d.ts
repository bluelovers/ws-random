import { RNGFactory as newRngFactory } from '@lazy-random/rng-factory';
import seedrandom from 'seedrandom';
export declare function newRngMathRandom(): {
    next(): number;
    random(): number;
    float(min?: number, max?: number): number;
    int(min?: number, max?: number): number;
    readonly integer: (min?: number, max?: number) => number;
    boolean(likelihood?: number): boolean;
    byte(): number;
    bytes(size?: number): number[];
    seed(...argv: any[]): any;
};
export declare function newRngSeedRandom(): import("@lazy-random/generators-function").RNGFunction<seedrandom.prng>;
export { newRngFactory };
