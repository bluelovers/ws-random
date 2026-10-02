# @lazy-random/df-item-by-weight

依權重 (Weight) 隨機挑選項目的取樣函式 (Random Sampling Function) 集合，屬於 `@lazy-random` 系列的分佈函式 (Distribution Function) 套件。

傳入亂數來源 (RNG) 與帶權重的資料，回傳可反覆呼叫的取樣函式 (Sampler)；權重越高、被選中的機率越大，適合用於抽獎、加權隨機、儀表板項目輪播等情境。

## 特色 (Features)

- 兩種取樣方式：加權單選 (`dfItemByWeight`) 與加權不重複多選 (`dfItemByWeightUnique`)
- 資料可為陣列 (Array) 或物件 (Object)，並透過 `getWeight` 自訂權重來源
- 建立時先算好累積權重 (Cumulative Weight)，取樣期只需一次線性掃描
- 選配 (Optional) 的排序 (`disableSort`) 與洗牌 (Shuffle) 選項

## 安裝 (Installation)

```bash
yarn add @lazy-random/df-item-by-weight
yarn-tool add @lazy-random/df-item-by-weight
yt add @lazy-random/df-item-by-weight
```

## 使用方式 (Usage)

物件輸入：鍵 (Key) 為項目、值 (Value) 為權重：

```ts
import { dfItemByWeight } from '@lazy-random/df-item-by-weight'

// 亂數來源需提供 next()，回傳 [0, 1) 的均勻亂數
const random = {
	next: () => Math.random(),
}

const sampler = dfItemByWeight(random, {
	apple: 3,
	banana: 1,
	cherry: 1,
})

// 每次呼叫回傳 [key, value, percentage] 三元組
const [key, value, percentage] = sampler()
console.log(key, value, percentage) // 例如 'apple' 3 0.6
```

陣列輸入搭配自訂權重函式 (Weight Function)：

```ts
import { dfItemByWeight, dfItemByWeightUnique } from '@lazy-random/df-item-by-weight'

const users = [
	{ id: 'u1', score: 10 },
	{ id: 'u2', score: 30 },
	{ id: 'u3', score: 60 },
]

const byScore = dfItemByWeight(random, users, {
	getWeight: (item) => item.score,
})

console.log(byScore()[0]) // 例如 'u2'

// 不重複地取出 2 個項目（同一輪不會重複）
const unique = dfItemByWeightUnique(random, users, 2, {
	getWeight: (item) => item.score,
})

console.log(unique()) // 例如 [['u3', {...}, 0.6], ['u2', {...}, 1]]
```

## API 文件

所有函式皆遵循下列慣例：

- 第一個參數一律為亂數來源 `random`（需提供 `next()`）
- 權重需 > 0；預設權重函式會把值當作數字並加 `0.001` 的下限 (Floor)
- 例外 (Throws)：資料不足或權重不合規時，於**建立期**拋出驗證錯誤 (Validation Error)

### dfItemByWeight(random, arr, options?)

建立加權單選取樣函式，每次呼叫回傳一個 `[key, value, percentage]` 三元組 (Tuple)。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `random` | `IRNGLike` | 亂數來源 (Random Number Generator) |
| `arr` | 陣列或物件 | 帶權重的資料；陣列的索引即為 key |
| `options` | `IOptionsItemByWeight<T>` | 選項，見下方 [設定](#設定-options) |

- 回傳值 (Returns)：無參數的取樣函式，每次呼叫回傳 `IWeightEntrie<T>` = `[key, value, percentage]`
- 建立時要求項目數 `> 1`，且每個權重皆 `> 0`

### dfItemByWeightUnique(random, arr, size, options?)

建立加權**不重複**多選取樣函式，每次呼叫回傳 `size` 個互不相同的項目。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `random` | `IRNGLike` | 亂數來源 |
| `arr` | 陣列或物件 | 帶權重的資料 |
| `size` | `number` | 要取出的項目數，需為正整數且 `> 1`；不可超過資料筆數 |
| `options` | `IOptionsItemByWeight<T>` | 選項 |

- 每抽出一項就將其移出候選池並重算累積權重 (Recalculate)，因此同一輪內不會重複
- 回傳值 (Returns)：無參數的取樣函式，每次呼叫回傳 `IWeightEntrie<T>[]`

## 設定 (Options)

`IOptionsItemByWeight` 介面：

| 選項 (Option) | 型別 (Type) | 預設值 (Default) | 說明 |
| --- | --- | --- | --- |
| `getWeight` | `(value, key, ...argv) => number` | `value + 0.001` | 自訂權重來源；回傳值需 `> 0` |
| `shuffle` | `boolean` | `false` | 先洗牌再計算累積權重 |
| `disableSort` | `boolean` | `false` | 跳過依 percentage 排序（升冪） |

## 開發 (Development)

```bash
pnpm run build
pnpm run lint
pnpm run test
```

## 變更日誌 (Changelog)

請見 [CHANGELOG.md](./CHANGELOG.md)。

## 常見問題 (FAQ)

### 為什麼預設權重要加 0.001？

預設權重函式 (`_getWeight`) 以「值 + 0.001」作為權重，除了讓數值 0 仍保有非零機率，也確保權重必 `> 0`、可通過建立期的 `expect(weight).gt(0)` 檢查。

### 項目不是數字時怎麼辦？

透過 `options.getWeight` 自訂權重回傳值即可，例如 `(item) => item.score`。

### 排序選項有什麼影響？

`_sortWeight` 會依 percentage 升冪排序候選清單，`_itemByWeightCore` 再以累積權重做線性比對；排序本身不影響機率分布，只影響掃描順序與 `shuffle` 後的初始狀態。

### 取樣函式會改寫我的原始資料嗎？

不會。建立期就把權重算成獨立的 `vlist`／`klist`，並清空對原始 `arr` 的參照；`dfItemByWeightUnique` 在取樣期也只對自己複製的清單做 `splice`。

## 相關資源 (Resources)

- [Repository](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/df-item-by-weight#readme)
- [Issues](https://github.com/bluelovers/ws-random/issues)
