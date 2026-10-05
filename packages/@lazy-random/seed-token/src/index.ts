/**
 * seed-token 的公開進入點 (Public Entry)
 *
 * 將「任意輸入 → 數值種子 (Numeric Seed)」與「高熵 (Entropy) 隨機種子字串」
 * 兩條路徑集中在此重新導出，讓呼叫端不必自行串接底層實作，
 * 也確保日後調整內部模組時不會破壞對外 API。
 *
 * Public entry of seed-token.
 *
 * Re-exports both paths — "arbitrary input → numeric seed" and
 * "high-entropy random seed string" — so callers do not have to wire up
 * the underlying implementations themselves, and so refactoring the
 * internal modules never breaks the public API.
 */
export { hashSum } from './hash-sum';
export { nanoid } from './nanoid';

export { hashAny } from './hash-any';

export { randomSeedStr } from './random-seed-str';
export { randomSeedNum } from './random-seed-num';

import { seedToken } from './seed-token';

export { seedToken }

export default seedToken
