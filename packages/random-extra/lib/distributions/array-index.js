Object.defineProperty(exports, "__esModule", {
    value: !0
});

const UtilDistributions = require("../util/distributions"), ow_1 = require("../util/ow");

exports.default = ((t, e, i = 1, l = 0, r) => {
    let u = e.length - 1;
    ow_1.default(i).integer.gt(0), l = Math.max(0 | l, 0), r = Math.max(0, 0 | r) || u, 
    ow_1.default(r).integer.gt(0).lte(u), ow_1.default(l).integer.gte(0).lt(r);
    const o = UtilDistributions.int;
    let n = Math.max(Math.min(r - l, u, i), 0);
    return ow_1.default(n).gte(i).gt(0), () => {
        let e = [], i;
        do {
            let u = o(t, l, r);
            i === u || e.includes(u) || (e.push(i = u), --n);
        } while (n > 0);
        return e;
    };
}), Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJVdGlsRGlzdHJpYnV0aW9ucyIsInJlcXVpcmUiLCJvd18xIiwiZGVmYXVsdCIsInJhbmRvbSIsImFyciIsInNpemUiLCJzdGFydCIsImVuZCIsImxlbiIsImxlbmd0aCIsImludGVnZXIiLCJndCIsIk1hdGgiLCJtYXgiLCJsdGUiLCJndGUiLCJsdCIsImZuIiwiaW50Iiwic2l6ZV9ydW50aW1lIiwibWluIiwiaWRzIiwicHJldiIsImkiLCJpbmNsdWRlcyIsInB1c2giLCJmcmVlemUiXSwibWFwcGluZ3MiOiJBQUFBQSxPQUFPQyxlQUFlQyxTQUFTO0lBQWdCQyxRQUFPOzs7QUFDdEQsTUFBTUMsb0JBQW9CQyxRQUFRLDBCQUM1QkMsT0FBT0QsUUFBUTs7QUFDckJILFFBQVFLLFVBQVUsRUFBQ0MsR0FBUUMsR0FBS0MsSUFBTyxHQUFHQyxJQUFRLEdBQUdDO0lBQ2pELElBQUlDLElBQU1KLEVBQUlLLFNBQVM7SUFDdkJSLEtBQUtDLFFBQVFHLEdBQU1LLFFBQVFDLEdBQUcsSUFDOUJMLElBQVFNLEtBQUtDLElBQVksSUFBUlAsR0FBVyxJQUM1QkMsSUFBTUssS0FBS0MsSUFBSSxHQUFTLElBQU5OLE1BQVlDO0lBQzlCUCxLQUFLQyxRQUFRSyxHQUFLRyxRQUFRQyxHQUFHLEdBQUdHLElBQUlOLElBQ3BDUCxLQUFLQyxRQUFRSSxHQUFPSSxRQUFRSyxJQUFJLEdBQUdDLEdBQUdUO0lBQ3RDLE1BQU1VLElBQUtsQixrQkFBa0JtQjtJQUM3QixJQUFJQyxJQUFlUCxLQUFLQyxJQUFJRCxLQUFLUSxJQUFJYixJQUFNRCxHQUFPRSxHQUFLSCxJQUFPO0lBRTlELE9BREFKLEtBQUtDLFFBQVFpQixHQUFjSixJQUFJVixHQUFNTSxHQUFHLElBQ2pDO1FBQ0gsSUFBSVUsUUFDQUM7UUFDTyxHQUFHO1lBQ1YsSUFBSUMsSUFBSU4sRUFBR2QsR0FBUUcsR0FBT0M7WUFDdEJlLE1BQVNDLEtBQUtGLEVBQUlHLFNBQVNELE9BRy9CRixFQUFJSSxLQUFLSCxJQUFPQyxNQUNkSjtpQkFDR0EsSUFBZTtRQUN4QixPQUFPRTs7SUFJZjFCLE9BQU8rQixPQUFPN0IifQ==