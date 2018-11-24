Object.defineProperty(exports, "__esModule", {
    value: !0
});

const array_1 = require("../util/array"), distributions_1 = require("../util/distributions");

exports.default = (r => {
    const e = e => distributions_1.randIndex(r, e);
    return (r, t, i = e) => array_1.swapAlgorithm(r, t, i || e);
}), Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJhcnJheV8xIiwicmVxdWlyZSIsImRpc3RyaWJ1dGlvbnNfMSIsImRlZmF1bHQiLCJyYW5kb20iLCJyYW5kSW5kZXgiLCJsZW4iLCJhcnIiLCJvdmVyd3JpdGUiLCJmbiIsInN3YXBBbGdvcml0aG0iLCJmcmVlemUiXSwibWFwcGluZ3MiOiJBQUFBQSxPQUFPQyxlQUFlQyxTQUFTO0lBQWdCQyxRQUFPOzs7QUFDdEQsTUFBTUMsVUFBVUMsUUFBUSxrQkFDbEJDLGtCQUFrQkQsUUFBUTs7QUFDaENILFFBQVFLLFVBQVUsQ0FBQ0M7SUFDZixNQUFNQyxJQUFhQyxLQUNSSixnQkFBZ0JHLFVBQVVELEdBQVFFO0lBRTdDLE9BQU8sQ0FBQ0MsR0FBS0MsR0FBV0MsSUFBS0osTUFDbEJMLFFBQVFVLGNBQWNILEdBQUtDLEdBQVdDLEtBQU1KO0lBSTNEVCxPQUFPZSxPQUFPYiJ9