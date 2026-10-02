# @lazy-random/generators-xor128

以 xorshift128 擬隨機演算法 (PRNG Algorithm) 為核心的可設定種子 (Seedable) 亂數產生器 (Random Number Generator)，隸屬 `@lazy-random` 系列套件。

本套件以 `RNGXOR128` 類別繼承 `@lazy-random/rng-abstract` 的 `RNG`，內部以 `x`、`y`、`z`、`w` 四個 32 位元狀態字 (State Word) 維護 128 位元狀態 (128-bit State)，每次 `next()` 推進一輪狀態並將結果映射為 `[0, 1)` 區間的亂數 (Random Number)。

## 特色 (Features)

- 128 位元狀態的 xorshift128 擬隨機演算法 (PRNG Algorithm)，無外部相依演算法庫
- 支援單一種子 (Seed) 或逐字指定四個狀態字的兩種建構方式，省略的位置以 `randomSeedNum()` 補齊
- `seedable` 回傳 `true`，可隨時以 `seed()` 重新播种 (Reseed)，並自動捨棄開頭 64 個輸出做預熱 (Warm-up)
- 提供 `clone()` 複製實例
- 同時提供 CommonJS (`dist/index.cjs`) 與 ECMAScript Module (`dist/index.esm.mjs`) 兩種輸出，並附帶型別宣告 (`dist/index.d.ts`)

## 安裝 (Installation)

```bash
yarn add @lazy-random/generators-xor128
yarn-tool add @lazy-random/generators-xor128
yt add @lazy-random/generators-xor128
```

## 使用方式 (Usage)

基本用法（省略的狀態字以隨機數補齊）：

```ts
import RNGXOR128 from '@lazy-random/generators-xor128'

const rng = new RNGXOR128()

console.log(rng.name) // 'xor128'
console.log(rng.next()) // 取得下一個 [0, 1) 區間的亂數 (Random Number)
```

以單一種子建立：

```ts
import RNGXOR128 from '@lazy-random/generators-xor128'

const rng = new RNGXOR128('my seed')
```

逐字指定四個狀態字 (State Word)：

```ts
import RNGXOR128 from '@lazy-random/generators-xor128'

const rng = new RNGXOR128(1, 2, 3, 4)
```

重新播种 (Reseed) 與複製 (Clone)：

```ts
rng.seed('another seed')
const copied = rng.clone()
```

## API 文件 (API Documentation)

### `class RNGXOR128`

繼承自 `RNG`（`@lazy-random/rng-abstract`）。

#### `constructor(seed?, ...argv)` / `constructor(x?, y?, z?, w?, ...argv)`

兩種簽章：

- `(seed, ...argv)`：以單一種子初始化，四個狀態字中省略者以 `randomSeedNum()` 補齊
- `(x?, y?, z?, w?, ...argv)`：逐字指定四個狀態字，同樣以 `randomSeedNum()` 補齊省略值

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `seed` / `x` | `number` | 第一個狀態字 (First state word) 或單一種子 (Single seed)；傳入非數字時由 `_seedNum()` 轉換 |
| `y` / `z` / `w` | `number` | 其餘狀態字 (Remaining state words)，可省略；傳入非數字時沿用目前狀態 |
| `...argv` | `any[]` | 其餘參數，原樣轉交 `_init()` |

#### `next(): number`

推進一輪 xorshift128 狀態 (State)，回傳 `[0, 1)` 區間的浮點數 (Float)。

#### `seed(seed?, opts?, ...argv): void`

重新播种 (Reseed)：以新值重設狀態字，並捨棄開頭 64 個輸出做預熱 (Warm-up)，確保序列避開未充分混合的初始狀態。

> 注意 (Note)：參數依位置 (Positional) 傳入內部 `_seed(x, y, z, w)`，因此第二個參數（基類簽章名為 `opts`）在本實作中對應狀態字 `y`；傳入非數字時會沿用目前狀態。

#### `clone(seed?, opts?, ...argv): RNGXOR128`

以目前實例的狀態複製出新的 `RNGXOR128`。

#### `get name(): string`

回傳產生器名稱 (Generator Name) `'xor128'`。

#### `get seedable(): boolean`

固定回傳 `true`，表示此產生器可設定種子 (Seedable)。

### 預設匯出 (Default Export)

`RNGXOR128` 同時為具名匯出 (Named Export) 與預設匯出。

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
- 相依套件 (Dependencies)：[@lazy-random/rng-abstract](https://www.npmjs.com/package/@lazy-random/rng-abstract)、[@lazy-random/seed-token](https://www.npmjs.com/package/@lazy-random/seed-token)、[@lazy-random/clone-class](https://www.npmjs.com/package/@lazy-random/clone-class)
