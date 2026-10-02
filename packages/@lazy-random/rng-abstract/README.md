# @lazy-random/rng-abstract

`@lazy-random/rng-abstract` 提供亂數產生器 (Random Number Generator) 的抽象基底類別 (Abstract Base Class) `RNG`，用來作為各亂數實作的共同起點，統一種子 (Seed) 的產生與轉換規則。

本套件本身不提供可直接使用的亂數演算法，而是定義「如何建立實例」以及「如何由任意輸入推導種子」的合約 (Contract)，供後續的 RNG 實作繼承。

## 特色 (Features)

- 抽象類別 `RNG` 繼承自 `RNGCore` 並實作 `IRNGLike`，可直接與既有的 RNG 介面互通
- 靜態方法 `RNG.create()` 作為統一的實例化工廠 (Factory)，禁止直接呼叫抽象類別本身
- 提供 `_seedNum()` / `_seedStr()` 兩個受保護 (Protected) 的種子推導鈎子 (Hook)，子類別可視需求覆寫
- 當種子為 `undefined`、`null` 或 `0` 時，自動改用亂數字串 (Random Seed String)，確保每次都能取得新的隨機種子
- 同時輸出 CommonJS 與 ESM 產物，並附帶 TypeScript 型別宣告檔 (Type Declarations)

## 安裝 (Installation)

```bash
pnpm add @lazy-random/rng-abstract
npm install @lazy-random/rng-abstract
yarn add @lazy-random/rng-abstract
yarn-tool add @lazy-random/rng-abstract
yt add @lazy-random/rng-abstract
```

## 使用方式 (Usage)

繼承 `RNG` 並實作你的亂數演算法，再透過 `RNG.create()` 建立實例：

```ts
import { RNG } from '@lazy-random/rng-abstract';

class MyRNG extends RNG
{
	// 在此實作亂數演算法 (Implement your algorithm here)
}

// 透過靜態工廠方法建立實例 / Create instance via the static factory
const rng = MyRNG.create('my-seed');
```

若直接呼叫抽象類別的 `create()`，會拋出 `ReferenceError`：

```ts
import { RNG } from '@lazy-random/rng-abstract';

// ReferenceError: RNG is abstract class
RNG.create('any-seed');
```

### 不帶種子建立

不傳入種子 (Seed)、或種子為 `null` / `0` 時，會自動產生一組新的隨機種子：

```ts
import { RNG } from '@lazy-random/rng-abstract';

class MyRNG extends RNG {}

const rng = MyRNG.create();
```

## API 文件 (API Reference)

### `abstract class RNG`

亂數產生器的抽象基底類別，繼承 `RNGCore` 並實作 `IRNGLike`。

#### 靜態方法 (Static Method)

##### `RNG.create(seed?, opts?, ...argv)`

建立並回傳目前子類別的實例。

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `seed` | `any` | 種子 (Seed)；省略、`null` 或 `0` 時會自動產生新的種子 |
| `opts` | `any` | 傳遞給種子推導的選項 (Options) |
| `...argv` | `any[]` | 其餘欲傳遞給建構子的參數 (Extra arguments) |

- **回傳 (Returns)**：目前子類別的實例
- **拋出 (Throws)**：`ReferenceError` — 當 `this` 為 `RNG`、`RNGCore` 或空值時，表示不能直接實作抽象類別

#### 受保護方法 (Protected Method)

##### `_seedNum(seed?, opts?, ...argv): number`

由任意輸入推導出數值型種子 (Numeric Seed)。

- 未定義 (Undefined)、`null` 或 `0` 時，先以 `randomSeedStr()` 產生新的隨機字串，再交由 `seedToken()` 轉為數值
- **回傳 (Returns)**：`number` — 用於建立新種子的數值

##### `_seedStr(seed?, opts?, ...argv): string`

由任意輸入推導出字串型種子 (String Seed)。

- **回傳 (Returns)**：`string` — 用於建立新種子的字串

#### 重新匯出 (Re-export) 與預設匯出 (Default Export)

- `IRNGLike`：由 `@lazy-random/rng-abstract-core` 重新匯出的 RNG 介面型別 (Interface Type)
- `export default RNG`：`RNG` 同時作為預設匯出 (Default Export)，可用 `import RNG from '@lazy-random/rng-abstract'` 引入

## 相依套件 (Dependencies)

| 套件 (Package) | 用途 (Purpose) |
| --- | --- |
| `@lazy-random/rng-abstract-core` | 提供 `RNGCore` 基底類別與 `IRNGLike` 介面 |
| `@lazy-random/seed-token` | 提供 `hashAny()`、`randomSeedStr()`、`seedToken()` 等種子工具函式 |

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
pnpm run lint
```

## 變更日誌 (Changelog)

本套件的版本變更請見 [CHANGELOG.md](./CHANGELOG.md)。

## 常見問題 (FAQ)

### 為什麼不能直接 `new RNG()`？

`RNG` 是抽象類別 (Abstract Class)，`create()` 會檢查 `this` 是否為 `RNG` / `RNGCore`，若是則拋出 `ReferenceError`。請改為繼承 `RNG` 後，再以 `YourRNG.create()` 建立實例。

### 為什麼不傳種子也能每次得到不同的結果？

當 `seed` 為 `undefined`、`null` 或 `0` 時，`_seedNum()` 會改用 `randomSeedStr()` 產生新的隨機字串作為種子，因此每次呼叫都不會得到固定的結果。

## 相關資源 (Resources)

- [原始碼 Repository](https://github.com/bluelovers/ws-random)
- [問題回報 (Issues)](https://github.com/bluelovers/ws-random/issues)
