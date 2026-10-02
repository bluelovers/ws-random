# num-is-zero

判斷數值是否為零 (Zero)，並可將負零 (`-0`) 正規化 (Normalize) 為 `0` 的小型工具函式。

## 特色 (Features)

- `isZero` 以型別守衛 (Type Guard) 回傳，可在 TypeScript 中直接窄化 (Narrow) 型別為 `0`。
- 同時涵蓋 `0` 與 `-0` 的判斷，避免負零造成漏判。
- `fixZero` 可將 `-0` 統一轉為 `0`，讓後續序列化 (Serialization) 或顯示結果一致。
- 零相依 (Zero Dependencies)，並同時支援 CommonJS 與 ESM。

## 安裝 (Installation)

```bash
npm install num-is-zero
```

```bash
yarn add num-is-zero
yarn-tool add num-is-zero
yt add num-is-zero
```

## 使用方式 (Usage)

```js
import isZero, { fixZero } from 'num-is-zero'

isZero(0)      // true
isZero(-0)     // true
isZero(1)      // false
isZero('0')    // false，僅判斷嚴格相等的數值

fixZero(-0)    // 0
fixZero(0)     // 0
fixZero(1)     // 1
```

## API 文件

### isZero(val)

判斷傳入值是否為零，為本套件的預設匯出 (Default Export)。

| 參數 | 型別 | 說明 |
| --- | --- | --- |
| `val` | `unknown` | 要檢查的任意值 |

**回傳值 (Returns)**：`val is 0` — 型別守衛，透過後可將 `val` 視為 `0`。

```ts
import isZero from 'num-is-zero'

function demo(val: number)
{
	if (isZero(val))
	{
		// val 的型別窄化為 0
		console.log(val.toFixed(2))
	}
}
```

### fixZero(val)

若傳入值為負零 (`-0`) 則回傳 `0`，否則原樣回傳。

| 參數 | 型別 | 說明 |
| --- | --- | --- |
| `val` | `T` | 要正規化的值 |

**回傳值 (Returns)**：`T` — `-0` 會被替換為 `0`，其餘值不變。

```js
import { fixZero } from 'num-is-zero'

Object.is(fixZero(-0), 0) // true
```

## 開發 (Development)

在 monorepo 根目錄或本套件目錄下執行：

```bash
pnpm run test:jest
pnpm run build
```

## 變更日誌 (Changelog)

請見 [CHANGELOG.md](./CHANGELOG.md)。
