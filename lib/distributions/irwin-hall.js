Object.defineProperty(exports, "__esModule", {
    value: !0
});

const math_1 = require("../util/math"), ow_1 = require("../util/ow");

exports.default = ((e, t) => (ow_1.default(t).integer.gte(0), 0 === (t = math_1.fixZero(t)) ? () => 0 : () => {
    let r = t, o = 0;
    for (;r--; ) o += e.next();
    return o;
})), Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJtYXRoXzEiLCJyZXF1aXJlIiwib3dfMSIsImRlZmF1bHQiLCJyYW5kb20iLCJuIiwiaW50ZWdlciIsImd0ZSIsImZpeFplcm8iLCJpIiwic3VtIiwibmV4dCIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6IkFBQUFBLE9BQU9DLGVBQWVDLFNBQVM7SUFBZ0JDLFFBQU87OztBQUN0RCxNQUFNQyxTQUFTQyxRQUFRLGlCQUNqQkMsT0FBT0QsUUFBUTs7QUFTckJILFFBQVFLLFVBQVUsRUFBQ0MsR0FBUUMsT0FDdkJILEtBQUtDLFFBQVFFLEdBQUdDLFFBQVFDLElBQUksSUFFbEIsT0FEVkYsSUFBSUwsT0FBT1EsUUFBUUgsTUFFUixNQUFNLElBRVY7SUFDSCxJQUFJSSxJQUFJSixHQUNKSyxJQUFNO0lBQ1YsTUFBT0QsT0FDSEMsS0FBT04sRUFBT087SUFFbEIsT0FBT0Q7S0FJZmQsT0FBT2dCLE9BQU9kIn0=