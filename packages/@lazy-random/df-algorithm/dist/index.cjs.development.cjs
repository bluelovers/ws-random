'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var expect = require('@lazy-random/expect');
var numIsZero = require('num-is-zero');

function dfIrwinHall(random, n = 1) {
  expect.expect(n).integer.gte(0);
  n = numIsZero.fixZero(n);
  if (n === 0) {
    return () => 0;
  }
  return () => {
    let i = n;
    let sum = 0;
    while (i--) {
      sum += random.next();
    }
    return sum;
  };
}

function dfBates(random, n = 1) {
  expect.expect(n).integer.gt(0);
  const irwinHall = dfIrwinHall(random, n);
  return () => {
    return irwinHall() / n;
  };
}

function dfBernoulli(random, p = 0.5) {
  expect.expect(p).number.gte(0).lte(1);
  return () => {
    return Math.floor(random.next() + p);
  };
}

function dfBinomial(random, n = 1, p = 0.5) {
  expect.expect(n).integer.gt(0);
  expect.expect(p).number.gte(0).lte(1);
  return () => {
    let i = n;
    let x = 0;
    while (i--) {
      if (random.next() < p) {
        x++;
      }
    }
    return x;
  };
}

function dfExponential(random, lambda = 1) {
  expect.expect(lambda).number.gt(0);
  return () => {
    return -Math.log(1 - random.next()) / lambda;
  };
}

function dfGeometric(random, p = 0.5) {
  expect.expect(p).number.gt(0).lte(1);
  const invLogP = 1.0 / Math.log(1.0 - p);
  return () => {
    return Math.floor(1 + Math.log(random.next()) * invLogP);
  };
}

function dfNormal(random, mu = 0, sigma = 1) {
  expect.expect(mu).number();
  expect.expect(sigma).number();
  return () => {
    let x, y, r;
    do {
      x = random.next() * 2 - 1;
      y = random.next() * 2 - 1;
      r = x * x + y * y;
    } while (!r || r > 1);
    return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
  };
}

function dfLogNormal(...args) {
  const normal = dfNormal(...args);
  return () => {
    return Math.exp(normal());
  };
}

function dfPareto(random, alpha = 1) {
  expect.expect(alpha).gt(0);
  const invAlpha = 1.0 / alpha;
  return () => {
    return 1.0 / Math.pow(1.0 - random.next(), invAlpha);
  };
}

exports.dfBates = dfBates;
exports.dfBernoulli = dfBernoulli;
exports.dfBinomial = dfBinomial;
exports.dfExponential = dfExponential;
exports.dfGeometric = dfGeometric;
exports.dfIrwinHall = dfIrwinHall;
exports.dfLogNormal = dfLogNormal;
exports.dfNormal = dfNormal;
exports.dfPareto = dfPareto;
//# sourceMappingURL=index.cjs.development.cjs.map
