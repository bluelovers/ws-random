# @lazy-random/util-distributions

搭配亂數產生器 (RNG) 使用的分布 (Distribution) 與取值工具函式 (Utility Function)，提供區間亂數 (Random Number)、整數取值與隨機索引 (Random Index) 等常用方法。

## 特色 (Features)

- `float()`：在 `[min, max)` 區間產生浮點數 (Float)。
- `int()`：在 `[min, max]`（含端點，Inclusive）區間產生整數 (Integer)。
- `randIndex()`：依長度產生 `0 ～ len - 1` 的隨機索引 (Random Index)。
- `randIndexWithRange()`：在指定起訖範圍內產生隨機索引。
- 所有函式 (Function) 接收實作 `IRNGLike` 介面 (Interface) 的亂數產生器 (RNG)，方便搭配任何自訂種子 (Seed) 的實作。

## 安裝 (Installation)

```bash
yarn add @lazy-random/util-distributions
yarn-tool add @lazy-random/util-distributions
yt add @lazy-random/util-distributions
```

## 使用方式 (Usage)

```ts
import { float, int, randIndex, randIndexWithRange } from '@lazy-random/util-distributions';
import type { IRNGLike } from '@lazy-random/rng-abstract';

declare const rng: IRNGLike;

float(rng, 0, 1);            // 0～1 的浮點數 (Float)
int(rng, 1, 6);              // 1～6 的整數 (Integer)
randIndex(rng, 10);          // 0～9 的隨機索引 (Random Index)
randIndexWithRange(rng, 5, 10); // 5～9 的隨機索引
```

也可以使用預設導出 (Default Export) 的集合物件：

```ts
import UtilDistributions from '@lazy-random/util-distributions';

UtilDistributions.int(rng, 0, 100);
UtilDistributions.float(rng, 0, 1);
UtilDistributions.randIndex(rng, 5);
```

## API 文件 (API Documentation)

### float(random, min, max): number

回傳 `[min, max)` 區間內的浮點數 (Float)，公式為 `random.next() * (max - min) + min`。

- `random`：實作 `IRNGLike`（需有 `next(): number`）的亂數產生器 (RNG)。
- `min`：下界 (Lower Bound)。
- `max`：上界 (Upper Bound)，不含於結果。
- 回傳：區間內的浮點數。

### int(random, min, max): number

回傳 `[min, max]`（含端點，Inclusive）區間內的整數 (Integer)。內部以 `randIndexWithRange(random, min, max + 1)` 實作，故 `max` 會被包含。

### randIndex(random, len): number

回傳 `0 ～ len - 1` 的隨機索引 (Random Index)，以 `Math.floor(random.next() * len)` 取得，適合用於陣列 (Array) 取值。

### randIndexWithRange(random, start, end): number

回傳 `[start, end)` 區間取整後的隨機索引，等同 `Math.floor(float(random, start, end))`。

### 預設導出 (Default Export)

`UtilDistributions` 物件彙整 `randIndex`、`float`、`int` 三個函式，可依屬性 (Property) 呼叫。

## 開發 (Development)

此套件為 monorepo 的一部分，原始碼位於 `src/`，編譯產物輸出至 `dist/`。

```bash
pnpm run build
pnpm run test
```

## 變更日誌 (Changelog)

See [CHANGELOG.md](./CHANGELOG.md).

## 相關資源 (Related Resources)

- [Repository](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/util-distributions)
- [Issues](https://github.com/bluelovers/ws-random/issues)
