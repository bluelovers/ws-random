Object.defineProperty(exports, "__esModule", {
    value: !0
});

const util_1 = require("../util");

function swapAlgorithm(e, r, t = randIndex) {
    let n = e.length, o = r ? e : e.slice();
    for (;n > 0; ) {
        let e = t(n--), r = o[n];
        o[n] = o[e], o[e] = r;
    }
    return o;
}

function randIndex(e, ...r) {
    return Math.floor(util_1._MathRandom() * e);
}

function array_rebase(e, r, t, n) {
    let o = 0, a, l = e.length;
    if ("number" == typeof t || "number" == typeof n) for (;l--; ) {
        let s, u = e[l] + r;
        if (!(u >= t && u <= n)) {
            a = !1;
            break;
        }
        a = !0, e[l] = u, o += u;
    } else {
        for (;l--; ) {
            let t, n = e[l] + r;
            e[l] = n, o += n;
        }
        a = !0;
    }
    return {
        bool: a,
        b_sum: o
    };
}

exports.swapAlgorithm = swapAlgorithm, exports.randIndex = randIndex, exports.array_rebase = array_rebase, 
Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJ1dGlsXzEiLCJyZXF1aXJlIiwic3dhcEFsZ29yaXRobSIsImFyciIsIm92ZXJ3cml0ZSIsImZuIiwicmFuZEluZGV4IiwibGVuIiwibGVuZ3RoIiwicmV0Iiwic2xpY2UiLCJpZHgiLCJjYWNoZSIsImFyZ3YiLCJNYXRoIiwiZmxvb3IiLCJfTWF0aFJhbmRvbSIsImFycmF5X3JlYmFzZSIsInJldF9iIiwibl9kaWZmIiwibWluIiwibWF4IiwiYl9zdW0iLCJib29sIiwiaSIsInYiLCJuIiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiQUFBQUEsT0FBT0MsZUFBZUMsU0FBUztJQUFnQkMsUUFBTzs7O0FBSXRELE1BQU1DLFNBQVNDLFFBQVE7O0FBQ3ZCLFNBQVNDLGNBQWNDLEdBQUtDLEdBQVdDLElBQUtDO0lBQ3hDLElBQUlDLElBQU1KLEVBQUlLLFFBQ1ZDLElBQU9MLElBQVlELElBQU1BLEVBQUlPO0lBQ2pDLE1BQU9ILElBQU0sS0FBRztRQUNaLElBQUlJLElBQU1OLEVBQUdFLE1BQ1RLLElBQVFILEVBQUlGO1FBQ2hCRSxFQUFJRixLQUFPRSxFQUFJRSxJQUNmRixFQUFJRSxLQUFPQzs7SUFFZixPQUFPSDs7O0FBR1gsU0FBU0gsVUFBVUMsTUFBUU07SUFDdkIsT0FBT0MsS0FBS0MsTUFBTWYsT0FBT2dCLGdCQUFnQlQ7OztBQU03QyxTQUFTVSxhQUFhQyxHQUFPQyxHQUFRQyxHQUFLQztJQUN0QyxJQUFJQyxJQUFRLEdBQ1JDLEdBQ0FDLElBQUlOLEVBQU1WO0lBQ2QsSUFBbUIsbUJBQVJZLEtBQW1DLG1CQUFSQyxHQUNsQyxNQUFPRyxPQUFLO1FBQ1IsSUFBSUMsR0FDQUMsSUFESVIsRUFBTU0sS0FDRkw7UUFDWixNQUFJTyxLQUFLTixLQUFPTSxLQUFLTCxJQUtoQjtZQUNERSxLQUFPO1lBQ1A7O1FBTkFBLEtBQU8sR0FDUEwsRUFBTU0sS0FBS0UsR0FDWEosS0FBU0k7V0FRaEI7UUFDRCxNQUFPRixPQUFLO1lBQ1IsSUFBSUMsR0FDQUMsSUFESVIsRUFBTU0sS0FDRkw7WUFDWkQsRUFBTU0sS0FBS0UsR0FDWEosS0FBU0k7O1FBRWJILEtBQU87O0lBRVg7UUFDSUEsTUFBQUE7UUFDQUQsT0FBQUE7Ozs7QUF0Q1J4QixRQUFRSSxnQkFBZ0JBLGVBSXhCSixRQUFRUSxZQUFZQSxXQXFDcEJSLFFBQVFtQixlQUFlQTtBQUV2QnJCLE9BQU8rQixPQUFPN0IifQ==