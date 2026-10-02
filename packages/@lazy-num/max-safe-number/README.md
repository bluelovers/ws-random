# @lazy-num/max-safe-number

判斷一個數值在指定位數 (Digits) 精度下是否仍「安全」（相鄰數值可被區分），並以二分搜尋 (Binary Search) 找出該精度下最大的安全數值。

背景：IEEE 754 雙精度浮點數 (Double-precision Float) 的安全整數上限為 `Number.MAX_SAFE_INTEGER`（`2^53 - 1`），一旦超出這個範圍，相鄰數值就無法被正確區分；小數位數越多，可用的安全範圍也越小。

## 特色 (Features)

- `isUnsafe(n, digits)`：以逐步累加 (Incremental Check) 的方式檢查 `n` 在指定位數下是否已不安全
- `findMaxSafeFloat(digits, log?)`：在 `0` 與 `Number.MAX_SAFE_INTEGER` 之間二分搜尋 (Binary Search) 最大安全值
- `MAX_SAFE_FLOAT` 常數：`digits = 1` 時的最大安全值（`562949953421311`）
- 零相依 (Zero Dependencies)，同時輸出 CommonJS 與 ESM 格式並附帶 TypeScript 型別宣告
- 演算法源自 Stack Overflow 問答（見 API 中的 `@see` 連結）

## 安裝 (Installation)

```bash
yarn add @lazy-num/max-safe-number
yarn-tool add @lazy-num/max-safe-number
yt add @lazy-num/max-safe-number
```

## 使用方式 (Usage)

### CommonJS

```js
const { isUnsafe, findMaxSafeFloat, MAX_SAFE_FLOAT } = require('@lazy-num/max-safe-number');

isUnsafe(1e14, 1); // false：小數 1 位下仍可區分
isUnsafe(1e15, 1); // true：小數 1 位下已不安全
isUnsafe(Number.MAX_SAFE_INTEGER, 1); // true

MAX_SAFE_FLOAT; // 562949953421311（digits = 1）
```

### ESM

```js
import { isUnsafe, findMaxSafeFloat, MAX_SAFE_FLOAT } from '@lazy-num/max-safe-number';

console.log(MAX_SAFE_FLOAT); // 562949953421311
```

### 自行搜尋其他位數 (Custom Search)

```js
const { findMaxSafeFloat } = require('@lazy-num/max-safe-number');

findMaxSafeFloat(2); // 70368744177663，並在 console 輸出結果
findMaxSafeFloat(3, true); // 第 2 個參數 log = true 時，額外以 console.table 輸出搜尋過程
```

> 注意：`findMaxSafeFloat()` 找到結果時一定會 `console.log()` 輸出一行文字，`log` 參數只控制是否額外輸出 `console.table()` 追蹤表格。

## API 文件 (API Documentation)

### isUnsafe(n, digits)

檢查數值 `n` 在小數 `digits` 位精度下是否已不安全 (Unsafe)。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `n` | `number` | 要檢查的數值 |
| `digits` | `number` | 小數位數，決定累加步進為 `10 ** -digits` |

- 回傳 (Returns)：`boolean` — `true` 表示在該精度下 `n` 的相鄰數值已無法區分

實作方式：從 `n` 開始以 `10 ** -digits` 為步進累加到 `1`，若某次累加結果與前一次相同，代表浮點運算已無法分辨增量，即判定為不安全。

```js
const { isUnsafe } = require('@lazy-num/max-safe-number');

isUnsafe(100, 1); // false
isUnsafe(1e16, 1); // true
```

- 參考 (See)：[Stack Overflow — answer 57225494](https://stackoverflow.com/a/57225494/4563339)

### findMaxSafeFloat(digits, log = false)

在 `0` 與 `Number.MAX_SAFE_INTEGER` 之間執行二分搜尋 (Binary Search)，找出在 `digits` 位精度下最大的安全數值。

| 參數 (Parameter) | 型別 (Type) | 預設值 | 說明 |
| --- | --- | --- | --- |
| `digits` | `number` | — | 小數位數 |
| `log` | `boolean` | `false` | 是否以 `console.table()` 輸出每次搜尋的狀態 |

- 回傳 (Returns)：`number` — 該精度下最大的安全數值（找到時同時 `console.log()` 輸出）
- 效能 (Performance)：`digits = 9` 約需 30 秒，不建議傳入更大的值（原始實作註解的經驗值）

```js
const { findMaxSafeFloat } = require('@lazy-num/max-safe-number');

findMaxSafeFloat(1); // 562949953421311
findMaxSafeFloat(2); // 70368744177663
```

- 參考 (See)：[Stack Overflow — answer 57225494](https://stackoverflow.com/a/57225494/4563339)

### MAX_SAFE_FLOAT

`findMaxSafeFloat(1)` 的計算結果，目前為 `562949953421311`（等於 `2^49 - 1`）。

> 注意：該常數在**模組載入時**就會執行一次二分搜尋並 `console.log()` 輸出結果，因此只要 import 本套件，console 就會多出一行文字。

## 已知限制 (Known Limitations)

- **載入副作用 (Module Load Side Effect)**：`MAX_SAFE_FLOAT` 於載入時計算並輸出 `console.log`。
- **`digits <= 0` 會卡死 (Infinite Loop)**：`isUnsafe()` 的步進為 `10 ** -digits`，`digits` 為 `0` 或負數時迴圈一次也不會執行，`isUnsafe()` 永遠回傳 `false`，導致 `findMaxSafeFloat()` 的搜尋邊界變成 `NaN` 而無限迴圈。
- **強制輸出 (Forced Output)**：`findMaxSafeFloat()` 找到結果時必定 `console.log`，無法關閉。
- **效能 (Performance)**：`isUnsafe()` 每次檢查需跑 `10 ** digits` 次迴圈，`digits` 過大時非常耗時。

## 開發 (Development)

本套件為 monorepo（pnpm + lerna）中的套件，常用指令：

```bash
pnpm run build        # 以 tsdx 建置 dist/，並產生 dist/index.d.ts
pnpm run test:jest    # 執行 Jest 測試
pnpm run lint         # 執行 ESLint
```

## 變更日誌 (Changelog)

請參閱 [CHANGELOG.md](./CHANGELOG.md)。
