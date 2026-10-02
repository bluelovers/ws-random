# @lazy-random/clone-class

用於「複製 (Clone) 隨機數生成器類別 (RNG Class)」的小工具：判斷傳入的實例 (Instance) 實際所屬的類別，並以相同類別建立新的實例。

## 特色 (Features)

- `getClass`：取得「傳入實例的實際建構子 (Constructor)」或原始類別
- `cloneClass`：以相同的類別與參數建立一個新實例，方便複製 RNG 狀態並分岔 (Fork) 出獨立的隨機序列
- 當實例繼承自子類別 (Subclass) 時，會沿用子類別而非傳入的基底類別
- 支援 TypeScript 型別宣告 (Type Declarations)

## 安裝 (Installation)

```bash
yarn add @lazy-random/clone-class
yarn-tool add @lazy-random/clone-class
yt add @lazy-random/clone-class
```

## 使用方式 (Usage)

### CommonJS

```js
const { getClass, cloneClass } = require('@lazy-random/clone-class');
```

### ESM

```js
import { getClass, cloneClass } from '@lazy-random/clone-class';
```

### 範例 (Examples)

```js
class MyRng
{
	constructor(seed)
	{
		this.seed = seed;
	}
}

const rng = new MyRng(1234);

// thisArgv 是 RNGClass 的實例時，回傳實例本身的建構子
getClass(MyRng, rng); // MyRng

// 以相同類別與參數建立新實例
const cloned = cloneClass(MyRng, rng, 1234);
cloned instanceof MyRng; // true
```

```js
class SubRng extends MyRng {}

const sub = new SubRng(99);

// 實例來自子類別時沿用子類別，而非傳入的 MyRng
getClass(MyRng, sub);          // SubRng
cloneClass(MyRng, sub, 99) instanceof SubRng; // true

// thisArgv 不是實例時，直接使用傳入的 RNGClass
getClass(MyRng, {});           // MyRng
```

## API 文件 (API Reference)

### `getClass<T>(RNGClass, thisArgv, ...argv): T`

判斷要用哪一個類別 (Class)：若 `thisArgv` 為 `RNGClass` 的實例，回傳該實例的建構子（即 `thisArgv.__proto__.constructor`）；否則回傳 `RNGClass` 本身。

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `RNGClass` | `any` | 基準的 RNG 類別 |
| `thisArgv` | `any` | 現有實例；用來判斷實際所屬的類別 |
| `...argv` | `any[]` | 相容後續呼叫簽章的多餘參數，目前未被使用 |

- 回傳 (Returns)：`T` — 適合用來建立新實例的類別 (Constructor)
- 備註 (Note)：原始碼標註 `@todo support typescript`，型別目前以 `any` 處理

### `cloneClass<T>(RNGClass, thisArgv, ...argv): T`

先以 `getClass` 決定類別，再以 `new` 並套用 `...argv` 建立新實例，用來複製 RNG 並分岔 (Fork) 出獨立的隨機序列。

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `RNGClass` | `any` | 基準的 RNG 類別 |
| `thisArgv` | `any` | 現有實例；決定實際建立的類別 |
| `...argv` | `any[]` | 傳給新實例建構子 (Constructor) 的參數 |

- 回傳 (Returns)：`T` — 新建立的實例
- 此函式也是套件的預設匯出 (Default Export)
- 備註 (Note)：原始碼標註 `@todo support typescript`，型別目前以 `any` 處理

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
pnpm run lint
```

## 變更日誌 (Changelog)

詳見 [CHANGELOG.md](./CHANGELOG.md)。

## FAQ

### 為什麼需要 `getClass` 而不是直接用 `constructor`？

當你手上只有「基底 RNG 類別 + 一個可能來自子類別的實例」時，`getClass` 會幫你判斷應該沿用實例的實際類別，避免複製時丟失子類別的行為。

### `...argv` 在 `getClass` 裡有作用嗎？

沒有。`getClass` 只負責回傳類別，`...argv` 僅為相容呼叫簽章而保留；真正傳給建構子的是 `cloneClass` 中的 `...argv`。

### 為什麼型別都是 `any`？

兩個函式的原始碼都標註了 `@todo support typescript`，型別強化仍在待辦清單 (TODO) 中，目前以 `any` 與泛型 `T` 作為妥協。

## 相關資源 (Related Resources)

- [套件原始碼 (Repository)](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/clone-class)
- [問題回報 (Issue Tracker)](https://github.com/bluelovers/ws-random/issues)
