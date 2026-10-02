# @lazy-random/cross-crypto

在 Node.js 與瀏覽器環境之間，以單一 API 取得加密安全的亂數 (Cryptographically Secure Random Number) 的跨環境 (Cross-environment) 工具套件。

套件會惰性 (Lazy) 解析目前環境可用的 `crypto` 實作並快取 (Cache) 起來，讓上層程式不需要自行判斷執行環境。

## 特色 (Features)

- 單一 API 同時適用於 Node.js 的 `require('crypto')` 與瀏覽器的 `global.crypto`
- 以閉包 (Closure) 快取解析結果，只初始化一次，避免重複載入
- 瀏覽器環境若只有 `getRandomValues`，會自動補上 (Polyfill) `randomBytes`
- 同時支援同步回傳與 `callback` 兩種呼叫方式
- 額外導出 `ICryptoLike` 介面 (Interface)，方便自行注入 (Inject) 相容實作

## 安裝 (Installation)

```bash
yarn add @lazy-random/cross-crypto
yarn-tool add @lazy-random/cross-crypto
yt add @lazy-random/cross-crypto
```

## 使用方式 (Usage)

```ts
import crossCrypto, { randomBytes } from '@lazy-random/cross-crypto'

// 取得目前環境可用的 crypto 實例（會被快取，重複呼叫不會重新初始化）
const crypto = crossCrypto()

// 同步取得 16 個位元組 (Bytes)
const buf = randomBytes(16)

// 也可以使用 callback 風格
crypto.randomBytes(8, (err, buf) =>
{
	if (err)
	{
		throw err
	}

	console.log(buf)
})
```

CommonJS 的用法：

```js
const { crossCrypto, randomBytes } = require('@lazy-random/cross-crypto')

const bytes = randomBytes(32)
```

## API 文件

### crossCrypto()

回傳目前環境可用的 `ICryptoLike` 實例；解析結果會在閉包內快取，後續呼叫直接回傳同一份實例。

- 回傳值 (Returns)：`ICryptoLike`
- 例外 (Throws)：`Error` — 環境完全不支援 `crypto` 時拋出 `not support crypto`

### randomBytes(size[, callback])

取得加密安全的隨機位元組 (Random Bytes)，內部等同於 `crossCrypto().randomBytes(size, callback)`。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `size` | `number` | 要產生的位元組數 |
| `callback` | `(err: Error \| null, buf: Buffer) => void` | 選擇性的完成回呼 (Callback) |

- 回傳值 (Returns)：`Buffer`

> 在瀏覽器環境透過 `getRandomValues` 補齊時，單次 `size` 上限為 65536，超過會拋出 `requested too many random bytes`。

### ICryptoLike

描述 `crypto` 的最小共同介面 (Minimal Common Interface)：

- `randomBytes(size, callback?)`：必填 (Required)
- `getRandomValues?(array)`：選填 (Optional)，瀏覽器環境提供

## 開發 (Development)

```bash
pnpm run build
pnpm run lint
pnpm run test:jest
```

## 變更日誌 (Changelog)

請見 [CHANGELOG.md](./CHANGELOG.md)。

## 常見問題 (FAQ)

### 在瀏覽器中為什麼會得到 `Buffer`？

瀏覽器路徑的 `randomBytes` polyfill 會以 `Buffer.from` 包裝產生的位元組，以保持與 Node.js 相同的回傳型別，讓上層程式不需要分支處理。

### 可以自行注入其他 `crypto` 實作嗎？

可以，只要物件符合 `ICryptoLike` 介面即可；不過本套件的 `crossCrypto()` 目前只解析 `require('crypto')` 與全域 (Global) 的 `crypto`／`msCrypto`。

## 相關資源 (Resources)

- [Repository](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/cross-crypto#readme)
- [Issues](https://github.com/bluelovers/ws-random/issues)
