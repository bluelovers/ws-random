# @lazy-random/rng-abstract-core

亂數產生器 (Random Number Generator, RNG) 的抽象核心 (Abstract Core) 與型別 (Type) 定義套件，零依賴 (Zero Dependency)。

本套件提供 `IRNGLike` 介面與 `RNGCore` 抽象類別，定義 `@lazy-random` 系列具體 RNG 的共同合約 (Contract)：包含初始化鉤子 (Hook)、種子 (Seed) 解析、工廠方法 (Factory Method) 與可覆寫的預設行為。

## 特色 (Features)

- 零依賴 (Zero Dependency)，僅提供型別與抽象核心
- `IRNGLike` 以鴨子型別 (Duck Typing) 描述最小 RNG 形狀，任何具有 `next()` 的物件皆可相容
- `RNGCore` 以抽象 `next()` 強制子類別實作取亂數 (Random Number) 邏輯
- 靜態工廠方法 `create()` 可防止抽象類別被直接實例化
- `_seedAuto()` 依輸入型別自動分流至 `_seedNum()`（數字）或 `_seedStr()`（字串）

## 安裝 (Installation)

```bash
yarn add @lazy-random/rng-abstract-core
yarn-tool add @lazy-random/rng-abstract-core
yt add @lazy-random/rng-abstract-core
```

## 使用方式 (Usage)

繼承 `RNGCore` 並實作抽象的 `next()`：

```ts
import RNGCore from '@lazy-random/rng-abstract-core';

class MyRng extends RNGCore
{
	// 抽象核心的建構器為 protected，子類別可自行決定可見性
	constructor(seed?: number)
	{
		super(seed)

		this._init(seed)
	}

	get name(): string
	{
		return 'MyRng'
	}

	next(): number
	{
		return Math.random()
	}
}

const rng = new MyRng(1234)
rng.next() // => [0, 1) 的浮點數
```

亦可使用靜態工廠方法 (Factory Method) 建立：

```ts
// 以 RNGCore.create() 直接呼叫抽象類別會拋出 ReferenceError
const rng = MyRng.create(1234)
```

只要物件具有 `next()`，即可符合 `IRNGLike`：

```ts
import type { IRNGLike } from '@lazy-random/rng-abstract-core'

const rngLike: IRNGLike = {
	next: () => Math.random(),
}
```

## API 文件 (API)

### `IRNGLike`（介面，Interface）

鴨子型別 (Duck Typing) 的 RNG 最小形狀：

| 成員 | 說明 |
| --- | --- |
| `next(): number` | 取得下一個亂數 (Random Number)，回傳 `[0, 1)` 的浮點數 |
| `seed?(seed?, opts?, ...argv)` | 重新設定種子 (Seed)，可選實作 |

### `RNGCore`（抽象類別，預設匯出）

#### 建立

| 成員 | 說明 |
| --- | --- |
| `protected constructor(seed?, opts?, ...argv)` | 建構器本身不做初始化；實際初始化請由子類別於建構流程中呼叫 `_init()` |
| `static create(seed?, opts?, ...argv)` | 靜態工廠 (Factory)，以 `new this(...)` 建立實例；直接呼叫 `RNGCore.create()` 會拋出 `ReferenceError` |

#### 狀態與取值 (Getters)

| 成員 | 說明 |
| --- | --- |
| `get name` | 亂數產生器名稱；子類別未覆寫時拋出 `Error` |
| `get options` | 建立時的選項 (Options) 或種子 (Seed) 資訊，預設回傳 `null` |
| `get seedable` | 是否支援重新設定種子 (Seed)，預設回傳 `null`（見原始碼 TODO） |

#### 取亂數與種子 (Random Number & Seed)

| 成員 | 說明 |
| --- | --- |
| `abstract next(): number` | 抽象方法，回傳 `[0, 1)` 的浮點數，子類別必須實作 |
| `seed(seed?, opts?, ...argv)` | 重新設定種子；預設為無操作 (No-op)，由子類別覆寫以實際套用 |
| `clone(seed?, opts?, ...argv)` | 複製實例；子類別未覆寫時拋出 `ReferenceError` |

#### 受保護的鉤子 (Protected Hooks)

| 成員 | 說明 |
| --- | --- |
| `_init(seed?, opts?, ...argv)` | 初始化入口，會先呼叫 `_init_check()` |
| `_init_check(seed?, opts?, ...argv)` | 參數驗證鉤子 (Hook)，預設不做任何檢查 |
| `_seedAuto(seed?, opts?, ...argv)` | 依型別分流：數字走 `_seedNum()`，其餘走 `_seedStr()` |
| `_seedNum(seed?, opts?, ...argv)` | 以數字建立種子 (Seed)，預設拋出 `ReferenceError`，由子類別實作 |
| `_seedStr(seed?, opts?, ...argv)` | 以字串建立種子 (Seed)，預設拋出 `ReferenceError`，由子類別實作 |

### 匯出 (Exports)

- 具名匯出 (Named Export)：`IRNGLike`、`RNGCore`
- 預設匯出 (Default Export)：`RNGCore`

## 設定 (Configuration)

本套件無需任何設定；所有行為皆由子類別覆寫的方法決定。

## 開發 (Development)

```bash
pnpm run test:jest
pnpm run build
```

## 變更日誌 (Changelog)

詳細版本紀錄請見 [CHANGELOG.md](./CHANGELOG.md)。

## FAQ

**Q：為什麼不能直接 `new RNGCore()`？**

A：`RNGCore` 是抽象類別 (Abstract Class)，建構器為 `protected`；即使用 `RNGCore.create()` 呼叫，也會拋出 `ReferenceError`。

**Q：`IRNGLike` 與 `RNGCore` 要選哪個？**

A：`IRNGLike` 是結構型別 (Structural Type) 介面，只要物件有 `next()` 就符合；`RNGCore` 則提供初始化鉤子、種子分流與預設行為，適合用來實作完整的 RNG 類別。

**Q：實作一個新 RNG 最少要做什麼？**

A：至少覆寫抽象的 `next()`；若需顯示名稱、複製或支援種子 (Seed)，再分別覆寫 `name`、`clone()`、`_seedNum()` 與 `_seedStr()`。

## 相關資源 (Related Resources)

- [@lazy-random/rng-abstract](https://www.npmjs.com/package/@lazy-random/rng-abstract) — `@lazy-random` 的 RNG 抽象層
- [random-extra](https://www.npmjs.com/package/random-extra) — 同專案的上層亂數 (Random Number) 套件
