# @lazy-random/original-math-random

保存 JavaScript 原生的 `Math.random` 快照 (Snapshot) 的小套件。當其他套件（例如 [seedrandom](https://www.npmjs.com/package/seedrandom)）覆寫 `Math.random` 之後，仍可透過本套件取回原本的亂數 (Random Number) 行為。

## 特色 (Features)

- 在模組載入當下擷取原始的 `Math.random`，避免被其他套件覆寫後遺失
- 零依賴 (Zero Dependency)
- 同時提供具名匯出 (Named Export) `_MathRandom` 與預設匯出 (Default Export)

## 安裝 (Installation)

```bash
yarn add @lazy-random/original-math-random
yarn-tool add @lazy-random/original-math-random
yt add @lazy-random/original-math-random
```

## 使用方式 (Usage)

```ts
import _MathRandom from '@lazy-random/original-math-random';

// 取得原始的 Math.random（回傳 [0, 1) 的亂數）
const n = _MathRandom();
```

也可使用具名匯出 (Named Export)：

```ts
import { _MathRandom } from '@lazy-random/original-math-random';
```

> **注意 (Note)**：擷取發生在本模組**載入當下**，因此必須在任何會覆寫 `Math.random` 的套件載入之前先載入本套件，才能確保取得真正的原始 `Math.random`。

## API 文件 (API)

### `_MathRandom`

- 型別 (Type)：`() => number`
- 同時為具名匯出 (Named Export) 與預設匯出 (Default Export)，兩者為同一個值
- 內容為模組載入當下的 `Math.random`，之後即使 `Math.random` 被覆寫也不會改變
- 行為與原生 `Math.random` 相同，回傳 `[0, 1)` 區間的亂數 (Random Number)

## 設定 (Configuration)

本套件無需任何設定。

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
```

## 變更日誌 (Changelog)

詳細版本紀錄請見 [CHANGELOG.md](./CHANGELOG.md)。

## FAQ

**Q：為什麼要在其他套件之前載入本套件？**

A：`_MathRandom` 是在模組載入當下建立的快照 (Snapshot)。若先載入會覆寫 `Math.random` 的套件，再載入本套件，擷取到的就會是已被覆寫的版本。

**Q：`_MathRandom` 與預設匯出有差別嗎？**

A：沒有，兩者是同一個函式，可依專案的匯入習慣擇一使用。

## 相關資源 (Related Resources)

- [seedrandom](https://www.npmjs.com/package/seedrandom)
