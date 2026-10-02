# @lazy-random/shared-lib

`@lazy-random` 系列套件共用的基礎函式 (Shared Utility) 與常數 (Constant) 集合，包含亂數 (Random Number) 相關常數、位元組 (Byte) 轉十六進制 (Hex) 工具、快取鍵 (Cache Key) 產生函式與共用型別 (Type) 定義。

## 特色 (Features)

- 常數 (Constant)：常用進制字串 (Alphabet)、`UINT32` 相關數值、浮點熵 (Float Entropy) 相關常數，以及預先算好的十六進制查找表 (Lookup Table)。
- 位元組工具 (Byte Utility)：`stringifyByte()`、`toHexArray()` 將位元組轉為大寫十六進制字串。
- 記憶化工具 (Memoize Utility)：`hashArgv()` 把參數陣列轉成字串鍵 (Cache Key)。
- 型別 (Type)：`ValueOf`、`IArrayInput01`、`IArrayInput02` 等共用型別，並再匯出 (Re-export) `ITSArrayLikeWriteable`、`TypedArray`。
- `isUnset()` 判斷 `undefined` 與 `null`。

## 安裝 (Installation)

```bash
yarn add @lazy-random/shared-lib
yarn-tool add @lazy-random/shared-lib
yt add @lazy-random/shared-lib
```

## 使用方式 (Usage)

```js
const { MATH_POW_2_32, stringifyByte, toHexArray, isUnset, hashArgv } = require('@lazy-random/shared-lib');

console.log(MATH_POW_2_32);   // 4294967296
console.log(stringifyByte(255)); // 'FF'
console.log(toHexArray([0, 127, 255])); // ['00', '7F', 'FF']
console.log(isUnset(null));   // true
console.log(hashArgv([1, 'a'])); // '1;a'
```

```ts
import { ENUM_ALPHABET, IArrayInput01, ValueOf } from '@lazy-random/shared-lib';
```

## API 文件 (API Documentation)

### 常數 (Constants) — `const.ts`

| 常數 | 說明 |
| --- | --- |
| `ENUM_ALPHABET` | 進制字串 (Alphabet) 列舉 (Enum)，包含 `NANOID_URL`、`SHORTID`、`SHORTID2`、`UNI_CHAR1`、`DEFAULT`、`BASE16`、`BASE36`、`BASE58`、`BASE62`、`BASE66`、`BASE71`。 |
| `SUM_DELTA` | 浮點加總 (Float Sum) 的容差值 (Tolerance)。 |
| `FLOAT_ENTROPY_BYTES` | 浮點數攜帶的熵 (Entropy) 位元組數。 |
| `UINT32_BYTES`、`UINT32_VALUE` | 32 位元無號整數 (Unsigned Integer) 的位元組數與最大值。 |
| `MATH_POW_2_32` | `2 ** 32`，供亂數 (Random Number) 位元運算使用。 |
| `BYTE_TO_HEX_TO_LOWER_CASE`、`BYTE_TO_HEX_TO_UPPER_CASE` | 0～255 的十六進制 (Hex) 查找表 (Lookup Table)，以 `Object.freeze()` 凍結 (Frozen) 後唯讀。 |

### 位元組工具 (Byte Utility) — `byte.ts`

- `stringifyByte(byte: number)`：回傳單一位元組 (Byte) 的兩碼大寫十六進制字串 (Hex String)。
- `toHexArray(arr: number[])`：將位元組陣列 (Byte Array) 依序轉為十六進制字串陣列。

### 記憶化工具 (Memoize Utility) — `memoize.ts`

- `hashArgv(args: any[]): string`：以 `;` 連接參數陣列 (Arguments Array) 並轉為字串，作為快取 (Cache) 的鍵 (Key)。

### 型別 (Types) — `types.ts`

- `ValueOf<T>`：取得物件型別所有值的聯集 (Union)。
- `PickValueOf<T, K>`：對 `Pick<T, K>` 取值的聯集。
- `IArrayInput01<T>`：可寫入的類陣列 (Array-like) 或型別化陣列 (Typed Array)。
- `IArrayInput02<T>`：`IArrayInput01<T>` 再加上 `Buffer`。
- 另再匯出 `ITSArrayLikeWriteable`、`TypedArray`。

### isUnset(n): boolean

位於 `src/index.ts`，判斷輸入是否為 `undefined` 或 `null`，以型別守衛 (Type Guard) `n is undefined | null` 收窄型別。

## 開發 (Development)

此套件為 monorepo 的一部分，原始碼位於 `src/`，編譯產物輸出至 `dist/`。

```bash
pnpm run build
pnpm run test:jest
```

## 變更日誌 (Changelog)

See [CHANGELOG.md](./CHANGELOG.md).

## 相關資源 (Related Resources)

- [Repository](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/shared-lib)
- [Issues](https://github.com/bluelovers/ws-random/issues)
