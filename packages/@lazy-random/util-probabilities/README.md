# @lazy-random/util-probabilities

將總和 (Sum) 拆分成指定份數的簡單機率 (Probability) 工具函式 (Utility Function)，提供整數與浮點數兩種版本，保證拆分後的陣列 (Array) 總和與輸入一致。

## 特色 (Features)

- `get_prob()`：以整數 (Integer) 拆分總和，最後一筆以差值補齊，確保總和完全相符。
- `get_prob_float()`：以浮點數 (Float) 拆分總和，同樣以差值補齊尾數。
- 純函數 (Pure Function)，無任何相依套件 (Dependency)。

## 安裝 (Installation)

```bash
yarn add @lazy-random/util-probabilities
yarn-tool add @lazy-random/util-probabilities
yt add @lazy-random/util-probabilities
```

## 使用方式 (Usage)

```ts
import { get_prob, get_prob_float } from '@lazy-random/util-probabilities';

get_prob(5, 100);       // [41, 20, 16, 13, 10]
get_prob_float(5, 100); // [40.96, 20, 16, 12.8, 10.24]
```

```ts
import { get_prob, get_prob_float } from '@lazy-random/util-probabilities';
```

> 注意：此套件**沒有**預設導出 (Default Export)，請一律使用具名匯出 (Named Export)。

## API 文件 (API Documentation)

### get_prob(size: number, sum: number): number[]

將 `sum` 拆成 `size` 份的整數 (Integer) 陣列 (Array)。

- 迴圈 (Loop) 依序計算 `Math.round(剩餘分數 / size)` 並累加已分配總額 (Allocated Total)。
- 迴圈執行 `size - 1` 次，最後以 `sum - randomTotal` 算出差額 (Remainder)，用 `unshift()` 放在**陣列開頭**，藉此保證所有元素加總等於 `sum`。
- `size` 為 `1` 時迴圈不執行，直接回傳 `[sum]`。

```ts
get_prob(5, 100); // [41, 20, 16, 13, 10]，加總為 100
```

### get_prob_float(size: number, sum: number): number[]

與 `get_prob()` 相同流程，但不經過四捨五入 (Round)，回傳浮點數 (Float) 陣列；同樣把差額放在第一筆，加總恆等於 `sum`。

```ts
get_prob_float(5, 100); // [40.96, 20, 16, 12.8, 10.24]，加總為 100
```

## 已知限制 (Known Limitations)

- 兩個函式的除數固定為 `size`，但 `score` 逐次遞減，因此各份並非等分 (Equal Split)，而是前大後小的遞減分布；詳見原始碼中的 `TODO` 註解。
- `size <= 0` 時 `while (i--)` 的條件永為真，會造成無窮迴圈 (Infinite Loop)，請勿傳入非正數；詳見原始碼中的 `TODO` 註解。

## 開發 (Development)

此套件為 monorepo 的一部分，原始碼位於 `src/`，編譯產物輸出至 `dist/`。

```bash
pnpm run build
pnpm run test:jest
```

## 變更日誌 (Changelog)

See [CHANGELOG.md](./CHANGELOG.md).

## 相關資源 (Related Resources)

- [Repository](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/util-probabilities)
- [Issues](https://github.com/bluelovers/ws-random/issues)
