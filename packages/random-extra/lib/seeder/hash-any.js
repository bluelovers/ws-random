Object.defineProperty(exports, "__esModule", {
    value: !0
});

const hashSum = require("hash-sum"), util_1 = require("../util");

function hashAny(e, ...t) {
    return e ? "string" != typeof e && (e = hashSum(e)) : e = util_1.randomSeedStr(), 
    String(e);
}

exports.hashAny = hashAny, exports.default = hashAny, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJoYXNoU3VtIiwicmVxdWlyZSIsInV0aWxfMSIsImhhc2hBbnkiLCJzZWVkIiwiYXJndiIsInJhbmRvbVNlZWRTdHIiLCJTdHJpbmciLCJkZWZhdWx0IiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiQUFHQUEsT0FBT0MsZUFBZUMsU0FBUztJQUFnQkMsUUFBTzs7O0FBQ3RELE1BQU1DLFVBQVVDLFFBQVEsYUFFbEJDLFNBQVNELFFBQVE7O0FBS3ZCLFNBQVNFLFFBQVFDLE1BQVNDO0lBT3RCLE9BTktELElBR29CLG1CQUFUQSxNQUNaQSxJQUFPSixRQUFRSSxNQUhmQSxJQUFPRixPQUFPSTtJQUtYQyxPQUFPSDs7O0FBRWxCTixRQUFRSyxVQUFVQSxTQUNsQkwsUUFBUVUsVUFBVUwsU0FFbEJQLE9BQU9hLE9BQU9YIn0=