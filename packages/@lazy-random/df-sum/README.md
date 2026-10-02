# @lazy-random/df-sum

產生「總和固定 (Fixed Sum)」的亂數 (Random Number) 數列的分佈 (Distribution) 套件，回傳一個可反覆呼叫的閉包 (Closure)，每次呼叫即產生一組符合指定總和的數列。

支援整數版 `dfRandSumInt` 與浮點數版 `dfRandSumFloat`，可用於需要「湊出固定預算／固定總額」的抽樣情境，例如配點、分配權重、模擬消費金額等。

## 特色 (Features)

- 產生指定長度 `size`、總和 `sum` 的隨機數列 (Random Array)
- 內建整數版 `dfRandSumInt` 與浮點數版 `dfRandSumFloat`
- 可指定每個元素的範圍 `min` / `max`
- 浮點數版支援小數位數限制 `fractionDigits`
- 整數版支援 `limit` 調整抽樣嘗試次數，並附帶快取 (Cache) 後備值
- 透過 `expect` 驗證輸入參數，參數不合規時拋出錯誤 (Throw)

## 安裝 (Installation)

```bash
yarn add @lazy-random/df-sum
yarn-tool add @lazy-random/df-sum
yt add @lazy-random/df-sum
```

或使用 pnpm：

```bash
pnpm add @lazy-random/df-sum
```

## 使用方式 (Usage)

### 整數版 `dfRandSumInt`

```ts
import { dfRandSumInt } from '@lazy-random/df-sum';

// 產生 5 個總和為 100 的整數
const gen = dfRandSumInt(random, 5, 100);

const values = gen();
console.log(values);
```

### 浮點數版 `dfRandSumFloat`

```ts
import { dfRandSumFloat } from '@lazy-random/df-sum';

// 產生 3 個總和為 1 的浮點數，並限制小數位數為 5 位
const gen = dfRandSumFloat(random, 3, 1, undefined, undefined, 5);

const values = gen();
console.log(values);
```

## API 文件 (API Documentation)

### `dfRandSumInt(random, size, sum?, min?, max?, limit?)`

建立產生整數數列的產生器函式 (Generator Function)。

| 參數 (Parameter) | 型別 (Type) | 預設值 | 說明 |
| --- | --- | --- | --- |
| `random` | `IRNGLike` | — | 亂數來源 (Random Number Generator)，需實作 `next()` |
| `size` | `number` | — | 數列長度，必須為大於 1 的整數 |
| `sum` | `number?` | `sum_1_to_n(size)` | 期望總和；未指定時取 `1+2+...+size` |
| `min` | `number?` | `sum > 0 ? 0 : sum` | 每個元素的下限 (Minimum) |
| `max` | `number?` | `Math.abs(sum)` | 每個元素的上限 (Maximum) |
| `limit` | `number?` | `5` | 每次抽樣嘗試的規模，數值越低越快但越容易失敗 |

**回傳 (Returns)**：`() => number[]` — 每次呼叫回傳一組長度為 `size`、總和為 `sum` 的整數數列。

**拋出 (Throws)**：

- 參數驗證失敗時（例如 `size <= 1`、非整數等）拋出錯誤。
- 找不到可行解時拋出 `can't generator value by current input argv, or try set limit for high number`，此時可調整 `limit`。

### `dfRandSumFloat(random, size, sum?, min?, max?, fractionDigits?)`

建立產生浮點數數列的產生器函式。

| 參數 (Parameter) | 型別 (Type) | 預設值 | 說明 |
| --- | --- | --- | --- |
| `random` | `IRNGLike` | — | 亂數來源，需實作 `next()` |
| `size` | `number` | — | 數列長度，必須為大於 1 的整數 |
| `sum` | `number?` | `1.0` | 期望總和；未指定且有 `min`/`max` 時取 `(size - 1) * min + max` |
| `min` | `number?` | `sum > 0 ? 0 : sum` | 每個元素的下限 |
| `max` | `number?` | `Math.abs(sum)` | 每個元素的上限 |
| `fractionDigits` | `number?` | — | 小數位數 (Fraction Digits)，須為大於 0 的整數 |

**回傳 (Returns)**：`() => number[]` — 每次呼叫回傳一組長度為 `size`、總和約為 `sum` 的浮點數數列。

## 設定 (Configuration)

本套件無額外設定檔，所有行為皆由上述函式參數控制。

## 開發 (Development)

```bash
pnpm run test
pnpm run build
```

## 變更日誌 (Changelog)

請見 [CHANGELOG.md](./CHANGELOG.md)。

## 相關資源 (Related Resources)

- [Repository](https://github.com/bluelovers/ws-random)
