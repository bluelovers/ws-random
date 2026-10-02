/**
 * Created by user on 2018/10/20/020.
 */
import _random from 'random-extra'

/**
 * 於模組載入時以 seedrandom 建立的 `random-extra` 實例 (Singleton)，
 * 省去每次自行呼叫 `newUse('seedrandom')` 的設定步驟；未指定種子 (Seed) 時由 seedrandom 決定初始狀態
 * A `random-extra` instance built from seedrandom at module load time (singleton),
 * saving callers from invoking `newUse('seedrandom')` every time; without an explicit seed, seedrandom decides the initial state
 */
export const seedrandom = _random.newUse('seedrandom');

/**
 * 以 `random` 作為別名 (Alias) 再匯出，方便依呼叫端習慣選擇較短的名稱；與 `seedrandom` 為同一個實例
 * Re-export under the `random` alias for a shorter name at call sites; it is the very same instance as `seedrandom`
 */
export { seedrandom as random }

/**
 * 以預設匯出 (Default Export) 提供同一個 seedrandom 實例，與具名匯出 (Named Export) 互通
 * Expose the same seedrandom instance as the default export, interchangeable with the named exports
 */
export default seedrandom
