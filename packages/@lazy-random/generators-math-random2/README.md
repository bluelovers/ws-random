# @lazy-random/generators-math-random2

以瀏覽器／Node.js 原生 `Math.random` 為亂數 (Random Number) 來源的亂數產生器 (Random Number Generator)，隸屬 `@lazy-random` 系列套件。

本套件將原生 `Math.random` 包裝為 `RNGMathRandom2` 類別，繼承自 `@lazy-random/generators-function` 的 `RNGFunction`，讓「以函式 (Function) 為基礎」的亂數來源能與其他演算法共用同一套介面。

## 特色 (Features)

- 直接包裝原生 `Math.random`，無須設定種子 (Seed) 即可使用
- 繼承 `RNGFunction`，可與 `@lazy-random` 系列的其他產生器互換使用
- 同時提供 CommonJS (`dist/index.cjs`) 與 ECMAScript Module (`dist/index.esm.mjs`) 兩種輸出，並附帶型別宣告 (`dist/index.d.ts`)

## 安裝 (Installation)

```bash
yarn add @lazy-random/generators-math-random2
yarn-tool add @lazy-random/generators-math-random2
yt add @lazy-random/generators-math-random2
```

## 使用方式 (Usage)

```ts
import RNGMathRandom2 from '@lazy-random/generators-math-random2'

const rng = new RNGMathRandom2()

console.log(rng.name) // 'math-random2'
```

若要沿用指定的亂數來源函式，可在建構子 (Constructor) 的第一個參數傳入：

```ts
import RNGMathRandom2 from '@lazy-random/generators-math-random2'

const rng = new RNGMathRandom2(myRandomFunction)
```

## API 文件 (API Documentation)

### `class RNGMathRandom2`

繼承自 `RNGFunction<typeof _MathRandom>`，預設以 `@lazy-random/original-math-random` 提供的 `_MathRandom` 作為亂數來源。

#### `constructor(seed?, opts?, ...argv)`

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `seed` | `typeof _MathRandom` | 亂數來源函式 (Random source function)；省略或傳入假值 (Falsy) 時，回退為預設的 `_MathRandom` |
| `opts` | *未限定* | 傳給基類 `RNGFunction` 的選項 (Options) |
| `...argv` | *未限定* | 其餘參數，原樣轉交基類 (Forwarded to the base class) |

#### `get name(): string`

回傳產生器名稱 (Generator Name) `'math-random2'`，用於除錯或辨識目前使用的演算法。

### 預設匯出 (Default Export)

`RNGMathRandom2` 同時為具名匯出 (Named Export) 與預設匯出。

## 開發 (Development)

專案根目錄使用 pnpm + lerna 的 monorepo 結構，本套件常見指令：

```bash
pnpm run build   # 以 tsdx 建置 dist
pnpm run test    # 執行測試
pnpm run lint    # 執行 ESLint
```

## 變更日誌 (Changelog)

請見 [CHANGELOG.md](./CHANGELOG.md)。

## 相關資源 (Related Resources)

- 原始碼倉庫 (Repository)：<https://github.com/bluelovers/ws-random>
- 問題回報 (Issues)：<https://github.com/bluelovers/ws-random/issues>
- 相依套件 (Dependency)：[@lazy-random/generators-function](https://www.npmjs.com/package/@lazy-random/generators-function)、[@lazy-random/original-math-random](https://www.npmjs.com/package/@lazy-random/original-math-random)
