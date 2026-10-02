# @lazy-random/df-uuid

以亂數 (Random Number) 產生 UUID v4 (UUID Version 4) 的分佈 (Distribution) 套件，回傳一個可反覆呼叫的閉包 (Closure)，每次呼叫即產生一組新的 UUID v4 字串。

因亂數來源可替換，只要搭配有種子 (Seed) 的亂數產生器 (Random Number Generator)，即可重現 (Reproducible) 相同的 UUID 序列。

## 特色 (Features)

- 產生標準格式的 UUID v4 字串（`8-4-4-4-12` 十六進制 (Hex) 格式）
- 支援大寫 (Uppercase) 或小寫 (Lowercase) 十六進制字串
- 內附 `isUUID4()` 驗證函式與 `UUID4_PATTERN` 正規表示式 (Regular Expression)
- 底層以 `@lazy-random/df-uniform` 產生 16 個位元組 (Byte)，再套用 v4 版本／變體位元組

## 安裝 (Installation)

```bash
yarn add @lazy-random/df-uuid
yarn-tool add @lazy-random/df-uuid
yt add @lazy-random/df-uuid
```

或使用 pnpm：

```bash
pnpm add @lazy-random/df-uuid
```

## 使用方式 (Usage)

```ts
import dfUuidV4, { isUUID4 } from '@lazy-random/df-uuid';

// 建立 UUID v4 產生器
const gen = dfUuidV4(random);

const id = gen();

console.log(id); // 例如 "3f1c8a2e-9b4d-4e7a-8c1f-2d5b6a9e0f13"
console.log(isUUID4(id)); // true
```

使用大寫十六進制 (Uppercase Hex)：

```ts
import { dfUuidV4 } from '@lazy-random/df-uuid';

const gen = dfUuidV4(random, true);

console.log(gen()); // 例如 "3F1C8A2E-9B4D-4E7A-8C1F-2D5B6A9E0F13"
```

## API 文件 (API Documentation)

### `dfUuidV4(random, toUpperCase?)`

建立 UUID v4 產生器 (UUID v4 Generator)。

| 參數 (Parameter) | 型別 (Type) | 預設值 | 說明 |
| --- | --- | --- | --- |
| `random` | `IRNGLike` | — | 亂數來源 (Random Number Generator)，需實作 `next()` 回傳 `[0, 1)` |
| `toUpperCase` | `boolean?` | `false` | 為 `true` 時輸出大寫十六進制字串 (Uppercase Hex String) |

**回傳 (Returns)**：`() => string` — 每次呼叫回傳一組新的 UUID v4 字串。

**備註**：本函式同時為預設匯出 (Default Export)。

### `isUUID4(id)`

驗證字串是否符合 UUID v4 格式。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `id` | `string` | 待驗證的字串 |

**回傳 (Returns)**：`boolean` — 符合 UUID v4 格式時回傳 `true`。

### `UUID4_PATTERN`

UUID v4 的正規表示式 (Regular Expression)，可供自行比對使用。

## 設定 (Configuration)

本套件無設定檔，所有行為皆由上述函式參數控制。

## 開發 (Development)

```bash
pnpm run test
pnpm run build
```

## 變更日誌 (Changelog)

請見 [CHANGELOG.md](./CHANGELOG.md)。

## 相關資源 (Related Resources)

- [Repository](https://github.com/bluelovers/ws-random)
