# @lazy-random/simple-wrap

將任意回傳 `0～1` 亂數 (Random Number) 的函式 (Function) 包裝成具名方法的輕量包裝器 (Wrapper)，一次取得 `int`、`float`、`boolean`、`bytes` 等常用產生方法。

## 特色 (Features)

- 一行把 `() => number` 型別的亂數來源 (Random Source) 包裝成可呼叫的 API。
- 提供 `next()`、`random()`、`float()`、`int()`、`integer`、`boolean()`、`byte()`、`bytes()`、`seed()` 等方法 (Method)。
- `defaultArgv` 凍結 (Frozen) 的預設參數表 (Default Arguments) 可直接沿用。
- 無任何執行期相依 (Runtime Dependency)，`src/index.ts` 單一檔案即可使用。

## 安裝 (Installation)

```bash
yarn add @lazy-random/simple-wrap
yarn-tool add @lazy-random/simple-wrap
yt add @lazy-random/simple-wrap
```

## 使用方式 (Usage)

```js
const { simpleWrap, defaultArgv } = require('@lazy-random/simple-wrap');

// 以任意回傳 0～1 的亂數函式建立包裝器
const rng = simpleWrap(Math.random);

console.log(rng.next());       // 同 random()
console.log(rng.random());     // 0～1 的亂數 (Random Number)
console.log(rng.int(1, 6));    // 1～6 的整數 (Integer)
console.log(rng.byte());       // 0～255 的位元組 (Byte)
console.log(rng.bytes(4));     // 4 個位元組組成的陣列 (Array)
console.log(rng.boolean(0.5)); // 布林值 (Boolean)
```

```ts
import simpleWrap, { defaultArgv } from '@lazy-random/simple-wrap';

// 自訂種子亂數產生器 (Seeded RNG) 同樣可以包裝
const rng = simpleWrap(mySeededRandom);
```

## API 文件 (API Documentation)

### simpleWrap(fn): object

以亂數函式 `fn`（須回傳 `0～1` 的數值）建立包裝器 (Wrapper)，回傳下列方法：

| 方法 | 說明 |
| --- | --- |
| `next()` | 取得下一個亂數 (Random Number)，等同 `random()`。 |
| `random()` | 回傳 `0～1` 的亂數。 |
| `float(min = 0, max = 1)` | 回傳 `min`～`max` 區間的浮點數 (Float)。 |
| `int(min = 0, max = 100)` | 回傳 `min`～`max`（含端點）的整數 (Integer)。 |
| `integer` | `int` 的別名 (Alias)，以 getter (存取子) 取得。 |
| `boolean(likelihood = 0.5)` | 回傳布林值 (Boolean)，以 `likelihood` 決定門檻 (Threshold)。 |
| `byte()` | 回傳 `0～255` 的位元組 (Byte)。 |
| `bytes(size = 1)` | 回傳 `size` 個位元組組成的陣列 (Array)。 |
| `seed(...argv)` | 預留的種子 (Seed) 方法，目前直接回傳包裝器本身以便鏈式呼叫 (Chain)。 |

### 已知限制 (Known Limitations)

- `float()` 的公式含 `+1`，實際範圍為 `[min, max + 1)`，因此預設呼叫 `float()` 回傳 `0～2` 而非 `0～1`。
- `boolean(likelihood)` 實作為 `fn() >= likelihood`，`likelihood` 越高反而越少回傳 `true`，與字面語意相反。

以上兩點僅記錄於原始碼的 `TODO` 註解，未修改邏輯。

### defaultArgv

以 `Object.freeze()` 凍結的預設參數表 (Default Arguments)，欄位為 `int`、`integer`、`boolean`、`bytes`，可作為呼叫對應方法時的預設值參考。

### 預設導出 (Default Export)

`simpleWrap` 同時為此套件的預設導出。

## 開發 (Development)

此套件為 monorepo 的一部分，原始碼位於 `src/`，編譯產物輸出至 `dist/`。

```bash
pnpm run build
pnpm run test:jest
```

## 變更日誌 (Changelog)

See [CHANGELOG.md](./CHANGELOG.md).

## 相關資源 (Related Resources)

- [Repository](https://github.com/bluelovers/ws-random/tree/master/packages/@lazy-random/simple-wrap)
- [Issues](https://github.com/bluelovers/ws-random/issues)
