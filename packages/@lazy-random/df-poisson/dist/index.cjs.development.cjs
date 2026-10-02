'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var expect = require('@lazy-random/expect');

const logFactorialTable = [0.0, 0.0, 0.69314718055994529, 1.7917594692280550, 3.1780538303479458, 4.7874917427820458, 6.5792512120101012, 8.5251613610654147, 10.604602902745251, 12.801827480081469];
/**
 * 取得 ln(k!) 的查表值 / Get the lookup value of ln(k!)
 *
 * @param k 階乘的索引 (Factorial index)，僅支援 0-9（查表長度限制）；超出範圍會回傳 undefined
 * @returns ln(k!) 的浮點數值 / The floating point value of ln(k!)
 */
const logFactorial = k => {
  return logFactorialTable[k];
};
const logSqrt2PI = 0.91893853320467267;
/**
 * 建立泊松分佈 (Poisson Distribution) 亂數 (Random Number) 產生器
 * Create a Poisson distribution random number generator
 *
 * 依 lambda 大小自動選擇演算法：lambda < 10 使用反轉法 (Inversion Method)，
 * 否則使用產生法 (Generative Method / transformed rejection)
 * Automatically selects the algorithm by lambda: inversion for lambda < 10,
 * otherwise the generative (transformed rejection) method
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next() 回傳 [0,1) 的數值
 * @param lambda 泊松分佈的平均值 (Mean)，必須大於 0，預設為 1
 * @returns 回傳一個可反覆呼叫的產生器函式 (Generator Function)，每次回傳一個非負整數
 * @throws 當 lambda <= 0 時，由 expect(lambda).gt(0) 拋出錯誤
 */
function dfPoisson(random, lambda = 1) {
  expect.expect(lambda).gt(0);
  if (lambda < 10) {
    const expMean = Math.exp(-lambda);
    return () => {
      let p = expMean;
      let x = 0;
      let u = random.next();
      while (u > p) {
        u = u - p;
        p = lambda * p / ++x;
      }
      return x;
    };
  } else {
    const smu = Math.sqrt(lambda);
    const b = 0.931 + 2.53 * smu;
    const a = -0.059 + 0.02483 * b;
    const invAlpha = 1.1239 + 1.1328 / (b - 3.4);
    const vR = 0.9277 - 3.6224 / (b - 2);
    return () => {
      while (true) {
        let u;
        let v = random.next();
        if (v <= 0.86 * vR) {
          u = v / vR - 0.43;
          return Math.floor((2 * a / (0.5 - Math.abs(u)) + b) * u + lambda + 0.445);
        }
        if (v >= vR) {
          u = random.next() - 0.5;
        } else {
          u = v / vR - 0.93;
          u = (u < 0 ? -0.5 : 0.5) - u;
          v = random.next() * vR;
        }
        const us = 0.5 - Math.abs(u);
        if (us < 0.013 && v > us) {
          continue;
        }
        const k = Math.floor((2 * a / us + b) * u + lambda + 0.445);
        v = v * invAlpha / (a / (us * us) + b);
        if (k >= 10) {
          const t = (k + 0.5) * Math.log(lambda / k) - lambda - logSqrt2PI + k - (1 / 12.0 - (1 / 360.0 - 1 / (1260.0 * k * k)) / (k * k)) / k;
          if (Math.log(v * smu) <= t) {
            return k;
          }
        } else if (k >= 0) {
          if (Math.log(v) <= k * Math.log(lambda) - lambda - logFactorial(k)) {
            return k;
          }
        }
      }
    };
  }
}

exports.default = dfPoisson;
exports.dfPoisson = dfPoisson;
//# sourceMappingURL=index.cjs.development.cjs.map
