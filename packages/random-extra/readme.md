# random-extra

> Seedable random number generator supporting many common distributions.

支援種子 (Seed) 的亂數產生器，提供多種常見分佈 (Distribution) 的抽樣函式。

[![NPM](https://img.shields.io/npm/v/random-extra.svg)](https://www.npmjs.com/package/random-extra)
[![Build Status](https://github.com/bluelovers/ws-random/actions/workflows/build-pnpm.yml/badge.svg)](https://github.com/bluelovers/ws-random/actions/workflows/build-pnpm.yml)

> this module fork from [transitive-bullshit/random](https://github.com/transitive-bullshit/random), with typescript support and some other change (include breaking change)

Welcome to the most **random** module on npm! 😜

## 特色 (Highlights)

> **Wellcome send PR for more API support or performance up**

-   Simple API (_make easy things easy and hard things possible_)
-   Seedable based on entropy or user input
-   Plugin support for different pseudo random number generators (PRNGs)
-   Sample from many common distributions
    -   dfUniform, dfNormal, dfPoisson, dfBernoulli, etc, see the `df` prefix methods
-   Validates all user input via [chai](https://www.chaijs.com)
-   Integrates with [seedrandom](https://github.com/davidbau/seedrandom)
-   Supports **node.js** >= **7** and browser _(if here has no break)_

### breaking change: v2.x to v3.x

- for more easy know what api do by method name
- all (**distribution function**) method rename and add prefix `df`  
  (ex: `itemByWeight` => `dfItemByWeight`)  
  when run in loop, or wanna performance, pls use (**distribution function**) version
- remove `shortid`

## 安裝 (Installation)

```bash
npm install random-extra seedrandom
```

-   [benchmark 效能基準測試](docs/benchmark)
-   [random.d.ts 型別宣告](src/random.d.ts)

## 使用方式 (Usage, 新版 API)

```ts
import random from 'random-extra';
import random = require('random-extra');
```

### `.use` vs `.newUse`

-   `.use` will change current random object
-   `.newUse` will create new random object

### 設定 (preset)

#### seedrandom

use [seedrandom](https://github.com/davidbau/seedrandom) for make seed-able

```ts
import seedrandom from '@lazy-random/preset-seedrandom';
```

> **注意 (Note)**：`preset-seedrandom` 已拆分為獨立套件 [@lazy-random/preset-seedrandom](../@lazy-random/preset-seedrandom)，
> 舊的 `random-extra/preset/seedrandom` 子路徑已不存在。
> 若不需要預設實例，也可改用下段「other way make seedrandom」的 `random.newUse('seedrandom', ...)` 寫法。

> when use seedrandom, srand will able use

```ts
seedrandom.rand() // use current seed
seedrandom.srand() // every time call srand will make new seed
seedrandom.rand() // use new seed
```

> other way make seedrandom

```ts
import random from 'random-extra';
const seedrandom = random.newUse('seedrandom')

import _seedrandom = require('seedrandom')

random.newUse(_seedrandom('hello.', { entropy: true }))
random.newUse(_seedrandom('hello.', { entropy: false }))

random.newUse(_seedrandom('hello.'))
```

## 使用方式 (Usage, 主要 API)

```js
const random = require('random-extra')

// quick uniform shortcuts
random.float(min = 0, max = 1) // uniform float in [ min, max )
random.int(min = 0, max = 1) // uniform integer in [ min, max ]
random.boolean() // true or false

// uniform
random.dfUniform(min = 0, max = 1) // () => [ min, max )
random.dfUniformInt(min = 0, max = 1) // () => [ min, max ]
random.dfUniformBoolean() // () => [ false, true ]

// normal
random.dfNormal(mu = 0, sigma = 1)
random.dfLogNormal(mu = 0, sigma = 1)

// bernoulli
random.dfBernoulli(p = 0.5)
random.dfBinomial(n = 1, p = 0.5)
random.dfGeometric(p = 0.5)

// poisson
random.dfPoisson(lambda = 1)
random.dfExponential(lambda = 1)

// misc
random.dfIrwinHall(n)
random.dfBates(n)
random.dfPareto(alpha)
```

For convenience, several common dfUniform samplers are exposed directly:

```js
random.float()     // 0.2149383367670885
random.int(0, 100) // 72
random.boolean()   // true
```

**All distribution methods return a thunk** (function with no params), which will return
a series of independent, identically distributed random variables from the specified distribution.

```js
// create a normal distribution with default params (mu=1 and sigma=0)
const normal = random.dfNormal()
normal() // 0.4855465422678824
normal() // -0.06696771815439678
normal() // 0.7350852689834705

// create a poisson distribution with default params (lambda=1)
const poisson = random.dfPoisson()
poisson() // 0
poisson() // 4
poisson() // 1
```

Note that returning a thunk here is more efficient when generating multiple
samples from the same distribution.

You can change the underlying PRNG or its seed as follows:

```js
const seedrandom = require('seedrandom')

// change the underlying pseudo random number generator
// by default, Math.random is used as the underlying PRNG
random.use(seedrandom('foobar'))

// create a new independent random number generator
const rng = random.clone('my-new-seed')

// create a second independent random number generator and use a seeded PRNG
const rng2 = random.clone(seedrandom('kittyfoo'))

// replace Math.random with rng.uniform
rng.patch()

// restore original Math.random
rng.unpatch()
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [Random](#random)

### [Random](https://github.com/bluelovers/ws-random/blob/master/packages/random-extra/src/random.ts)

Seedable random number generator supporting many common distributions.

Defaults to Math.random as its underlying pseudorandom number generator.

Type: `function (rng)`

-   `rng` **(Rng | [function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function))** Underlying pseudorandom number generator. (optional, default `Math.random`)

* * *

#### Random 實例方法 (Instance Methods)

-   `clone(seed?, opts?, ...args?)` — 建立一個新的 `Random` 實例，可指定新種子 (Seed)。
-   `use(rng)` — 替換**目前**實例的底層亂數產生器 (PRNG)，並回傳自身，可串接使用。
-   `newUse(rng, ...args)` — 以指定的亂數產生器**另外建立**一個新的 `Random` 實例。
-   `cloneUse(rng, ...args)` — 先 `clone` 出新實例，再對新實例執行 `use`。

```js
// use：就地替換目前的 PRNG
random.use('xor128', 'foobar')

// newUse：保留目前實例，回傳新的實例
const r2 = random.newUse('seedrandom', 'hello.', null)

// cloneUse：複製後再換 PRNG
const r3 = random.cloneUse('seedrandom', 'kittyfoo')
```

#### 分佈函式 (Distribution Functions)

所有 `df` 前綴的分佈函式皆回傳一個 thunk（無參數函式），重複呼叫可高效取得同一分佈的連續亂數樣本：

| 分佈 (Distribution) | 方法 |
| --- | --- |
| 均勻分佈 (Uniform) | `dfUniform`、`dfUniformInt`、`dfUniformBoolean` |
| 常態分佈 (Normal) | `dfNormal`、`dfLogNormal` |
| 伯努利分佈 (Bernoulli) | `dfBernoulli`、`dfBinomial`、`dfGeometric` |
| 泊松分佈 (Poisson) | `dfPoisson`、`dfExponential` |
| 其他 (Misc) | `dfIrwinHall`、`dfBates`、`dfPareto` |
| 陣列／權重 (Array / Weighted) | `dfItemByWeight`、`dfItemByWeightUnique`、`dfArrayShuffle`、`dfArrayUnique`、`dfSumInt`、`dfSumFloat` 等 |

> 完整清單請見 [src/random.d.ts](src/random.d.ts) 與 `RandomCore` 的型別宣告。

## Todo

-   Distributions

    -   [x] dfUniform
    -   [x] dfUniformInt
    -   [x] dfUniformBoolean
    -   [x] dfNormal
    -   [x] dfLogNormal
    -   [ ] chiSquared
    -   [ ] cauchy
    -   [ ] fischerF
    -   [ ] studentT
    -   [x] dfBernoulli
    -   [x] dfBinomial
    -   [ ] negativeBinomial
    -   [x] dfGeometric
    -   [x] dfPoisson
    -   [x] dfExponential
    -   [ ] gamma
    -   [ ] hyperExponential
    -   [ ] weibull
    -   [ ] beta
    -   [ ] laplace
    -   [x] dfIrwinHall
    -   [x] dfBates
    -   [x] dfPareto

-   Generators

    -   [x] pluggable prng
    -   [ ] port more prng from boost
    -   [ ] custom entropy

-   Misc
    -   [x] browser support via rollup
    -   [x] basic docs
    -   [x] basic tests
    -   [ ] full test suite
    -   [x] initial release!

## 開發 (Development)

在 monorepo 根目錄或本套件目錄下執行：

```bash
pnpm run test
pnpm run test:jest
pnpm run build:tsc
pnpm run benchmark
```

## 變更日誌 (Changelog)

請見 [CHANGELOG.md](./CHANGELOG.md)。

## 相關資源 (Related)

-   [d3-random](https://github.com/d3/d3-random) - D3's excellent random number generation library.
-   [seedrandom](https://github.com/davidbau/seedrandom) - Seedable pseudo random number generator.
-   [random-int](https://github.com/sindresorhus/random-int) - For the common use case of generating dfUniform random ints.
-   [random-float](https://github.com/sindresorhus/random-float) - For the common use case of generating dfUniform random floats.
-   [randombytes](https://github.com/crypto-browserify/randombytes) - Random crypto bytes for Node.js and the browser.

## Credit

Huge shoutout to [Roger Combs](https://github.com/rcombs) for donating the `random` npm package for this project!

Lots of inspiration from [d3-random](https://github.com/d3/d3-random) ([@mbostock](https://github.com/mbostock) and [@svanschooten](https://github.com/svanschooten)).

Some distributions and PRNGs are ported from C++ [boost::random](https://www.boost.org/doc/libs/1_66_0/doc/html/boost_random/reference.html#boost_random.reference.distributions).

## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
