# @lazy-random/array-rand-index

產生陣列 (Array) 隨機索引 (Random Index) 的極簡工具，可作為洗牌 (Shuffle) 或抽籤演算法的預設取樣函式。

## 特色 (Features)

- 兩個函式：依長度取樣 `arrayRandIndexByLength`、依陣列取樣 `arrayRandIndex`
- 隨機數來源 (Random Source) 使用 `@lazy-random/original-math-random` 包裝的 `Math.random()`
- 相容多餘參數 (Rest Arguments) 的回呼 (Callback) 簽章，可直接作為 `fn` 參數傳入其他演算法
- 支援 TypeScript 型別宣告 (Type Declarations)

## 安裝 (Installation)

```bash
yarn add @lazy-random/array-rand-index
yarn-tool add @lazy-random/array-rand-index
yt add @lazy-random/array-rand-index
```

## 使用方式 (Usage)

### CommonJS

```js
const { arrayRandIndexByLength, arrayRandIndex } = require('@lazy-random/array-rand-index');
```

### ESM

```js
import { arrayRandIndexByLength, arrayRandIndex } from '@lazy-random/array-rand-index';
```

### 範例 (Examples)

```js
// 從長度 10 的範圍取出 0 ~ 9 的隨機索引
arrayRandIndexByLength(10); // 例如 7

// 直接對陣列取樣
const arr = ['a', 'b', 'c'];
arr[arrayRandIndex(arr)]; // 例如 'b'

// 作為其他演算法的預設 fn（如 @lazy-random/array-algorithm 的 swapAlgorithm）
import { swapAlgorithm } from '@lazy-random/array-algorithm';
swapAlgorithm(arr, false, arrayRandIndexByLength);
```

## API 文件 (API Reference)

### `arrayRandIndexByLength(len, ...argv): number`

回傳 `0` 至 `len - 1` 之間的隨機整數 (Random Integer)。

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `len` | `number` | 取樣範圍的長度（上界，不含） |
| `...argv` | `any[]` | 相容回呼簽章的多餘參數，目前未被使用 |

- 回傳 (Returns)：`number` — `Math.floor(_MathRandom() * len)` 的結果
- 邊界情況 (Edge Case)：`len <= 0` 或為 `NaN` 時會回傳 `0` 以外的非預期值（`Math.floor` 得到 `NaN` 或 `-1`），呼叫前請自行確認 `len` 為正整數

### `arrayRandIndex(array, ...argv): number`

對給定陣列取樣，回傳 `0` 至 `array.length - 1` 的隨機索引。

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `array` | `any[]` | 要取樣的陣列（僅使用其 `length`） |
| `...argv` | `any[]` | 相容回呼簽章的多餘參數，目前未被使用 |

- 回傳 (Returns)：`number` — 隨機索引
- 此函式也是套件的預設匯出 (Default Export)

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
pnpm run lint
```

## 變更日誌 (Changelog)

詳見 [CHANGELOG.md](./CHANGELOG.md)。

## FAQ

### 為什麼不直接用 `Math.random()`？

`arrayRandIndexByLength` 透過 `@lazy-random/original-math-random` 取得隨機數，確保使用的是「未被覆寫的原始 `Math.random()`」，避免與其他替換了全域隨機數來源的程式碼互相干擾。

### `len` 可以傳 0 或負數嗎？

不建議。內部沒有做參數驗證 (Parameter Validation)，`len <= 0` 或 `NaN` 會導致 `Math.floor` 回傳 `NaN` 或 `-1`，請由呼叫端保證傳入正整數。

## 相關資源 (Related Resources)

- [套件原始碼 (Repository)](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/array-rand-index)
- [問題回報 (Issue Tracker)](https://github.com/bluelovers/ws-random/issues)
