import { expect } from '@lazy-random/expect';
import { arrayShuffle } from '@lazy-random/df-array';

function _getWeight(value, key) {
  return value + 0.001;
}
function _createWeight(arr, options) {
  var _options$getWeight;

  let sum = 0;
  const getWeight = (_options$getWeight = options === null || options === void 0 ? void 0 : options.getWeight) !== null && _options$getWeight !== void 0 ? _options$getWeight : _getWeight;
  let ls2 = Object.entries(arr).map(function (entrie) {
    let [key, value] = entrie;
    let weight = getWeight(value, key);
    weight = +weight;
    expect(weight).gt(0);
    sum += weight;
    return {
      key,
      value,
      weight,
      percentage: 0
    };
  });
  let ls = ls2.reduce(function (a, entrie) {
    entrie.percentage = entrie.weight / sum;
    let item = [entrie.key, entrie.value, entrie.percentage];

    if (a.last === 0) {
      a.last = entrie.percentage;
    } else {
      a.last += entrie.percentage;
    }

    a.vlist.push(item);
    a.kwlist[entrie.key] = entrie.weight;
    return a;
  }, {
    vlist: [],
    kwlist: {},
    last: 0
  });
  expect(ls.vlist).have.length.gt(1);
  return {
    sum,
    list: ls2,
    kwlist: ls.kwlist,
    vlist: ls.vlist
  };
}
function _sortWeight(random, ws, options = {}) {
  if (!options.disableSort) {
    ws.vlist = ws.vlist.sort(function (a, b) {
      let n = a[2] - b[2];
      return n;
    });
  }

  if (options.shuffle) {
    ws.vlist = arrayShuffle(random, ws.vlist, true)();
  }

  return ws;
}
function _percentageWeight(random, ws) {
  let psum = 0;
  ws.plist = [];
  ws.klist = ws.vlist.reduce(function (a, list) {
    let percentage = list[2];

    if (psum === 0) {
      psum = percentage;
    } else {
      psum += percentage;
    }

    a.push(psum);
    ws.plist.push(percentage);
    return a;
  }, []);
  return ws;
}
function _calcWeight(random, arr, options) {
  let ws = _createWeight(arr, options);

  ws = _sortWeight(random, ws, options);
  ws = _percentageWeight(random, ws);
  return ws;
}
function _itemByWeightCore(r, klist) {
  var _index;

  let index;

  for (let k = 0; k < klist.length; k++) {
    if (r <= klist[k]) {
      index = k;
      break;
    }
  }

  return (_index = index) !== null && _index !== void 0 ? _index : klist.length - 1;
}

function itemByWeight(random, arr, options) {
  let ws = _calcWeight(random, arr, options);

  const {
    vlist,
    klist
  } = ws;
  ws = void 0;
  arr = void 0;
  options = void 0;
  return () => {
    return vlist[_itemByWeightCore(random.next(), klist)];
  };
}

function itemByWeightUnique(random, arr, size, options) {
  let ws = _createWeight(arr, options);

  expect(size).integer.gt(1);
  expect(ws.vlist).have.length.gte(size);
  ws = _percentageWeight(random, _sortWeight(random, ws, options));
  const {
    vlist,
    klist
  } = ws;
  ws = void 0;
  arr = void 0;
  options = void 0;
  const size_sub_1 = size - 1;
  return () => {
    const result = [];
    const ws = {
      vlist: vlist.slice(),
      klist: klist.slice()
    };

    for (let i = 0; i < size; i++) {
      let index = _itemByWeightCore(random.next(), ws.klist);

      result.push(ws.vlist[index]);

      if (i < size_sub_1) {
        ws.vlist.splice(index, 1);

        _percentageWeight(random, ws);
      }
    }

    return result;
  };
}

export { _calcWeight, _createWeight, _getWeight, _itemByWeightCore, _percentageWeight, _sortWeight, itemByWeight, itemByWeightUnique };
//# sourceMappingURL=index.esm.mjs.map