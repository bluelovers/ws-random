# @lazy-random/df-uniform

均勻分佈 (Uniform Distribution) 的亂數 (Random Number) 產生器集合，回傳一個可反覆呼叫的閉包 (Closure)，每次呼叫即產生一個服從均勻分佈的值。

提供浮點數、整數、布林值 (Boolean)、位元組 (Byte) 等多種變體，是本專案其他分佈 (Distribution) 套件的基礎元件之一。

## 特色 (Features)

- `dfUniformFloat`：區間 `[min, max)` 的浮點數，支援小數位數限制 (Fraction Digits)
- `dfUniformInt`：區間 `[min, max]` 的整數（含端點）
- `dfUniformBoolean`：依機率門檻 (Likelihood Threshold) 回傳布林值
- `dfUniformByte`：`0` ～ `255` 的位元組，可選擇回傳數值或十六進制字串 (Hex String)
- `dfUniformBytes`：一次產生多個位元組的陣列
- 所有函式皆依賴 `IRNGLike` 介面的 `next()`，可搭配任意亂數來源 (Random Number Generator)

## 安裝 (Installation)

```bash
yarn add @lazy-random/df-uniform
yarn-tool add @lazy-random/df-uniform
yt add @lazy-random/df-uniform
```

或使用 pnpm：

```bash
pnpm add @lazy-random/df-uniform
```

## 使用方式 (Usage)

```ts
import {
	dfUniformFloat,
	dfUniformInt,
	dfUniformBoolean,
	dfUniformByte,
	dfUniformBytes,
} from '@lazy-random/df-uniform';

// [0, 1) 的浮點數
const float01 = dfUniformFloat(random);

// [10, 42) 的浮點數
const floatRange = dfUniformFloat(random, 10, 42);

// [0, 100] 的整數（含端點）
const intRange = dfUniformInt(random, 0, 100);

// 約 30% 機率為 true 的布林值（true 機率 = 1 - likelihood）
const bool = dfUniformBoolean(random, 0.7);

// 0～255 的位元組
const byte = dfUniformByte(random);

// 16 個位元組組成的陣列
const bytes = dfUniformBytes(random, 16);
```

## API 文件 (API Documentation)

### `dfUniformFloat(random, min?, max?, fractionDigits?)`

產生 `[min, max)` 區間的浮點數產生器 (Float Generator)。

| 參數 (Parameter) | 型別 (Type) | 預設值 | 說明 |
| --- | --- | --- | --- |
| `random` | `IRNGLike` | — | 亂數來源，需實作 `next()` 回傳 `[0, 1)` |
| `min` | `number?` | `0` | 區間下限 (Inclusive)；單參數呼叫時此位置視為 `max` |
| `max` | `number?` | `1` | 區間上限 (Exclusive)，必須大於 `min` |
| `fractionDigits` | `number?` | — | 小數位數 (Fraction Digits)，須為大於等於 0 的整數 |

**回傳 (Returns)**：`() => number` — 每次呼叫回傳一個 `[min, max)` 的浮點數。

**備註**：呼叫 `dfUniformFloat(random)` 等同於 `[0, 1)`；`dfUniformFloat(random, max)` 等同於 `[0, max)`。

### `dfUniformInt(random, min?, max?)`

產生 `[min, max]` 區間（含端點）的整數產生器 (Integer Generator)。

| 參數 (Parameter) | 型別 (Type) | 預設值 | 說明 |
| --- | --- | --- | --- |
| `random` | `IRNGLike` | — | 亂數來源 |
| `min` | `number?` | `0` | 區間下限（含），須為整數；單參數呼叫時此位置視為 `max` |
| `max` | `number?` | `1` | 區間上限（含），須為整數且大於 `min` |

**回傳 (Returns)**：`() => number` — 每次呼叫回傳一個 `[min, max]` 的整數。

### `dfUniformBoolean(random, likelihood?)`

產生布林值產生器 (Boolean Generator)。

| 參數 (Parameter) | 型別 (Type) | 預設值 | 說明 |
| --- | --- | --- | --- |
| `random` | `IRNGLike` | — | 亂數來源 |
| `likelihood` | `number` | `0.5` | 機率門檻 (Likelihood Threshold)，須介於 0 與 1 之間（不含端點） |

**回傳 (Returns)**：`() => boolean` — 當 `random.next() >= likelihood` 時回傳 `true`，故回傳 `true` 的機率為 `1 - likelihood`。

### `dfUniformByte(random, toStr?)`

產生 `0` ～ `255` 位元組產生器 (Byte Generator)。

| 參數 (Parameter) | 型別 (Type) | 預設值 | 說明 |
| --- | --- | --- | --- |
| `random` | `IRNGLike` | — | 亂數來源 |
| `toStr` | `boolean?` | `false` | 為 `true` 時回傳十六進制字串（如 `"1a"`），否則回傳數值 |

**回傳 (Returns)**：`() => number` 或 `() => string`，型別依 `toStr` 推斷。

### `dfUniformBytes(random, size?, toStr?)`

產生多個位元組陣列的產生器 (Bytes Generator)。

| 參數 (Parameter) | 型別 (Type) | 預設值 | 說明 |
| --- | --- | --- | --- |
| `random` | `IRNGLike` | — | 亂數來源 |
| `size` | `number?` | `1` | 位元組數量，須為大於 0 的整數 |
| `toStr` | `boolean?` | `false` | 是否以字串形式回傳，同 `dfUniformByte` |

**回傳 (Returns)**：`() => number[]` 或 `() => string[]`，陣列長度等於 `size`。

## 設定 (Configuration)

本套件無設定檔，所有行為皆由上述函式參數控制。

## 開發 (Development)

```bash
pnpm run test
pnpm run build
```

## 變更日誌 (Changelog)

請見 [CHANGELOG.md](./CHANGELOG.md)。

## 相關資源 (Related Resources)

- [Repository](https://github.com/bluelovers/ws-random)
