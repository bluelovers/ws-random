Object.defineProperty(exports, "__esModule", {
    value: !0
});

const ow_1 = require("../util/ow");

exports.default = ((e, t) => {
    ow_1.default(t).gt(0);
    const o = 1 / t;
    return () => 1 / Math.pow(1 - e.next(), o);
}), Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJvd18xIiwicmVxdWlyZSIsImRlZmF1bHQiLCJyYW5kb20iLCJhbHBoYSIsImd0IiwiaW52QWxwaGEiLCJNYXRoIiwicG93IiwibmV4dCIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6IkFBQUFBLE9BQU9DLGVBQWVDLFNBQVM7SUFBZ0JDLFFBQU87OztBQUN0RCxNQUFNQyxPQUFPQyxRQUFROztBQUNyQkgsUUFBUUksVUFBVSxFQUFDQyxHQUFRQztJQUV2QkosS0FBS0UsUUFBUUUsR0FBT0MsR0FBRztJQUN2QixNQUFNQyxJQUFXLElBQU1GO0lBQ3ZCLE9BQU8sTUFDSSxJQUFNRyxLQUFLQyxJQUFJLElBQU1MLEVBQU9NLFFBQVFIO0lBSW5EVixPQUFPYyxPQUFPWiJ9