Object.defineProperty(exports, "__esModule", {
    value: !0
});

const array_hyper_unique_1 = require("array-hyper-unique"), util_1 = require("../../for3rd/lib-r-math/util"), util_2 = require("../../util"), distributions_1 = require("../../util/distributions"), math_1 = require("../../util/math"), ow_1 = require("../../util/ow"), uniform_1 = require("../uniform");

function coreFnRandSumInt(e) {
    let {random: t, size: i, sum: r, min: n, max: u} = e;
    ow_1.expect(i).is.finite.integer.gt(1);
    let o = math_1.sum_1_to_n(i);
    r = util_2.isUnset(r) ? o : r, ow_1.expect(r).is.finite.integer(), n = util_2.isUnset(n) ? r > 0 ? 0 : r : n, 
    u = util_2.isUnset(u) ? Math.abs(r) : u, ow_1.expect(n).is.finite.integer(), ow_1.expect(u).is.finite.integer();
    let a = r - i * n, l = u - n;
    ow_1.expect(a).gte(0), r > 0 && ow_1.expect(r).gt(n);
    let _ = math_1.get_prob(i, l);
    ow_1.expect(_).is.array.lengthOf(i);
    let s = util_1.libRmath.Multinomial(util_1.fakeLibRMathRng(t.next)).rmultinom, m = e.limit || 5, f = n;
    const h = e => s(e, a, _).reduce((e, t) => {
        let i = t.length, o = 0, a = !1, l = 0;
        for (;i--; ) {
            let e = t[i], r = e + f;
            if (t.indexOf(e) === i && l++, !(r >= n && r <= u)) {
                a = !1;
                break;
            }
            a = !0, t[i] = r, o += r;
        }
        if (a && o === r) {
            let i = {
                value: t,
                unique_len: l,
                b_sum: o,
                bool: a
            };
            e.push(i);
        }
        return e;
    }, []).sort((e, t) => t.unique_len - e.unique_len), p = 10;
    let c = [];
    {
        let e = 200, t = array_hyper_unique_1.array_unique(h(e).map(e => (e.value = e.value.map(math_1.fixZero), 
        e)));
        if (t.length) {
            let e = Math.min(10, t.length);
            for (;e--; ) c.push(t[e].value);
            c = array_hyper_unique_1.array_unique(c.map(e => e.sort()));
        }
        ow_1.expect(c, `invalid argv (size=${i}, sum=${r}, min=${n}, max=${u})`).is.array.have.lengthOf.gt(0), 
        t = void 0;
    }
    return e = void 0, () => {
        let e = h(m), i, r, n = c.length;
        if (e.length) i = e[0].value, r = e[0].bool, i = i.map(math_1.fixZero), r && n < 10 && c.push(i); else if (n) {
            let e = distributions_1.UtilDistributions.randIndex(t, n);
            i = c[e], r = !0;
        }
        if (!r || !i) throw new Error("can't generator value by current input argv, or try set limit for high number");
        return i;
    };
}

function coreFnRandSumFloat(e) {
    let {random: t, size: i, sum: r, min: n, max: u, fractionDigits: o} = e;
    ow_1.expect(i).is.finite.integer.gt(1), util_2.isUnset(r) && "number" == typeof n && "number" == typeof u && (r = (i - 1) * n + u), 
    r = util_2.isUnset(r) ? 1 : r, n = util_2.isUnset(n) ? r > 0 ? 0 : r : n, u = util_2.isUnset(u) ? Math.abs(r) : u, 
    ow_1.expect(n).is.finite.number(), ow_1.expect(u).is.finite.number(), ow_1.expect(r).is.finite.number();
    let a = (r += 0) - i * n, l = u - n, _;
    r > 0 && ow_1.expect(r).gt(n), ow_1.expect(a).gte(0), util_2.isUnset(o) || ow_1.expect(o).is.finite.integer.gt(0);
    {
        let e = math_1.get_prob_float(i, l), r = math_1.array_sum(e.slice(0, -1));
        _ = uniform_1.default(t, 0, r);
    }
    let s = distributions_1.UtilDistributions.float;
    return () => {
        let e, l;
        e: do {
            let m = [], f = a, h = 0, p = i - 1, c, x, g = _(), b = math_1.fixZero(g + n);
            if (o && (b = math_1.toFixedNumber(b, o)), b < n || b > u) continue e;
            let d = f - g, w = d + n;
            if (w < n) continue e;
            h += b, m.push(b), f = d;
            let y = b;
            for (;p > 1; ) {
                let e = f - (c = s(t, 0, f)), i;
                if (e + n < n) continue e;
                x = math_1.fixZero(c + n), o && (x = math_1.toFixedNumber(x, o)), x < n || x > u || x === y || (h += x, 
                m.push(x), f = e, p--, y = x);
            }
            w = math_1.fixZero(r - h), o && (w = math_1.toFixedNumber(w, o)), w < n || w > u || w === b || w === y || (m.push(w), 
            l = !0, e = m);
        } while (!l);
        return e;
    };
}

exports.coreFnRandSumInt = coreFnRandSumInt, exports.coreFnRandSumFloat = coreFnRandSumFloat;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJhcnJheV9oeXBlcl91bmlxdWVfMSIsInJlcXVpcmUiLCJ1dGlsXzEiLCJ1dGlsXzIiLCJkaXN0cmlidXRpb25zXzEiLCJtYXRoXzEiLCJvd18xIiwidW5pZm9ybV8xIiwiY29yZUZuUmFuZFN1bUludCIsImFyZ3YiLCJyYW5kb20iLCJzaXplIiwic3VtIiwibWluIiwibWF4IiwiZXhwZWN0IiwiaXMiLCJmaW5pdGUiLCJpbnRlZ2VyIiwiZ3QiLCJzdW1fMV90b19zaXplIiwic3VtXzFfdG9fbiIsImlzVW5zZXQiLCJNYXRoIiwiYWJzIiwibl9zdW0iLCJtYXh2IiwiZ3RlIiwicHJvYiIsImdldF9wcm9iIiwiYXJyYXkiLCJsZW5ndGhPZiIsInJtdWx0aW5vbUZuIiwibGliUm1hdGgiLCJNdWx0aW5vbWlhbCIsImZha2VMaWJSTWF0aFJuZyIsIm5leHQiLCJybXVsdGlub20iLCJuX2xlbiIsImxpbWl0Iiwibl9kaWZmIiwicm11bHRpbm9tQ3JlYXRlRm4iLCJyZWR1Y2UiLCJhIiwiaSIsImxlbmd0aCIsImJfc3VtIiwiYm9vbCIsInVuaXF1ZV9sZW4iLCJ2IiwibiIsImluZGV4T2YiLCJpdGVtIiwicHVzaCIsInNvcnQiLCJiIiwiY2FjaGVfbWF4IiwiY2FjaGUiLCJsZW4iLCJhcnIiLCJhcnJheV91bmlxdWUiLCJtYXAiLCJmaXhaZXJvIiwiaGF2ZSIsInVuZGVmaW5lZCIsInJldF9iIiwiYm9vbF90b3BsZXZlbCIsImNfbGVuIiwiVXRpbERpc3RyaWJ1dGlvbnMiLCJyYW5kSW5kZXgiLCJFcnJvciIsImNvcmVGblJhbmRTdW1GbG9hdCIsImZyYWN0aW9uRGlnaXRzIiwibnVtYmVyIiwiZm5GaXJzdCIsImdldF9wcm9iX2Zsb2F0IiwicHJvYl9zbGljZV9zdW0iLCJhcnJheV9zdW0iLCJzbGljZSIsImRlZmF1bHQiLCJmbk5leHQiLCJmbG9hdCIsIkxBQkVMX1RPUCIsInJldF9hIiwidG90YWwiLCJ0b3RhbDIiLCJuMTAiLCJuMTEiLCJuMDAiLCJuMDEiLCJ0b0ZpeGVkTnVtYmVyIiwidDAiLCJ0MSIsIm5fcHJldiJdLCJtYXBwaW5ncyI6IkFBQUFBLE9BQU9DLGVBQWVDLFNBQVM7SUFBZ0JDLFFBQU87OztBQUN0RCxNQUFNQyx1QkFBdUJDLFFBQVEsdUJBQy9CQyxTQUFTRCxRQUFRLGlDQUNqQkUsU0FBU0YsUUFBUSxlQUNqQkcsa0JBQWtCSCxRQUFRLDZCQUMxQkksU0FBU0osUUFBUSxvQkFDakJLLE9BQU9MLFFBQVEsa0JBQ2ZNLFlBQVlOLFFBQVE7O0FBTzFCLFNBQVNPLGlCQUFpQkM7SUFDdEIsS0FBSUMsUUFBRUEsR0FBTUMsTUFBRUEsR0FBSUMsS0FBRUEsR0FBR0MsS0FBRUEsR0FBR0MsS0FBRUEsS0FBU0w7SUFFdkNILEtBQUtTLE9BQU9KLEdBQU1LLEdBQUdDLE9BQU9DLFFBQVFDLEdBQUc7SUFDdkMsSUFBSUMsSUFBZ0JmLE9BQU9nQixXQUFXVjtJQUN0Q0MsSUFBTVQsT0FBT21CLFFBQVFWLEtBQU9RLElBQWdCUixHQUU1Q04sS0FBS1MsT0FBT0gsR0FBS0ksR0FBR0MsT0FBT0MsV0FDM0JMLElBQU1WLE9BQU9tQixRQUFRVCxLQUFRRCxJQUFNLElBQUksSUFBSUEsSUFBT0M7SUFDbERDLElBQU1YLE9BQU9tQixRQUFRUixLQUFPUyxLQUFLQyxJQUFJWixLQUFPRSxHQUU1Q1IsS0FBS1MsT0FBT0YsR0FBS0csR0FBR0MsT0FBT0MsV0FFM0JaLEtBQUtTLE9BQU9ELEdBQUtFLEdBQUdDLE9BQU9DO0lBRTNCLElBQUlPLElBQVFiLElBQU1ELElBQU9FLEdBQ3JCYSxJQUFPWixJQUFNRDtJQUNqQlAsS0FBS1MsT0FBT1UsR0FBT0UsSUFBSSxJQVluQmYsSUFBTSxLQUNOTixLQUFLUyxPQUFPSCxHQUFLTyxHQUFHTjtJQVN4QixJQUFJZSxJQUFPdkIsT0FBT3dCLFNBQVNsQixHQUFNZTtJQUNqQ3BCLEtBQUtTLE9BQU9hLEdBQU1aLEdBQUdj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