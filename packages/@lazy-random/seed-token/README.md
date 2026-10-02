# @lazy-random/seed-token

產生與正規化亂數種子權杖 (Seed Token) 的小工具集，提供將任意輸入轉為數值種子 (Numeric Seed)、以及產生高熵 (Entropy) 隨機種子字串的方法。

## 特色 (Features)

- `seedToken()`：把任意輸入正規化為可用的數值種子 (Numeric Seed)，有限整數直接回傳，其餘以字串雜湊方式轉換。
- `randomSeedNum()`：產生 32 位元以上的數值隨機種子。
- `randomSeedStr()`：組合 `nanoid`、套件名稱雜湊 (Hash)、時間戳記 (Timestamp) 與亂數 (Random Number) 產生高熵種子字串。
- `hashAny()`：無論輸入為何，一律回傳字串型別的種子。
- 內建 `hashSum()`、`nanoid()` 兩個便利函式 (Helper)。

## 安裝 (Installation)

```bash
yarn add @lazy-random/seed-token
yarn-tool add @lazy-random/seed-token
yt add @lazy-random/seed-token
```

## 使用方式 (Usage)

```js
const { seedToken, randomSeedStr, randomSeedNum, hashAny, hashSum, nanoid } = require('@lazy-random/seed-token');

// seedToken：把任意輸入轉成數值種子 (Numeric Seed)
console.log(seedToken('hello'));

console.log(randomSeedStr());
console.log(randomSeedNum());
console.log(hashAny({ foo: 'bar' }));
```

```ts
import seedToken, { randomSeedStr, randomSeedNum, hashAny, hashSum, nanoid } from '@lazy-random/seed-token';
```

## API 文件 (API Documentation)

### seedToken(seed?, opts?, ...argv): number

將任意輸入轉為數值種子 (Numeric Seed)。

- `seed`：若為有限整數 (Finite Integer)，原值直接回傳；否則轉為字串後逐字元 XOR (Exclusive OR) 疊加成一個整數。
- `opts`、`...argv`：預留的額外參數，目前未使用。
- 回傳 `number`。

```js
seedToken(1234);      // 1234
seedToken('hello');   // 依字元碼 XOR 計算出的整數
```

### randomSeedStr(): string

產生可直接作為種子的隨機字串 (Random Seed String)，由 `nanoid`、套件名稱與版本的 `hashSum`、`Date.now()` 時間戳記 (Timestamp) 以 `_` 組成。

### randomSeedNum(): number

產生數值隨機種子 (Random Seed Number)，以兩次亂數 (Random Number) 組合成超過 32 位元的精度 (Precision)。

### hashAny(seed?, ...argv): string

回傳字串型別的種子：

- `seed` 為空值 (Falsy) 時，改用 `randomSeedStr()` 產生。
- `seed` 不是字串時，以 `hashSum()` 轉為雜湊 (Hash) 字串。
- 已是字串則原樣回傳。

### hashSum(input, ...argv): string

對任意輸入計算 `hash-sum` 雜湊 (Hash) 字串的便利函式 (Helper)。

### nanoid(input?, ...argv): string

呼叫 `nanoid/non-secure` 產生隨機 ID，用於種子字串的組成。

## 開發 (Development)

此套件為 monorepo 的一部分，原始碼位於 `src/`，編譯產物輸出至 `dist/`。

```bash
pnpm run build
pnpm run test:jest
```

## 變更日誌 (Changelog)

See [CHANGELOG.md](./CHANGELOG.md).

## 相關資源 (Related Resources)

- [Repository](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/seed-token)
- [Issues](https://github.com/bluelovers/ws-random/issues)
