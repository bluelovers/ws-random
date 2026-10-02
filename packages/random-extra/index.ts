
/**
 * 根目錄入口：把共用的 random 實例以 `export =` 形式匯出，
 * 讓 CommonJS 的 `require('random-extra')` 直接取得該實例。
 *
 * Root entry: exposes the shared random instance via `export =` so CommonJS
 * `require('random-extra')` receives the instance directly.
 */
import { random } from './src/random'
export = random
