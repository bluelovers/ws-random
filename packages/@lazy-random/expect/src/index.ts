/**
 * @lazy-random/expect
 *
 * 匯出已套用 chai-asserttype-extra 外掛 (Plugin) 的 Chai 斷言 (Assertion)，
 * 讓使用端不必在每個測試檔重複呼叫 chai.use()。
 *
 * Exports Chai assertions with the chai-asserttype-extra plugin pre-applied,
 * so consumers do not need to call chai.use() in every test file.
 */
import {
	use,
} from 'chai';
import { ChaiPluginAssertType } from 'chai-asserttype-extra'

/**
 * 註冊外掛後的 Chai 實例 (Instance)；chai.use() 會回傳同一個 Chai 物件，
 * 因此可直接從這裡取得已具備進階型別斷言能力的 expect 與 assert。
 *
 * The Chai instance with the plugin registered; chai.use() returns the same
 * Chai object, so expect/assert taken from it already support the extra
 * type assertions.
 */
const chai = use(ChaiPluginAssertType);

/**
 * 斷言函式 (Assertion Function)：以 `expect(actual)` 開始的鏈式斷言入口。
 *
 * Assertion function: entry point for `expect(actual)` style chained assertions.
 */
export const expect = chai.expect;

/**
 * 斷言物件 (Assertion Object)：以 `assert(condition, message)` 風格進行斷言。
 *
 * Assertion object: performs assertions in `assert(condition, message)` style.
 */
export const assert = chai.assert;

/**
 * 預設匯出 (Default Export) 與具名的 expect 為同一個物件，方便 `import expect from ...` 使用。
 *
 * Default export shares the same object as the named `expect`, for `import expect from ...` usage.
 */
export default expect
