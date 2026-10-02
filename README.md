# ws-random

亂數 (Random Number) 產生與分佈 (Distribution) 相關工具的 monorepo。

## 特色 (Features)

- **可播種亂數 (Seedable RNG)**：提供 `Math.random`、`crypto`、`seedrandom`、`sfc32`、`xor128`、`xorshift128+` 等多種亂數產生器 (Generator)
- **常見分佈 (Distributions)**：常態、均勻、卜瓦松 (Poisson)、幾何、指數、貝塔相關與加權抽樣等
- **數值工具 (Numeric utilities)**：進位制轉換、浮點數處理、數值比對與加總
- **獨立版本 (Independent versioning)**：各子套件版本由 lerna 獨立管理

## 專案結構 (Architecture)

workspace 掃描路徑（同時定義於 `lerna.json` 與 `package.json`）：

```
packages/*
packages/@lazy-random/*
packages/@lazy-num/*
```

| 目錄 | 說明 |
| --- | --- |
| `packages/` | 一般套件（5 個） |
| `packages/@lazy-num/` | 數值工具 (Numeric utilities)（7 個） |
| `packages/@lazy-random/` | 亂數與分佈相關套件 (Random & distribution)（40 個） |

## 子套件一覽 (Packages)

> 以下用途依套件命名與各套件 README 彙整。

### `packages/`（一般套件）

| 套件 | 用途 |
| --- | --- |
| [anybase2](./packages/anybase2) | 2 ... 62 進位制 (Numeric Base) 互相轉換，含 CLI |
| [num-in-delta](./packages/num-in-delta) | 判斷實際數值是否為預期值 ± delta |
| [num-is-zero](./packages/num-is-zero) | 判斷與正規化零值 (Zero) |
| [random-extra](./packages/random-extra) | 可播種的亂數產生器，支援多種分佈與實例方法 |
| [random-sum-float](./packages/random-sum-float) | 依 size／sum／min／max 產生浮點亂數陣列 |

### `packages/@lazy-num/`（數值工具）

| 套件 | 用途 |
| --- | --- |
| [@lazy-num/float-algorithm](./packages/@lazy-num/float-algorithm) | 浮點數與整數串的亂數演算法集合 |
| [@lazy-num/float-from-buffer](./packages/@lazy-num/float-from-buffer) | 從 `Buffer` 讀取 [0,1) 浮點亂數 |
| [@lazy-num/float-to-string](./packages/@lazy-num/float-to-string) | 浮點數以定點表示轉為字串 |
| [@lazy-num/max-safe-number](./packages/@lazy-num/max-safe-number) | 尋找 IEEE 754 安全數值上限 |
| [@lazy-num/parse-number-string](./packages/@lazy-num/parse-number-string) | 數字字串的型別守衛 (Type Guard) 與解析 |
| [@lazy-num/sum](./packages/@lazy-num/sum) | 加總工具：`sum_1_to_n`、`num_array_sum` |
| [@lazy-num/to-fixed-number](./packages/@lazy-num/to-fixed-number) | 數值的定點表示 (Fixed-point notation) |

### `packages/@lazy-random/`（亂數與分佈）

#### 核心與抽象 (Core & abstraction)

| 套件 | 用途 |
| --- | --- |
| [@lazy-random/random-core](./packages/@lazy-random/random-core) | 亂數核心類別，整合分佈、陣列抽樣與加權抽樣 |
| [@lazy-random/rng-abstract](./packages/@lazy-random/rng-abstract) | RNG 抽象基礎類別（含種子處理） |
| [@lazy-random/rng-abstract-core](./packages/@lazy-random/rng-abstract-core) | RNG 核心抽象層與 `IRNGLike` 介面 |
| [@lazy-random/rng-factory](./packages/@lazy-random/rng-factory) | 依名稱建立 RNG 實例的工廠 (Factory) |
| [@lazy-random/shared-lib](./packages/@lazy-random/shared-lib) | 共用工具函式庫 |
| [@lazy-random/expect](./packages/@lazy-random/expect) | 測試用的斷言輔助 |
| [@lazy-random/clone-class](./packages/@lazy-random/clone-class) | 複製／取得類別定義的輔助 |
| [@lazy-random/simple-wrap](./packages/@lazy-random/simple-wrap) | 以最簡單的方式包裝既有 RNG |

#### 亂數產生器 (Generators)

| 套件 | 用途 |
| --- | --- |
| [@lazy-random/generators-math-random](./packages/@lazy-random/generators-math-random) | 以原始 `Math.random()` 為基礎、不可重播 |
| [@lazy-random/generators-math-random2](./packages/@lazy-random/generators-math-random2) | `Math.random()` 的另一種包裝 |
| [@lazy-random/generators-crypto](./packages/@lazy-random/generators-crypto) | 以 `crypto` 隨機數為基礎的產生器 |
| [@lazy-random/generators-function](./packages/@lazy-random/generators-function) | 以任意函式為基礎的產生器 |
| [@lazy-random/generators-seedrandom](./packages/@lazy-random/generators-seedrandom) | 包裝 `seedrandom`，支援選項與狀態 (state) |
| [@lazy-random/generators-sfc32](./packages/@lazy-random/generators-sfc32) | SFC32 伪随机数生成器 (PRNG) |
| [@lazy-random/generators-xor128](./packages/@lazy-random/generators-xor128) | xor128 PRNG |
| [@lazy-random/generators-xorshift128](./packages/@lazy-random/generators-xorshift128) | 包裝 xorshift128+ 的產生器 |
| [@lazy-random/original-math-random](./packages/@lazy-random/original-math-random) | 保存並還原未被改寫的原始 `Math.random()` |
| [@lazy-random/cross-crypto](./packages/@lazy-random/cross-crypto) | 跨環境 (Node／瀏覽器) 的 crypto 隨機數來源 |
| [@lazy-random/preset-seedrandom](./packages/@lazy-random/preset-seedrandom) | `seedrandom` 的預設設定 (Preset) |
| [@lazy-random/fake-lib-r-math-rng](./packages/@lazy-random/fake-lib-r-math-rng) | 模擬 `lib-r-math.js` 的 `IRNG` 介面 |
| [@lazy-random/lib-r-math-rng](./packages/@lazy-random/lib-r-math-rng) | 將 `lib-r-math.js` RNG 橋接為本仓库的 RNG |

#### 種子 (Seeds)

| 套件 | 用途 |
| --- | --- |
| [@lazy-random/seed-algorithm](./packages/@lazy-random/seed-algorithm) | 種子 (Seed) 產生演算法與清單 |
| [@lazy-random/seed-data](./packages/@lazy-random/seed-data) | 種子相關的靜態資料 |
| [@lazy-random/seed-date](./packages/@lazy-random/seed-date) | 以日期時間作為種子 |
| [@lazy-random/seed-token](./packages/@lazy-random/seed-token) | 以 token 作為種子 |

#### 分佈 (Distributions)

| 套件 | 用途 |
| --- | --- |
| [@lazy-random/df-algorithm](./packages/@lazy-random/df-algorithm) | 各種分佈的數學演算法（常態、卜瓦松、幾何、指數…） |
| [@lazy-random/df-array](./packages/@lazy-random/df-array) | 陣列抽樣：索引、洗牌 (Shuffle)、去重、填值 |
| [@lazy-random/df-char-id](./packages/@lazy-random/df-char-id) | 產生隨機字元識別碼 (Char ID) |
| [@lazy-random/df-item-by-weight](./packages/@lazy-random/df-item-by-weight) | 加權抽樣 (Weighted sampling) |
| [@lazy-random/df-poisson](./packages/@lazy-random/df-poisson) | 卜瓦松分佈 (Poisson distribution) |
| [@lazy-random/df-sum](./packages/@lazy-random/df-sum) | 依總和產生整數／浮點亂數數列 |
| [@lazy-random/df-uniform](./packages/@lazy-random/df-uniform) | 均勻分佈 (Uniform) 與布林判斷 |
| [@lazy-random/df-uuid](./packages/@lazy-random/df-uuid) | UUID v4 產生與驗證 |
| [@lazy-random/distributions](./packages/@lazy-random/distributions) | 上述分佈套件的聚合匯出 (Aggregate) |
| [@lazy-random/util-distributions](./packages/@lazy-random/util-distributions) | 分佈共用工具 |
| [@lazy-random/util-probabilities](./packages/@lazy-random/util-probabilities) | 機率 (Probability) 計算工具 |

#### 其他 (Others)

| 套件 | 用途 |
| --- | --- |
| [@lazy-random/array-algorithm](./packages/@lazy-random/array-algorithm) | 陣列元素互換與重新分配演算法 |
| [@lazy-random/array-rand-index](./packages/@lazy-random/array-rand-index) | 隨機取得陣列索引 |
| [@lazy-random/bytes-to-uuid](./packages/@lazy-random/bytes-to-uuid) | 將位元組 (Bytes) 轉為 UUID 字串 |
| [@lazy-random/util-test](./packages/@lazy-random/util-test) | 測試共用工具 |

## 開發 (Development)

```bash
pnpm install                       # 安裝相依 (install dependencies)

pnpm run test                      # 測試變更過的套件 (test changed packages)
pnpm run test:all                  # 測試所有套件 (test all packages)
pnpm run build:all                 # 建置所有套件 (build all packages)

pnpm run ncu                       # 更新相依版本 (update dependencies)
pnpm run sort-package-json         # 整理 package.json 欄位順序

pnpm run lerna:publish             # 以 lerna 發布 (publish)
```

其餘腳本 (Script) 請見 [package.json](./package.json) 的 `scripts` 欄位。

## 變更日誌 (Changelog)

- [CHANGELOG.md](./CHANGELOG.md)
- 各子套件目錄下亦有獨立的 `CHANGELOG.md`
