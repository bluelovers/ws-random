export declare function hashSum(input: any, ...argv: any[]): string;
export declare function hashAny(seed?: any, ...argv: any[]): string;
/**
 * give a random string for create seed
 */
export declare function randomSeedStr(): string;
export declare function nanoid(input?: any, ...argv: any[]): string;
export declare function seedToken(seed?: number | any, opts?: any, ...argv: any[]): number;
export default seedToken;

export {};
