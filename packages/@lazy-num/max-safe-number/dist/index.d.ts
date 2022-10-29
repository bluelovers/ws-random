/**
 * Returns whether basic arithmetic breaks between n and n+1, to a precision of `digits` after the decimal point
 *
 * @see https://stackoverflow.com/a/57225494/4563339
 */
export declare function isUnsafe(n: number, digits: number): boolean;
/**
 * Binary search between 0 and Number.MAX_SAFE_INTEGER (2**53 - 1) for the biggest number that is safe to the `digits` level of precision.
 * digits=9 took ~30s, I wouldn't pass anything bigger.
 *
 * @see https://stackoverflow.com/a/57225494/4563339
 */
export declare function findMaxSafeFloat(digits: number, log?: boolean): number;
export declare const MAX_SAFE_FLOAT: number;

export {
	findMaxSafeFloat as default,
};

export {};
