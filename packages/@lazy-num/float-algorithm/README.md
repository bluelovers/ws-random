# @lazy-num/float-algorithm

多種偽亂數產生器 (PRNG) 演算法的小型實作集合，回傳可直接呼叫以取得 `[0, 1)` 浮點數的抽樣函式 (Thunk)。

## 特色 (Features)

- 收錄 `mulberry32`、`splitmix32`、`sfc32`、`tyche` / `tychei` 等常見 32 位元 (32-bit) PRNG 演算法。
- 全部以 TypeScript 撰寫並附型別宣告 (Type Declarations)，同時支援 CommonJS 與 ESM。
- 依狀態型態分為兩類：
  - `number` 系列（單一整數狀態）：`df_mulberry32`、`df_splitmix32`
  - `int-list` 系列（四個整數狀態）：`df_sfc32`、`df_tyche`、`df_tychei`
- 每個 `df_*` 函式皆回傳 thunk（無參數函式），重複呼叫即可持續取得下一筆亂數。
- 無任何執行時期相依 (Runtime Dependencies)。

## 安裝 (Installation)

```bash
npm install @lazy-num/float-algorithm
```

```bash
yarn add @lazy-num/float-algorithm
yarn-tool add @lazy-num/float-algorithm
yt add @lazy-num/float-algorithm
```

## 使用方式 (Usage)

```js
import { df_mulberry32, df_splitmix32 } from '@lazy-num/float-algorithm'

// 以種子 (Seed) 初始化，回傳抽樣函式
const next = df_mulberry32(12345)

next() // 0.8317617177963257，[0, 1) 之間的浮點數
next() // 每次呼叫推進狀態，取得下一個值
```

```js
import { df_sfc32, df_tyche, df_tychei } from '@lazy-num/float-algorithm'

// int-list 系列需要四個整數作為初始狀態
const next = df_sfc32(1, 2, 3, 4)

next() // [0, 1) 之間的浮點數
```

```js
import { df_mulberry32 } from '@lazy-num/float-algorithm'

// 相同種子可重現相同的亂數序列 (Reproducible Sequence)
const a = df_mulberry32(42)
const b = df_mulberry32(42)

a() === b() // true
```

## API 文件

所有函式皆以 `df_` 前綴命名，回傳值統一為 `() => number`（介於 `[0, 1)` 的浮點數）。

### df_mulberry32(n)

`mulberry32` 演算法，狀態為單一整數。

| 參數 | 型別 | 說明 |
| --- | --- | --- |
| `n` | `number` | 初始狀態 (Initial State)，會先以 `\|= 0` 收斂為 32 位元整數 |

**回傳值 (Returns)**：`() => number` — 抽樣函式 (Thunk)。

### df_splitmix32(n)

`splitmix32` 演算法，常與其他 PRNG 搭配作為種子分散器 (Seed Splitter)。

| 參數 | 型別 | 說明 |
| --- | --- | --- |
| `n` | `number` | 初始狀態 (Initial State) |

**回傳值 (Returns)**：`() => number` — 抽樣函式 (Thunk)。

### df_sfc32(a, b, c, d)

`Small Fast Counter` 32 位元演算法，屬於 [PracRand](https://pracrand.sourceforge.net/) 測試套件的一员，可通過 PractRand 與 TestU01 的 Crush/BigCrush 測試，速度亦屬最快的一級。

| 參數 | 型別 | 說明 |
| --- | --- | --- |
| `a` | `number` | 初始狀態 1 |
| `b` | `number` | 初始狀態 2 |
| `c` | `number` | 初始狀態 3 |
| `d` | `number` | 初始狀態 4 |

**回傳值 (Returns)**：`() => number` — 抽樣函式 (Thunk)。

### df_tyche(a, b, c, d)

`Tyche` 演算法，改編自 ChaCha 的 quarter-round，速度稍慢但品質良好。

| 參數 | 型別 | 說明 |
| --- | --- | --- |
| `a` | `number` | 初始狀態 1 |
| `b` | `number` | 初始狀態 2 |
| `c` | `number` | 初始狀態 3 |
| `d` | `number` | 初始狀態 4 |

**回傳值 (Returns)**：`() => number` — 抽樣函式 (Thunk)。

### df_tychei(a, b, c, d)

`Tyche` 的反轉 (Inverted) 版本 `tychei`，實測比 `df_tyche` 快約 20%。

| 參數 | 型別 | 說明 |
| --- | --- | --- |
| `a` | `number` | 初始狀態 1 |
| `b` | `number` | 初始狀態 2 |
| `c` | `number` | 初始狀態 3 |
| `d` | `number` | 初始狀態 4 |

**回傳值 (Returns)**：`() => number` — 抽樣函式 (Thunk)。

## 設定 (Configuration)

本套件無設定檔，所有行為皆由各 `df_*` 函式的初始狀態參數決定。

## 開發 (Development)

在 monorepo 根目錄或本套件目錄下執行：

```bash
pnpm run test
pnpm run build
```

其他可用指令：`pnpm run lint`、`pnpm run coverage`、`pnpm run review`。

## 變更日誌 (Changelog)

請見 [CHANGELOG.md](./CHANGELOG.md)。

## FAQ

**Q: 為什麼回傳的是函式而不是直接回傳亂數？**
A: 回傳 thunk（無參數函式）可讓狀態推進留在閉包 (Closure) 內，呼叫端重複呼叫即可取得序列，省去每次重新傳入狀態的開銷。

**Q: 如何取得可重現的亂數序列？**
A: 固定初始狀態即可，相同輸入必產生相同序列；若種子來自字串，可先以 `@lazy-random/seed-algorithm` 等工具將其雜湊 (Hash) 成數值。

**Q: `number` 與 `int-list` 有何差別？**
A: `number` 系列以單一整數為狀態，初始化較簡單；`int-list` 系列以四個整數為狀態，狀態空間更大，通常品質與通過統計測試的能力較好。

## 相關資源 (Related Resources)

- [PracRand](https://pracrand.sourceforge.net/) — PRNG 統計測試套件，`sfc32` 亦為其收錄演算法之一。
- [random-extra](https://www.npmjs.com/package/random-extra) — 同 monorepo 的亂數工具套件，可搭配本套件的演算法使用。
