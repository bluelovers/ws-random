"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("@lazy-random/expect"), t = require("@lazy-random/df-array");

function _getWeight(e, t) {
  return e + 0.001;
}

function _createWeight(t, i) {
  var r;
  let l = 0;
  const n = null !== (r = null == i ? void 0 : i.getWeight) && void 0 !== r ? r : _getWeight;
  let s = Object.entries(t).map((function(t) {
    let [i, r] = t, s = n(r, i);
    return s = +s, e.expect(s).gt(0), l += s, {
      key: i,
      value: r,
      weight: s,
      percentage: 0
    };
  })), g = s.reduce((function(e, t) {
    t.percentage = t.weight / l;
    let i = [ t.key, t.value, t.percentage ];
    return 0 === e.last ? e.last = t.percentage : e.last += t.percentage, e.vlist.push(i), 
    e.kwlist[t.key] = t.weight, e;
  }), {
    vlist: [],
    kwlist: {},
    last: 0
  });
  return e.expect(g.vlist).have.length.gt(1), {
    sum: l,
    list: s,
    kwlist: g.kwlist,
    vlist: g.vlist
  };
}

function _sortWeight(e, i, r = {}) {
  return r.disableSort || (i.vlist = i.vlist.sort((function(e, t) {
    return e[2] - t[2];
  }))), r.shuffle && (i.vlist = t.dfArrayShuffle(e, i.vlist, !0)()), i;
}

function _percentageWeight(e, t) {
  let i = 0;
  return t.plist = [], t.klist = t.vlist.reduce((function(e, r) {
    let l = r[2];
    return 0 === i ? i = l : i += l, e.push(i), t.plist.push(l), e;
  }), []), t;
}

function _calcWeight(e, t, i) {
  let r = _createWeight(t, i);
  return r = _sortWeight(e, r, i), r = _percentageWeight(0, r), r;
}

function _itemByWeightCore(e, t) {
  var i;
  let r;
  for (let i = 0; i < t.length; i++) if (e <= t[i]) {
    r = i;
    break;
  }
  return null !== (i = r) && void 0 !== i ? i : t.length - 1;
}

exports._calcWeight = _calcWeight, exports._createWeight = _createWeight, exports._getWeight = _getWeight, 
exports._itemByWeightCore = _itemByWeightCore, exports._percentageWeight = _percentageWeight, 
exports._sortWeight = _sortWeight, exports.dfItemByWeight = function dfItemByWeight(e, t, i) {
  let r = _calcWeight(e, t, i);
  const {vlist: l, klist: n} = r;
  return r = void 0, t = void 0, i = void 0, () => l[_itemByWeightCore(e.next(), n)];
}, exports.dfItemByWeightUnique = function dfItemByWeightUnique(t, i, r, l) {
  let n = _createWeight(i, l);
  e.expect(r).integer.gt(1), e.expect(n.vlist).have.length.gte(r), n = _percentageWeight(0, _sortWeight(t, n, l));
  const {vlist: s, klist: g} = n;
  n = void 0, i = void 0, l = void 0;
  const c = r - 1;
  return () => {
    const e = [], i = {
      vlist: s.slice(),
      klist: g.slice()
    };
    for (let l = 0; l < r; l++) {
      let r = _itemByWeightCore(t.next(), i.klist);
      e.push(i.vlist[r]), l < c && (i.vlist.splice(r, 1), _percentageWeight(0, i));
    }
    return e;
  };
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
