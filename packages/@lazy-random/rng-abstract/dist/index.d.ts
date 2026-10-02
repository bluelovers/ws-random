import { RNGCore, IRNGLike } from '@lazy-random/rng-abstract-core';
export type { IRNGLike };
/**
 * 亂數產生器 (Random Number Generator) 的抽象基底類別 (Abstract Base Class)
 *
 * 統一實例化的入口與種子 (Seed) 推導規則，實際演算法由繼承的子類別實作。
 * Abstract base class that centralizes instantiation and seed derivation; concrete algorithms live in subclasses.
 */
export declare abstract class RNG extends RNGCore implements IRNGLike {
    /**
     * 建立目前子類別的實例，作為統一的實例化工廠 (Factory Method)
     *
     * 僅供繼承 `RNG` 的具體子類別呼叫，抽象類別本身不可被實例化。
     * Creates an instance of the current subclass as a unified factory method.
     *
     * @param seed 種子 (Seed)，任意型別；未提供時交由種子推導處理
     * @param opts 種子推導所使用的選項 (Options)
     * @param argv 其餘欲傳給建構子的參數 (Extra constructor arguments)
     * @returns 目前子類別的實例 / an instance of the current subclass
     * @throws {ReferenceError} 當 `this` 為 `RNG`、`RNGCore` 或空值時，抽象類別不可直接實例化
     */
    static create(seed?: any, opts?: any, ...argv: any[]): any;
    /**
     * return number for make new seed
     */
    protected _seedNum(seed?: any, opts?: any, ...argv: any[]): number;
    /**
     * return string for make new seed
     */
    protected _seedStr(seed?: any, opts?: any, ...argv: any[]): string;
}
export default RNG;
