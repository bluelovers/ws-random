# @lazy-random/lib-r-math-rng

橋接 [lib-r-math.js](https://www.npmjs.com/package/lib-r-math.js) 與 `@lazy-random`／`random-extra` 的亂數 (Random Number) 產生器 (Random Number Generator, RNG) 包裝套件，讓兩套亂數系統可以互相替換、混用。

本套件提供兩個方向的包裝：

- `RandomRngWithLibRMath`（預設匯出）：把 lib-r-math.js 的 `IRNG` 包裝成 `@lazy-random` 的 `RNG`
- `LibRMathRngWithRandom`：把 `random-extra` 的 `Random` 包裝成 lib-r-math.js 的 `IRNG`

## 特色 (Features)

- 雙向橋接 lib-r-math.js 與 `random-extra`／`@lazy-random`
- 建立時可彈性傳入 `IRNG` 實例、`IRNG` 子類別、RNGLike 實例或名稱字串，自動解析為底層亂數 (Random Number) 產生器
- 未指定時自動退回預設的 MersenneTwister
- 以 TypeScript 撰寫，附型別定義 (Type Definitions)

## 安裝 (Installation)

```bash
yarn add @lazy-random/lib-r-math-rng
yarn-tool add @lazy-random/lib-r-math-rng
yt add @lazy-random/lib-r-math-rng
```

## 使用方式 (Usage)

以 lib-r-math.js 的亂數 (Random Number) 作為 `@lazy-random` 的亂數來源：

```ts
import RandomRngWithLibRMath from '@lazy-random/lib-r-math-rng';

// 未指定時使用預設的 MersenneTwister
const rng = new RandomRngWithLibRMath(1234);

// 取得下一個亂數 (Random Number)
rng.next();

// 重新設定種子 (Seed)
rng.seed(5678);

// 回傳名稱，格式為 `libRMath` 加上底層產生器名稱（若有）
console.log(rng.name);
```

以 `random-extra` 的 `Random` 作為 lib-r-math.js 的亂數來源：

```ts
import { LibRMathRngWithRandom } from '@lazy-random/lib-r-math-rng';

// 以 'seedrandom' 作為底層亂數產生器 (RNG)
const rng = new LibRMathRngWithRandom(1234, 'seedrandom');

// 切換底層亂數產生器 (RNG)，第二個參數為種子 (Seed)
rng.use('seedrandom', 1234);

// 透過 setter 重設種子 (Seed)
rng.seed = 1234;

// 取得下一個亂數 (Random Number)
rng.internal_unif_rand();
```

## API 文件 (API)

### `RandomRngWithLibRMath<R extends IRNG>`（預設匯出）

把 lib-r-math.js 的 `IRNG` 包裝為 `@lazy-random` 的 `RNG`。

#### `constructor(seed?, opts?, ...argv)`

依以下優先順序解析要使用的亂數產生器 (RNG)：

1. `seed` 本身是 `IRNG` 實例 → 直接採用
2. `opts` 本身是 `IRNG` 實例 → 直接採用
3. `seed` 是 `IRNG` 子類別 → 以 `opts` 作為種子 (Seed) 實例化
4. `opts` 是 `IRNG` 子類別 → 以 `seed` 作為種子 (Seed) 實例化
5. `seed` 是具有 `unif_rand`／`internal_unif_rand` 的 RNGLike 實例 → 直接採用
6. `opts` 是 RNGLike 實例 → 直接採用
7. `opts` 是 lib-r-math.js 匯出的名稱 → 查表後以 `seed` 作為種子 (Seed) 實例化
8. 以上皆非 → 退回預設的 MersenneTwister

#### `next(): number`

呼叫綁定好的底層函式，回傳下一個亂數 (Random Number)。

#### `name` (getter)

回傳 `libRMath` 加上底層亂數產生器 (RNG) 的名稱，例如 `libRMath<MersenneTwister>`（底層無名稱時僅回傳 `libRMath`）。

#### `options` (getter)

回傳底層 `IRNG` 的種子 (Seed)。

#### `seed(seed?, opts?, ...argv)`

將種子 (Seed) 寫入底層 `IRNG`。

### `LibRMathRngWithRandom extends IRNG`

把 `random-extra` 的 `Random` 包裝為 lib-r-math.js 的 `IRNG`，讓 lib-r-math.js 的函式可改用 `random-extra` 作為亂數來源。

#### `constructor(_seed?, rng?)`

建立實例並立刻套用底層亂數產生器與種子 (Seed)。

#### `use(rng?, _seed?)`

正規化傳入的 `rng` 後設為當前底層亂數產生器 (RNG)：

- `RNG` 或具有 `next()` 的 `IRNGLike` 實例 → 直接採用
- 字串 `'seedrandom'` → 以 `entropy: false` 選項建立
- 其他非 `Random` 的輸入 → 交由 `random.newUse()` 解析
- 未傳入 → 沿用既有的 `__random`，否則退回全域 `random`

若 `_seed` 有明確傳入，會一併重設種子 (Seed)。

#### `seed` (getter / setter)

讀取或設定目前的種子 (Seed)；setter 會同步呼叫底層 `Random` 的種子設定函式。

#### `internal_unif_rand(): number`

回傳底層 `Random` 產生的下一個亂數 (Random Number)。

### `_isLibRMathRNGLike(rng)`

型別守衛 (Type Guard)：判斷 `rng` 是否為 RNGLike（具有 `unif_rand()` 或 `internal_unif_rand()`）。

### `_isExtendsOfLibRMathRNGLike(rng)`

型別守衛 (Type Guard)：判斷 `rng` 是否為 lib-r-math.js `IRNG` 的子類別 (Subclass)。

## 設定 (Configuration)

本套件無需額外設定；未指定亂數產生器 (RNG) 時使用預設的 MersenneTwister。

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
```

## 變更日誌 (Changelog)

詳細版本紀錄請見 [CHANGELOG.md](./CHANGELOG.md)。

## FAQ

**Q: 建立 `RandomRngWithLibRMath` 時如何決定使用哪個底層產生器 (RNG)？**

A: 依 `constructor` 的優先順序解析（詳見上方 API 文件），從 `IRNG` 實例、`IRNG` 子類別、RNGLike 實例、lib-r-math.js 匯出名稱，最後退回預設的 MersenneTwister。

**Q: 呼叫 `seed()` 之後，下一次 `next()` 會用到新種子 (Seed) 嗎？**

A: 會。`seed()` 會將種子寫入底層 `IRNG` 的 `seed`，之後的 `next()` 皆由該底層產生器繼續取亂數 (Random Number)。

**Q: 為什麼 `name` 會顯示 `libRMath<MersenneTwister>`？**

A: `name` getter 會回傳 `libRMath` 加上底層 `IRNG` 的名稱；若底層未提供名稱，則僅回傳 `libRMath`。

**Q: 如何在 lib-r-math.js 中改用 `random-extra` 的亂數來源？**

A: 使用 `LibRMathRngWithRandom` 包裝後，再交給 lib-r-math.js 的函式使用，可透過 `use()` 切換底層產生器、透過 `seed` setter 重設種子。

## 相關資源 (Related Resources)

- [lib-r-math.js](https://www.npmjs.com/package/lib-r-math.js)
- [random-extra](https://www.npmjs.com/package/random-extra)
- [seedrandom](https://www.npmjs.com/package/seedrandom)
