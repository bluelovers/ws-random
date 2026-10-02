# @lazy-num/float-from-buffer

從位元組緩衝區 (Buffer) 中讀取隨機位元組，並轉換為 `[0, 1)` 區間的雙精度浮點數 (Double-precision Float)。

適合用於以密碼學亂數 (Cryptographic Random Bytes) 產生均勻分布的浮點數，實作方式參考下方「相關資源」中的連結。

## 特色 (Features)

- 將緩衝區 (Buffer) 內的 7 個位元組組合成 53 bits 精度的浮點數，回傳值落在 `[0, 1)`
- 支援 `offset` 參數，可從緩衝區的任意位置開始讀取
- 輸入長度不足或 `offset` 不合法時丟出 `RangeError`
- 同時提供 32 bits 精度的替代實作，以及 `readUInt32LE` / `readUInt32BE` 等底層讀取工具
- 同時輸出 CommonJS 與 ESM 兩種格式，並附帶 TypeScript 型別宣告

## 安裝 (Installation)

```bash
yarn add @lazy-num/float-from-buffer
yarn-tool add @lazy-num/float-from-buffer
yt add @lazy-num/float-from-buffer
```

## 使用方式 (Usage)

### CommonJS

```js
const floatFromBuffer = require('@lazy-num/float-from-buffer');

// 7 個隨機位元組 → [0, 1) 的浮點數
const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde]);

console.log(floatFromBuffer(buf));
console.log(floatFromBuffer(buf, 0));
```

### ESM

```js
import floatFromBuffer from '@lazy-num/float-from-buffer';

const buf = new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde]);

console.log(floatFromBuffer(buf));
```

### 例外 (Exception)

```js
const floatFromBuffer = require('@lazy-num/float-from-buffer');

// 緩衝區長度不足時會丟出 RangeError
try
{
	floatFromBuffer(Buffer.alloc(3));
}
catch (e)
{
	console.error(e instanceof RangeError); // true
	console.error(e.message);
}
```

## API 文件 (API Documentation)

### floatFromBuffer(buf, offset = 0)

主要 API。驗證緩衝區長度後，回傳由位元組組成的雙精度浮點數 (Double-precision Float)。

| 參數 (Parameter) | 型別 (Type) | 預設值 | 說明 |
| --- | --- | --- | --- |
| `buf` | `ArrayLike<number>` | — | 存放亂數位元組的緩衝區，例如 `Buffer` 或 `Uint8Array` |
| `offset` | `number` | `0` | 讀取的起始位置，會先以 `Math.floor()` 取整數 |

- 回傳 (Returns)：`number`，值域為 `[0, 1)`
- 丟出 (Throws)：`RangeError` — 當 `buf.length < FLOAT_ENTROPY_BYTES + offset` 或 `offset < 0`

亦為預設匯出 (Default Export)。

### _floatFromBuffer(buf, offset = 0)

不進行長度驗證的內部實作 (Internal Implementation)，會讀取 `offset` 開始的 7 個位元組：

- 第 1 個位元組取低 5 bits（`% 32`），其餘 6 個位元組各取 8 bits，合計 53 bits 精度
- 以連除 `/ 256` 的方式歸一化到 `[0, 1)`

請自行確認緩衝區長度足夠，否則會讀到 `undefined` 而產生 `NaN`。

### _floatFromBuffer2(buf, offset = 0)

32 bits 精度的替代實作 (Alternative Implementation)：讀取一個大端序 (Big-endian) 的 `uint32` 後除以 `2^32`，回傳同樣位於 `[0, 1)` 的浮點數，但精度較低。

### readUInt32LE(buf, offset = 0)

以小端序 (Little-endian) 讀取 4 個位元組，回傳無號 32 位整數 (`uint32`)。`offset` 會以 `>>> 0` 轉為無號整數。

### readUInt32BE(buf, offset = 0)

以大端序 (Big-endian) 讀取 4 個位元組，回傳無號 32 位整數 (`uint32`)。`offset` 會以 `>>> 0` 轉為無號整數。

## 開發 (Development)

本套件為 monorepo（pnpm + lerna）中的套件，常用指令：

```bash
pnpm run build        # 以 tsdx 建置 dist/，並產生 dist/index.d.ts
pnpm run test:jest    # 執行 Jest 測試
pnpm run lint         # 執行 ESLint
```

## 變更日誌 (Changelog)

請參閱 [CHANGELOG.md](./CHANGELOG.md)。

## 相關資源 (Related Resources)

- [node-random-lib — generate a double-precision 64-bit float](https://github.com/fardog/node-random-lib/blob/master/index.js)
- [Stack Overflow — Floating point number from crypto.randomBytes in JavaScript](http://stackoverflow.com/questions/15753019/floating-point-number-from-crypto-randombytes-in-javascript)
