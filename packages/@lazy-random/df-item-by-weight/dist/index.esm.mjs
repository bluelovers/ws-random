import { expect as t } from "@lazy-random/expect";

import { dfArrayShuffle as e } from "@lazy-random/df-array";

function _getWeight(t, e) {
  return t + 0.001;
}

function _createWeight(e, i) {
  var r;
  let l = 0;
  const n = null !== (r = null == i ? void 0 : i.getWeight) && void 0 !== r ? r : _getWeight;
  let g = Object.entries(e).map((function(e) {
    let [i, r] = e, g = n(r, i);
    return g = +g, t(g).gt(0), l += g, {
      key: i,
      value: r,
      weight: g,
      percentage: 0
    };
  })), s = g.reduce((function(t, e) {
    e.percentage = e.weight / l;
    let i = [ e.key, e.value, e.percentage ];
    return 0 === t.last ? t.last = e.percentage : t.last += e.percentage, t.vlist.push(i), 
    t.kwlist[e.key] = e.weight, t;
  }), {
    vlist: [],
    kwlist: {},
    last: 0
  });
  return t(s.vlist).have.length.gt(1), {
    sum: l,
    list: g,
    kwlist: s.kwlist,
    vlist: s.vlist
  };
}

function _sortWeight(t, i, r = {}) {
  return r.disableSort || (i.vlist = i.vlist.sort((function(t, e) {
    return t[2] - e[2];
  }))), r.shuffle && (i.vlist = e(t, i.vlist, !0)()), i;
}

function _percentageWeight(t, e) {
  let i = 0;
  return e.plist = [], e.klist = e.vlist.reduce((function(t, r) {
    let l = r[2];
    return 0 === i ? i = l : i += l, t.push(i), e.plist.push(l), t;
  }), []), e;
}

function _calcWeight(t, e, i) {
  let r = _createWeight(e, i);
  return r = _sortWeight(t, r, i), r = _percentageWeight(0, r), r;
}

function _itemByWeightCore(t, e) {
  var i;
  let r;
  for (let i = 0; i < e.length; i++) if (t <= e[i]) {
    r = i;
    break;
  }
  return null !== (i = r) && void 0 !== i ? i : e.length - 1;
}

function dfItemByWeight(t, e, i) {
  let r = _calcWeight(t, e, i);
  const {vlist: l, klist: n} = r;
  return r = void 0, e = void 0, i = void 0, () => l[_itemByWeightCore(t.next(), n)];
}

function dfItemByWeightUnique(e, i, r, l) {
  let n = _createWeight(i, l);
  t(r).integer.gt(1), t(n.vlist).have.length.gte(r), n = _percentageWeight(0, _sortWeight(e, n, l));
  const {vlist: g, klist: s} = n;
  n = void 0, i = void 0, l = void 0;
  const o = r - 1;
  return () => {
    const t = [], i = {
      vlist: g.slice(),
      klist: s.slice()
    };
    for (let l = 0; l < r; l++) {
      let r = _itemByWeightCore(e.next(), i.klist);
      t.push(i.vlist[r]), l < o && (i.vlist.splice(r, 1), _percentageWeight(0, i));
    }
    return t;
  };
}

export { _calcWeight, _createWeight, _getWeight, _itemByWeightCore, _percentageWeight, _sortWeight, dfItemByWeight, dfItemByWeightUnique };
//# sourceMappingURL=index.esm.mjs.map
