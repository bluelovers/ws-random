# @lazy-random/seed-date

`@lazy-random/seed-date` 提供以日期時間 (Date) 為基礎的種子 (Seed) 產生函式，將毫秒時間戳記與 `[0, 1)` 的亂數浮點 (Random Float) 組合，產生亂數產生器 (Random Number Generator) 可直接使用的數值型或字串型種子。

## 特色 (Features)

- 數值型種子 (Numeric Seed)：`seedFloatByDate()` / `seedFloatByNow()`，回傳時間戳記加亂數小數的 `number`
- 字串型種子 (String Seed)：`seedStringByDate()` / `seedStringByNow()`，將數值種子完整轉為字串
- 可注入自訂的亂數浮點來源 (Random Float Source)，未提供時退回 `_MathRandom()`（未被改寫的原始 `Math.random()`）
- 字串轉換交由 `@lazy-num/float-to-string` 處理，保留毫秒以下的小數資訊，降低同毫秒內的種子碰撞
- 同時輸出 CommonJS 與 ESM 產物，並附帶 TypeScript 型別宣告檔 (Type Declarations)

## 安裝 (Installation)

```bash
pnpm add @lazy-random/seed-date
npm install @lazy-random/seed-date
yarn add @lazy-random/seed-date
yarn-tool add @lazy-random/seed-date
yt add @lazy-random/seed-date
```

## 使用方式 (Usage)

以當下時間取得種子：

```ts
import { seedFloatByNow, seedStringByNow } from '@lazy-random/seed-date';

const floatSeed = seedFloatByNow();
const stringSeed = seedStringByNow();
```

以指定時間取得種子：

```ts
import { seedFloatByDate, seedStringByDate } from '@lazy-random/seed-date';

const date = new Date('2020-01-01T00:00:00.000Z');

const floatSeed = seedFloatByDate(date);
const stringSeed = seedStringByDate(date);
```

注入自訂的亂數浮點來源 (Random Float Source)：

```ts
import { seedFloatByNow } from '@lazy-random/seed-date';

const seed = seedFloatByNow(() => Math.random());
```

## API 文件 (API Reference)

### `IFnRandomFloat`

亂數浮點來源的型別 (Type Alias)：`() => number`，回傳 `[0, 1)` 浮點數的函式。

### `seedFloatByDate(date: Date, fnRandomFloat: IFnRandomFloat): number`

以指定時間產生數值型種子 (Numeric Seed)：`date.valueOf()` 作為整數基底，加上 `[0, 1)` 的亂數小數部分。

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `date` | `Date` | 時間來源，取其毫秒時間戳記 |
| `fnRandomFloat` | `IFnRandomFloat` | 產生 `[0,1)` 浮點的函式；未提供時實作會退回 `_MathRandom()` |

- **回傳 (Returns)**：`number` — 數值型種子

> 註：型別宣告上 `fnRandomFloat` 為必要參數，但實作以 `??` 提供預設值（已以 `TODO` 記錄於原始碼）。
> Note: the type declares `fnRandomFloat` as required while the implementation provides a `??` default (recorded as a `TODO` in the source).

### `seedFloatByNow(fnRandomFloat?: IFnRandomFloat): number`

以當下時間 (`new Date()`) 產生數值型種子，等同於 `seedFloatByDate(new Date(), fnRandomFloat)`。

### `seedStringByDate(date: Date, fnRandomFloat?: IFnRandomFloat): string`

以指定時間產生字串型種子 (String Seed)：先取 `seedFloatByDate()` 的數值，再以 `floatToString()` 完整轉為字串，保留毫秒以下的小數資訊。

### `seedStringByNow(fnRandomFloat?: IFnRandomFloat): string`

以當下時間產生字串型種子，等同於 `seedStringByDate(new Date(), fnRandomFloat)`。

## 相依套件 (Dependencies)

| 套件 (Package) | 用途 (Purpose) |
| --- | --- |
| `@lazy-num/float-to-string` | 將數值種子轉為字串的 `floatToString()` |
| `@lazy-random/original-math-random` | 提供未被改寫 (Unpatched) 的原始 `Math.random()`（`_MathRandom()`） |

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
pnpm run lint
```

## 變更日誌 (Changelog)

本套件的版本變更請見 [CHANGELOG.md](./CHANGELOG.md)。

## 常見問題 (FAQ)

### 為什麼種子要「時間 + 亂數」？

單純使用時間戳記時，同一毫秒內建立的多個種子會完全相同；加上 `[0, 1)` 的亂數小數部分後，可補足毫秒以下的熵 (Entropy)，同時仍保留可辨識的時間資訊。

### 可以用自己的亂數來源嗎？

可以。`fnRandomFloat` 參數接受任何回傳 `[0, 1)` 浮點的函式；省略時才會退回 `_MathRandom()`。

### 字串種子與數值種子有何差異？

兩者來自同一個數值種子；字串種子只是再經過 `floatToString()` 轉換，方便需要字串輸入的 RNG（如 `seedrandom`）使用，且不會遺失小數部分。

## 相關資源 (Resources)

- [原始碼 Repository](https://github.com/bluelovers/ws-random)
- [問題回報 (Issues)](https://github.com/bluelovers/ws-random/issues)
