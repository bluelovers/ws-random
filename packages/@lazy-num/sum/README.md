# @lazy-num/sum

數列求和 (Array Sum) 與等差數列 (Arithmetic Progression) 總和的小工具：

- `sum_1_to_n(n)`：以高斯公式 (Gauss's Formula) 以 O(1) 計算 `1 + 2 + ... + n`
- `num_array_sum(na)`：加總數值陣列，並透過相依套件 (Dependency) `num-is-zero` 的 `fixZero()` 把負零 (Negative Zero, `-0`) 正規化為 `0`

## 特色 (Features)

- 等差數列總和使用公式 `n * (n + 1) / 2`，不需迴圈，時間複雜度 O(1)
- 陣列求和以 `Array.prototype.reduce()` 實作，並將結果經過 `fixZero()` 處理
- 唯一相依套件為同屬本 monorepo 的 [`num-is-zero`](https://github.com/bluelovers/ws-random/tree/master/packages/num-is-zero)
- 同時輸出 CommonJS 與 ESM 格式並附帶 TypeScript 型別宣告

## 安裝 (Installation)

```bash
yarn add @lazy-num/sum
yarn-tool add @lazy-num/sum
yt add @lazy-num/sum
```

## 使用方式 (Usage)

### CommonJS

```js
const { sum_1_to_n, num_array_sum } = require('@lazy-num/sum');

sum_1_to_n(10); // 55
sum_1_to_n(0); // 0

num_array_sum([1, 2, 3]); // 6
num_array_sum([-0]); // 0（負零 Negative Zero 會被正規化）
```

### ESM

```js
import { sum_1_to_n, num_array_sum } from '@lazy-num/sum';

console.log(sum_1_to_n(10)); // 55
console.log(num_array_sum([1, 2, 3])); // 6
```

### 例外 (Exception)

```js
const { num_array_sum } = require('@lazy-num/sum');

// 空陣列沒有初始值可供 reduce 使用
try
{
	num_array_sum([]);
}
catch (e)
{
	console.error(e instanceof TypeError); // true
	console.error(e.message); // Reduce of empty array with no initial value
}
```

## API 文件 (API Documentation)

### sum_1_to_n(n)

計算 `1 + 2 + ... + n` 的總和，使用公式 `n * (n + 1) / 2`。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `n` | `number` | 數列的末項 |

- 回傳 (Returns)：`number` — 總和

未對輸入做驗證：`n = 0` 回傳 `0`；負數或非整數一樣代入公式計算（例如 `sum_1_to_n(-3)` 回傳 `3`）；`n` 超出安全整數 (Safe Integer) 範圍時需自行留意浮點誤差 (Floating-point Error)。

參考 (See)：[計算1到n總和 (1 + 2 + 3 +...+N)](http://emn178.pixnet.net/blog/post/92132837-%E8%A8%88%E7%AE%971%E5%88%B0n%E7%B8%BD%E5%92%8C%281-%2B-2-%2B-3-%2B...%2Bn%29)

### num_array_sum(na)

加總數值陣列，回傳結果會先經過 `fixZero()`（來自 `num-is-zero`）處理。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `na` | `number[]` | 要加總的數值陣列（不可為空） |

- 回傳 (Returns)：`number` — 陣列元素的總和
- 丟出 (Throws)：`TypeError` — 傳入空陣列時，`reduce()` 會丟出 `Reduce of empty array with no initial value`

```js
const { num_array_sum } = require('@lazy-num/sum');

num_array_sum([1, 2, 3]); // 6
num_array_sum([5]); // 5
num_array_sum([1, -1]); // 0
```

## 已知限制 (Known Limitations)

- **空陣列 (Empty Array)**：`num_array_sum([])` 會丟出 `reduce()` 的原生 `TypeError`，而非自訂錯誤訊息。
- **`fixZero()` 的範圍**：只會把負零 (Negative Zero, `-0`) 正規化為 `0`，**不會**修正一般浮點誤差 (Floating-point Error)，例如 `num_array_sum([0.1, 0.2])` 回傳 `0.30000000000000004`、`num_array_sum([0.1, 0.2, -0.3])` 回傳 `5.551115123125783e-17`。
- **`sum_1_to_n()` 未驗證輸入 (No Input Validation)**：負數、小數都會直接代入公式，回傳值可能不符合「1 到 n 總和」的直覺語意。

## 開發 (Development)

本套件為 monorepo（pnpm + lerna）中的套件，常用指令：

```bash
pnpm run build        # 以 tsdx 建置 dist/，並產生 dist/index.d.ts
pnpm run test:jest    # 執行 Jest 測試
pnpm run lint         # 執行 ESLint
```

## 變更日誌 (Changelog)

請參閱 [CHANGELOG.md](./CHANGELOG.md)。
