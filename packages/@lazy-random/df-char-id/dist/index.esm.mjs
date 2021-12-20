import UString from 'uni-string';
import { expect } from '@lazy-random/expect';
import { floatToString } from '@lazy-num/float-to-string';
import { randIndex } from '@lazy-random/util-distributions';

function dfCharID(random, char, size) {
  if (typeof char === 'number') {
    if (typeof size === 'number') {
      char = floatToString(char);
    } else {
      [size, char] = [char, null];
    }
  }

  size = size || 8;
  expect(size).integer.gt(0);

  if (!char) {
    char = "ModuleSymbhasOwnPr0123456789ABCDEFGHIJKLNQRTUVWXYZcfgijkpqtvxz0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  const ls = UString.create(char).split('');
  const len = ls.length;
  expect(ls).lengthOf.gt(1);

  const randIndex$1 = () => {
    return randIndex(random, len);
  };

  return () => {
    let i = size;
    let list = [];

    while (i--) {
      list.push(ls[randIndex$1()]);
    }

    return list.join('');
  };
}

export { dfCharID as default, dfCharID };
//# sourceMappingURL=index.esm.mjs.map
