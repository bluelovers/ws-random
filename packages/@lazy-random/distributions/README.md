# @lazy-random/distributions

彙整 (Re-export) `@lazy-random` 系列各種亂數分佈 (Distribution) 的聚合套件 (Aggregate Package)，一次安裝即可取得常見的機率分佈與亂數工具 API。

本套件本身不實作演算法，僅轉出各子套件的函式，並額外提供 `Distributions` 預設匯出 (Default Export) 物件。

## 特色 (Features)

- 一個套件即可取得多種機率分佈 (Probability Distribution) API
- 同時提供具名匯出 (Named Export) 與 `Distributions` 預設匯出物件
- 各函式底層皆依賴 `IRNGLike` 介面的 `next()`，可搭配任意亂數來源 (Random Number Generator)

## 匯出一覽 (Exports)

| 分類 (Category) | 函式 (Functions) | 來源套件 (Source Package) |
| --- | --- | --- |
| 連續／離散分佈 | `dfBates` `dfBernoulli` `dfBinomial` `dfExponential` `dfGeometric` `dfIrwinHall` `dfLogNormal` `dfNormal` `dfPareto` | `@lazy-random/df-algorithm` |
| 泊松分佈 | `dfPoisson` | `@lazy-random/df-poisson` |
| 均勻分佈 | `dfUniformFloat` `dfUniformInt` `dfUniformBoolean` `dfUniformByte` `dfUniformBytes` | `@lazy-random/df-uniform` |
| 陣列操作 | `dfArrayIndex` `dfArrayIndexOne` `dfArrayShuffle` `dfArrayUnique` `dfArrayFill` | `@lazy-random/df-array` |
| 權重抽樣 | `dfItemByWeight` `dfItemByWeightUnique` | `@lazy-random/df-item-by-weight` |
| 字元識別碼 | `dfCharID` | `@lazy-random/df-char-id` |
| 固定總和 | `dfRandSumFloat` `dfRandSumInt` | `@lazy-random/df-sum` |
| UUID | `dfUuidV4` | `@lazy-random/df-uuid` |

## 安裝 (Installation)

```bash
yarn add @lazy-random/distributions
yarn-tool add @lazy-random/distributions
yt add @lazy-random/distributions
```

或使用 pnpm：

```bash
pnpm add @lazy-random/distributions
```

## 使用方式 (Usage)

### 具名匯出 (Named Export)

```ts
import { dfPoisson, dfUniformInt, dfUuidV4 } from '@lazy-random/distributions';

const poisson = dfPoisson(random, 4);
const int = dfUniformInt(random, 1, 6);
const uuid = dfUuidV4(random);

console.log(poisson());
console.log(int());
console.log(uuid());
```

### 預設匯出 (Default Export)

```ts
import Distributions from '@lazy-random/distributions';

const { dfNormal, dfArrayShuffle } = Distributions;

console.log(typeof dfNormal); // "function"
console.log(typeof dfArrayShuffle); // "function"
```

## API 文件 (API Documentation)

各函式的詳細參數與回傳值請參閱對應子套件的 README：

- [df-algorithm](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/df-algorithm#readme)
- [df-poisson](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/df-poisson#readme)
- [df-uniform](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/df-uniform#readme)
- [df-array](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/df-array#readme)
- [df-item-by-weight](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/df-item-by-weight#readme)
- [df-char-id](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/df-char-id#readme)
- [df-sum](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/df-sum#readme)
- [df-uuid](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/df-uuid#readme)

## 設定 (Configuration)

本套件無設定檔，所有函式的行為皆由各自參數控制。

## 開發 (Development)

```bash
pnpm run build
```

## 變更日誌 (Changelog)

請見 [CHANGELOG.md](./CHANGELOG.md)。

## 相關資源 (Related Resources)

- [Repository](https://github.com/bluelovers/ws-random)
