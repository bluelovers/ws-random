Object.defineProperty(exports, "__esModule", {
    value: !0
});

const util_1 = require("../util");

function swapAlgorithm(e, r, t = randIndex) {
    let n = e.length, o = r ? e : e.slice();
    for (;n; ) {
        let e = t(n--);
        if (n === e) continue;
        let r = o[n];
        o[n] = o[e], o[e] = r;
    }
    return o;
}

function swapAlgorithm2(e, r, t = randIndex) {
    let n = e.length, o = r ? e : e.slice(), l = n, a = Math.ceil(l / 2);
    for (;n; ) {
        let e = t(l);
        if (e === --n && (e = t(n < a ? l : n)), n === e) continue;
        let r = o[n];
        o[n] = o[e], o[e] = r;
    }
    return o;
}

function randIndex(e, ...r) {
    return Math.floor(util_1._MathRandom() * e);
}

function array_rebase(e, r, t, n) {
    let o = 0, l, a = e.length;
    if ("number" == typeof t || "number" == typeof n) for (;a--; ) {
        let i, s = e[a] + r;
        if (!(s >= t && s <= n)) {
            l = !1;
            break;
        }
        l = !0, e[a] = s, o += s;
    } else {
        for (;a--; ) {
            let t, n = e[a] + r;
            e[a] = n, o += n;
        }
        l = !0;
    }
    return {
        bool: l,
        b_sum: o
    };
}

exports.swapAlgorithm = swapAlgorithm, exports.swapAlgorithm2 = swapAlgorithm2, 
exports.randIndex = randIndex, exports.array_rebase = array_rebase, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJ1dGlsXzEiLCJyZXF1aXJlIiwic3dhcEFsZ29yaXRobSIsImFyciIsIm92ZXJ3cml0ZSIsImZuIiwicmFuZEluZGV4IiwiaSIsImxlbmd0aCIsInJldCIsInNsaWNlIiwiaWR4IiwiY2FjaGUiLCJzd2FwQWxnb3JpdGhtMiIsImxlbiIsImoiLCJNYXRoIiwiY2VpbCIsImFyZ3YiLCJmbG9vciIsIl9NYXRoUmFuZG9tIiwiYXJyYXlfcmViYXNlIiwicmV0X2IiLCJuX2RpZmYiLCJtaW4iLCJtYXgiLCJiX3N1bSIsImJvb2wiLCJ2IiwibiIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6IkFBQUFBLE9BQU9DLGVBQWVDLFNBQVM7SUFBZ0JDLFFBQU87OztBQUl0RCxNQUFNQyxTQUFTQyxRQUFROztBQUN2QixTQUFTQyxjQUFjQyxHQUFLQyxHQUFXQyxJQUFLQztJQUN4QyxJQUFJQyxJQUFJSixFQUFJSyxRQUVSQyxJQUFPTCxJQUFZRCxJQUFNQSxFQUFJTztJQUNqQyxNQUFPSCxLQUFHO1FBQ04sSUFBSUksSUFBTU4sRUFBR0U7UUFDYixJQUFJQSxNQUFNSSxHQUNOO1FBQ0osSUFBSUMsSUFBUUgsRUFBSUY7UUFDaEJFLEVBQUlGLEtBQUtFLEVBQUlFLElBQ2JGLEVBQUlFLEtBQU9DOztJQUdmLE9BQU9IOzs7QUFHWCxTQUFTSSxlQUFlVixHQUFLQyxHQUFXQyxJQUFLQztJQUN6QyxJQUFJQyxJQUFJSixFQUFJSyxRQUVSQyxJQUFPTCxJQUFZRCxJQUFNQSxFQUFJTyxTQUM3QkksSUFBTVAsR0FDTlEsSUFBSUMsS0FBS0MsS0FBS0gsSUFBTTtJQUN4QixNQUFPUCxLQUFHO1FBQ04sSUFBSUksSUFBTU4sRUFBR1M7UUFVYixJQVJJSCxRQURKSixNQUdRSSxJQUFNTixFQURORSxJQUFJUSxJQUNLRCxJQUdBUCxLQUdiQSxNQUFNSSxHQUNOO1FBQ0osSUFBSUMsSUFBUUgsRUFBSUY7UUFDaEJFLEVBQUlGLEtBQUtFLEVBQUlFLElBQ2JGLEVBQUlFLEtBQU9DOztJQUdmLE9BQU9IOzs7QUFHWCxTQUFTSCxVQUFVUSxNQUFRSTtJQUN2QixPQUFPRixLQUFLRyxNQUFNbkIsT0FBT29CLGdCQUFnQk47OztBQU03QyxTQUFTTyxhQUFhQyxHQUFPQyxHQUFRQyxHQUFLQztJQUN0QyxJQUFJQyxJQUFRLEdBQ1JDLEdBQ0FwQixJQUFJZSxFQUFNZDtJQUNkLElBQW1CLG1CQUFSZ0IsS0FBbUMsbUJBQVJDLEdBQ2xDLE1BQU9sQixPQUFLO1FBQ1IsSUFBSXFCLEdBQ0FDLElBRElQLEVBQU1mLEtBQ0ZnQjtRQUNaLE1BQUlNLEtBQUtMLEtBQU9LLEtBQUtKLElBS2hCO1lBQ0RFLEtBQU87WUFDUDs7UUFOQUEsS0FBTyxHQUNQTCxFQUFNZixLQUFLc0IsR0FDWEgsS0FBU0c7V0FRaEI7UUFDRCxNQUFPdEIsT0FBSztZQUNSLElBQUlxQixHQUNBQyxJQURJUCxFQUFNZixLQUNGZ0I7WUFDWkQsRUFBTWYsS0FBS3NCLEdBQ1hILEtBQVNHOztRQUViRixLQUFPOztJQUVYO1FBQ0lBLE1BQUFBO1FBQ0FELE9BQUFBOzs7O0FBakVSNUIsUUFBUUksZ0JBQWdCQSxlQTJCeEJKLFFBQVFlLGlCQUFpQkE7QUFJekJmLFFBQVFRLFlBQVlBLFdBcUNwQlIsUUFBUXVCLGVBQWVBLGNBRXZCekIsT0FBT2tDLE9BQU9oQyJ9