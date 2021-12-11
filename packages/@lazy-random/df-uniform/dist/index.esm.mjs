import { expect } from '@lazy-random/expect';
import { toFixedNumber } from '@lazy-num/to-fixed-number';
import { stringifyByte } from '@lazy-random/shared-lib';

function uniformFloat(random, min, max, fractionDigits) {
  if (max === undefined) {
    max = min === undefined ? 1 : min;
    min = 0;
  }

  expect(min).number();
  expect(max).number.gt(min);
  let fn;

  if (min === 0 && max === 1) {
    fn = random.next;
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

function uniformInt(random, min, max) {
  if (max === undefined) {
    max = min === undefined ? 1 : min;
    min = 0;
  }

  expect(min).integer();
  expect(max).integer.gt(min);
  let fn = uniformFloat(random, min, max + 1);
  return () => {
    return Math.floor(fn());
  };
}

function uniformBoolean(random, likelihood = 0.5) {
  expect(likelihood).number.gt(0).lt(1);
  return () => {
    return random.next() >= likelihood;
  };
}

function uniformByte(random, toStr) {
  let fn = uniformInt(random, 0, 255);

  if (typeof toStr !== 'undefined') {
    expect(toStr).is.boolean();
  }

  if (toStr) {
    return () => stringifyByte(fn());
  }

  return fn;
}

function uniformBytes(random, size, toStr) {
  expect(size).integer.gt(0);
  const fn = uniformByte(random, toStr);
  return () => {
    let i = size;
    let arr = [];

    while (i--) {
      arr[i] = fn();
    }

    return arr;
  };
}

export { uniformBoolean, uniformByte, uniformBytes, uniformFloat, uniformInt };
//# sourceMappingURL=index.esm.mjs.map
