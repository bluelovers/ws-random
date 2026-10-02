# @lazy-random/df-poisson

泊松分佈 (Poisson Distribution) 的亂數 (Random Number) 產生器，回傳一個可持續呼叫的閉包 (Closure)，每次呼叫即產生一個服從泊松分佈的非負整數。

適合用於模擬「單位時間內稀有事件發生次數」的情境，例如客服來電次數、網頁造訪次數等。

## 特色 (Features)

- 依平均值 `lambda` 自動選擇實作方式：
  - `lambda < 10`：反轉法 (Inversion Method)
  - `lambda >= 10`：產生法 (Generative Method，使用預計算常數的變形拒絕抽樣)
- 採用 `IRNGLike` 介面，可搭配任意實作 `next()` 的亂數產生器 (Random Number Generator)
- 透過 `expect(lambda).gt(0)` 驗證參數，`lambda` 必須大於 0

## 安裝 (Installation)

```bash
yarn add @lazy-random/df-poisson
yarn-tool add @lazy-random/df-poisson
yt add @lazy-random/df-poisson
```

或使用 pnpm：

```bash
pnpm add @lazy-random/df-poisson
```

## 使用方式 (Usage)

```ts
import dfPoisson from '@lazy-random/df-poisson';

// 任何實作 next()（回傳 [0, 1) 數值）的亂數產生器皆可作為來源
const random = {
	next: () => Math.random(),
};

// 建立 lambda = 4 的泊松分佈產生器
const poisson = dfPoisson(random, 4);

// 每次呼叫即取得一個泊松亂數
const value = poisson();

console.log(value);
```

本套件測試中亦使用 `@lazy-random/util-test` 的 `newRngSeedRandom()` 作為亂數來源：

```ts
import dfPoisson from '@lazy-random/df-poisson';
import { newRngSeedRandom } from '@lazy-random/util-test';

const poisson = dfPoisson(newRngSeedRandom());
```

也可以使用具名匯出 (Named Export)：

```ts
import { dfPoisson } from '@lazy-random/df-poisson';
```

## API 文件 (API Documentation)

### `dfPoisson(random, lambda = 1)`

建立一個回傳泊松分佈亂數的產生器函式。

| 參數 (Parameter) | 型別 (Type) | 預設值 | 說明 |
| --- | --- | --- | --- |
| `random` | `IRNGLike` | — | 亂數來源 (Random Number Generator)，需實作 `next()` 並回傳 `[0, 1)` 區間的數值 |
| `lambda` | `number` | `1` | 泊松分佈的平均值 (Mean) `λ`，必須大於 0 |

**回傳 (Returns)**：`() => number` — 可重複呼叫的產生器函式 (Generator Function)，每次回傳一個非負整數。

**拋出 (Throws)**：當 `lambda <= 0` 時，由 `expect(lambda).gt(0)` 驗證失敗並拋出錯誤。

### 內部實作說明

- `logFactorialTable`：預先計算的 `ln(k!)` 查表值，供小整數的機率驗證使用。
- 反轉法以累加機率的方式逐一扣除機率質量 (Probability Mass)，直到覆蓋抽樣值 `u`。
- 產生法使用 `lambda >= 10` 時的近似常數與 Stirling 近似 (Stirling's Approximation) 進行拒絕檢定 (Rejection Test)。

## 開發 (Development)

```bash
pnpm run test
pnpm run build
```

## 變更日誌 (Changelog)

請見 [CHANGELOG.md](./CHANGELOG.md)。

## 相關資源 (Related Resources)

- [Repository](https://github.com/bluelovers/ws-random)
