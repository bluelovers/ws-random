# @lazy-random/generators-function

把任意「回傳 0～1 亂數 (Random Number) 的函式」包裝為 `@lazy-random/rng-abstract` 的 `RNG` 類別，讓自訂函式也能使用統一的亂數產生器 (Random Number Generator) API。

## 特色 (Features)

- 一行程式碼即可把 `(...argv) => number` 形式的函式轉為 `RNGFunction` 實例 (Instance)
- 繼承 `RNG` 抽象類別，取得 `next()`、`clone()`、`seedable` 等共用 API
- 建構期以斷言 (Assertion) 檢查傳入值，非函式時提早失敗 (Fail Fast)
- 透過 `@lazy-random/clone-class` 支援帶著同一個底層函式建立新實例

## 安裝 (Installation)

```bash
yarn add @lazy-random/generators-function
yarn-tool add @lazy-random/generators-function
yt add @lazy-random/generators-function
```

## 使用方式 (Usage)

```ts
import RNGFunction from '@lazy-random/generators-function';

// 以任意回傳 0～1 的函式作為底層亂數來源 (Entropy Source)
const rng = new RNGFunction(() => Math.random());

// 取得一個 0～1 的亂數
const value = rng.next();

// 產生器識別名稱
console.log(rng.name); // 'function'

// 以同一個底層函式複製出新的實例
const cloned = rng.clone(() => Math.random());
```

```ts
import { RNGFunction, IRNGFunctionSeed } from '@lazy-random/generators-function';

// 具名匯出與型別 (Type) 匯出
const fn: IRNGFunctionSeed = () => Math.random();
const rng: RNGFunction<typeof fn> = new RNGFunction(fn);
```

## API 文件 (API Documentation)

### `new RNGFunction(seed, opts?, ...argv)`

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `seed` | `IRNGFunctionSeed`（`(...argv) => number`） | 底層亂數函式；非函式且非 `null`／`undefined` 時會失敗 |
| `opts` | `any` | 保留的選項參數 (Options)，目前未使用 |
| `...argv` | `any[]` | 保留的其餘參數，透傳給 `_init` 與 `seed` |

### 方法 (Methods)

| 方法 (Method) | 回傳值 (Returns) | 說明 (Description) |
| --- | --- | --- |
| `next()` | `number` | 呼叫底層函式並回傳一個亂數 |
| `seed(seed, opts?, ...argv)` | `void` | 當 `seed` 為函式時取代底層亂數函式 |
| `clone(seed, opts?, ...argv)` | `RNGFunction<S>` | 以同一個類別與底層狀態建立新實例 |

### 屬性 (Properties)

| 屬性 (Property) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `name` | `string` | 固定回傳 `'function'` |
| `seedable` | `boolean` | 是否支援以種子 (Seed) 重建序列，依底層函式而定 |

## 型別 (Types)

### `IRNGFunctionSeed`

```ts
type IRNGFunctionSeed = (...argv) => number
```

用作底層亂數函式的型別 (Type) 別名 (Alias)。

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
```

## 變更日誌 (Changelog)

詳見 [CHANGELOG.md](./CHANGELOG.md)。

## 相關資源 (Related Resources)

- [@lazy-random/rng-abstract](https://www.npmjs.com/package/@lazy-random/rng-abstract)
- [@lazy-random/clone-class](https://www.npmjs.com/package/@lazy-random/clone-class)
