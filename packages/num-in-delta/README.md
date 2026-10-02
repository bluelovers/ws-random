# num-in-delta

檢查實際數值是否落在期望值 ± 容許誤差 (Delta) 範圍內的工具函式。

> check actual number is expected number ± delta

## 特色 (Features)

- 同時提供三種判斷實作，可依精度與效能需求挑選：
  - `numberInDelta`：以 [big.js](https://github.com/MikeMcl/big.js) 進行十進位精確計算，不受二進位浮點數 (Binary Floating Point) 誤差影響。
  - `numberInDeltaUnsafe001`：單純的區間比較，速度最快但可能有精度風險。
  - `numberInDeltaUnsafe002`：以 `Math.abs` 計算差值，效能與精度取得平衡。
- 邊界值採包含 (Inclusive) 判斷：差值剛好等於 `delta` 時視為通過。
- 內建 `subAbs` 輔助函式，可單獨取得兩數的絕對差值 (Absolute Difference)。
- 同時支援 CommonJS 與 ESM，並附帶 TypeScript 型別宣告 (Type Declarations)。

## 安裝 (Installation)

```bash
npm install num-in-delta
```

```bash
yarn add num-in-delta
yarn-tool add num-in-delta
yt add num-in-delta
```

## 使用方式 (Usage)

```js
import numberInDelta from 'num-in-delta'

// 用來檢驗統計結果，例如 10000 個均勻分佈數字的平均值應接近 0.5
const mean = sum / 10000
numberInDelta(mean, 0.5, 0.05)
```

```js
import numberInDelta, { numberInDeltaUnsafe001, numberInDeltaUnsafe002, subAbs } from 'num-in-delta'

numberInDelta(4.95, 5)          // true，預設 delta 為 0.05
numberInDelta(6, 5, 1)          // true，差值剛好等於 delta 也算通過
numberInDelta(6.2, 5, 1)        // false

numberInDeltaUnsafe001(4.95, 5) // true，純數值區間比較
numberInDeltaUnsafe002(4.95, 5) // true，以 Math.abs 計算

subAbs(4.95, 5)                 // 0.05
```

## API 文件

### numberInDelta(actual, expected, delta?)

判斷 `actual` 是否落在 `expected ± delta` 範圍內，為本套件的預設匯出 (Default Export)。
此版本使用 big.js 計算，精度最穩定，適合用於統計檢定等需要可靠邊界判斷的場合。

| 參數 | 型別 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `actual` | `number` | — | 實際計算得到的數值 |
| `expected` | `number` | — | 期望的基準數值 |
| `delta` | `number` | `0.05` | 容許誤差 (Delta)，差值小於等於此值即視為通過 |

**回傳值 (Returns)**：`boolean` — `true` 表示 `Math.abs(expected - actual) <= delta`（以十進位精確計算）。

```js
import numberInDelta from 'num-in-delta'

numberInDelta(6.01, 5, 1.01) // true
numberInDelta(6.02, 5, 1.01) // false
```

### numberInDeltaUnsafe001(actual, expected, delta?)

以純數值區間比較 `expected - delta <= actual <= expected + delta` 進行判斷。
不經過 big.js，速度最快，但可能受到浮點數精度影響，故函式名稱帶有 `Unsafe` 字樣。

| 參數 | 型別 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `actual` | `number` | — | 實際計算得到的數值 |
| `expected` | `number` | — | 期望的基準數值 |
| `delta` | `number` | `0.05` | 容許誤差 (Delta) |

**回傳值 (Returns)**：`boolean`

### numberInDeltaUnsafe002(actual, expected, delta?)

以 `Math.abs(expected - actual) <= delta` 計算絕對差值後判斷。
比 `numberInDeltaUnsafe001` 更直接，同樣不使用 big.js。

| 參數 | 型別 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `actual` | `number` | — | 實際計算得到的數值 |
| `expected` | `number` | — | 期望的基準數值 |
| `delta` | `number` | `0.05` | 容許誤差 (Delta) |

**回傳值 (Returns)**：`boolean`

### subAbs(actual, expected)

以 big.js 計算並回傳 `|expected - actual|` 的絕對差值 (Absolute Difference)，可用於自行實作判斷邏輯或輸出除錯資訊。

| 參數 | 型別 | 說明 |
| --- | --- | --- |
| `actual` | `number` | 實際計算得到的數值 |
| `expected` | `number` | 期望的基準數值 |

**回傳值 (Returns)**：`number`

```js
import { subAbs } from 'num-in-delta'

subAbs(4.95, 5) // 0.05
```

### EnumBigComparison

比對結果 (Comparison Result) 的列舉 (Enum)，數值對應 big.js 的 `cmp` 回傳值：

| 成員 | 值 | 意義 |
| --- | --- | --- |
| `GT` | `1` | 大於 (Greater Than) |
| `EQ` | `0` | 等於 (Equal) |
| `LT` | `-1` | 小於 (Less Than) |

`numberInDelta` 即是以「比對結果不是 `GT`」來表示差值在容許範圍內。

## 開發 (Development)

在 monorepo 根目錄下執行：

```bash
pnpm run test
pnpm run build
```

於本套件目錄下亦可使用 `package.json` 內的其他指令，例如 `pnpm run test:jest`、`pnpm run coverage`、`pnpm run lint`。

## 變更日誌 (Changelog)

請見 [CHANGELOG.md](./CHANGELOG.md)。

## 相關資源 (Related Resources)

- [big.js](https://github.com/MikeMcl/big.js) — 十進位精確數學運算函式庫，本套件精度版本的相依 (Dependency) 套件。
