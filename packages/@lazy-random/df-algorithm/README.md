# @lazy-random/df-algorithm

各種統計分佈 (Statistical Distribution) 的亂數取樣函式 (Random Sampling Function) 集合，屬於 `@lazy-random` 系列的分佈函式 (Distribution Function) 套件。

每個 `df*` 函式都是工廠 (Factory)：傳入一個亂數來源 (RNG) 與分佈參數，回傳可反覆呼叫的取樣函式 (Sampler)。參數會在建立時一次驗證完畢，呼叫取樣函式時不再重複檢查，兼顧安全與效能。

## 特色 (Features)

- 涵蓋 9 種常見分佈：貝茲 (Bates)、伯努利 (Bernoulli)、二項 (Binomial)、指數 (Exponential)、幾何 (Geometric)、Irwin–Hall、對數常態 (Log-Normal)、常態 (Normal)、帕累托 (Pareto)
- 統一的 `df` 前綴 (Prefix) 命名，參數順序一致：先亂數來源，再分佈參數
- 建立時以 `@lazy-random/expect` 驗證參數範圍，錯誤參數會立即拋出 (Throw)
- 常態分佈採 Marsaglia 極座標法 (Polar Method)，對數常態直接複用常態分佈實作

## 安裝 (Installation)

```bash
yarn add @lazy-random/df-algorithm
yarn-tool add @lazy-random/df-algorithm
yt add @lazy-random/df-algorithm
```

## 使用方式 (Usage)

```ts
import { dfNormal, dfBernoulli } from '@lazy-random/df-algorithm'

// 亂數來源需提供 next()，回傳 [0, 1) 的均勻亂數
const random = {
	next: () => Math.random(),
}

// 建立常態分佈 (μ = 0, σ = 1) 取樣函式
const normal = dfNormal(random, 0, 1)
console.log(normal())

// 建立 p = 0.3 的伯努利取樣函式
const bernoulli = dfBernoulli(random, 0.3)
console.log(bernoulli())
```

一次建立、重複取樣：

```ts
import { dfBinomial } from '@lazy-random/df-algorithm'

const binomial = dfBinomial(random, 10, 0.5)

// 每次呼叫都回傳新的取樣結果（0 ～ 10 的整數）
const samples = Array.from({ length: 5 }, () => binomial())
```

## API 文件

所有函式皆遵循下列慣例：

- 回傳值 (Returns)：無參數的函式，每次呼叫回傳一個取樣結果
- 例外 (Throws)：參數不符合範圍時，於**建立時**拋出驗證錯誤 (Validation Error)

### dfBates(random, n = 1)

貝茲分佈 (Bates Distribution)：回傳 `n` 個均勻亂數的平均值，結果落在 `[0, 1)`；`n = 1` 時等同均勻分佈 (Uniform Distribution)。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `random` | `IRNGLike` | 亂數來源，需提供 `next()` |
| `n` | `number` | 均勻樣本數，需為正整數 (`> 0`) |

### dfBernoulli(random, p = 0.5)

伯努利分佈 (Bernoulli Distribution)：以機率 `p` 回傳 `1`，否則回傳 `0`。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `random` | `IRNGLike` | 亂數來源 |
| `p` | `number` | 成功機率，範圍 `0 ≤ p ≤ 1` |

### dfBinomial(random, n = 1, p = 0.5)

二項分佈 (Binomial Distribution)：回傳 `n` 次獨立伯努利試驗 (Bernoulli Trial) 的成功次數，結果為 `0 ～ n` 的整數。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `random` | `IRNGLike` | 亂數來源 |
| `n` | `number` | 試驗次數，需為正整數 (`> 0`) |
| `p` | `number` | 單次試驗的成功機率，範圍 `0 ≤ p ≤ 1` |

### dfExponential(random, lambda = 1)

指數分佈 (Exponential Distribution)：以反函數法 (Inverse Transform Sampling) 產生數值。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `random` | `IRNGLike` | 亂數來源 |
| `lambda` | `number` | 率參數 (Rate Parameter) λ，需 `> 0` |

### dfGeometric(random, p = 0.5)

幾何分佈 (Geometric Distribution)：回傳首次成功所需的試驗次數（含成功那次），結果為 `≥ 1` 的整數。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `random` | `IRNGLike` | 亂數來源 |
| `p` | `number` | 成功機率，範圍 `0 < p ≤ 1` |

### dfIrwinHall(random, n = 1)

Irwin–Hall 分佈：回傳 `n` 個均勻亂數的總和，結果落在 `[0, n)`；`n = 0` 時固定回傳 `0`。Bates 分佈即由此函式除以 `n` 而得。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `random` | `IRNGLike` | 亂數來源 |
| `n` | `number` | 均勻樣本數，需為非負整數 (`≥ 0`) |

參考資料：

- <https://zh.wikipedia.org/wiki/%E6%AD%90%E6%96%87%E2%80%93%E8%B3%80%E7%88%BE%E5%88%86%E4%BD%88>
- <https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution>

### dfLogNormal(...args)

對數常態分佈 (Log-Normal Distribution)：建立常態取樣函式後取指數 `exp()`，參數與 `dfNormal` 完全相同。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `...args` | `Parameters<typeof dfNormal>` | 與 `dfNormal(random, mu, sigma)` 相同 |

### dfNormal(random, mu = 0, sigma = 1)

常態分佈 (Normal Distribution / 高斯分佈 Gaussian)：以 Marsaglia 極座標法 (Polar Method) 產生標準常態值，再平移、縮放到 `mu` 與 `sigma`。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `random` | `IRNGLike` | 亂數來源 |
| `mu` | `number` | 平均值 (Mean)，需為數字 |
| `sigma` | `number` | 標準差 (Standard Deviation)，需為數字 |

### dfPareto(random, alpha = 1)

帕累托分佈 (Pareto Distribution)：以反函數法產生數值。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `random` | `IRNGLike` | 亂數來源 |
| `alpha` | `number` | 形狀參數 (Shape Parameter) α，需 `> 0` |

## 開發 (Development)

```bash
pnpm run build
pnpm run lint
pnpm run test
```

## 變更日誌 (Changelog)

請見 [CHANGELOG.md](./CHANGELOG.md)。

## 常見問題 (FAQ)

### 取樣函式可以共用嗎？

可以。建立時就把參數固定下來，同一個取樣函式可反覆呼叫；若需要不同的參數組合，請另外建立一個取樣函式。

### 為什麼參數錯誤要等到建立時才拋出？

參數範圍（例如機率 `p`、樣本數 `n`）在建立後就不會改變，提前驗證可避免每次取樣都重複檢查，也能在程式早期攔下錯誤。

## 相關資源 (Resources)

- [Repository](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/df-algorithm#readme)
- [Issues](https://github.com/bluelovers/ws-random/issues)
