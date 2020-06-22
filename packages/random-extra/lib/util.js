Object.defineProperty(exports, "__esModule", {
    value: !0
});

const hashSum = require("hash-sum"), _nanoid = require("nanoid/non-secure"), _pkg = require("../package.json"), const_1 = require("./util/const"), _GLOBAL = (0, 
eval)("this");

function randomSeedNum() {
    return _MathRandom() * const_1.MATH_POW_2_32 + _MathRandom();
}

function randomSeedStr() {
    return [ _nanoid(), hashSum(_pkg.name), hashSum(_pkg.version), Date.now(), floatToString(_MathRandom()) ].join("_");
}

function getClass(n, t, ...e) {
    let r;
    return r = t instanceof n ? t.__proto__.constructor : n;
}

function cloneClass(n, t, ...e) {
    let r;
    return new (getClass(n, t, ...e))(...e);
}

function floatToString(n) {
    let t = Math.floor(n), e, r = String(n - t).split(".")[1];
    return String(t) + (r ? "." + r : "");
}

function expectInDelta(n, t, e = .05) {
    return t - e <= n && n <= t + e;
}

function hashArgv(n) {
    return String(n.join(";"));
}

function isNum(n) {
    return n === +n;
}

function isInt(n) {
    return n === (0 | n);
}

function isFloat(n) {
    return n === +n && n !== (0 | n);
}

function isUnset(n) {
    return void 0 === n || null === n;
}

function array_unique_unsafe(n) {
    return n.filter((n, t, e) => e.indexOf(n) === t);
}

exports._MathRandom = _MathRandom = Math.random, exports.randomSeedNum = randomSeedNum, 
exports.randomSeedStr = randomSeedStr, exports.getClass = getClass, exports.cloneClass = cloneClass, 
exports.floatToString = floatToString, exports.expectInDelta = expectInDelta, exports.hashArgv = hashArgv, 
exports.isNum = isNum, exports.isInt = isInt, exports.isFloat = isFloat, exports.isUnset = isUnset, 
exports.array_unique_unsafe = array_unique_unsafe, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJoYXNoU3VtIiwicmVxdWlyZSIsIl9uYW5vaWQiLCJfcGtnIiwiY29uc3RfMSIsIl9HTE9CQUwiLCJldmFsIiwicmFuZG9tU2VlZE51bSIsIl9NYXRoUmFuZG9tIiwiTUFUSF9QT1dfMl8zMiIsInJhbmRvbVNlZWRTdHIiLCJuYW1lIiwidmVyc2lvbiIsIkRhdGUiLCJub3ciLCJmbG9hdFRvU3RyaW5nIiwiam9pbiIsImdldENsYXNzIiwiUk5HQ2xhc3MiLCJ0aGlzQXJndiIsImFyZ3YiLCJvIiwiX19wcm90b19fIiwiY2xvbmVDbGFzcyIsIm4iLCJpbnQiLCJNYXRoIiwiZmxvb3IiLCJmbG9hdCIsInMiLCJTdHJpbmciLCJzcGxpdCIsImV4cGVjdEluRGVsdGEiLCJhY3R1YWwiLCJleHBlY3RlZCIsImRlbHRhIiwiaGFzaEFyZ3YiLCJhcmdzIiwiaXNOdW0iLCJpc0ludCIsImlzRmxvYXQiLCJpc1Vuc2V0IiwiYXJyYXlfdW5pcXVlX3Vuc2FmZSIsImFyciIsImZpbHRlciIsInYiLCJpIiwiaW5kZXhPZiIsInJhbmRvbSIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6IkFBR0FBLE9BQU9DLGVBQWVDLFNBQVM7SUFBZ0JDLFFBQU87OztBQUN0RCxNQUFNQyxVQUFVQyxRQUFRLGFBQ2xCQyxVQUFVRCxRQUFRLHNCQUNsQkUsT0FBT0YsUUFBUSxvQkFDZkcsVUFBVUgsUUFBUSxpQkFPbEJJLFdBQVU7QUFBSUMsTUFBTTs7QUFHMUIsU0FBU0M7SUFDTCxPQUFRQyxnQkFBZ0JKLFFBQVFLLGdCQUFpQkQ7OztBQU1yRCxTQUFTRTtJQUNMLFNBQ0lSLFdBQ0FGLFFBQVFHLEtBQUtRLE9BQ2JYLFFBQVFHLEtBQUtTLFVBQ2JDLEtBQUtDLE9BQ0xDLGNBQWNQLGlCQUNoQlEsS0FBSzs7O0FBTVgsU0FBU0MsU0FBU0MsR0FBVUMsTUFBYUM7SUFDckMsSUFBSUM7SUFRSixPQUxJQSxJQUZBRixhQUFvQkQsSUFFZkMsRUFBU0csVUFBcUIsY0FHL0JKOzs7QUFRWixTQUFTSyxXQUFXTCxHQUFVQyxNQUFhQztJQUN2QyxJQUFJQztJQUNKLE9BQU8sS0FEQ0osU0FBU0MsR0FBVUMsTUFBYUMsR0FDakMsSUFBU0E7OztBQUdwQixTQUFTTCxjQUFjUztJQUNuQixJQUFJQyxJQUFNQyxLQUFLQyxNQUFNSCxJQUNqQkksR0FDQUMsSUFBSUMsT0FESU4sSUFBSUMsR0FFWE0sTUFBTSxLQUFLO0lBQ2hCLE9BQU9ELE9BQU9MLE1BQVFJLElBQUksTUFBTUEsSUFBSTs7O0FBVXhDLFNBQVNHLGNBQWNDLEdBQVFDLEdBQVVDLElBQVE7SUFDN0MsT0FBT0QsSUFBV0MsS0FBU0YsS0FBVUEsS0FBVUMsSUFBV0M7OztBQUc5RCxTQUFTQyxTQUFTQztJQUNkLE9BQU9QLE9BQU9PLEVBQUtyQixLQUFLOzs7QUFHNUIsU0FBU3NCLE1BQU1kO0lBQ1gsT0FBT0EsT0FBT0E7OztBQU1sQixTQUFTZSxNQUFNZjtJQUNYLE9BQU9BLE9BQVcsSUFBSkE7OztBQUdsQixTQUFTZ0IsUUFBUWhCO0lBQ2IsT0FBT0EsT0FBT0EsS0FBS0EsT0FBVyxJQUFKQTs7O0FBRzlCLFNBQVNpQixRQUFRakI7SUFDYixZQUFvQixNQUFOQSxLQUEyQixTQUFOQTs7O0FBTXZDLFNBQVNrQixvQkFBb0JDO0lBQ3pCLE9BQU9BLEVBQUlDLE9BQU8sQ0FBQ0MsR0FBR0MsR0FBR0gsTUFBUUEsRUFBSUksUUFBUUYsT0FBT0M7OztBQXZGeERoRCxRQUFRVSxjQUFjQSxjQUFja0IsS0FBS3NCLFFBSXpDbEQsUUFBUVMsZ0JBQWdCQTtBQWF4QlQsUUFBUVksZ0JBQWdCQSxlQWV4QlosUUFBUW1CLFdBQVdBLFVBUW5CbkIsUUFBUXlCLGFBQWFBO0FBUXJCekIsUUFBUWlCLGdCQUFnQkEsZUFXeEJqQixRQUFRa0MsZ0JBQWdCQSxlQUl4QmxDLFFBQVFzQyxXQUFXQTtBQUluQnRDLFFBQVF3QyxRQUFRQSxPQU9oQnhDLFFBQVF5QyxRQUFRQSxPQUloQnpDLFFBQVEwQyxVQUFVQSxTQUlsQjFDLFFBQVEyQyxVQUFVQTtBQU9sQjNDLFFBQVE0QyxzQkFBc0JBLHFCQUU5QjlDLE9BQU9xRCxPQUFPbkQifQ==