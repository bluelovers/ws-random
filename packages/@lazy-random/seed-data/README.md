# @lazy-random/seed-data

`@lazy-random/seed-data` 匯出與亂數種子 (Random Seed) 相關的來源資料 (Source Data)，目前提供 `random-extra` 套件的名稱與版本資訊，供其他套件在產生種子或記錄除錯資訊時引用，避免各處硬編碼 (Hardcode) 同一份資料。

## 特色 (Features)

- 以 `Object.freeze()` 凍結 (Freeze) 資料，避免執行期被意外修改
- 同時提供整份資料與拆解後的 `name`、`version` 兩種取用方式
- 零相依 (Zero Dependency)、無副作用 (Side-effect Free)
- 同時輸出 CommonJS 與 ESM 產物，並附帶 TypeScript 型別宣告檔 (Type Declarations)

## 安裝 (Installation)

```bash
pnpm add @lazy-random/seed-data
npm install @lazy-random/seed-data
yarn add @lazy-random/seed-data
yarn-tool add @lazy-random/seed-data
yt add @lazy-random/seed-data
```

## 使用方式 (Usage)

```ts
import randomSeedStrData, { name, version } from '@lazy-random/seed-data';

console.log(randomSeedStrData);
// { name: 'random-extra', version: '3.6.15' }

console.log(name);    // 'random-extra'
console.log(version); // '3.6.15'
```

## API 文件 (API Reference)

### `randomSeedStrData`

凍結的來源資料物件 (Frozen Source Data Object)，預設匯出 (Default Export)。

| 欄位 (Field) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `name` | `string` | 來源套件名稱，目前為 `random-extra` |
| `version` | `string` | 來源套件版本，目前為 `3.6.15` |

物件透過 `Object.freeze()` 凍結，於嚴格模式 (Strict Mode) 下試圖寫入會拋出 `TypeError`；除預設匯出外，亦提供同名的具名匯出 (Named Export)，可與 `name`、`version` 一併以具名方式引入。

### `name`

`randomSeedStrData.name` 的別名 (Alias)，值為 `'random-extra'`。

### `version`

`randomSeedStrData.version` 的別名 (Alias)，值為 `'3.6.15'`。

## 設定 (Configuration)

本套件不需要任何設定，匯入後即可直接使用。

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
pnpm run lint
```

## 變更日誌 (Changelog)

本套件的版本變更請見 [CHANGELOG.md](./CHANGELOG.md)。

## 常見問題 (FAQ)

### `name` / `version` 和本套件的套件名稱有什麼不同？

`name` / `version` 描述的是資料來源（`random-extra@3.6.15`），不是 `@lazy-random/seed-data` 自身的套件名稱與版本。要取得本套件自身的版本，請讀取 `package.json`。

### 可以修改匯出的資料嗎？

不行。`randomSeedStrData` 已透過 `Object.freeze()` 凍結，且 `name`、`version` 是建立時就取好的常數，修改物件不會影響它們。

## 相關資源 (Resources)

- [原始碼 Repository](https://github.com/bluelovers/ws-random)
- [問題回報 (Issues)](https://github.com/bluelovers/ws-random/issues)
