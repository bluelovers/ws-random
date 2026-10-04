import seedrandom from 'seedrandom';
import crypto from '@lazy-random/cross-crypto';
/**
 * 以執行時期的 `require` 動態載入指定模組，讓型別僅作為編譯期提示。
 * Dynamily loads the given module via runtime `require`, with types used as
 * compile-time hints only.
 *
 * TODO: 以 require() 載入在 ESM build 下可能失效（package.json 同時提供
 * `import` 與 `require` 兩種入口）；此處僅記錄，未修改邏輯。
 * TODO: loading via require() may break under the ESM build (package.json ships
 * both `import` and `require` entries); recorded only, logic unchanged.
 *
 * @param name 模組名稱 module name
 * @returns 載入的模組實例 the loaded module
 */
export declare function tryRequire<T = typeof crypto>(name: 'crypto'): T;
export declare function tryRequire<T = typeof seedrandom>(name: 'seedrandom'): T;
export declare function tryRequire<T extends unknown = any>(name: string): T;
