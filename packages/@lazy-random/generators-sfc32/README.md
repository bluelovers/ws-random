# @lazy-random/generators-sfc32

以 SFC32（Small Fast Counting 32-bit）擬隨機演算法 (PRNG Algorithm) 為核心的可設定種子 (Seedable) 亂數產生器 (Random Number Generator)，隸屬 `@lazy-random` 系列套件。

本套件以 `RNGSfc32` 類別繼承 `@lazy-random/rng-abstract-core` 的 `RNGCore`，內部透過 `@lazy-num/float-algorithm` 的 `df_sfc32` 產生亂數 (Random Number)；不論傳入字串、數字或陣列，種子 (Seed) 都會先由 `@lazy-random/seed-algorithm` 的 `seedFromStringOrNumberOrArray(seed, 4)` 正規化為四個 32 位元整數 (32-bit Integer) 組成的 128 位元狀態。

## 特色 (Features)

- 128 位元狀態（四個 32 位元整數）的 SFC32 擬隨機演算法 (PRNG Algorithm)
- 種子 (Seed) 支援字串、數字與陣列（含字串陣列），統一正規化為四元組狀態
- `seedable` 回傳 `true`，可隨時以 `seed()` 重新播种 (Reseed)
- 繼承 `RNGCore`，可與 `@lazy-random` 系列的其他產生器共用同一套介面
- 同時提供 CommonJS (`dist/index.cjs`) 與 ECMAScript Module (`dist/index.esm.mjs`) 兩種輸出，並附帶型別宣告 (`dist/index.d.ts`)

## 安裝 (Installation)

```bash
yarn add @lazy-random/generators-sfc32
yarn-tool add @lazy-random/generators-sfc32
yt add @lazy-random/generators-sfc32
```

## 使用方式 (Usage)

基本用法：

```ts
import RNGSfc32 from '@lazy-random/generators-sfc32'

const rng = new RNGSfc32('my seed')

console.log(rng.name) // 'sfc32'
console.log(rng.next()) // 取得下一個 [0, 1) 區間的亂數 (Random Number)
```

以數字陣列作為種子，並重新播种 (Reseed)：

```ts
import { RNGSfc32 } from '@lazy-random/generators-sfc32'

const rng = new RNGSfc32([1, 2, 3, 4])

rng.seed('another seed')
console.log(rng.next())
```

## API 文件 (API Documentation)

### `class RNGSfc32`

繼承自 `RNGCore`，以 `df_sfc32` 為內部亂數來源 (Random Source)。

#### `constructor(seed?, opts?, ...argv)`

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `seed` | `ISeedInputFromStringOrNumberOrArray` | 種子 (Seed)，可為字串、數字或陣列；傳入後一律經 `seedFromStringOrNumberOrArray(seed, 4)` 正規化 |
| `opts` | `any` | 保留參數 (Reserved)，目前 `_init()` 未使用 |
| `...argv` | `any[]` | 其餘參數，原樣轉交基類 (Forwarded to the base class) |

#### `seed(seed?, opts?, ...argv): void`

重新播种 (Reseed)：以與 `_init()` 相同的正規化流程重建 `_seed` 與 `_rng`，後續 `next()` 會產生新的亂數序列 (Random Sequence)。

#### `get seedable(): boolean`

固定回傳 `true`，表示此產生器可設定種子 (Seedable)，基類允許呼叫 `seed()`。

#### `next(): number`

取下一個亂數 (Random Number)，回傳 `[0, 1)` 區間的浮點數 (Float)。

#### `get name(): string`

回傳產生器名稱 (Generator Name) `'sfc32'`，用於除錯或辨識目前使用的演算法。

### 型別 (Types)

| 型別 (Type) | 說明 (Description) |
| --- | --- |
| `IRNGSfc32SeedTypes` | 正規化後的種子狀態 (Seed State)：`readonly [number, number, number, number]`，四個 32 位元整數 |

### 預設匯出 (Default Export)

`RNGSfc32` 同時為具名匯出 (Named Export) 與預設匯出。

## 開發 (Development)

專案根目錄使用 pnpm + lerna 的 monorepo 結構，本套件常見指令：

```bash
pnpm run build   # 以 tsdx 建置 dist，並輸出型別宣告
pnpm run test    # 執行測試
pnpm run lint    # 執行 ESLint
```

## 變更日誌 (Changelog)

請見 [CHANGELOG.md](./CHANGELOG.md)。

## 相關資源 (Related Resources)

- 原始碼倉庫 (Repository)：<https://github.com/bluelovers/ws-random>
- 問題回報 (Issues)：<https://github.com/bluelovers/ws-random/issues>
- 相依套件 (Dependencies)：[@lazy-num/float-algorithm](https://www.npmjs.com/package/@lazy-num/float-algorithm)、[@lazy-random/rng-abstract-core](https://www.npmjs.com/package/@lazy-random/rng-abstract-core)、[@lazy-random/seed-algorithm](https://www.npmjs.com/package/@lazy-random/seed-algorithm)
