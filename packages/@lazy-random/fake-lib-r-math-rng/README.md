# @lazy-random/fake-lib-r-math-rng

將任意「回傳 0～1 亂數 (Random Number) 的函式」包裝為 [lib-r-math.js](https://github.com/bluelovers/lib-r-math.js) 所使用的 `IRNG` 介面 (Interface)，方便把自訂的偽亂數發生器 (PRNG) 接入 R 統計函式的實作。

## 特色 (Features)

- 一行程式碼即可把 `() => number` 形式的亂數函式轉為 `IRNG` 物件
- 同時提供 `unif_rand` 與 `internal_unif_rand`，符合 `IRNG` 的介面形狀 (Shape)
- 支援批量產生：傳入 `n > 1` 時回傳長度為 `n` 的亂數陣列 (Array)
- 無執行期 (Runtime) 相依，不需要安裝 `lib-r-math.js` 即可使用

## 安裝 (Installation)

```bash
yarn add @lazy-random/fake-lib-r-math-rng
yarn-tool add @lazy-random/fake-lib-r-math-rng
yt add @lazy-random/fake-lib-r-math-rng
```

## 使用方式 (Usage)

```ts
import fakeLibRMathRng from '@lazy-random/fake-lib-r-math-rng';

// 以任意回傳 0～1 的亂數函式作為底層亂數來源 (Entropy Source)
const rng = fakeLibRMathRng(() => Math.random());

// 不傳參數：取得單一亂數
const value = rng.unif_rand();

// 傳入 n > 1：取得長度為 n 的亂數陣列
const values = rng.unif_rand(5);

// 兩個欄位指向同一個函式，可自由搭配 lib-r-math.js 相關實作的取用方式
rng.internal_unif_rand(3);
```

## API 文件 (API Documentation)

### `fakeLibRMathRng(fn)`

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `fn` | `() => number` | 底層亂數函式，每次呼叫回傳一個 0～1 的亂數 |

| 回傳值 (Returns) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `IRNG` | `IRNG` | 包裝後的亂數發生器物件，含 `unif_rand` 與 `internal_unif_rand` |

#### `unif_rand(n?)`

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `n` | `number \| undefined` | 要產生的亂數個數；省略或不大於 1 時回傳單一亂數，大於 1 時回傳亂數陣列 |

> `IRNG` 型別來自 `lib-r-math.js`，但因為是以型別 (Type) 方式引用，執行期並無此相依。

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
```

## 變更日誌 (Changelog)

詳見 [CHANGELOG.md](./CHANGELOG.md)。

## 相關資源 (Related Resources)

- [lib-r-math.js](https://github.com/bluelovers/lib-r-math.js)
