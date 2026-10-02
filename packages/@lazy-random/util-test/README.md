# @lazy-random/util-test

`@lazy-random/util-test` 提供數個用於測試與示範的亂數發生器 (Random Number Generator, RNG) 建立工具，封裝 `@lazy-random/simple-wrap`、`@lazy-random/original-math-random`、`@lazy-random/rng-factory` 與 `seedrandom`，讓測試程式能快速取得介面一致的 RNG 實作。

## 特色 (Features)

- 以內建 `Math.random` 快速建立具完整方法的亂數 (Random Number) 發生器 (RNG)
- 以固定種子 (Seed) 建立可重現 (Reproducible) 的擬亂數 (Pseudorandom Number) 序列，便於測試斷言 (Assertion)
- 轉出 (Re-export) `RNGFactory`，可用自訂亂數來源建立 RNG
- 使用 TypeScript 撰寫，並附帶型別宣告 (Type Declarations)

## 安裝 (Installation)

```bash
yarn add @lazy-random/util-test
yarn-tool add @lazy-random/util-test
yt add @lazy-random/util-test
```

## 使用方式 (Usage)

```ts
import { newRngMathRandom, newRngSeedRandom, newRngFactory } from '@lazy-random/util-test';
import seedrandom from 'seedrandom';

// 以內建 Math.random 為亂數來源
const rng = newRngMathRandom();

rng.next();
rng.random();
rng.float(0, 1);
rng.int(1, 6);
rng.boolean(60);
rng.bytes(8);

// 固定種子，序列可重現 (Reproducible)
const seeded = newRngSeedRandom();

// 以自訂擬亂數 (Pseudorandom) 函數建立 RNG
const custom = newRngFactory(seedrandom('my-seed'));
```

## API 文件 (API Documentation)

### newRngMathRandom()

以內建 `Math.random` 為亂數 (Random Number) 來源，經 `simpleWrap` 包裝後回傳 RNG 物件；未設定種子 (Seed)，沿用原始亂數來源的非決定性 (Non-deterministic) 行為。

回傳物件的方法如下（詳細語意請參閱 `@lazy-random/simple-wrap`）：

| 方法 (Method) | 說明 |
| --- | --- |
| `next()` | 取得下一個亂數 (Random Number) |
| `random()` | 取得亂數值 |
| `float(min?, max?)` | 取得區間亂數 (Float) |
| `int(min?, max?)` | 取得整數亂數 (Integer) |
| `integer(min?, max?)` | `int()` 的唯讀 (Readonly) 別名 |
| `boolean(likelihood?)` | 依機率 (Likelihood) 回傳布林值 (Boolean) |
| `byte()` | 取得單一位元組 (Byte) |
| `bytes(size?)` | 取得指定位元組數量的陣列 (Bytes) |
| `seed(...argv)` | 種子 (Seed) 相關操作 |

### newRngSeedRandom()

以固定種子字串呼叫 `seedrandom`，再交由 `RNGFactory` 包裝後回傳 `RNGFunction`。因為種子固定，每次呼叫皆取得相同序列，適合需要重現結果的測試。

### newRngFactory

轉出 (Re-export) 自 `@lazy-random/rng-factory` 的 `RNGFactory`，用於以擬亂數 (Pseudorandom, PRNG) 函數建立 RNG，呼叫方式為 `newRngFactory(prng)`。

## 開發 (Development)

```bash
# 建置 (Build) dist/
pnpm run build

# 執行 Jest 測試
pnpm run test:jest

# 執行 ESLint 檢查 (Lint)
pnpm run lint

# 產生測試涵蓋率 (Coverage)
pnpm run coverage
```

> 註：`pnpm test` 目前僅輸出文字而不會執行測試，請使用 `pnpm run test:jest`。

## 變更日誌 (Changelog)

詳見 [CHANGELOG.md](./CHANGELOG.md)。

## FAQ

**Q: `newRngSeedRandom()` 每次呼叫都得到相同的序列嗎？**

A: 是的。它刻意使用固定種子 (Seed)，以確保測試結果可重現 (Reproducible)。若需要不同的序列，請改用 `newRngFactory()` 傳入以自訂種子建立的擬亂數 (Pseudorandom) 函數，例如 `seedrandom('your-seed')`。

**Q: 這個套件可以直接作為一般專案的亂數來源嗎？**

A: 本套件定位為測試與示範用途的輔助工具；一般應用建議直接使用 `@lazy-random/rng-factory` 等套件建立所需的亂數發生器 (RNG)。

## 相關資源 (Resources)

- [GitHub 儲存庫 (Repository)](https://github.com/bluelovers/ws-random)
- [套件首頁 (Homepage)](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/util-test#readme)
