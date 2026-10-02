# @lazy-random/seed-algorithm

`@lazy-random/seed-algorithm` 收錄與種子 (Seed) 相關的雜湊演算法 (Hash Algorithm) 與工具函式，用來把字串、數字或陣列形式的種子轉換成亂數產生器 (Random Number Generator) 所需的數值序列。

## 特色 (Features)

- 字串雜湊 (String Hash) 演算法：`xfnv1a`、`xmur3` 等多種變體，回傳可持續產生亂數的閉包 (Closure)
- 浮點數 (Float) 轉換工具：以 `ArrayBuffer` 拆解 IEEE 754 表示法
- 整數序列 (Integer List) 演算法：`v3b` 可由單一種子展開出 32 位元無號整數序列
- `seedFromStringOrNumberOrArray()` 統一處理字串、數字、陣列三種種子輸入，並補足缺失欄位
- 純函式 (Pure Function) 設計，無全域狀態、無额外設定

## 安裝 (Installation)

```bash
yarn add @lazy-random/seed-algorithm
yarn-tool add @lazy-random/seed-algorithm
yt add @lazy-random/seed-algorithm
```

## 使用方式 (Usage)

以字串建立可重複的亂數序列：

```ts
import { df_xfnv1a } from '@lazy-random/seed-algorithm';

const next = df_xfnv1a('hello');

console.log(next());
console.log(next());
```

把任意種子輸入整理成固定長度的數值陣列：

```ts
import { seedFromStringOrNumberOrArray } from '@lazy-random/seed-algorithm';

const seeds = seedFromStringOrNumberOrArray('my-seed', 4);

console.log(seeds);
```

## API 文件 (API Reference)

### 字串雜湊 (String Hash)

#### `df_xfnv1a(str: string): () => number`

以 FNV-1a 風格的雜湊將字串 `str` 折疊成初始狀態，回傳一個每次呼叫都推進狀態的閉包 (Closure)，每次回傳 32 位元無號整數。

- **參數 (Parameters)**：`str` — 要雜湊的字串
- **回傳 (Returns)**：`() => number` — 可重複呼叫以取得下一個亂數的函式

#### `df_xfnv1a_2(str: string): () => number`

`df_xfnv1a` 的變體，初始常數與攪拌 (Mixing) 步驟不同，適合需要不同雜湊分佈的場合。

#### `df_xmur3(str: string): () => number`

以 xmur3 演算法將字串折疊為種子狀態，回傳後續產生亂數的閉包。

#### `df_xmur3a(str: string): () => number`

`df_xmur3` 的變體，加入額外的乘法攪拌步驟。

### 浮點轉換 (Float Conversion)

#### `doubleToIEEE(floatNumber: number): [number, number]`

將 JavaScript 的 64 位元倍精度浮點數 (Double) 拆成兩個 32 位元整數，回傳 `[low, high]`。

```ts
import { doubleToIEEE } from '@lazy-random/seed-algorithm';

doubleToIEEE(0.732821894576773);
```

### 整數序列 (Integer List)

#### `df_v3b(a: number, b?: number, c?: number, d?: number): () => number`

以 4 個 32 位元狀態欄位產生無號整數序列的閉包。省略 `b`、`c`、`d` 時會使用內建預設常數。

```ts
import { df_v3b } from '@lazy-random/seed-algorithm';

const next = df_v3b(0);

console.log(next());
```

- **參數 (Parameters)**
  - `a` — 初始狀態（任意 32 位元無號整數）
  - `b`、`c`、`d` — 其餘狀態欄位，省略時採用預設常數
- **回傳 (Returns)**：`() => number` — 每次回傳一個 32 位元無號整數

### 種子整理 (Seed Normalization)

#### `ISeedInputFromStringOrNumberOrArray`

種子輸入的型別 (Type Alias)：可為字串或數字，亦可為其陣列（含唯讀陣列）。

#### `seedFromStringOrNumberOrArray<L extends number>(seedInput, size): number[] & { length: L }`

把 `seedInput` 整理成長度為 `size` 的數值陣列，供後續亂數演算法使用：

- 字串欄位以 `df_xfnv1a()` 雜湊並附加索引後綴，避免不同位置的相同字串產生相同值
- 數字欄位取絕對值 (Absolute Value)
- 缺失、`undefined`、`null` 或其餘型別的欄位，會以 `_MathRandom()` 產生的 IEEE 754 高位 32 位元片段補足
- 當種子中出現 `0` 時，只允許第一個 `0` 被保留，其餘的 `0` 會被隨機值取代，以確保四個狀態欄位不會同時退化

- **參數 (Parameters)**
  - `seedInput` — 字串、數字或其陣列
  - `size` — 期望回傳的欄位數
- **回傳 (Returns)**：長度為 `size` 的 `number[]`

```ts
import { seedFromStringOrNumberOrArray } from '@lazy-random/seed-algorithm';

const seeds = seedFromStringOrNumberOrArray([1, 'two', 3], 4);
```

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
pnpm run lint
```

## 變更日誌 (Changelog)

本套件的版本變更請見 [CHANGELOG.md](./CHANGELOG.md)。

## 常見問題 (FAQ)

### 為什麼字串雜湊回傳的是函式而不是數字？

字串雜湊函式只負責把輸入折疊成初始狀態；回傳的閉包 (Closure) 保存了該狀態，每呼叫一次就推進一次，因此可以持續產生互不相同的亂數，同時保有「相同輸入 → 相同序列」的可重現性 (Reproducibility)。

### `seedFromStringOrNumberOrArray` 為什麼會補隨機值？

若四個狀態欄位全為 `0`，部分亂數演算法會退化成固定序列。因此在種子資料不足時，會以 `_MathRandom()` 補足缺失欄位，確保至少有足夠的熵 (Entropy)。

## 相關資源 (Resources)

- [原始碼 Repository](https://github.com/bluelovers/ws-random)
- [問題回報 (Issues)](https://github.com/bluelovers/ws-random/issues)
- [bryc — JS hash functions](https://github.com/bryc/code/blob/master/jshash/PRNGs.md)
