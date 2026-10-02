# @lazy-random/generators-math-random

以 JavaScript 內建的 `Math.random()` 作為亂數來源 (Entropy Source) 的亂數產生器 (Random Number Generator)，繼承 `@lazy-random/rng-abstract-core` 的 `RNGCore`，是最輕量、零設定的實作。

## 特色 (Features)

- 直接轉發 (Proxy) 經 `@lazy-random/original-math-random` 保存的原始 `Math.random()`，避免被其他程式碼覆寫 (Monkey Patch) 影響
- 透過 `RNGCore` 取得統一的 `next()`、`clone()` API
- `seedable` 固定為 `false`：`Math.random()` 不可重播 (Non-replayable)，不接受種子 (Seed)
- 無額外執行期 (Runtime) 狀態，適合測試與不要求密碼學強度的场合

## 安裝 (Installation)

```bash
yarn add @lazy-random/generators-math-random
yarn-tool add @lazy-random/generators-math-random
yt add @lazy-random/generators-math-random
```

## 使用方式 (Usage)

```ts
import RNGMathRandom from '@lazy-random/generators-math-random';

// 建立以 Math.random() 為來源的產生器
const rng = new RNGMathRandom();

// 取得一個 0～1 的亂數 (Random Number)
const value = rng.next();

// 產生器識別名稱
console.log(rng.name); // 'math-random'

// 是否支援以種子重建序列
console.log(rng.seedable); // false

// 複製出另一個實例（同樣不可定種子）
const cloned = rng.clone();
```

```ts
import { RNGMathRandom } from '@lazy-random/generators-math-random';

const rng: RNGMathRandom = new RNGMathRandom();
rng.next();
```

## API 文件 (API Documentation)

### `new RNGMathRandom(seed?, opts?, ...argv)`

不需任何參數；即使傳入種子也不會生效，因為 `Math.random()` 本身不可重播 (Non-replayable)。

### 方法 (Methods)

| 方法 (Method) | 回傳值 (Returns) | 說明 (Description) |
| --- | --- | --- |
| `next()` | `number` | 呼叫原始 `Math.random()` 回傳一個 0～1 的亂數 |
| `clone(seed?, opts?, ...argv)` | `RNGMathRandom` | 以同一個類別與狀態建立新實例 |

### 屬性 (Properties)

| 屬性 (Property) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `name` | `string` | 固定回傳 `'math-random'` |
| `seedable` | `boolean` | 固定回傳 `false`，表示不支援種子 |

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
```

## 變更日誌 (Changelog)

詳見 [CHANGELOG.md](./CHANGELOG.md)。

## 相關資源 (Related Resources)

- [@lazy-random/rng-abstract-core](https://www.npmjs.com/package/@lazy-random/rng-abstract-core)
- [@lazy-random/original-math-random](https://www.npmjs.com/package/@lazy-random/original-math-random)
