import { expect } from '@lazy-random/expect';
import { toFixedNumber } from '@lazy-num/to-fixed-number';
import { stringifyByte } from '@lazy-random/shared-lib';

function dfUniformFloat(random, min, max, fractionDigits) {
  if (max === undefined) {
    max = min === undefined ? 1 : min;
    min = 0;
  }

  expect(min).number.finite;
  expect(max).number.finite.gt(min);
  let fn;

  if (min === 0 && max === 1) {
    fn = () => random.next();
  } else if (min === 0) {
    fn = () => {
      return random.next() * max;
    };
  } else {
    fn = () => {
      return random.next() * (max - min) + min;
    };
  }

  if (fractionDigits !== undefined) {
    expect(fractionDigits).integer.gte(0);
    return () => {
      return toFixedNumber(fn(), fractionDigits);
    };
  }

  return fn;
}

function dfUniformInt(random, min, max) {
  if (max === undefined) {
    max = min === undefined ? 1 : min;
    min = 0;
  }

  expect(min).integer();
  expect(max).integer.gt(min);
  let fn = dfUniformFloat(random, min, max + 1);
  return () => {
    return Math.floor(fn());
  };
}

function dfUniformBoolean(random, likelihood = 0.5) {
  expect(likelihood).number.gt(0).lt(1);
  return () => {
    return random.next() >= likelihood;
  };
}

function dfUniformByte(random, toStr) {
  let fn = dfUniformInt(random, 0, 255);

  if (typeof toStr !== 'undefined') {
    expect(toStr).boolean();
  }

  if (toStr) {
    return () => stringifyByte(fn());
  }

  return fn;
}

function dfUniformBytes(random, size = 1, toStr) {
  expect(size).integer.gt(0);
  const fn = dfUniformByte(random, toStr);
  return () => {
    let i = size;
    let arr = [];

    while (i--) {
      arr[i] = fn();
    }

    return arr;
  };
}

export { dfUniformBoolean, dfUniformByte, dfUniformBytes, dfUniformFloat, dfUniformInt };
//# sourceMappingURL=index.esm.mjs.map
