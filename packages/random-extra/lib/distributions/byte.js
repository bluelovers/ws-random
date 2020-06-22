Object.defineProperty(exports, "__esModule", {
    value: !0
});

const ow_1 = require("../util/ow"), uniform_int_1 = require("./uniform-int"), byte_1 = require("../util/byte");

function uniformByte(e, t) {
    let r = uniform_int_1.default(e, 0, 255);
    return void 0 !== t && ow_1.default(t).is.boolean(), t ? () => byte_1.stringifyByte(r()) : r;
}

exports.default = uniformByte, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJvd18xIiwicmVxdWlyZSIsInVuaWZvcm1faW50XzEiLCJieXRlXzEiLCJ1bmlmb3JtQnl0ZSIsInJhbmRvbSIsInRvU3RyIiwiZm4iLCJkZWZhdWx0IiwiaXMiLCJib29sZWFuIiwic3RyaW5naWZ5Qnl0ZSIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6IkFBQUFBLE9BQU9DLGVBQWVDLFNBQVM7SUFBZ0JDLFFBQU87OztBQUN0RCxNQUFNQyxPQUFPQyxRQUFRLGVBQ2ZDLGdCQUFnQkQsUUFBUSxrQkFDeEJFLFNBQVNGLFFBQVE7O0FBQ3ZCLFNBQVNHLFlBQVlDLEdBQVFDO0lBQ3pCLElBQUlDLElBQUtMLGNBQWNNLFFBQVFILEdBQVEsR0FBRztJQUkxQyxZQUhxQixNQUFWQyxLQUNQTixLQUFLUSxRQUFRRixHQUFPRyxHQUFHQyxXQUV2QkosSUFDTyxNQUFNSCxPQUFPUSxjQUFjSixPQUUvQkE7OztBQUVYVCxRQUFRVSxVQUFVSixhQUVsQlIsT0FBT2dCLE9BQU9kIn0=