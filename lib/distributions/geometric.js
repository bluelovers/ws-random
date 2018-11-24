Object.defineProperty(exports, "__esModule", {
    value: !0
});

const ow_1 = require("../util/ow");

exports.default = ((e, t = .5) => {
    ow_1.default(t).number.gt(0).lte(1);
    const o = 1 / Math.log(1 - t);
    return () => 1 + Math.log(e.next()) * o | 0;
}), Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJvd18xIiwicmVxdWlyZSIsImRlZmF1bHQiLCJyYW5kb20iLCJwIiwibnVtYmVyIiwiZ3QiLCJsdGUiLCJpbnZMb2dQIiwiTWF0aCIsImxvZyIsIm5leHQiLCJmcmVlemUiXSwibWFwcGluZ3MiOiJBQUFBQSxPQUFPQyxlQUFlQyxTQUFTO0lBQWdCQyxRQUFPOzs7QUFDdEQsTUFBTUMsT0FBT0MsUUFBUTs7QUFDckJILFFBQVFJLFVBQVUsRUFBQ0MsR0FBUUMsSUFBSTtJQUUzQkosS0FBS0UsUUFBUUUsR0FBR0MsT0FBT0MsR0FBRyxHQUFHQyxJQUFJO0lBQ2pDLE1BQU1DLElBQVUsSUFBTUMsS0FBS0MsSUFBSSxJQUFNTjtJQUNyQyxPQUFPLE1BQ0ksSUFBS0ssS0FBS0MsSUFBSVAsRUFBT1EsVUFBVUgsSUFBVztJQUl6RFosT0FBT2dCLE9BQU9kIn0=