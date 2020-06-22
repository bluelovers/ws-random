Object.defineProperty(exports, "__esModule", {
    value: !0
});

const ow_1 = require("../util/ow"), distributions_1 = require("../util/distributions");

exports.default = ((e, t, i, n, r, l) => {
    const o = t => distributions_1.randIndex(e, t);
    let s = t.slice();
    i = Math.min(i || s.length, s.length), r = r || o, n = !!n, ow_1.default(i).integer.gt(0), 
    ow_1.default(r).is.function();
    let u = i, a;
    const c = function _fnClone(e) {
        s = e.slice(), u = i, a = s.length;
    };
    return () => {
        if (0 === (a = s.length) || 0 == u--) {
            let e = n;
            if (l) {
                let o = l(t, i, n, r);
                Array.isArray(o) && o.length > 0 ? (c(o), e = null) : 1 == o ? e = !0 : void 0 !== o && (e = !1);
            }
            if (e) c(t); else if (null !== e) throw new RangeError(`can't call arrayUnique > ${i} times`);
        }
        let e = r(a);
        return s.splice(e, 1)[0];
    };
}), Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJvd18xIiwicmVxdWlyZSIsImRpc3RyaWJ1dGlvbnNfMSIsImRlZmF1bHQiLCJyYW5kb20iLCJhcnIiLCJsaW1pdCIsImxvb3AiLCJmblJhbmRJbmRleCIsImZuT3V0T2ZMaW1pdCIsInJhbmRJbmRleCIsImxlbiIsImNsb25lIiwic2xpY2UiLCJNYXRoIiwibWluIiwibGVuZ3RoIiwiaW50ZWdlciIsImd0IiwiaXMiLCJmdW5jdGlvbiIsImNvdW50IiwiX2ZuQ2xvbmUiLCJfbG9vcCIsInJldCIsIkFycmF5IiwiaXNBcnJheSIsIlJhbmdlRXJyb3IiLCJpIiwic3BsaWNlIiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiQUFBQUEsT0FBT0MsZUFBZUMsU0FBUztJQUFnQkMsUUFBTzs7O0FBQ3RELE1BQU1DLE9BQU9DLFFBQVEsZUFDZkMsa0JBQWtCRCxRQUFROztBQUNoQ0gsUUFBUUssVUFBVSxFQUFDQyxHQUFRQyxHQUFLQyxHQUFPQyxHQUFNQyxHQUFhQztJQUN0RCxNQUFNQyxJQUFhQyxLQUNSVCxnQkFBZ0JRLFVBQVVOLEdBQVFPO0lBRTdDLElBQUlDLElBQVFQLEVBQUlRO0lBQ2hCUCxJQUFRUSxLQUFLQyxJQUFJVCxLQUFTTSxFQUFNSSxRQUFRSixFQUFNSSxTQUM5Q1IsSUFBY0EsS0FBZUUsR0FDN0JILE1BQVNBLEdBR1RQLEtBQUtHLFFBQVFHLEdBQU9XLFFBQVFDLEdBQUc7SUFDL0JsQixLQUFLRyxRQUFRSyxHQUFhVyxHQUFHQztJQUM3QixJQUFJQyxJQUFRZixHQUNSSztJQUNKLE1BQU1XLElBQVcsU0FBU0EsU0FBU2pCO1FBQy9CTyxJQUFRUCxFQUFJUSxTQUNaUSxJQUFRZixHQUNSSyxJQUFNQyxFQUFNSTs7SUFFaEIsT0FBTztRQUVILElBQVksT0FEWkwsSUFBTUMsRUFBTUksV0FDaUIsS0FBWkssS0FBZTtZQUM1QixJQUFJRSxJQUFRaEI7WUFDWixJQUFJRSxHQUFjO2dCQUNkLElBQUllLElBQU1mLEVBQWFKLEdBQUtDLEdBQU9DLEdBQU1DO2dCQUNyQ2lCLE1BQU1DLFFBQVFGLE1BQVFBLEVBQUlSLFNBQVMsS0FDbkNNLEVBQVNFLElBQ1RELElBQVEsUUFFSSxLQUFQQyxJQUNMRCxLQUFRLFNBRVksTUFBUkMsTUFDWkQsS0FBUTs7WUFHaEIsSUFBSUEsR0FDQUQsRUFBU2pCLFNBRVIsSUFBYyxTQUFWa0IsR0FDTCxNQUFNLElBQUlJLHVDQUF1Q3JCOztRQUd6RCxJQUFJc0IsSUFBSXBCLEVBQVlHO1FBQ3BCLE9BQU9DLEVBQ0ZpQixPQUFPRCxHQUFHLEdBQUc7O0lBSTFCaEMsT0FBT2tDLE9BQU9oQyJ9