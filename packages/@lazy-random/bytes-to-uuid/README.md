# @lazy-random/bytes-to-uuid

將位元組陣列 (Byte Array) 格式化為 UUID (Universally Unique Identifier) 字串的小工具，例如把 16 個位元組轉成 `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` 形式。

## 特色 (Features)

- 直接以查表 (Lookup Table) 加上 `Array.join()` 組出 UUID 字串，避免字串串接 (String Concatenation) 造成的記憶體問題
- 提供工廠函式 (Factory Function) `_createBytesToUuidFn`，可自訂十六進位轉換表 (Hex Lookup Table)，例如改用大寫或帶 `0x` 前綴
- 支援 `offset` 從陣列的任意位置開始讀取
- 支援 TypeScript 型別宣告 (Type Declarations)

## 安裝 (Installation)

```bash
yarn add @lazy-random/bytes-to-uuid
yarn-tool add @lazy-random/bytes-to-uuid
yt add @lazy-random/bytes-to-uuid
```

## 使用方式 (Usage)

### CommonJS

```js
// 預設匯出 (Default Export)
const bytesToUuid = require('@lazy-random/bytes-to-uuid');

// 或取得具名匯出 (Named Export)
const { bytesToUuid: toUuid, _createBytesToUuidFn } = require('@lazy-random/bytes-to-uuid');
```

### ESM

```js
// 預設匯出 (Default Export) 與具名匯出 (Named Export) 等同
import bytesToUuid, { _createBytesToUuidFn } from '@lazy-random/bytes-to-uuid';
```

### 範例 (Examples)

```js
const buf = [0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77,
	0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff];

bytesToUuid(buf);           // '00112233-4455-6677-8899-aabbccddeeff'
bytesToUuid(buf, 0);        // 同上，offset 省略時由 0 開始
```

```js
// 以工廠函式 (Factory Function) 固定一份十六進位轉換表 (Hex Lookup Table)
const toUuid = _createBytesToUuidFn();

toUuid(buf); // '00112233-4455-6677-8899-aabbccddeeff'
toUuid(buf, 4); // 由第 5 個位元組開始讀取；超出範圍的位元組會得到 undefined，
// 在 join('') 時被略過，因此輸出會比正常的 UUID 短
```

## API 文件 (API Reference)

### `bytesToUuid(buf, offset?, bth?): string`

將 `buf` 中自 `offset` 起的 16 個位元組轉為小寫十六進位的 UUID 字串。

| 參數 (Parameter) | 型別 (Type) | 預設值 (Default) | 說明 (Description) |
| --- | --- | --- | --- |
| `buf` | `ArrayLike<number>` | — | 來源位元組陣列 (Byte Array) |
| `offset` | `number` | `0` | 起始位置；`undefined` 或 `0` 都會由 `0` 開始 |
| `bth` | 十六進位轉換表 | `BYTE_TO_HEX_TO_LOWER_CASE` | 位元組轉兩位十六進位字串的查表 (Lookup Table)，來自 `@lazy-random/shared-lib` |

- 回傳 (Returns)：`string` — `8-4-4-4-12` 分段、以 `-` 連接的 UUID 字串
- 此函式也是套件的預設匯出 (Default Export)
- 靈感來源 (Reference Implementation)：[node-uuid `bytesToUuid`](https://github.com/kelektiv/node-uuid/blob/master/lib/bytesToUuid.js)

### `_createBytesToUuidFn(bth?): (buf, offset?) => string`

工廠函式 (Factory Function)：回傳一個與 `bytesToUuid` 相同邏輯、但 `bth` 已固定的轉換函式，適合在迴圈中重複使用時省去每次傳入查表。

| 參數 (Parameter) | 型別 (Type) | 預設值 (Default) | 說明 (Description) |
| --- | --- | --- | --- |
| `bth` | 十六進位轉換表 | `BYTE_TO_HEX_TO_LOWER_CASE` | 位元組轉十六進位字串的查表 |

- 回傳 (Returns)：`(buf: ArrayLike<number>, offset?: number) => string`

> **注意 (Note)**：`bth` 需為「以位元組值（0–255）為索引、值為兩位字串」的查表；本套件未提供現成的大寫查表，如需大寫格式請自備查表或於轉換後呼叫 `toUpperCase()`。

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
pnpm run lint
```

## 變更日誌 (Changelog)

詳見 [CHANGELOG.md](./CHANGELOG.md)。

## FAQ

### 為什麼不直接用字串串接 (String Concatenation)？

實作刻意改用陣列 `join('')`，原因是 V8 在大量字串串接時會有記憶體問題，詳見原始碼中的 [V8 issue #3175 說明](https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4)。

### `buf` 長度不足 16 個位元組會怎樣？

函式不會做長度驗證 (Length Validation)。超出範圍的索引會取得 `undefined`，在 `join('')` 時被略過，因此會回傳「長度不足」的畸形 UUID 字串而非拋出錯誤，請由呼叫端保證 `buf` 至少有 `offset + 16` 個位元組。

### `bytesToUuid` 與 `_createBytesToUuidFn` 該用哪一個？

偶爾呼叫一次用 `bytesToUuid` 即可；若在同一個迴圈中反覆轉換、且 `bth` 固定不變，建議用 `_createBytesToUuidFn` 建立一次後重複使用。

## 相關資源 (Related Resources)

- [套件原始碼 (Repository)](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/bytes-to-uuid)
- [問題回報 (Issue Tracker)](https://github.com/bluelovers/ws-random/issues)
