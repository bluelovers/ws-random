# anybase2

node 模組 (node_module)，可於 2 ... 62 進位制 (Numeric Base) 之間任意互相轉換。

fork from https://github.com/gvarsanyi/anybase

## 特色 (Features)

- 支援 2 ... 62 進位制之間的雙向轉換 (bidirectional conversion)
- 提供 node.js API 與命令列工具 (CLI) 兩種使用方式
- 可指定輸出的最小／最大位數 (minimum/maximum digits)，不足處以 `0` 補齊、超出則截斷

## 限制 (Limits)

- Will only accept numeric bases 2 ... 62 (included)
- JavaScript number type limit (positive integers: 0 ... 2^53 - 1)
- No negative numbers
- No decimals
- Minimum and maximum output digits limit: 64

## 數值對照表 (Digit Mapping)

- 0..9 to 0..9
- A..Z to 10..35
- a..z to 36..61

## 安裝 (Installation)

### 作為專案依賴 (As a dependency)

```bash
npm install anybase2
```

### 全域安裝以使用命令列工具 (Global install for CLI)

```bash
npm install -g anybase2
```

## 使用方式 (Usage)

### node.js

```js
var anybase = require('anybase2').default;

target_base     = 2
original_number = '11'
original_base   = 8

// prints 1001
console.log(anybase(target_base, original_number, original_base));

// prepend with zeros to make it 8 characters
minimum_digits = 8
// prints 00001001
console.log(anybase(target_base, original_number, original_base, minimum_digits));

// prepend with zeros to make it 8 characters
minimum_digits = 2
maximum_digits = 2
// prints 01
console.log(anybase(target_base, original_number, original_base, minimum_digits, maximum_digits));
```

### 命令列 (CLI)

```bash
anybase 2 11 8 # prints 1001
anybase 2 11 8 8 # prints 00001001
anybase 2 1 2 2 # prints 01
```

## API

### `anybase(target_base, original_number, original_base = 10, minimum_digits = 0, maximum_digits = 0): string`

將 `original_number` 由 `original_base` 轉換為 `target_base`。
Convert `original_number` from `original_base` to `target_base`.

| 參數 (Parameter) | 型別 (Type) | 預設值 | 說明 (Description) |
| --- | --- | --- | --- |
| `target_base` | `number` | — | 目標進位制 (target numeric base)，範圍 2 ... 62 |
| `original_number` | `string \| number` | — | 原始數字 (original number) |
| `original_base` | `number` | `10` | 原始進位制 (original numeric base)，範圍 2 ... 62 |
| `minimum_digits` | `number` | `0` | 最小位數 (minimum digits)，不足以 `0` 補齊，範圍 0 ... 64 |
| `maximum_digits` | `number` | `0` | 最大位數 (maximum digits)，超出則截斷，範圍 0 ... 64 |

- 回傳值 (Returns)：轉換後的字串 (converted string)，空字串輸入回傳 `'0'`
- 丟出例外 (Throws)：進位制／位數超出允許範圍，或數字包含該進位制不支援的字元時拋出 `Error`

## 開發 (Development)

```bash
pnpm run test            # 執行測試 (run tests)
pnpm run test:jest       # 執行覆蓋率測試 (run tests with coverage)
pnpm run lint            # 檢查程式碼風格 (run eslint)
```

## 變更日誌 (Changelog)

- [CHANGELOG.md](./CHANGELOG.md)
