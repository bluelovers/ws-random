# @lazy-random/generators-xorshift128

包裝 [xorshift128](https://en.wikipedia.org/wiki/Xorshift) 系列擬隨機演算法 (PRNG Algorithm) 的可設定種子 (Seedable) 亂數產生器 (Random Number Generator)，隸屬 `@lazy-random` 系列套件。

本套件以 `RNGXorShift128` 類別繼承 `@lazy-random/rng-abstract` 的 `RNG`，內部委託 (Delegate) [`@bluelovers/xorshift`](https://www.npmjs.com/package/@bluelovers/xorshift) 的 `XorShift` 類別完成狀態推進與取樣（`package.json` 描述標示為 xorshift128+）。

## 特色 (Features)

- 委託 `@bluelovers/xorshift` 的 `XorShift` 實作，無須自行管理狀態字 (State Word)
- 種子 (Seed) 可省略，由 `getRandomSeedAuto()` 自動產生；支援 `ISeedLooser` 寬鬆種子型別
- `seedable` 回傳 `true`，可隨時以 `seed()` 重新播种 (Reseed)，省略種子時自動補隨機種子
- 繼承 `RNG`，可與 `@lazy-random` 系列的其他產生器共用同一套介面
- 同時提供 CommonJS (`dist/index.cjs`) 與 ECMAScript Module (`dist/index.esm.mjs`) 兩種輸出，並附帶型別宣告 (`dist/index.d.ts`)

## 安裝 (Installation)

```bash
yarn add @lazy-random/generators-xorshift128
yarn-tool add @lazy-random/generators-xorshift128
yt add @lazy-random/generators-xorshift128
```

## 使用方式 (Usage)

基本用法（省略種子時自動產生隨機種子 (Seed)）：

```ts
import RNGXorShift128 from '@lazy-random/generators-xorshift128'

const rng = new RNGXorShift128()

console.log(rng.name) // 'xorshift128'
console.log(rng.next()) // 取得下一個亂數 (Random Number)
```

指定種子並重新播种 (Reseed)：

```ts
import RNGXorShift128 from '@lazy-random/generators-xorshift128'

const rng = new RNGXorShift128('my seed')

rng.seed('another seed')
console.log(rng.next())
```

## API 文件 (API Documentation)

### `class RNGXorShift128`

繼承自 `RNG`（`@lazy-random/rng-abstract`），內部以 `_rng: XorShift` 維護亂數狀態。

#### `constructor(seed?, opts?, ...argv)`

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `seed` | `ISeedLooser` | 種子 (Seed)，可省略；省略時由 `getRandomSeedAuto()` 自動產生 |
| `opts` | *未限定* | 轉交 `_init()` 與基類 (Forwarded to `_init()` and the base class) |
| `...argv` | *未限定* | 其餘參數，原樣轉交 `_init()` (Forwarded to `_init()`) |

建構流程：先呼叫 `super()`，再於 `_init()` 中完成基類初始化、種子正規化 (Normalize) 與 `XorShift` 實例的建立。

#### `seed(seed?, opts?, ...argv): void`

重新播种 (Reseed)：`seed` 為 `null` 或 `undefined` 時自動以 `getRandomSeedAuto()` 補上隨機種子，再交由底層 `XorShift.seed()` 重設狀態（其餘 falsy 值如 `0` 會被保留）。

#### `next(): number`

委託底層 `XorShift.random()` 產生下一個亂數 (Random Number)。

#### `get seedable(): boolean`

固定回傳 `true`，表示此產生器可設定種子 (Seedable)。

#### `get name(): string`

回傳產生器名稱 (Generator Name) `'xorshift128'`。

### 預設匯出 (Default Export)

`RNGXorShift128` 同時為具名匯出 (Named Export) 與預設匯出。

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
- 相依套件 (Dependencies)：[@bluelovers/xorshift](https://www.npmjs.com/package/@bluelovers/xorshift)、[@lazy-random/rng-abstract](https://www.npmjs.com/package/@lazy-random/rng-abstract)
