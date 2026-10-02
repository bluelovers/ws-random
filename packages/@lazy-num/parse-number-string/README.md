# @lazy-num/parse-number-string

將數字字串 (Number String) 解析為 `number` 的小工具：提供整數字串 (Integer String)、純小數字串 (Float-only String) 與整數或小數字串的型別守衛 (Type Guard) 與解析函式，格式不符時丟出 `TypeError`。

零相依 (Zero Dependencies)、`sideEffects: false`，同時輸出 CommonJS 與 ESM 格式並附帶 TypeScript 型別宣告。

## 特色 (Features)

- 三組正則 (Regular Expression) 型別守衛：`isIntString()`、`isFloatOnlyString()`、`isFloatString()`
- 三個解析函式：`parseIntString()`、`parseFloatOnlyString()`、`parseFloatString()`（同時為預設匯出 (Default Export)）
- 傳入 `number` 時原值回傳，傳入不符合格式的值時丟出 `TypeError`
- 型別安全 (Type Safe)：以 `${number}` 模板字串型別 (Template Literal Type) 描述字串輸入，多載 (Overload) 保留 `number` ↔ 字串的對應關係

## 安裝 (Installation)

```bash
yarn add @lazy-num/parse-number-string
yarn-tool add @lazy-num/parse-number-string
yt add @lazy-num/parse-number-string
```

## 使用方式 (Usage)

### CommonJS

```js
const { parseIntString, parseFloatOnlyString, parseFloatString } = require('@lazy-num/parse-number-string');

parseIntString('42'); // 42
parseIntString('-42'); // -42

parseFloatOnlyString('1.5'); // 1.5（不含整數格式）
parseFloatString('.1'); // 0.1
parseFloatString('-.1'); // -0.1
```

### ESM

```js
import parseFloatString from '@lazy-num/parse-number-string';

console.log(parseFloatString('1.5')); // 1.5
```

### 例外 (Exception)

```js
const { parseIntString, parseFloatString } = require('@lazy-num/parse-number-string');

// 不符合格式的字串 → TypeError
try
{
	parseFloatString('1e3');
}
catch (e)
{
	console.error(e instanceof TypeError); // true
	console.error(e.message); // Invalid value: 1e3
}

// 整數函式收到小數字串同樣會丟 TypeError
try
{
	parseIntString('1.5');
}
catch (e)
{
	console.error(e.message); // Invalid value: 1.5
}
```

### 型別守衛 (Type Guard)

```ts
import { isIntString, isFloatString } from '@lazy-num/parse-number-string';

const input: unknown = '42';

if (isIntString(input))
{
	// input 被縮窄為 `${number}`
	console.log(input.toUpperCase()); // '42'
}

isFloatString('1.5'); // true
isFloatString('1e3'); // false
```

## 支援的格式 (Supported Formats)

| 函式 (Function) | 正則 (Pattern) | 接受範例 | 不接受範例 |
| --- | --- | --- | --- |
| `isIntString` | `^[+-]?\d+$` | `'42'`、`'-42'`、`'+42'` | `'1.5'`、`'1e3'` |
| `isFloatOnlyString` | `^[+-]?(?:\d+)?\.\d+$` | `'1.5'`、`'.5'`、`'-.5'` | `'1.'`、`'42'` |
| `isFloatString` | 兩者取聯集 | `'42'`、`'1.5'`、`'.5'` | `'1.'`、`'1e3'`、`'Infinity'` |

小數點後必須有數字，因此 `'1.'` 這類尾隨小數點 (Trailing Decimal Point) 的字串會被拒絕；指數表示法 (Exponential Notation) 一律不接受。

## API 文件 (API Documentation)

### isIntString(input)

判斷輸入是否為整數字串，是則以型別守衛將 `input` 縮窄為 `${number}`。

### isFloatOnlyString(input)

判斷輸入是否為純小數字串（必須含小數點，且小數點後有數字）。

### isFloatString(input)

判斷輸入是否為整數或小數字串（前兩者的聯集）。

### parseIntString(input)

解析整數字串。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `input` | `number` 或 `${number}` 字串 | 數值直接回傳；字串需符合整數格式 |

- 回傳 (Returns)：`number`
- 丟出 (Throws)：`TypeError` — 傳入不符合格式的字串或其他型別（訊息為 `Invalid value: ...`）

### parseFloatOnlyString(input)

解析純小數字串（不含整數格式），其餘行為與 `parseIntString()` 相同。

### parseFloatString(input)

解析整數或小數字串，亦為本套件的預設匯出 (Default Export)。

## 已知限制 (Known Limitations)

- **數值輸入不經驗證 (Numbers Bypass Validation)**：傳入 `number` 時會原值回傳，不經過正則檢查，因此 `parseIntString(1.5)` 回傳 `1.5`，`NaN` 與 `Infinity` 也會被當作合法值。
- **超長整數字串**：符合整數格式但超出 `Number.MAX_VALUE` 的字串（例如 400 個 `9`）會轉成 `Infinity` 而不丟錯。
- **字串格式限制**：`'1.'`、`'1e3'`、`'Infinity'` 等格式一律判定為無效並丟出 `TypeError`。

## 開發 (Development)

本套件為 monorepo（pnpm + lerna）中的套件，常用指令：

```bash
pnpm run build        # 以 tsdx 建置 dist/，並產生 dist/index.d.ts
pnpm run test:jest    # 執行 Jest 測試
pnpm run lint         # 執行 ESLint
```

## 變更日誌 (Changelog)

請參閱 [CHANGELOG.md](./CHANGELOG.md)。
