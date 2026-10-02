# @lazy-random/generators-seedrandom

基於 [seedrandom](https://github.com/davidbau/seedrandom) 的可設定種子 (Seedable) 亂數產生器 (Random Number Generator)，隸屬 `@lazy-random` 系列套件。

本套件以 `RNGSeedRandom` 類別包裝 `seedrandom`，繼承自 `@lazy-random/generators-function` 的 `RNGFunction`，除了一般的種子亂數之外，也可切換 `seedrandom` 內建的多種擬隨機演算法 (PRNG Algorithm)。

## 特色 (Features)

- 支援以任意字串、數字或函式作為種子 (Seed)，可重複重現的亂數序列 (Reproducible Sequence)
- 可切換 `seedrandom` 內建演算法：`alea`、`tychei`、`xor128`、`xor4096`、`xorshift7`、`xorwow`
- 亦可傳入 `seedrandom/lib/` 下的其他演算法名稱字串
- 預設啟用平台熵值 (Entropy)，讓未指定種子時仍能取得非固定序列
- 可讀取／還原內部狀態 (State)，並支援 `clone()` 複製實例
- 同時提供 CommonJS (`dist/index.cjs`) 與 ECMAScript Module (`dist/index.esm.mjs`) 兩種輸出，並附帶型別宣告 (`dist/index.d.ts`)

## 安裝 (Installation)

```bash
yarn add @lazy-random/generators-seedrandom
yarn-tool add @lazy-random/generators-seedrandom
yt add @lazy-random/generators-seedrandom
```

## 使用方式 (Usage)

基本用法：

```ts
import RNGSeedRandom from '@lazy-random/generators-seedrandom'

const rng = new RNGSeedRandom('my seed')

console.log(rng.name) // 'seedrandom'
```

指定 `seedrandom` 內建演算法，建議使用 `createLib()`，其參數順序為 `(lib, seed, opts)`：

```ts
import { RNGSeedRandom } from '@lazy-random/generators-seedrandom'

const rng = RNGSeedRandom.createLib('alea', 'my seed')

console.log(rng.name)
```

直接以建構子建立時，演算法名稱 (Library Name) 為第三個參數：

```ts
import { RNGSeedRandom } from '@lazy-random/generators-seedrandom'

const rng = new RNGSeedRandom('my seed', undefined, 'xor128')
```

重新指定種子 (Reseed)：

```ts
rng.seed('another seed')
```

## API 文件 (API Documentation)

### `class RNGSeedRandom`

繼承自 `RNGFunction<ISeedRandomPRNG>`，內部以 `seedrandom` 產生擬隨機數列 (Pseudorandom Sequence)。

#### `constructor(seed?, opts?, lib?, ...argv)`

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `seed` | `any` | 種子 (Seed)，可省略 |
| `opts` | `IRNGSeedRandomOptions` | 傳給 `seedrandom` 的選項 (Options)，即 `seedrandom(seed, opts)` 的第二個參數 |
| `lib` | `IRNGSeedRandomLib` | 演算法名稱字串或函式；省略時使用 `seedrandom` 預設演算法 |
| `...argv` | `any[]` | 其餘參數，原樣轉交基類 (Forwarded to the base class) |

#### `static createLib(lib?, seed?, opts?, ...argv): RNGSeedRandom`

以「演算法在最前」的參數順序建立實例，內部會重新排列為建構子的 `(seed, opts, lib)` 順序。

#### `static create(seed?, opts?, lib?, ...argv): RNGSeedRandom`

與 `new RNGSeedRandom(...)` 等價的靜態工厂方法 (Static Factory Method)。

#### `get name(): string`

回傳產生器名稱 (Generator Name)，格式為 `seedrandom`，若指定了演算法則附加 `:<演算法>` 後綴。

#### `get options(): IRNGSeedRandomOptions`

回傳目前生效的 `seedrandom` 選項 (Options)。

#### `get state(): IRNGSeedRandomState | undefined`

回傳 `seedrandom` 的內部狀態 (Internal State)，**僅在選項 `state: true` 時有值**，否則回傳 `undefined`。

#### `seed(seed?, opts?, ...argv): void`

重新指定種子並重建亂數序列。傳入 `opts === null` 會清除既有選項（`_opts` 設為 `undefined`，待下一次 `_init()` 才重新套用 `defaultOptions`）；傳入其他假值 (Falsy) 則沿用現有選項，真值 (Truthy) 才覆寫。

#### `clone(seed?, opts?, ...argv): RNGSeedRandom`

以目前實例的設定複製出新的 `RNGSeedRandom`。

### `defaultOptions: IRNGSeedRandomOptions`

以 `Object.freeze` 凍結的預設選項，內容為 `{ entropy: true }`，於 `_init()` 時套用。

### 型別 (Types)

| 型別 (Type) | 說明 (Description) |
| --- | --- |
| `IRNGSeedRandomOptions` | `seedrandom` 函式第二個參數的型別，由 `Parameters<typeof seedrandom>[1]` 推導 |
| `ISeedRandomPRNG` | `seedrandom` 回傳的擬隨機數列產生器 (PRNG)，即 `seedrandom.PRNG` |
| `IRNGSeedRandomLibName` | `seedrandom` 內建演算法名稱：`'alea' \| 'tychei' \| 'xor128' \| 'xor4096' \| 'xorshift7' \| 'xorwow'` |
| `IRNGSeedRandomLib` | 演算法名稱字串的聯合型別 (Union Type)，允許任何字串 |
| `IRNGSeedRandomState` | 內部狀態結構：`i`、`j` 索引 (Index) 與洗牌後的記憶池 `S` (Shuffled Pool) |
| `IRNGSeedRandomGenerator` | 可呼叫的亂數來源函式 (Callable Random Source) |

## 設定 (Configuration)

`seedrandom` 選項會於 `_init()` 時以 `defaultOptions`（`{ entropy: true }`）作為基底，並可於建構子或 `seed()` 呼叫時覆寫：

```ts
import { RNGSeedRandom, defaultOptions } from '@lazy-random/generators-seedrandom'

console.log(defaultOptions) // Object { entropy: true }

const rng = new RNGSeedRandom('my seed', { entropy: false, state: true })
console.log(rng.state)
```

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
- seedrandom：<https://github.com/davidbau/seedrandom>
- 相依套件 (Dependencies)：[@lazy-random/generators-function](https://www.npmjs.com/package/@lazy-random/generators-function)、[@lazy-random/clone-class](https://www.npmjs.com/package/@lazy-random/clone-class)、[@lazy-random/shared-lib](https://www.npmjs.com/package/@lazy-random/shared-lib)
