# @lazy-random/expect

預先載入 [chai-asserttype-extra](https://www.npmjs.com/package/chai-asserttype-extra) 外掛 (Plugin) 的 Chai 斷言 (Assertion) 封裝套件，讓專案不必在每個測試檔重複呼叫 `chai.use()`。

## 特色 (Features)

- 匯出已套用 `chai-asserttype-extra` 外掛的 `expect` 與 `assert`
- 同時提供預設匯出 (Default Export) 與具名匯出 (Named Export)，依使用習慣選擇
- 內建 TypeScript 型別宣告 (Type Declarations)

## 安裝 (Installation)

```bash
yarn add @lazy-random/expect
yarn-tool add @lazy-random/expect
yt add @lazy-random/expect
```

## 使用方式 (Usage)

```ts
import expect, { assert, expect as namedExpect } from '@lazy-random/expect';

// 使用預設匯出的 expect，可直接使用 chai-asserttype-extra 提供的斷言方法
expect(1).to.be.a('number');
expect([1, 2, 3]).to.be an array.of.length(3);

// 具名匯出的 assert 同樣已套用外掛
assert.strictEqual(1, 1);
```

```js
const expect = require('@lazy-random/expect').default;
const { assert } = require('@lazy-random/expect');
```

## API 文件 (API Documentation)

| 匯出 (Export) | 型別 (Type) | 說明 (Description) |
| --- | --- | --- |
| `expect`（預設匯出） | `Chai.ExpectStatic` | 已套用 `chai-asserttype-extra` 外掛的 `expect` 斷言函式 |
| `expect`（具名匯出） | `Chai.ExpectStatic` | 同上，與預設匯出為同一個物件 |
| `assert` | `Chai.AssertStatic` | 已套用 `chai-asserttype-extra` 外掛的 `assert` 斷言物件 |

> `chai-asserttype-extra` 所提供的進階型別斷言方法，請參閱該套件的文件。

## 開發 (Development)

```bash
pnpm run build
pnpm run test:jest
```

## 變更日誌 (Changelog)

詳見 [CHANGELOG.md](./CHANGELOG.md)。

## 相關資源 (Related Resources)

- [chai](https://www.chaijs.com/)
- [chai-asserttype-extra](https://www.npmjs.com/package/chai-asserttype-extra)
