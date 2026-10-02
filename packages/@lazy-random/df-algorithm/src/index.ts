/**
 * 統計分佈 (Statistical Distribution) 取樣函式的統一出口
 * Single entry point for all statistical distribution sampling factories.
 *
 * 每個 `df*` 函式皆為工廠 (Factory)：接收亂數來源與分佈參數，
 * 回傳可反覆呼叫的取樣函式 (Sampler)。
 * Each `df*` function is a factory that takes an RNG plus distribution
 * parameters and returns a sampler callable any number of times.
 */

export { dfBates } from './bates'

export { dfBernoulli } from './bernoulli'
export { dfBinomial } from './binomial'
export { dfExponential } from './exponential'
export { dfGeometric } from './geometric'

export { dfIrwinHall } from './irwin-hall'
export { dfLogNormal } from './log-normal'

export { dfNormal } from './normal'
export { dfPareto } from './pareto'
