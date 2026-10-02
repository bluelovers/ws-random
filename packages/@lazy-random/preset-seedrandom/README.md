# @lazy-random/preset-seedrandom

以 [seedrandom](https://www.npmjs.com/package/seedrandom) 作為亂數產生器 (Random Number Generator, RNG) 的 [random-extra](https://www.npmjs.com/package/random-extra) 預設實例 (Preset)。

套件載入時即建立好 `Random` 實例並直接匯出，省去每次自行呼叫 `newUse('seedrandom')` 的設定步驟。

## 特色 (Features)

- 開箱即用：載入即取得已套用 seedrandom 的 `Random` 實例 (Singleton)
- 同時提供預設匯出 (Default Export)、具名匯出 (Named Export) `seedrandom` 與別名 (Alias) `random`
- 可直接交給其他 `@lazy-random`／`random-extra` API 使用

## 安裝 (Installation)

```bash
yarn add @lazy-random/preset-seedrandom
yarn-tool add @lazy-random/preset-seedrandom
yt add @lazy-random/preset-seedrandom
```

## 使用方式 (Usage)

```ts
import seedrandom from '@lazy-random/preset-seedrandom';

// 取得下一個亂數 (Random Number)
const n = seedrandom.next();
```

具名匯出 (Named Export) 與別名 (Alias)：

```ts
import { seedrandom, random } from '@lazy-random/preset-seedrandom';

// random 與 seedrandom 為同一個實例
console.log(seedrandom === random); // true
```

## API 文件 (API)

### `seedrandom`（亦為預設匯出，別名 `random`）

- 型別 (Type)：`Random<RNGSeedRandom>`（來自 `random-extra`）
- 於模組載入時建立的單例 (Singleton)，三個匯出皆為同一個值
- 常用方法 (Methods)：
  - `next(): number` — 取得下一個亂數 (Random Number)
  - `seed(value)` — 重設種子 (Seed)（若底層亂數產生器 (RNG) 支援）

> **注意 (Note)** 未指定種子 (Seed) 時由 seedrandom 自動決定初始狀態；若需要每次重現相同的亂數序列，請自行設定種子。

## 設定 (Configuration)

本套件本身無需設定；如需變更亂數行為，請在使用時自行設定種子 (Seed) 或改用 `random-extra` 建立自訂實例。

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
```

## 變更日誌 (Changelog)

詳細版本紀錄請見 [CHANGELOG.md](./CHANGELOG.md)。

## FAQ

**Q：預設匯出、`seedrandom`、`random` 三個匯出有差別嗎？**

A：沒有，三者是同一個 `Random` 實例 (Singleton)，可依匯入習慣擇一使用。

**Q：如何讓每次執行產生相同的亂數序列？**

A：建立後自行設定種子 (Seed)，例如呼叫 `seedrandom.seed(1234)`；未設定時由 seedrandom 自動決定初始狀態。

**Q：可以改用其他亂數產生器 (RNG) 嗎？**

A：本套件固定以 seedrandom 建立實例；如需其他產生器，請直接使用 `random-extra` 的 `newUse()` 自行建立。

## 相關資源 (Related Resources)

- [seedrandom](https://www.npmjs.com/package/seedrandom)
- [random-extra](https://www.npmjs.com/package/random-extra)
