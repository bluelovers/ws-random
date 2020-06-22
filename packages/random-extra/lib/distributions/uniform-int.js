Object.defineProperty(exports, "__esModule", {
    value: !0
});

const ow_1 = require("../util/ow"), uniform_1 = require("./uniform");

exports.default = ((e, r, t) => {
    void 0 === t && (t = void 0 === r ? 1 : r, r = 0), ow_1.default(r).integer(), ow_1.default(t).integer.gt(r);
    let o = uniform_1.default(e, r, t + 1);
    return () => Math.floor(o());
}), Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJvd18xIiwicmVxdWlyZSIsInVuaWZvcm1fMSIsImRlZmF1bHQiLCJyYW5kb20iLCJtaW4iLCJtYXgiLCJ1bmRlZmluZWQiLCJpbnRlZ2VyIiwiZ3QiLCJmbiIsIk1hdGgiLCJmbG9vciIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6IkFBQUFBLE9BQU9DLGVBQWVDLFNBQVM7SUFBZ0JDLFFBQU87OztBQUN0RCxNQUFNQyxPQUFPQyxRQUFRLGVBQ2ZDLFlBQVlELFFBQVE7O0FBQzFCSCxRQUFRSyxVQUFVLEVBQUNDLEdBQVFDLEdBQUtDO1NBQ2hCQyxNQUFSRCxNQUNBQSxTQUFlQyxNQUFSRixJQUFvQixJQUFJQSxHQUMvQkEsSUFBTSxJQUVWTCxLQUFLRyxRQUFRRSxHQUFLRyxXQUNsQlIsS0FBS0csUUFBUUcsR0FBS0UsUUFBUUMsR0FBR0o7SUFHN0IsSUFBSUssSUFBS1IsVUFBVUMsUUFBUUMsR0FBUUMsR0FBS0MsSUFBTTtJQUM5QyxPQUFPLE1BQ0lLLEtBQUtDLE1BQU1GO0lBSTFCZCxPQUFPaUIsT0FBT2YifQ==