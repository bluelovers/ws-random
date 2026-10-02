# @lazy-random/rng-factory

`@lazy-random/rng-factory` 提供亂數產生器工廠 (RNG Factory) `RNGFactory()`，依第一個參數決定要建立哪一種亂數產生器 (Random Number Generator)，讓呼叫端不必自行記住各演算法的類別名稱。

## 特色 (Features)

- 單一入口 `RNGFactory()` 即可建立多種內建演算法的實例
- 支援以字串鍵 (String Key) 選擇內建實作，例如 `'xor128'`、`'seedrandom'`、`'crypto'`
- 可直接傳入既有的 RNG 實例，工廠會原樣回傳，方便統一處理介面
- 可傳入函式 (Function)，自動包裝為 `RNGFunction`
- 內建多種預設演算法：`math-random`、`math-random2`、`seedrandom`、`xor128`、`crypto` 等
- 同時輸出 CommonJS 與 ESM 產物，並附帶 TypeScript 型別宣告檔 (Type Declarations)

## 安裝 (Installation)

```bash
pnpm add @lazy-random/rng-factory
npm install @lazy-random/rng-factory
yarn add @lazy-random/rng-factory
yarn-tool add @lazy-random/rng-factory
yt add @lazy-random/rng-factory
```

## 使用方式 (Usage)

```ts
import RNGFactory from '@lazy-random/rng-factory';

// 以字串鍵選擇內建演算法 / Pick a built-in algorithm by string key
const rng = RNGFactory('xor128');

// 不傳參數時使用預設實作 / Uses the default implementation when called with no arguments
const rng2 = RNGFactory();
```

傳入自訂函式 (Function) 時會自動包裝成 `RNGFunction`：

```ts
import RNGFactory from '@lazy-random/rng-factory';

const rng = RNGFactory(() => Math.random());
```

既有的 RNG 實例可直接傳入，工廠會原樣回傳：

```ts
import RNGFactory from '@lazy-random/rng-factory';
import { RNGXOR128 } from '@lazy-random/generators-xor128';

const instance = new RNGXOR128();
const rng = RNGFactory(instance);
```

## API 文件 (API Reference)

### `RNGFactory(...args)`

亂數產生器工廠 (RNG Factory)，依第一個參數的型別 (Type) 分派到對應的建立流程。

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `arg0` | `string` | 內建字串鍵 (Built-in String Key)，查表取得對應的 RNG 類別 |
| `arg0` | `function` | 產生器函式 (Generator Function)，包裝為 `RNGFunction` |
| `arg0` | `RNG` | 既有的 RNG 實例，直接原樣回傳 |
| `...rest` | `any[]` | 其餘參數轉交給 RNG 建構子 (Constructor) |

- **回傳 (Returns)**：對應的 RNG 實例；完全不傳參數時回傳預設實作
- **拋出 (Throws)**：`TypeError` — 第一個參數無法辨識為任何合法的 RNG 表示法（訊息為 `invalid RNG "..."`）

#### 內建字串鍵 (Built-in String Keys)

| 鍵 (Key) | 對應類別 (Class) |
| --- | --- |
| `'default'` | `RNGMathRandom2` |
| `'math-random'` | `RNGMathRandom` |
| `'math-random2'` | `RNGMathRandom2` |
| `'xor128'` | `RNGXOR128` |
| `'seedrandom'` | `RNGSeedRandom` |
| `'crypto'` | `RNGCrypto` |
| `'function'` | `RNGFunction` |

> 註：傳入未註冊的字串鍵會拋出 `TypeError`，而非回傳 `undefined`。
> Note: An unregistered key throws a `TypeError` instead of returning `undefined`.

### `IRNGFactoryType`

`RNGFactory()` 可接受的第一個參數型別 (Type Alias)：內建字串鍵、既有的 RNG 實例，或種子函式 (Seed Function)。

## 設定 (Configuration)

本套件不需要額外設定，直接呼叫 `RNGFactory()` 即可；若要使用可重複的亂數序列 (Reproducible Sequence)，請傳入種子 (Seed) 給對應的 RNG 建構子。

## 相依套件 (Dependencies)

| 套件 (Package) | 用途 (Purpose) |
| --- | --- |
| `@lazy-random/rng-abstract` | 提供抽象基底類別 `RNG` |
| `@lazy-random/generators-crypto` | 以加密亂數 (Cryptographic Random) 為基礎的實作 |
| `@lazy-random/generators-math-random` | 基於 `Math.random()` 的實作 |
| `@lazy-random/generators-math-random2` | `Math.random()` 的進階實作（預設實作） |
| `@lazy-random/generators-seedrandom` | 整合 `seedrandom` 的實作 |
| `@lazy-random/generators-xor128` | XOR128 演算法實作 |
| `@lazy-random/generators-function` | 將函式包裝為 RNG 的實作 |

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
pnpm run lint
```

## 變更日誌 (Changelog)

本套件的版本變更請見 [CHANGELOG.md](./CHANGELOG.md)。

## 常見問題 (FAQ)

### 傳入不認識的字串會發生什麼？

`RNGFactory()` 會拋出 `TypeError: invalid RNG "..."`，不會靜默回傳 `undefined`。

### 可以混用字串鍵與既存實例嗎？

可以。傳入的參數若是 `RNG` 的實例就會原樣回傳，因此呼叫端可以統一以 `RNGFactory(...)` 取得 RNG，不必區分呼叫者給的是字串還是物件。

### `RNGFactory()` 不傳參數時用哪種演算法？

使用 `'default'` 鍵對應的 `RNGMathRandom2`。

## 相關資源 (Resources)

- [原始碼 Repository](https://github.com/bluelovers/ws-random)
- [問題回報 (Issues)](https://github.com/bluelovers/ws-random/issues)
