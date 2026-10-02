# random-sum-float

create random float number array by size, sum, min, max

依數量 (Size)、總和 (Sum)、下界 (Min)、上界 (Max) 產生總和相符的浮點數 (Float) 亂數陣列。

## 特色 (Features)

- 回傳的陣列長度等於 `size`，且各元素總和會符合指定的 `sum`。
- 可指定每個元素的範圍 `min` / `max`，省略時依總和自動推估。
- `randomSumFloat.create()` 會預先建立抽樣函式 (Thunk)，重複呼叫時效能較佳。
- 相依 [random-extra](https://www.npmjs.com/package/random-extra) 的 `dfSumFloat` 實作。

## 安裝 (Installation)

```bash
npm install random-sum-float
```

```bash
yarn add random-sum-float
```

## 使用方式 (Usage)

```ts
import randomSumFloat from 'random-sum-float';

let size = 3;
let sum = 10;
let min = 1;
let max = 10;

/**
 * recommend way, otherwise will slow
 */
let fn = randomSumFloat.create(size, sum, min, max);
let v: number[];

v = fn();

console.log(v, array_sum(v));
// => [ 2.828736460774711, 5.763831427698853, 1.407432111526436 ] 10

/**
 * will slow if not same [size, sum, min, max]
 */
v = randomSumFloat(size, sum, min, max);
// => [ 1.0521188269862214, 4.661026586341693, 4.286854586672085 ] 10

console.log(v, array_sum(v));

/**
 * auto create sum
 */
v = randomSumFloat(size, null, min, max);
// => [ 3.9067266610605182, 4.259092854483752, 3.834180484455729 ] 12

console.log(v, array_sum(v));

/**
 * auto create sum v2
 */
v = randomSumFloat(size);
// => [ 0.3641343986242387, 0.4843074708676399, 0.1515581305081214 ] 1

console.log(v, array_sum(v));

v = randomSumFloat(size, 0, -5, 10);
// => [ 2.879740922080848, -0.4913386492777585, -2.3884022728030896 ] 0

console.log(v, array_sum(v));

v = randomSumFloat(size, -10, -5, 10);
// => [ -4.429865487852505, -3.5847740400416157, -1.9853604721058797 ] -10

console.log(v, array_sum(v));

export function array_sum(na: number[])
{
	return na.reduce((a, b) => a + b)
}
```

## API 文件

### randomSumFloat(size, sum?, min?, max?)

直接產生一個符合條件的浮點數陣列，為預設匯出 (Default Export)。

| 參數 | 型別 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `size` | `number` | — | 陣列長度 (Array Length) |
| `sum` | `number` | 自動推估 | 陣列元素的總和 (Total Sum)；省略或傳入 `null` 時依 `size` 自動建立 |
| `min` | `number` | 自動推估 | 每個元素的下界 (Lower Bound) |
| `max` | `number` | 自動推估 | 每個元素的上界 (Upper Bound) |

**回傳值 (Returns)**：`number[]` — 長度為 `size`、總和符合 `sum` 的浮點數陣列。

> 每次呼叫都會重新建立抽樣函式，若參數固定且需大量抽樣，建議改用 `create`。

### randomSumFloat.create(size, sum?, min, max?, noUnique?, limit?)

先建立抽樣函式 (Thunk)，回傳一個無參數函式；重複呼叫可避免每次重建的開銷，為官方建議的用法 (Recommend Way)。

| 參數 | 型別 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `size` | `number` | — | 陣列長度 |
| `sum` | `number` | 自動推估 | 陣列元素的總和 |
| `min` | `number` | 自動推估 | 每個元素的下界 |
| `max` | `number` | 自動推估 | 每個元素的上界 |
| `noUnique` | `boolean` | — | 是否不強制元素互不相同 (Non-unique) |
| `limit` | `number` | — | 重試次數上限 (Retry Limit) |

**回傳值 (Returns)**：`() => number[]` — 每次呼叫皆回傳一組新的隨機陣列。

```ts
import randomSumFloat from 'random-sum-float';

const fn = randomSumFloat.create(3, 10, 1, 10);

fn(); // [ 2.828736460774711, 5.763831427698853, 1.407432111526436 ]
fn(); // 每次呼叫都重新抽樣
```

### 其他匯出 (Other Exports)

- `create` — 與 `randomSumFloat.create` 相同的抽樣函式建立器 (Factory)，以具名匯出 (Named Export) 提供。
- `randomSumFloat.randomSumFloat` — 指向自身的別名 (Alias)。

### 型別宣告 (Type Declarations)

```ts
declare function randomSumFloat(size: number, sum?: number, min?: number, max?: number): number[];
declare namespace randomSumFloat {
    var create: (size: number, sum?: number, min?: number, max?: number, noUnique?: boolean, limit?: number) => () => number[];
    var randomSumFloat: typeof randomSumFloat;
    var default: typeof randomSumFloat;
}
export = randomSumFloat;
```

## 設定 (Configuration)

本套件無額外設定項，所有行為皆由函式參數控制（見上方 API 文件）。

## 開發 (Development)

在 monorepo 根目錄或本套件目錄下執行：

```bash
pnpm run test
pnpm run build
```

## 變更日誌 (Changelog)

請見 [CHANGELOG.md](./CHANGELOG.md)。

## FAQ

**Q: 為什麼有時總和不是剛好等於 `sum`？**
A: 浮點數 (Floating Point) 累加會有精度誤差，示範中的 `array_sum` 直接以 `reduce` 相加，實際結果可能與 `sum` 存在極小差異。

**Q: `create` 與直接呼叫有何差別？**
A: 直接呼叫 `randomSumFloat(size, sum, min, max)` 每次都會重建抽樣函式；`create` 則只建立一次，適合在迴圈或效能敏感的場合使用。

## 相關資源 (Related Resources)

- [random-extra](https://www.npmjs.com/package/random-extra) — 底層的 `dfSumFloat` 分佈函式 (Distribution Function) 所在套件。
