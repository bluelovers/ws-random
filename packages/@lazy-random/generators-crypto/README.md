# @lazy-random/generators-crypto

以加密安全亂數來源 (Cryptographically Secure RNG) 實作的亂數產生器 (Random Number Generator)，繼承 `@lazy-random/rng-abstract` 的 `RNG` 抽象類別，適合需要較高不可預測性 (Entropy) 的场合。

## 特色 (Features)

- 底層透過 `@lazy-random/cross-crypto` 取得跨平台的加密亂數來源 (Crypto-like Source)
- 內建可注入的 `ICryptoLike` 介面，測試時可替換成自訂亂數來源
- 提供 `next()` 取得 0～1 浮點亂數 (Float Random Number)
- 支援自訂緩衝區大小 (Buffer Size)，並夾限 (Clamp) 在 `UINT32_BYTES` ～ `255` 位元組 (Bytes)

## 安裝 (Installation)

```bash
yarn add @lazy-random/generators-crypto
yarn-tool add @lazy-random/generators-crypto
yt add @lazy-random/generators-crypto
```

## 使用方式 (Usage)

```ts
import RNGCrypto from '@lazy-random/generators-crypto';

// 使用預設的 cross-crypto 亂數來源
const rng = new RNGCrypto();

// 取得一個 0～1 的浮點亂數
const value = rng.next();

console.log(value);
```

```ts
import { RNGCrypto } from '@lazy-random/generators-crypto';

// 注入自訂的 crypto-like 物件（需具備 randomBytes(size) 方法）
const rng = new RNGCrypto({
	randomBytes(size: number)
	{
		return Buffer.alloc(size, 7);
	},
});

rng.next();
```

## API 文件 (API Documentation)

### `new RNGCrypto(seed?, opts?, ...argv)`

| 參數 (Parameter) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `seed` | `ICryptoLike \| any` | 可傳入自訂的 crypto-like 物件；省略時使用 `crossCrypto()` |
| `opts` | `any` | 保留的選項參數 (Options)，目前未使用 |
| `...argv` | `any[]` | 保留的其餘參數，透傳給 `_init` |

### 方法 (Methods)

| 方法 (Method) | 回傳值 (Returns) | 說明 (Description) |
| --- | --- | --- |
| `next()` | `number` | 產生並回傳一個 0～1 的浮點亂數 |
| `seed(seed?, opts?, ...argv)` | `void` | 保留 API；加密亂數來源不支援固定亂數種子 (Seed)，目前為空實作 |

### 屬性 (Properties)

| 屬性 (Property) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `name` | `string` | 固定回傳 `'crypto'` |

## 設定 (Configuration)

| 欄位 (Field) | 預設值 (Default) | 說明 (Description) |
| --- | --- | --- |
| `_seed_size` | `UINT32_BYTES`（夾限至 255） | 每次取得亂數時要求的緩衝區位元組數 |
| `_seed_size_min` | `UINT32_BYTES`（夾限至 255） | 緩衝區位元組數的下限，低於此值時會被抬高 |
| `_randIndex` | `arrayRandIndexByLength` | 當緩衝區大於下限時，用來決定截取起點的索引函式 (Index Function) |

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
```

## 變更日誌 (Changelog)

詳見 [CHANGELOG.md](./CHANGELOG.md)。

## 相關資源 (Related Resources)

- [@lazy-random/rng-abstract](https://www.npmjs.com/package/@lazy-random/rng-abstract)
- [@lazy-random/cross-crypto](https://www.npmjs.com/package/@lazy-random/cross-crypto)
