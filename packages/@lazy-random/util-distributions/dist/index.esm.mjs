import { fixZero as e } from "num-is-zero";

function randIndex(e, n) {
  return Math.floor(e.next() * n);
}

function randIndexWithRange(e, n, r) {
  return Math.floor(float(e, n, r));
}

function float(e, n, r) {
  return e.next() * (r - n) + n;
}

function int(e, n, r) {
  return randIndexWithRange(e, n, r + 1);
}

const n = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER, a = 1, t = Number.MAX_SAFE_INTEGER;

function _fnCoreToInteger(n) {
  return e(Math.trunc(n));
}

function _isFiniteNumber(e) {
  return "number" == typeof e && Number.isFinite(e);
}

function _assertFiniteNumber(e, n = "value", r = "_assertFiniteNumber") {
  if (!_isFiniteNumber(e)) throw new TypeError(`[${r}] parameter must be a finite number: ${n}=${String(e)}`);
  return e;
}

function _isIntegerInRange(e, n, r) {
  return Number.isInteger(e) && e >= n && e <= r;
}

function _assertInteger(e, n = "value", r = "_assertInteger") {
  if (!Number.isInteger(e)) throw new TypeError(`[${r}] parameter must be an integer: ${n}=${e}`);
  return e;
}

function _isInRange(e, n, r) {
  return e >= n && e < r;
}

function _assertInRange(e, n, r, a = "value", t = "_assertInRange") {
  if (!_isInRange(e, n, r)) throw new RangeError(`[${t}] illegal value: ${a}=${e}, expected range: [${n}, ${r})`);
  return e;
}

function _assertIntegerInRange(e, n, r, a, t) {
  if (_assertInteger(e, a, t), !_isIntegerInRange(e, n, r)) throw new RangeError(`[${t}] parameter out of range: ${a}=${e}, expected: [${n}, ${r}]`);
  return e;
}

function _assertLengthParams(e, n = "_assertLengthParams") {
  return _assertIntegerInRange(e, 1, t, "len", n);
}

function _assertRangeParams(e, a, t = "_assertRangeParams") {
  if (_assertIntegerInRange(e, n, r, "start", t), _assertIntegerInRange(a, n, r, "end", t), 
  e >= a) throw new RangeError(`[${t}] range must not be empty: start=${e}, end=${a}`);
  return {
    start: e,
    end: a
  };
}

function _calcRangeSize(e, n) {
  return n - e;
}

function* _rangeValues(e, n) {
  for (let r = e; r < n; r++) yield r;
}

function _createExpectedValues(e, n) {
  return {
    params: {
      ...n
    },
    range: e,
    size: _calcRangeSize(e.start, e.end),
    valuesGenerator: () => _rangeValues(e.start, e.end)
  };
}

function _calcExpectedValues(e, n, r, a = "_calcExpectedValues") {
  return _createExpectedValues(_assertRangeParams(e, n, a), {
    ...r
  });
}

function _calcExpectedValuesByLength(e) {
  return _assertLengthParams(e, "_calcExpectedValuesByLength"), _createExpectedValues({
    start: 0,
    end: e
  }, {
    len: e
  });
}

function _calcExpectedValuesByRange(e, n) {
  return _createExpectedValues(_assertRangeParams(e, n, "_calcExpectedValuesByRange"), {
    start: e,
    end: n
  });
}

function _createValuesValidator(e, n) {
  const {start: r, end: a} = e.range, t = new Map, i = [];
  let s = 0;
  function* missingValuesGenerator() {
    for (const n of e.valuesGenerator()) t.has(n) || (yield n);
  }
  return {
    label: n,
    expected: e,
    get size() {
      return t.size;
    },
    get total() {
      return s;
    },
    check: l => {
      var o;
      if (s++, !_isInRange(l, r, a)) throw i.push(l), new RangeError(`[${n}] illegal value: ${l}, expected range: [${r}, ${a})`);
      if (t.set(l, (null !== (o = t.get(l)) && void 0 !== o ? o : 0) + 1), t.size > e.size) throw new RangeError(`[${n}] distinct value count exceeds expectation: ${t.size} > ${e.size}`);
      return l;
    },
    verifyAllSeen: () => {
      const e = [];
      for (const n of missingValuesGenerator()) e.push(n);
      if (e.length) throw new RangeError(`[${n}] expected values never appeared: [${e.join(", ")}]`);
    },
    seenValuesGenerator: function* seenValuesGenerator() {
      for (const n of e.valuesGenerator()) t.has(n) && (yield n);
    },
    missingValuesGenerator,
    illegalValuesGenerator: function* illegalValuesGenerator() {
      yield* i;
    }
  };
}

function _isArrayEmpty(e) {
  return 0 === e.length;
}

function _fnCoreArrayLength(e) {
  const n = null == e ? void 0 : e.length;
  return "number" == typeof n ? n : NaN;
}

function _fnCoreClamp(e, n, r) {
  return Math.min(Math.max(e, n), r);
}

function _fnCoreResolveTailIndex(e, n) {
  const r = _fnCoreToInteger(e);
  return r < 0 ? n + r : r;
}

function _fnCoreNormalizeSliceIndex(e, n) {
  return _fnCoreClamp(_fnCoreResolveTailIndex(e, n), 0, n);
}

function _fnCoreNormalizeInclusiveIndex(e, n) {
  return _fnCoreClamp(_fnCoreResolveTailIndex(e, n), 0, n - 1);
}

function _fnCoreNormalizeSliceRange(e, n, r) {
  return {
    start: _fnCoreNormalizeSliceIndex(null != e ? e : 0, r),
    end: _fnCoreNormalizeSliceIndex(null != n ? n : r, r)
  };
}

function _fnCoreNormalizeSliceMinMax(e, n, r) {
  let a = _fnCoreNormalizeInclusiveIndex(null != e ? e : 0, r), t = _fnCoreNormalizeInclusiveIndex(null != n ? n : r - 1, r);
  return a > t && ([a, t] = [ t, a ]), {
    min: a,
    max: t
  };
}

function _fnCoreOrderMinMax(e, n) {
  return e > n ? {
    min: n,
    max: e
  } : {
    min: e,
    max: n
  };
}

function _assertSliceIndexParams(e, n, a, t) {
  _assertIntegerInRange(n, 0, r, "length", t), _assertFiniteNumber(e, a, t);
}

function _assertInclusiveIndexParams(e, n, r, a) {
  _assertNotEmptyLength(n, "length", a), _assertFiniteNumber(e, r, a);
}

function _assertMinMaxOrder(e, n, r) {
  if (e > n) throw new RangeError(`[${r}] max must be greater than or equal to min: min=${e}, max=${n}`);
}

function _calcArrayLength(e, n = "_calcArrayLength") {
  const a = _fnCoreArrayLength(e);
  if (!_isFiniteNumber(a)) throw new TypeError(`[${n}] parameter must be an array-like object with a numeric length: length=${String(null == e ? void 0 : e.length)}`);
  return _assertIntegerInRange(a, 0, r, "length", n);
}

function _assertNotEmptyLength(e, n = "length", a = "_assertNotEmptyLength") {
  if (_assertIntegerInRange(e, 0, r, n, a), 0 === e) throw new RangeError(`[${a}] array must not be empty: ${n}=0`);
  return e;
}

function _normalizeSliceIndex(e, n, r = "index", a = "_normalizeSliceIndex") {
  return _assertSliceIndexParams(e, n, r, a), _fnCoreNormalizeSliceIndex(e, n);
}

function _normalizeInclusiveIndex(e, n, r = "index", a = "_normalizeInclusiveIndex") {
  return _assertInclusiveIndexParams(e, n, r, a), _fnCoreNormalizeInclusiveIndex(e, n);
}

function _normalizeSliceRange(e, n, r, a = "_normalizeSliceRange") {
  _assertSliceIndexParams(null != e ? e : 0, r, "start", a), _assertSliceIndexParams(null != n ? n : r, r, "end", a);
  const t = _fnCoreNormalizeSliceRange(e, n, r);
  if (t.start >= t.end) throw new RangeError(`[${a}] range must not be empty: start=${t.start}, end=${t.end}`);
  return t;
}

function _normalizeSliceMinMax(e, n, r, a = "_normalizeSliceMinMax") {
  return _assertInclusiveIndexParams(null != e ? e : 0, r, "min", a), _assertInclusiveIndexParams(null != n ? n : r - 1, r, "max", a), 
  _fnCoreNormalizeSliceMinMax(e, n, r);
}

function _assertArrayNotEmpty(e, n = "_assertArrayNotEmpty") {
  return _assertNotEmptyLength(_calcArrayLength(e, n), "length", n);
}

function _normalizeArrayRange(e, n, r, a = "_normalizeArrayRange") {
  return _normalizeSliceRange(n, r, _assertArrayNotEmpty(e, a), a);
}

function _calcArrayIndexRange(e, n = "_calcArrayIndexRange") {
  return _assertRangeParams(0, _assertArrayNotEmpty(e, n), n);
}

function _calcArraySliceSize(e, n, r, a = "_calcArraySliceSize") {
  const t = _normalizeSliceRange(n, r, _assertArrayNotEmpty(e, a), a);
  return _calcRangeSize(t.start, t.end);
}

function _calcArrayIndexMinMax(e, n = "_calcArrayIndexMinMax") {
  return {
    min: 0,
    max: _assertArrayNotEmpty(e, n) - 1
  };
}

function _assertArrayIndexMinMax(e, n, r, a = "_assertArrayIndexMinMax") {
  const t = _calcArrayIndexMinMax(e, a), i = t.max + 1, resolve = (e, n) => (_assertFiniteNumber(e, n, a), 
  _assertInteger(e, n, a), _fnCoreResolveTailIndex(e, i)), s = _assertIntegerInRange(resolve(null != n ? n : t.min, "min"), t.min, t.max, "min", a), l = _assertIntegerInRange(resolve(null != r ? r : t.max, "max"), t.min, t.max, "max", a);
  return _assertMinMaxOrder(s, l, a), {
    min: s,
    max: l
  };
}

function _normalizeArrayIndexMinMax(e, n, r, a = "_normalizeArrayIndexMinMax") {
  return _normalizeSliceMinMax(n, r, _assertArrayNotEmpty(e, a), a);
}

function _calcExpectedValuesByArray(e, n, r, a = "_calcExpectedValuesByArray") {
  const t = _assertArrayNotEmpty(e, a), i = _normalizeSliceRange(n, r, t, a);
  return _calcExpectedValues(i.start, i.end, {
    length: t,
    start: i.start,
    end: i.end
  }, a);
}

function _calcExpectedValuesByArrayMinMax(e, n, r, a = "_calcExpectedValuesByArrayMinMax") {
  const t = _assertArrayNotEmpty(e, a), i = _normalizeSliceMinMax(n, r, t, a);
  return _calcExpectedValues(i.min, i.max + 1, {
    length: t,
    min: i.min,
    max: i.max
  }, a);
}

function _assertMinMax(e, a, t = "_assertMinMax") {
  return _assertIntegerInRange(e, n, r, "min", t), _assertIntegerInRange(a, n, r, "max", t), 
  _assertMinMaxOrder(e, a, t), {
    min: e,
    max: a
  };
}

function _normalizeMinMax(e, a, t = "_normalizeMinMax") {
  return _assertIntegerInRange(e, n, r, "min", t), _assertIntegerInRange(a, n, r, "max", t), 
  _fnCoreOrderMinMax(e, a);
}

function _clampValue(e, n, r, a = "_clampValue") {
  return _assertMinMaxOrder(n, r, a), _fnCoreClamp(e, n, r);
}

function _clampSize(e, a, t = "_clampSize") {
  return _assertIntegerInRange(e, n, r, "size", t), _assertIntegerInRange(a, 0, r, "max", t), 
  _fnCoreClamp(e, 0, a);
}

function _assertSize(e, n = "_assertSize") {
  return _assertIntegerInRange(e, 1, t, "size", n);
}

function _assertSizeInRange(e, n, a = "_assertSizeInRange") {
  if (_assertIntegerInRange(n, 0, r, "max", a), n < 1) throw new RangeError(`[${a}] no size is legal: max=${n}, expected max >= 1`);
  return _assertIntegerInRange(e, 1, n, "size", a);
}

function _calcExpectedValuesByMinMax(e, n, r = "_calcExpectedValuesByMinMax") {
  const a = _assertMinMax(e, n, r);
  return _calcExpectedValues(a.min, a.max + 1, {
    min: a.min,
    max: a.max
  }, r);
}

const i = {
  randIndex,
  randIndexWithRange,
  float,
  int
};

export { t as MAX_LENGTH, a as MIN_LENGTH, r as SAFE_INTEGER_MAX, n as SAFE_INTEGER_MIN, _assertArrayIndexMinMax, _assertArrayNotEmpty, _assertFiniteNumber, _assertInRange, _assertInteger, _assertIntegerInRange, _assertLengthParams, _assertMinMax, _assertMinMaxOrder, _assertNotEmptyLength, _assertRangeParams, _assertSize, _assertSizeInRange, _calcArrayIndexMinMax, _calcArrayIndexRange, _calcArrayLength, _calcArraySliceSize, _calcExpectedValues, _calcExpectedValuesByArray, _calcExpectedValuesByArrayMinMax, _calcExpectedValuesByLength, _calcExpectedValuesByMinMax, _calcExpectedValuesByRange, _calcRangeSize, _clampSize, _clampValue, _createValuesValidator, _fnCoreArrayLength, _fnCoreClamp, _fnCoreNormalizeInclusiveIndex, _fnCoreNormalizeSliceIndex, _fnCoreNormalizeSliceMinMax, _fnCoreNormalizeSliceRange, _fnCoreOrderMinMax, _fnCoreResolveTailIndex, _fnCoreToInteger, _isArrayEmpty, _isFiniteNumber, _isInRange, _isIntegerInRange, _normalizeArrayIndexMinMax, _normalizeArrayRange, _normalizeInclusiveIndex, _normalizeMinMax, _normalizeSliceIndex, _normalizeSliceMinMax, _normalizeSliceRange, _rangeValues, i as default, float, int, randIndex, randIndexWithRange };
//# sourceMappingURL=index.esm.mjs.map
