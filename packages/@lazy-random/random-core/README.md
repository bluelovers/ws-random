# @lazy-random/random-core

`@lazy-random` 系列的亂數 (Random Number) 核心類別 `RandomCore`：以可重新設定種子 (Seed) 的亂數產生器 (Random Number Generator, RNG) 作為底層，提供常見的機率分佈 (Distribution)、陣列取樣、加權取樣與 UUID 等 API。

`RandomCore` 同時為具名匯出 (Named Export) 與預設匯出 (Default Export)。本類別屬於抽象核心：`clone()`、`newUse()`、`cloneUse()` 等方法僅拋出 `not implemented`，由上層套件的子類別實作。

## 特色 (Features)

- 統一的雙形式 API：`xxx()` 立即取樣一次，`dfXxx()` 回傳可重複呼叫的分佈函式 (Distribution Function)
- 覆蓋均勻 (Uniform)、常態 (Normal)、伯努利 (Bernoulli)、二項 (Binomial)、幾何 (Geometric)、卜瓦松 (Poisson)、指數 (Exponential)、Irwin–Hall、Bates、Pareto 等分佈
- 陣列隨機索引 (Index)、取樣、洗牌 (Shuffle)、連續去重取樣與以隨機值填滿陣列
- 依權重 (Weight) 取樣，以及指定總和的隨機整數／浮點數列
- 分佈快取 (Cache)：相同標籤 (Label) 與參數會重複使用同一個分佈，可用 `reset()` 清除
- 以 `autoBindMethods()` 取代 `core-decorators` 的 `@autobind`，方法脫離實例呼叫時仍保有正確的 `this`

## 安裝 (Installation)

```bash
yarn add @lazy-random/random-core
yarn-tool add @lazy-random/random-core
yt add @lazy-random/random-core
```

## 使用方式 (Usage)

`RandomCore` 需要一個與 `@lazy-random/rng-abstract` 相容的 `RNG` 實例作為底層：

```ts
import RandomCore from '@lazy-random/random-core';

// 具名匯出 (Named Export) 為同一個類別
// import { RandomCore } from '@lazy-random/random-core';

// rng：任一相容的 RNG 實例
const random = new RandomCore(rng);

// 底層取亂數 (Random Number)，回傳 [0, 1) 的浮點數
random.next();

// 便捷方法：均勻分佈的浮點數、整數與布林值
random.float(0, 100);
random.int(1, 10);
random.boolean();

// 重新設定種子 (Seed)；是否支援可由 random.seedable 檢查
random.seed(1234);
```

取得可重複呼叫的分佈函式 (Distribution Function)：

```ts
const nextNormal = random.dfNormal(0, 1);

// 每次呼叫都從常態分佈 (Normal Distribution) 取樣
nextNormal();
nextNormal();
```

陣列與加權取樣：

```ts
// 隨機取一個陣列元素
random.arrayItem([11, 22, 33]);

// 洗牌 (Shuffle)
random.arrayShuffle([11, 22, 33]);

// 依權重取樣
random.itemByWeight([3, 7, 1, 4, 2]);
```

## API 文件 (API)

### `RandomCore<R extends RNG = RNG>`（預設匯出與具名匯出）

#### 建立與狀態

| 方法 | 說明 |
| --- | --- |
| `constructor(rng?, ...argv)` | 建立實例；`rng` 會經 `expect()` 驗證為 `RNG` 實例後交給 `use()` |
| `get rng` | 取得底層亂數產生器 (RNG) |
| `get seedable` | 底層 RNG 是否支援重新設定種子 (Seed) |
| `use(rng, ...args)` | 切換底層 RNG，驗證失敗時拋錯，回傳 `this` 以利鏈式呼叫 (Chain) |
| `seed(...argv)` | 將參數轉交底層 RNG 的 `seed()`，回傳 `this` |
| `srand(...argv)` | 設定種子後立刻取下一個亂數 (Random Number) |
| `get srandom` | `srand()` 的別名 (Alias) |
| `next()` | 委派底層 RNG，回傳 `[0, 1)` 的浮點數 |
| `get random` / `get rand` | `next()` 的別名 |
| `reset()` | 清除分佈快取 (Cache)，回傳 `this` |
| `get [Symbol.toStringTag]` | 回傳底層 RNG 的名稱，供 `Object.prototype.toString()` 使用 |

#### 便捷方法

以下方法皆立即回傳取樣結果；若需反覆取樣，請改用同名 `df` 前綴的方法取得分佈函式：

| 方法 | 說明 |
| --- | --- |
| `float(min?, max?, fractionDigits?)` | 均勻分佈 (Uniform) 浮點數 |
| `int(min?, max?)` / `integer(min?, max?)` | 均勻分佈整數，兩者等價 |
| `bool(likelihood?)` / `boolean(likelihood?)` | 隨機布林值 (Boolean)，兩者等價 |
| `byte(toStr?)` / `bytes(size?, toStr?)` | 隨機位元組 (Byte)，可選擇回傳字串或數字 |
| `randomBytes(size?)` | 回傳 `Buffer`，行為類似 `crypto.randomBytes()` |
| `charID(char?, size?)` | 依字元集 (Alphabet) 產生隨機字串 ID，支援 Unicode |
| `uuidv4(toUpperCase?)` | 產生 UUID v4 字串 |

#### 基礎分佈 (Distributions)

以下皆回傳分佈函式 (Distribution Function)：

| 方法 | 說明 |
| --- | --- |
| `dfUniform(min?, max?, fractionDigits?)` | 連續均勻分佈 (Uniform Distribution) |
| `dfUniformInt(min?, max?)` | 離散均勻分佈 (Discrete Uniform Distribution) |
| `dfUniformBoolean(likelihood?)` | 兩種結果的離散均勻分佈 |
| `dfNormal(mu?, sigma?)` | 常態分佈 (Normal Distribution) |
| `dfLogNormal(mu?, sigma?)` | 對數常態分佈 (Log-normal Distribution) |
| `dfBernoulli(p?)` | 伯努利分佈 (Bernoulli Distribution) |
| `dfBinomial(n?, p?)` | 二項分佈 (Binomial Distribution) |
| `dfGeometric(p?)` | 幾何分佈 (Geometric Distribution) |
| `dfPoisson(lambda?)` | 卜瓦松分佈 (Poisson Distribution) |
| `dfExponential(lambda?)` | 指數分佈 (Exponential Distribution) |
| `dfIrwinHall(n?)` | Irwin–Hall 分佈 |
| `dfBates(n?)` | Bates 分佈 |
| `dfPareto(alpha?)` | 帕累托分佈 (Pareto Distribution) |

另有 `dfByte()`、`dfBytes()`、`dfRandomBytes()`、`dfCharID()`、`dfUuidv4()` 等對應便捷方法的分佈函式版本。

#### 陣列 (Array)

| 方法 | 說明 |
| --- | --- |
| `arrayIndex(arr, size?, start?, end?)` / `dfArrayIndex(...)` | 取得陣列中的隨機索引 (Index) |
| `arrayIndexOne(arr, size?, start?, end?)` / `dfArrayIndexOne(...)` | 取得單一隨機索引 |
| `arrayItem(arr, size?, start?, end?)` / `dfArrayItem(...)` | 依隨機索引取得隨機元素 |
| `arrayItemOne(arr, start?, end?)` / `dfArrayItemOne(...)` | 取得單一隨機元素 |
| `arrayShuffle(arr, overwrite?)` / `dfArrayShuffle(...)` | 洗牌 (Shuffle)，可選擇是否覆寫原陣列 |
| `arrayUnique(arr, limit?, loop?, fnRandIndex?, fnOutOfLimit?)` / `dfArrayUnique(...)` | 連續不重複地取樣；超過 `limit` 次數時依 `loop` 決定重來或拋錯 |
| `arrayFill(arr, min?, max?, float?)` / `dfArrayFill(...)` | 以隨機值填滿任意類陣列 (Array-like) 物件 |

`arrayXxx` 為立即取值；`dfArrayXxx` 回傳分佈函式 (Distribution Function)。

#### 加權取樣 (Weighted Sampling) 與總和

| 方法 | 說明 |
| --- | --- |
| `itemByWeight(arr, options?, ...argv)` / `dfItemByWeight(...)` | 依權重 (Weight) 從陣列或物件隨機取一個項目 |
| `itemByWeightUnique(arr, size, options?, ...argv)` / `dfItemByWeightUnique(...)` | 依權重取多個不重複項目 |
| `sumInt(size, sum?, min?, max?, limit?)` / `dfSumInt(...)` | 產生總和為指定值的隨機整數列 |
| `dfSumFloat(...)` / `sumFloat(size, sum?, min?, max?, fractionDigits?)` | 產生總和為指定值的隨機浮點數列 |

#### 快取 (Cache) 行為

`df` 前綴方法多數透過內部 `_memoize()` 以「標籤 (Label) + 參數雜湊 (Hash)」作為鍵 (Key) 快取分佈實例，重複以相同參數呼叫時不會重建分佈。若輸入內容已變動或需強制重建，請呼叫 `reset()`。

#### 已棄用 (Deprecated)

| 方法 | 說明 |
| --- | --- |
| `patch()` | 以本實例的分佈改寫全域 `Math.random`，不建議使用 |
| `unpatch()` | 還原先前 `patch()` 所保存的 `Math.random` |

#### 未於本類別實作 (Not Implemented)

`clone()`、`newUse()`、`cloneUse()` 在 `RandomCore` 中僅拋出 `not implemented`，供子類別覆寫實作。

#### 介面 (Interfaces)

- `IRandomDistributionsFn` — 分佈建立函式的型別 (Type)
- `IRandomDistributionsCacheRow` — 快取 (Cache) 列的型別，含 `key` 與 `distribution`
- `IRandomDistributions` — 分佈函式的呼叫簽章 (Call Signature)

## 設定 (Configuration)

本套件無需額外設定；唯一可調行為為分佈快取 (Cache)，可隨時呼叫 `reset()` 清除。請避免使用已棄用 (Deprecated) 的 `patch()`／`unpatch()` 改寫全域 `Math.random`。

## 開發 (Development)

```bash
pnpm run test
pnpm run build
```

## 變更日誌 (Changelog)

詳細版本紀錄請見 [CHANGELOG.md](./CHANGELOG.md)。

## FAQ

**Q：`xxx()` 與 `dfXxx()` 要怎麼選？**

A：只需一次結果就用 `xxx()`；需在同一組參數下反覆取樣時用 `dfXxx()`，可避免每次重建分佈並命中快取 (Cache)。

**Q：`reset()` 什麼時候需要呼叫？**

A：`reset()` 會清空已快取的分佈實例，讓下一次呼叫重新建立；當輸入參數的內容可能已變動、或想確保拿到全新分佈時可呼叫它。

**Q：為什麼 `clone()`、`newUse()` 會拋出 `not implemented`？**

A：`RandomCore` 是抽象核心，這三個方法的實作交由子類別決定；請改由上層套件建立與複製實例。

**Q：可以直接傳入函式當作 RNG 嗎？**

A：不行，`use()` 會以 `expect()` 驗證傳入值必須為 `RNG` 實例，驗證失敗會拋出錯誤。

## 相關資源 (Related Resources)

- [random-extra](https://www.npmjs.com/package/random-extra) — 同專案的上層亂數 (Random Number) 套件
- [@lazy-random/rng-abstract](https://www.npmjs.com/package/@lazy-random/rng-abstract) — 亂數產生器 (RNG) 抽象層
- [@lazy-random/distributions](https://www.npmjs.com/package/@lazy-random/distributions) — 分佈 (Distribution) 實作
- [@lazy-random/df-array](https://www.npmjs.com/package/@lazy-random/df-array) — 陣列取樣相關分佈
- [@lazy-random/df-item-by-weight](https://www.npmjs.com/package/@lazy-random/df-item-by-weight) — 依權重 (Weight) 取樣
