Object.defineProperty(exports, "__esModule", {
    value: !0
});

const ow_1 = require("../util/ow");

exports.default = ((e, t = 1, r = .5) => (ow_1.default(t).integer.gt(0), ow_1.default(r).number.gte(0).lte(1), 
() => {
    let o = 0, u = 0;
    for (;o++ < t; ) u += e.next() < r;
    return u;
})), Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJvd18xIiwicmVxdWlyZSIsImRlZmF1bHQiLCJyYW5kb20iLCJuIiwicCIsImludGVnZXIiLCJndCIsIm51bWJlciIsImd0ZSIsImx0ZSIsImkiLCJ4IiwibmV4dCIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6IkFBQUFBLE9BQU9DLGVBQWVDLFNBQVM7SUFBZ0JDLFFBQU87OztBQUN0RCxNQUFNQyxPQUFPQyxRQUFROztBQUNyQkgsUUFBUUksVUFBVSxFQUFDQyxHQUFRQyxJQUFJLEdBQUdDLElBQUksUUFDbENMLEtBQUtFLFFBQVFFLEdBQUdFLFFBQVFDLEdBQUcsSUFDM0JQLEtBQUtFLFFBQVFHLEdBQUdHLE9BQU9DLElBQUksR0FBR0MsSUFBSTtBQUMzQjtJQUNILElBQUlDLElBQUksR0FDSkMsSUFBSTtJQUNSLE1BQU9ELE1BQU1QLEtBRVRRLEtBQU1ULEVBQU9VLFNBQVNSO0lBRTFCLE9BQU9PO0tBSWZoQixPQUFPa0IsT0FBT2hCIn0=