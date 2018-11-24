function randIndex(t, e) {
    return Math.floor(t.next() * e);
}

function float(t, e, r) {
    return t.next() * (r - e) + e;
}

function int(t, e, r) {
    return Math.floor(float(t, e, r + 1));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.randIndex = randIndex, exports.float = float, exports.int = int;

const UtilDistributions = require("./distributions");

exports.UtilDistributions = UtilDistributions, exports.default = UtilDistributions, 
Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsicmFuZEluZGV4IiwicmFuZG9tIiwibGVuIiwiTWF0aCIsImZsb29yIiwibmV4dCIsImZsb2F0IiwibWluIiwibWF4IiwiaW50IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJVdGlsRGlzdHJpYnV0aW9ucyIsInJlcXVpcmUiLCJkZWZhdWx0IiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiQUFDQSxTQUFTQSxVQUFVQyxHQUFRQztJQUN2QixPQUFPQyxLQUFLQyxNQUFNSCxFQUFPSSxTQUFTSDs7O0FBR3RDLFNBQVNJLE1BQU1MLEdBQVFNLEdBQUtDO0lBQ3hCLE9BQU9QLEVBQU9JLFVBQVVHLElBQU1ELEtBQU9BOzs7QUFHekMsU0FBU0UsSUFBSVIsR0FBUU0sR0FBS0M7SUFDdEIsT0FBT0wsS0FBS0MsTUFBTUUsTUFBTUwsR0FBUU0sR0FBS0MsSUFBTTs7O0FBVi9DRSxPQUFPQyxlQUFlQyxTQUFTO0lBQWdCQyxRQUFPO0lBSXRERCxRQUFRWixZQUFZQSxXQUlwQlksUUFBUU4sUUFBUUEsT0FJaEJNLFFBQVFILE1BQU1BOztBQUNkLE1BQU1LLG9CQUFvQkMsUUFBUTs7QUFDbENILFFBQVFFLG9CQUFvQkEsbUJBQzVCRixRQUFRSSxVQUFVRjtBQUVsQkosT0FBT08sT0FBT0wifQ==