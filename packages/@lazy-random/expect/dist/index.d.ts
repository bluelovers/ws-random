/**
 * 斷言函式 (Assertion Function)：以 `expect(actual)` 開始的鏈式斷言入口。
 *
 * Assertion function: entry point for `expect(actual)` style chained assertions.
 */
export declare const expect: Chai.ExpectStatic;
/**
 * 斷言物件 (Assertion Object)：以 `assert(condition, message)` 風格進行斷言。
 *
 * Assertion object: performs assertions in `assert(condition, message)` style.
 */
export declare const assert: Chai.AssertStatic;
/**
 * 預設匯出 (Default Export) 與具名的 expect 為同一個物件，方便 `import expect from ...` 使用。
 *
 * Default export shares the same object as the named `expect`, for `import expect from ...` usage.
 */
export default expect;
