# @lazy-num/to-fixed-number

以固定小數點表示法 (Fixed-Point Notation) 格式化數字，回傳字串或數字的小工具。

> number using fixed-point notation

## 特色 (Features)

- 同時提供回傳字串 (String) 與回傳數字 (Number) 的兩種 API
- 底層直接委派給 JavaScript 內建的 `Number.prototype.toFixed()`，行為與原生一致
- 支援 CommonJS 與 ESM，並附帶 TypeScript 型別宣告 (Type Declarations)

## 安裝 (Installation)

```bash
yarn add @lazy-num/to-fixed-number
yarn-tool add @lazy-num/to-fixed-number
yt add @lazy-num/to-fixed-number
```

## 使用方式 (Usage)

### CommonJS

```js
const { toFixedNumber, toFixedStringNumber } = require('@lazy-num/to-fixed-number');
```

### ESM

```js
import { toFixedNumber, toFixedStringNumber } from '@lazy-num/to-fixed-number';
```

### 範例 (Examples)

```js
toFixedStringNumber(12.345, 2); // '12.35'
toFixedNumber(12.345, 2);       // 12.35

toFixedStringNumber(123.456, 0); // '123'
toFixedNumber(123.456, 0);       // 123

// 保留補零：toFixedStringNumber 維持 '1.00'
// 捨去尾端的零：toFixedNumber 得到 1
toFixedStringNumber(1.005, 2); // '1.00'
toFixedNumber(1.005, 2);       // 1
```

預設匯出 (Default Export) 等同於 `toFixedNumber`：

```js
import toFixedNumber from '@lazy-num/to-fixed-number';
```

## API 文件 (API Reference)

### `toFixedNumber(n, fractionDigits): number`

將數字 `n` 依固定小數點表示法 (Fixed-Point Notation) 格式化後，再解析回數字 (Number)。

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `n` | `number` | 要格式化的數字 |
| `fractionDigits` | `number` | 小數位數，須為 `0`–`100` 之間的整數 |

- 回傳 (Returns)：`number` — 格式化後的數值
- 拋出 (Throws)：`RangeError` — 當 `fractionDigits` 不在 `0`–`100` 範圍時，由 `toFixed()` 拋出

此函式也是套件的預設匯出 (Default Export)。

### `toFixedStringNumber(n, fractionDigits): string`

與 `toFixedNumber` 相同的格式化邏輯，但直接回傳字串 (String)，保留補零後的小數位。

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `n` | `number` | 要格式化的數字 |
| `fractionDigits` | `number` | 小數位數，須為 `0`–`100` 之間的整數 |

- 回傳 (Returns)：`string` — 格式化後的字串
- 拋出 (Throws)：`RangeError` — 當 `fractionDigits` 不在 `0`–`100` 範圍時，由 `toFixed()` 拋出

## 限制 (Limitations)

本套件底層直接委派給 `Number.prototype.toFixed()`，因此會完整反映 IEEE 754
雙精度浮點數 (Double-Precision Floating Point) 的表示誤差與內建捨入 (Rounding) 行為。

以下範例同時輸出原生 `toFixed()`、本套件 `toFixedNumber()` 與
`toPrecision(17)`（用以顯示記憶體中的真實值）：

```ts
import { toFixedNumber } from '@lazy-num/to-fixed-number';

[
	1.004,
	1.005,
	1.015,
	1.016,
	12.345,
	12.0345,
	12.305,
].forEach((item) => {
	const n = item;
	const fractionDigits = 2;
	console.log(n, ' ／ ', n.toFixed(fractionDigits), ' ／ ', toFixedNumber(n, fractionDigits), ' ／ ', n.toPrecision(17));
});
```

輸出 (Output)：

```
1.004  ／  1.00  ／  1  ／  1.0040000000000000
1.005  ／  1.00  ／  1  ／  1.0049999999999999
1.015  ／  1.01  ／  1.01  ／  1.0149999999999999
1.016  ／  1.02  ／  1.02  ／  1.0160000000000000
12.345  ／  12.35  ／  12.35  ／  12.345000000000001
12.0345  ／  12.03  ／  12.03  ／  12.034500000000000
12.305  ／  12.30  ／  12.3  ／  12.305000000000000
```

重點 (Key points)：

- 欄位依序為：原始值 ／ 原生 `toFixed(2)` ／ `toFixedNumber(2)` ／ `toPrecision(17)`
- `1.005` 在記憶體中實際為 `1.0049999999999999`，因此捨入到 `1.00` 而非 `1.01`
- `12.305` 經 `toFixedNumber` 回傳 `12.3`（捨去尾端補零），`toFixedStringNumber` 則回傳 `'12.30'`
- 上述差異來自 JavaScript 數值型別本身，並非本套件的轉換錯誤

> 需要數學準確性 (Mathematical accuracy) 時，請改用專門計算用的模組，
> 例如 [big.js](https://github.com/MikeMcl/big.js)。

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
pnpm run lint
```

## 變更日誌 (Changelog)

詳見 [CHANGELOG.md](./CHANGELOG.md)。

## FAQ

### 為什麼 `toFixedNumber(1.005, 2)` 得到 `1` 而不是 `1.01`？

JavaScript 使用 IEEE 754 雙精度浮點數 (Double-Precision Floating Point)，部分十進位數值無法精確表示：`1.005` 在記憶體中略小於 `1.005`，因此 `toFixed(2)` 得到 `'1.00'`，再經 `parseFloat` 捨去尾端的零後成為 `1`。`toFixedNumber` 的行為與 `parseFloat(n.toFixed(fractionDigits))` 完全一致，因此會反映內建方法的捨入 (Rounding) 結果。若需要特定的捨入演算法，請自行於呼叫前後處理。

### `toFixedNumber` 與 `toFixedStringNumber` 該用哪一個？

需要保留補零（例如 `1.00`）或直接顯示時，使用 `toFixedStringNumber`；需要後續數值運算時，使用 `toFixedNumber`（捨去尾端多餘的零）。

## 相關資源 (Related Resources)

- [套件原始碼 (Repository)](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-num/to-fixed-number)
- [問題回報 (Issue Tracker)](https://github.com/bluelovers/ws-random/issues)
