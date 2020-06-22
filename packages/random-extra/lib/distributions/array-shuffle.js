Object.defineProperty(exports, "__esModule", {
    value: !0
});

const array_1 = require("../util/array"), distributions_1 = require("../util/distributions");

function arrayShuffle(r, e, t) {
    const i = e => distributions_1.randIndex(r, e);
    if (!t) {
        let r;
        return r = Buffer.isBuffer(e) ? r => Buffer.from(r) : r => r.slice(), () => array_1.swapAlgorithm2(r(e), !0, i);
    }
    return () => array_1.swapAlgorithm2(e, !0, i);
}

arrayShuffle.memoizable = !1, exports.default = arrayShuffle, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJhcnJheV8xIiwicmVxdWlyZSIsImRpc3RyaWJ1dGlvbnNfMSIsImFycmF5U2h1ZmZsZSIsInJhbmRvbSIsImFyciIsIm92ZXJ3cml0ZSIsInJhbmRJbmRleCIsImxlbiIsImNsb25lQXJyYXlMaWtlIiwiQnVmZmVyIiwiaXNCdWZmZXIiLCJmcm9tIiwic2xpY2UiLCJzd2FwQWxnb3JpdGhtMiIsIm1lbW9pemFibGUiLCJkZWZhdWx0IiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiQUFBQUEsT0FBT0MsZUFBZUMsU0FBUztJQUFnQkMsUUFBTzs7O0FBQ3RELE1BQU1DLFVBQVVDLFFBQVEsa0JBQ2xCQyxrQkFBa0JELFFBQVE7O0FBQ2hDLFNBQVNFLGFBQWFDLEdBQVFDLEdBQUtDO0lBQy9CLE1BQU1DLElBQWFDLEtBQ1JOLGdCQUFnQkssVUFBVUgsR0FBUUk7SUFFN0MsS0FBS0YsR0FBVztRQUNaLElBQUlHO1FBYUosT0FYSUEsSUFEQUMsT0FBT0MsU0FBU04sS0FDRUEsS0FFUEssT0FBT0UsS0FBS1AsS0FJTEEsS0FFUEEsRUFBSVEsU0FHWixNQUNJYixRQUFRYyxlQUFlTCxFQUFlSixLQUFNLEdBQU1FOztJQUdqRSxPQUFPLE1BQ0lQLFFBQVFjLGVBQWVULElBQUssR0FBTUU7OztBQUdqREosYUFBYVksY0FBYSxHQUMxQmpCLFFBQVFrQixVQUFVYixjQUVsQlAsT0FBT3FCLE9BQU9uQiJ9