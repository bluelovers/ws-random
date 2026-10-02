# @lazy-random/df-char-id

以自訂字元表 (Alphabet) 產生隨機字串 ID 的取樣函式 (Random Sampling Function)，屬於 `@lazy-random` 系列的分佈函式 (Distribution Function) 套件。

傳入亂數來源 (RNG)、字元表與長度，回傳可反覆呼叫的取樣函式 (Sampler)；每次呼叫都會產生一組新的隨機字串，適合用於短網址、邀請碼、測試資料等情境。

## 特色 (Features)

- 字元表 (Alphabet) 可指定為 `ENUM_ALPHABET` 列舉、任意字串、`Buffer` 或數字
- 字元表為數字時可自動轉成字串（透過 `@lazy-num/float-to-string`）
- 支援以 `uni-string` 切分，正確處理代理對 (Surrogate Pair) 等非 BMP 字元
- 字元表不足兩個字元會立即拋出錯誤，避免產生單一字元的弱 ID

## 安裝 (Installation)

```bash
yarn add @lazy-random/df-char-id
yarn-tool add @lazy-random/df-char-id
yt add @lazy-random/df-char-id
```

## 使用方式 (Usage)

```ts
import { dfCharID } from '@lazy-random/df-char-id'

// 亂數來源需提供 next()，回傳 [0, 1) 的均勻亂數
const random = {
	next: () => Math.random(),
}

// 使用預設字元表與預設長度 8
const id = dfCharID(random)
console.log(id()) // 例如 "k3Za9Qp1"

// 指定字元表與長度
const hex = dfCharID(random, '0123456789abcdef', 6)
console.log(hex()) // 例如 "9c04ef"
```

## API 文件

### dfCharID(random, char?, size?)

建立字串取樣函式 (String Sampler)。

| 參數 (Parameter) | 型別 (Type) | 說明 |
| --- | --- | --- |
| `random` | `IRNGLike` | 亂數來源 (Random Number Generator)，需提供 `next()` |
| `char` | `ENUM_ALPHABET \| string \| Buffer \| number` | 字元表 (Alphabet)；省略時使用 `ENUM_ALPHABET.DEFAULT` |
| `size` | `number` | 產生的字元數，需為正整數 (`> 0`)，預設 `8` |

- 當 `char` 為 `number` 且同時傳入 `size` 時，`char` 會被轉為字串字元表
- 當 `char` 為 `number` 但**未**傳入 `size` 時，該數字會被視為 `size`、字元表改用預設值

- 回傳值 (Returns)：無參數的取樣函式，每次呼叫回傳長度 `size` 的字串
- 例外 (Throws)：`size` 非正整數，或字元表切分後少於 2 個字元時，於建立時拋出驗證錯誤 (Validation Error)

## 開發 (Development)

```bash
pnpm run build
pnpm run lint
pnpm run test:jest
```

## 變更日誌 (Changelog)

請見 [CHANGELOG.md](./CHANGELOG.md)。

## 常見問題 (FAQ)

### 為什麼字元表至少要 2 個字元？

單一字元表只能產生固定字串，沒有隨機性可言；`expect(ls).lengthOf.gt(1)` 會在建立時就攔下這種設定。

### 可以用中文或 emoji 當字元表嗎？

可以。字元表透過 `uni-string` 切分，會依字元 (Code Point) 而非 16 位元單位 (UTF-16 Code Unit) 拆分，因此代理對字元（如 emoji）不會被切成半個字元。

### `char` 傳數字時的行為？

同時傳入 `size` 時，數字會轉成字串當字元表；只傳數字不傳 `size` 時，該數字代表 `size`（見上方 API 說明）。

## 相關資源 (Resources)

- [Repository](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/df-char-id#readme)
- [Issues](https://github.com/bluelovers/ws-random/issues)
