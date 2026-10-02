import { expect as t } from "@lazy-random/expect";

import { dfArrayShuffle as e } from "@lazy-random/df-array";

function _getWeight(t, e) {
  return t + 0.001;
}

function _createWeight(e, i) {
  var l;
  let n = 0;
  const r = null !== (l = null == i ? void 0 : i.getWeight) && void 0 !== l ? l : _getWeight;
  let g = Object.entries(e).map(function(e) {
    let [i, l] = e, g = r(l, i);
    return g = +g, t(g).gt(0), n += g, {
      key: i,
      value: l,
      weight: g,
      percentage: 0
    };
  }), s = g.reduce(function(t, e) {
    e.percentage = e.weight / n;
    let i = [ e.key, e.value, e.percentage ];
    return 0 === t.last ? t.last = e.percentage : t.last += e.percentage, t.vlist.push(i), 
    t.kwlist[e.key] = e.weight, t;
  }, {
    vlist: [],
    kwlist: {},
    last: 0
  });
  return t(s.vlist).have.length.gt(1), {
    sum: n,
    list: g,
    kwlist: s.kwlist,
    vlist: s.vlist
  };
}

function _sortWeight(t, i, l = {}) {
  return l.disableSort || (i.vlist = i.vlist.sort(function(t, e) {
    return t[2] - e[2];
  })), l.shuffle && (i.vlist = e(t, i.vlist, !0)()), i;
}

function _percentageWeight(t, e) {
  let i = 0;
  return e.plist = [], e.klist = e.vlist.reduce(function(t, l) {
    let n = l[2];
    return 0 === i ? i = n : i += n, t.push(i), e.plist.push(n), t;
  }, []), e;
}

function _calcWeight(t, e, i) {
  let l = _createWeight(e, i);
  return l = _sortWeight(t, l, i), l = _percentageWeight(0, l), l;
}

function _itemByWeightCore(t, e) {
  let i;
  for (let l = 0; l < e.length; l++) if (t <= e[l]) {
    i = l;
    break;
  }
  return null != i ? i : e.length - 1;
}

function dfItemByWeight(t, e, i) {
  let l = _calcWeight(t, e, i);
  const {vlist: n, klist: r} = l;
  return l = void 0, e = void 0, i = void 0, () => n[_itemByWeightCore(t.next(), r)];
}

function dfItemByWeightUnique(e, i, l, n) {
  let r = _createWeight(i, n);
  t(l).integer.gt(1), t(r.vlist).have.length.gte(l), r = _percentageWeight(0, _sortWeight(e, r, n));
  const {vlist: g, klist: s} = r;
  r = void 0, i = void 0, n = void 0;
  const c = l - 1;
  return () => {
    const t = [], i = {
      vlist: g.slice(),
      klist: s.slice()
    };
    for (let n = 0; n < l; n++) {
      let l = _itemByWeightCore(e.next(), i.klist);
      t.push(i.vlist[l]), n < c && (i.vlist.splice(l, 1), _percentageWeight(0, i));
    }
    return t;
  };
}

export { _calcWeight, _createWeight, _getWeight, _itemByWeightCore, _percentageWeight, _sortWeight, dfItemByWeight, dfItemByWeightUnique };
//# sourceMappingURL=index.esm.mjs.map
