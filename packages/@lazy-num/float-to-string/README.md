# @lazy-num/float-to-string

將浮點數 (Float) 轉換為字串的工具函式庫，可選擇是否固定小數位數 (Fraction Digits)，並提供整數部分／小數部分的拆解與組合工具。

零相依 (Zero Dependencies)，同時輸出 CommonJS 與 ESM 格式並附帶 TypeScript 型別宣告。

## 特色 (Features)

- `floatToString` 主 API：指定 `fractionDigits` 時以 `toFixed()` 固定小數位數，未指定時保留數值原有的小數字串
- 提供拆解工具：`splitFloatNumberToString()` 拆字串、`splitFloatNumber()` 拆數值、`getFractionDigitsString()` 取小數部分
- 提供組合工具：`joinFloatNumber()` 將整數與小數字串接回字串
- `assertFractionDigits()` 為 TypeScript 斷言函式 (Assertion Function)，可在呼叫前驗證參數

## 安裝 (Installation)

```bash
yarn add @lazy-num/float-to-string
yarn-tool add @lazy-num/float-to-string
yt add @lazy-num/float-to-string
```

## 使用方式 (Usage)

### CommonJS

```js
const floatToString = require('@lazy-num/float-to-string');

floatToString(1.5, 2); // '1.50'
floatToString(5); // '5'
floatToString(0.37309237516003946); // '0.37309237516003946'
```

### ESM

```js
import floatToString from '@lazy-num/float-to-string';

console.log(floatToString(1.5, 2)); // 1.50
```

### 拆解與組合 (Split & Join)

```js
const {
	splitFloatNumberToString,
	getFractionDigitsString,
	splitFloatNumber,
	joinFloatNumber,
} = require('@lazy-num/float-to-string');

splitFloatNumberToString(1.5); // ['1', '5']
getFractionDigitsString(1.5); // '5'
splitFloatNumber(1.5); // [1, 0.5]
joinFloatNumber(1, '5'); // '1.5'
joinFloatNumber(5); // '5'（無小數部分時不會加上小數點）
```

### 例外 (Exception)

```js
const floatToString = require('@lazy-num/float-to-string');

// fractionDigits 為 0、非整數或非有限值 → TypeError
try
{
	floatToString(1.23, 0);
}
catch (e)
{
	console.error(e instanceof TypeError); // true
	console.error(e.message); // Invalid fractionDigits: 0
}
```

## API 文件 (API Documentation)

### floatToString(n, fractionDigits?)

主要 API，回傳 `n` 的字串表示 (String Representation)。

| 參數 (Parameter) | 型別 (Type) | 預設值 | 說明 |
| --- | --- | --- | --- |
| `n` | `number` | — | 要轉換的數值 |
| `fractionDigits` | `number` | `undefined` | 小數位數；指定時以 `toFixed()` 固定，未指定時保留原始小數字串 |

- 回傳 (Returns)：`string`
- 丟出 (Throws)：
  - `TypeError` — `fractionDigits` 經 `assertFractionDigits()` 驗證失敗（非有限值、非整數或為 `0`）
  - `RangeError` — 由 `toFixed()` 丟出（見下方「已知限制」）

### assertFractionDigits(fractionDigits?)

驗證 `fractionDigits`：必須是有限的整數且不得為 `0`，否則丟出 `TypeError`。為 TypeScript 的斷言函式 (Assertion Function)，通過後縮窄為 `number`。

### splitFloatNumberToString(float)

以 `String(float).split('.')` 拆分，回傳 `[整數部分字串, 小數部分字串?]`。沒有小數點時（例如整數或指數表示法 (Exponential Notation)）回傳長度為 1 的陣列。

### getFractionDigitsString(float)

回傳小數點後的字串；沒有小數部分時回傳 `undefined`。

### splitFloatNumber(n)

以 `Math.floor()` 拆分數值，回傳 `[整數部分, 小數部分]`，其中小數部分位於 `[0, 1)`。

### joinFloatNumber(int, float?)

將整數與小數字串組回字串；`float` 為空字串或 `undefined` 時只回傳 `String(int)`，不會產生多餘的小數點。

## 已知限制 (Known Limitations)

以下行為來自目前實作，使用時請留意：

- **負數 (Negative Numbers)**：未指定 `fractionDigits` 時以 `Math.floor()` 拆分，負數會得到錯誤結果，例如 `floatToString(-1.5)` 回傳 `'-2.5'`、`floatToString(-0.000001)` 回傳 `'-1.999999'`。
- **指數表示法 (Exponential Notation)**：極小或極大的數值會走指數表示法，例如 `floatToString(1e-7)` 回傳 `'0'`、`floatToString(1e21)` 回傳 `'1e+21'`。
- **浮點減法誤差 (Floating-point Subtraction Error)**：未指定 `fractionDigits` 時，`n - Math.floor(n)` 可能放大表示誤差，例如 `floatToString(1.2345)` 回傳 `'1.23449999999999993'`；需要固定長度時請指定 `fractionDigits`。
- **`fractionDigits` 範圍**：`assertFractionDigits()` 只檢查「有限、整數、非 0」，因此 `0` 會丟 `TypeError`，但 `-1` 或 `101` 會通過驗證後才由 `toFixed()` 丟出 `RangeError`。

## 開發 (Development)

本套件為 monorepo（pnpm + lerna）中的套件，常用指令：

```bash
pnpm run build        # 以 tsdx 建置 dist/，並產生 dist/index.d.ts
pnpm run test:jest    # 執行 Jest 測試
pnpm run lint         # 執行 ESLint
```

## 變更日誌 (Changelog)

請參閱 [CHANGELOG.md](./CHANGELOG.md)。
