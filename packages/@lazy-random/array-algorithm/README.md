# @lazy-random/array-algorithm

與陣列 (Array) 相關的隨機演算法 (Random Algorithm) 工具集，提供洗牌 (Shuffle) 與數值區間重分布 (Rebase) 等功能。

## 特色 (Features)

- `swapAlgorithm` / `swapAlgorithm2`：以交換方式打亂陣列順序（Fisher–Yates 風格的洗牌演算法）
- 支援選擇「就地修改 (In-Place)」或「回傳副本 (Copy)」
- 洗牌用的隨機索引 (Random Index) 可自訂，方便替換為具種子 (Seed) 的偽隨機數生成器 (PRNG)
- `array_rebase`：將數值陣列整體平移，並可檢查是否仍落在指定區間 (Interval) 內
- 支援 TypeScript 型別宣告 (Type Declarations)

## 安裝 (Installation)

```bash
yarn add @lazy-random/array-algorithm
yarn-tool add @lazy-random/array-algorithm
yt add @lazy-random/array-algorithm
```

## 使用方式 (Usage)

### CommonJS

```js
const { swapAlgorithm, swapAlgorithm2, array_rebase } = require('@lazy-random/array-algorithm');
```

### ESM

```js
import { swapAlgorithm, swapAlgorithm2, array_rebase } from '@lazy-random/array-algorithm';
```

### 範例 (Examples)

```js
const arr = [1, 2, 3, 4, 5];

// 回傳副本，不修改原陣列
const shuffled = swapAlgorithm(arr, false);
console.log(shuffled);

// 就地修改 (In-Place)，直接改寫原陣列
swapAlgorithm(arr, true);
```

```js
// 將陣列內每個數值加上 n_diff，並檢查是否仍在 [min, max] 區間內
const ret_b = [1, 2, 3];
const { bool, b_sum } = array_rebase(ret_b, 1, 0, 5);

console.log(bool);  // true：所有元素仍在區間內
console.log(b_sum); // 轉換後的總和
console.log(ret_b); // 每個元素都已加上 n_diff
```

## API 文件 (API Reference)

### `swapAlgorithm(arr, overwrite?, fn?): any`

以交換方式打亂陣列的洗牌 (Shuffle) 演算法。迴圈由陣列尾端往前，每次取得一個隨機索引並與目前位置交換。

| 參數 (Parameter) | 型別 (Type) | 預設值 (Default) | 說明 (Description) |
| --- | --- | --- | --- |
| `arr` | `T extends IArrayInput02<any>` | — | 要打亂的陣列 |
| `overwrite` | `boolean` | `false` | `true` 時就地修改 (In-Place) 原陣列；`false` 時先複製一份再處理 |
| `fn` | `(n: number, ...argv: any[]) => number` | `arrayRandIndexByLength` | 產生隨機索引的函式，輸入上界 `n`、回傳 `0`–`n-1` 的索引 |

- 回傳 (Returns)：打亂後的陣列（`overwrite` 為 `false` 時是原陣列的副本 (Copy)）

### `swapAlgorithm2(arr, overwrite?, fn?): T`

`swapAlgorithm` 的變體 (Variant)，差異在於交換索引的產生方式：

- 迴圈內一律以「完整長度 `len`」呼叫 `fn`，且當隨機索引恰好等於目前索引時，會依目前位置位於前半段或後半段，再以 `fn(len)` 或 `fn(i)` 重新取樣一次，藉此降低「位置未變動」的機率。
- 第二個參數與第三個參數的意義與 `swapAlgorithm` 相同。

| 參數 (Parameter) | 型別 (Type) | 預設值 (Default) | 說明 (Description) |
| --- | --- | --- | --- |
| `arr` | `T extends IArrayInput02<any>` | — | 要打亂的陣列 |
| `overwrite` | `boolean` | `false` | `true` 時就地修改原陣列 |
| `fn` | `(n: number, ...argv: any[]) => number` | `arrayRandIndexByLength` | 產生隨機索引的函式 |

- 回傳 (Returns)：`T` — 打亂後的陣列

### `array_rebase(ret_b, n_diff, min, max)`

將 `ret_b` 中的每個數值加上 `n_diff`（即平移至新的區間，back to original interval），可選擇是否檢查平移後的值是否仍落在 `[min, max]` 之內。

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `ret_b` | `number[]` | 要平移的數值陣列（會被就地修改） |
| `n_diff` | `number` | 每個元素要加上的差值 |
| `min` | `number` | 區間下界；與 `max` 皆非 `number` 型別時略過檢查 |
| `max` | `number` | 區間上界；與 `min` 皆非 `number` 型別時略過檢查 |

- 回傳 (Returns)：`{ bool: boolean, b_sum: number }`
  - `bool`：`true` 表示所有元素平移後仍在區間內（或略過了檢查）；`false` 表示有元素超出區間，此時迴圈已中斷 (Break)。
  - `b_sum`：平移後已寫回元素的總和。

> **注意 (Note)**：`min` / `max` 的判斷採 `typeof === 'number'`，因此只要其中一個是 `number` 就會進行區間檢查。檢查由陣列尾端往前進行，一旦某個元素超出 `[min, max]` 就會中斷，**該元素與其前方（索引較小）的元素都不會被寫回**，`b_sum` 也只累計到中斷前已成功平移的元素。

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
pnpm run lint
```

## 變更日誌 (Changelog)

詳見 [CHANGELOG.md](./CHANGELOG.md)。

## FAQ

### `swapAlgorithm` 與 `swapAlgorithm2` 該用哪一個？

一般洗牌請使用 `swapAlgorithm`；若希望降低「元素留在原位置」的機率、或需要以完整長度為基準取樣，可改用 `swapAlgorithm2`。

### 為什麼 `array_rebase` 回傳的 `b_sum` 可能不完整？

當啟用區間檢查且某個元素平移後超出 `[min, max]` 時，函式會立即中斷 (Break)，該元素與其前方（索引較小）的元素都不會被寫入與累加，因此 `b_sum` 僅代表「中斷前已成功平移的部分總和」。

## 相關資源 (Related Resources)

- [套件原始碼 (Repository)](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/array-algorithm)
- [問題回報 (Issue Tracker)](https://github.com/bluelovers/ws-random/issues)
