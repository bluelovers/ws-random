# @lazy-random/df-array

針對陣列 (Array) 與類陣列 (Array-Like) 的亂數取樣函式 (Random Sampling Function) 集合，屬於 `@lazy-random` 系列的分佈函式 (Distribution Function) 套件。

與 `@lazy-random/df-algorithm` 相同，每個 `dfArray*` 函式都是工廠 (Factory)：傳入亂數來源 (RNG) 與選項，回傳可反覆呼叫的取樣函式 (Sampler)。

## 特色 (Features)

- 5 種陣列操作：隨機索引 (Index)、單一索引、洗牌 (Shuffle)、不重複取樣 (Unique)、隨機填值 (Fill)
- 支援一般陣列、唯讀陣列 (Readonly Array)、型別化陣列 (TypedArray) 與 `Buffer`
- 洗牌可選擇是否覆寫 (Overwrite) 原陣列
- 不重複取樣提供耗盡後的自訂回呼 (Callback)，方便串接下一輪

## 安裝 (Installation)

```bash
yarn add @lazy-random/df-array
yarn-tool add @lazy-random/df-array
yt add @lazy-random/df-array
```

## 使用方式 (Usage)

```ts
import { dfArrayIndex, dfArrayShuffle, dfArrayUnique } from '@lazy-random/df-array'

// 亂數來源需提供 next()，回傳 [0, 1) 的均勻亂數
const random = {
	next: () => Math.random(),
}

const arr = ['a', 'b', 'c', 'd', 'e']

// 隨機取得 3 個「不重複」的索引
const indexes = dfArrayIndex(random, arr, 3)
console.log(indexes()) // 例如 [2, 0, 4]

// 洗牌：預設回傳新陣列，不動到原陣列
const shuffle = dfArrayShuffle(random, arr)
console.log(shuffle())

// 洗牌：overwrite = true 時直接改寫原陣列
const shuffleInPlace = dfArrayShuffle(random, arr, true)
shuffleInPlace()

// 不重複地逐項取出，取滿 limit 後可依設定重來或拋出錯誤
const unique = dfArrayUnique(random, arr, 3)
console.log(unique(), unique(), unique())
```

隨機填滿陣列：

```ts
import { dfArrayFill } from '@lazy-random/df-array'

// 未指定 min/max 時填入位元組 (Byte) 0 ～ 255
const fillByte = dfArrayFill(random)
console.log(fillByte([0, 0, 0])) // 例如 [173, 42, 8]

// 指定範圍；float = true 產生浮點數 (Float)，否則為整數 (Integer)
const fillInt = dfArrayFill(random, 1, 7)
const fillFloat = dfArrayFill(random, 0, 1, true)
```

## API 文件

所有函式皆遵循下列慣例：

- 第一個參數一律為亂數來源 `random`（需提供 `next()`）
- 回傳值 (Returns)：無參數的取樣函式 (Sampler)；例外 (Throws) 於建立時拋出驗證錯誤 (Validation Error)

### dfArrayIndex(random, arr, size = 1, start = 0, end?)

回傳取樣函式，每次呼叫回傳一個含 `size` 個**不重複索引**的陣列。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `random` | `IRNGLike` | 亂數來源 |
| `arr` | `ITSArrayListMaybeReadonly<unknown>` | 目標陣列，需有 `length > 0` |
| `size` | `number` | 要取得的索引數，需為正整數 (`> 0`) |
| `start` | `number` | 起始索引，預設 `0`（負值會被歸零） |
| `end` | `number` | 結束索引（不含），預設為陣列長度 |

- 實際可取得的數量會被限制在 `[start, end)` 與陣列長度之內；若可取數量少於 `size` 但仍 > 0，則以較小值執行
- 索引不重複，因此可用於「不放回抽樣 (Sampling Without Replacement)」

### dfArrayIndexOne(random, arr, start = 0, end?)

回傳取樣函式，每次呼叫回傳 `[start, end)` 範圍內的一個隨機索引；範圍內只有一個候選索引時會直接回傳該索引，不消耗亂數。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `random` | `IRNGLike` | 亂數來源 |
| `arr` | `ITSArrayListMaybeReadonly<unknown>` | 目標陣列 |
| `start` | `number` | 起始索引，預設 `0` |
| `end` | `number` | 結束索引（不含），預設為陣列長度 |

### dfArrayShuffle(random, arr, overwrite?)

回傳取樣函式，每次呼叫回傳洗牌後的陣列。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `random` | `IRNGLike` | 亂數來源 |
| `arr` | 一般陣列／`TypedArray`／`Buffer` | 要洗牌的陣列 |
| `overwrite` | `boolean` | `true` 時直接改寫原陣列；省略或 `false` 則先複製再洗牌 |

- `Buffer` 以 `Buffer.from()` 複製，其他陣列以 `slice()` 複製
- 該函式標記為不可記憶化 (Not Memoizable)，每次呼叫都會重新洗牌

### dfArrayUnique(random, arr, limit?, loop?, fnRandIndex?, fnOutOfLimit?)

回傳取樣函式，每次呼叫回傳一個**不重複**的元素，直到取滿 `limit` 個。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `random` | `IRNGLike` | 亂數來源 |
| `arr` | `ITSArrayListMaybeReadonly<T>` | 來源陣列 |
| `limit` | `number` | 可取得的元素總數，預設為陣列長度，上限亦為陣列長度；需為正整數 |
| `loop` | `boolean` | 取滿後是否重置來源、重新開始取樣 |
| `fnRandIndex` | `IRandIndex` | 自訂的索引亂數函式，預設使用 `random` |
| `fnOutOfLimit` | `IArrayUniqueOutOfLimitCallback<T>` | 超過 `limit` 時的回呼 (Callback)，可回傳新陣列、`true`／`false` 或 `undefined` 控制後續行為 |

- 內部以複製的陣列做 `splice`，因此來源陣列不會被改寫
- `loop` 為 `false` 且沒有提供 `fnOutOfLimit` 時，超過 `limit` 次呼叫會拋出 `RangeError`

### dfArrayFill(random, min?, max?, float?)

回傳一個填值函式 (Filler)：接收陣列並以亂數填滿每個位置，回傳同一個陣列。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `random` | `IRNGLike` | 亂數來源 |
| `min` | `number` | 下界；與 `max` 皆未指定時改用位元組 (Byte) 模式 |
| `max` | `number` | 上界 |
| `float` | `boolean` | `true` 時產生浮點數，否則產生整數 |

- 從陣列尾端往前填入 (Back-to-Front)，與 `while (i--)` 的迴圈方向一致

## 開發 (Development)

```bash
pnpm run build
pnpm run lint
pnpm run test
```

## 變更日誌 (Changelog)

請見 [CHANGELOG.md](./CHANGELOG.md)。

## 常見問題 (FAQ)

### dfArrayIndex 與 dfArrayIndexOne 有何差異？

`dfArrayIndexOne` 每次只回傳一個索引，允許重複；`dfArrayIndex` 每次回傳一組不重複的索引，適合不放回抽樣 (Sampling Without Replacement)。

### 為什麼洗牌預設不改寫原陣列？

預設先複製再洗牌，可避免意外動到呼叫端的資料；確定要原地改寫 (In-Place) 時傳入 `overwrite = true` 即可。

### dfArrayUnique 取完之後會發生什麼？

取滿 `limit` 後，依序依 `fnOutOfLimit` 的回傳值、`loop` 設定決定：重新開始、換一批資料或拋出 `RangeError`。

## 相關資源 (Resources)

- [Repository](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/df-array#readme)
- [Issues](https://github.com/bluelovers/ws-random/issues)
